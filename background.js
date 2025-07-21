const debuggerAttached = {};
const activeEmulationSettings = {}; // Store active settings per tab
const touchActive = {}; // Track touch state per tab

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'ping':
            sendResponse({ action: 'pong' });
            break;
        case 'activateEmulation':
            activateEmulation(request.tabId, request.settings).then(sendResponse);
            return true; // Indicates an async response
        case 'resetEmulation':
            resetEmulation(request.tabId).then(sendResponse);
            return true; // Indicates an async response
        case 'dispatchMouseEvent':
            if (sender.tab && activeEmulationSettings[sender.tab.id] && activeEmulationSettings[sender.tab.id].touch) {
                dispatchTouchEvent(sender.tab.id, request);
            }
            break;
    }
});

// Listen for debugger detachment
chrome.debugger.onDetach.addListener((source, reason) => {
    if (source.tabId) {
        debuggerAttached[source.tabId] = false;
        delete activeEmulationSettings[source.tabId];
        delete touchActive[source.tabId];
        console.log(`Debugger detached from tab ${source.tabId}:`, reason);
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && activeEmulationSettings[tabId]) {
        activateEmulation(tabId, activeEmulationSettings[tabId]);
    }
});

async function activateEmulation(tabId, settings) {
    try {
        if (!debuggerAttached[tabId]) {
            await chrome.debugger.attach({ tabId }, '1.3');
            debuggerAttached[tabId] = true;
        }

        activeEmulationSettings[tabId] = settings;
        touchActive[tabId] = false;

        if (!settings.deviceSkin) {
            await sendDebuggerCommand(tabId, 'Emulation.setDeviceMetricsOverride', {
                width: settings.width,
                height: settings.height,
                deviceScaleFactor: settings.dpr,
                mobile: true,
            });
        }

        await sendDebuggerCommand(tabId, 'Emulation.setUserAgentOverride', {
            userAgent: settings.userAgent
        });

        await sendDebuggerCommand(tabId, 'Emulation.setTouchEmulationEnabled', {
            enabled: settings.touch,
            maxTouchPoints: 10
        });

        // Set dark mode emulation
        await sendDebuggerCommand(tabId, 'Emulation.setEmulatedMedia', {
            features: [{
                name: 'prefers-color-scheme',
                value: settings.darkMode ? 'dark' : 'light'
            }]
        });

        if (settings.deviceSkin) {
            try {
                await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ['content.js']
                });
                console.log('content.js injected successfully.');
            } catch (e) {
                console.error('Failed to inject content.js:', e);
            }
            await chrome.tabs.sendMessage(tabId, { action: 'applyDeviceSkin', settings });
        }

        // Send emulation state to content script
        await chrome.tabs.sendMessage(tabId, {
            action: 'updateEmulationState',
            active: true,
            touchEnabled: settings.touch
        });

        return { success: true };
    } catch (error) {
        console.error('Failed to activate emulation:', error);
        // Try to detach the debugger on failure to clean up
        if (debuggerAttached[tabId]) {
            await chrome.debugger.detach({ tabId });
            debuggerAttached[tabId] = false;
        }
        delete activeEmulationSettings[tabId];
        delete touchActive[tabId]; // Clear touch state on error
        return { error: error.message };
    }
}

async function resetEmulation(tabId) {
    try {
        if (debuggerAttached[tabId]) {
            await sendDebuggerCommand(tabId, 'Emulation.clearDeviceMetricsOverride');
            await chrome.debugger.detach({ tabId });
            debuggerAttached[tabId] = false;
        }

        // Clear emulated media settings
        await sendDebuggerCommand(tabId, 'Emulation.setEmulatedMedia', { features: [] });

        delete activeEmulationSettings[tabId];
        delete touchActive[tabId]; // Clear touch state on reset

        // We need to inject the content script to remove the skin
        await chrome.scripting.executeScript({
            target: { tabId },
            files: ['device-skins.js']
        });
        await chrome.scripting.executeScript({
            target: { tabId },
            files: ['content.js']
        });
        await chrome.tabs.sendMessage(tabId, { action: 'resetDeviceSkin' });

        // Send emulation state to content script
        await chrome.tabs.sendMessage(tabId, {
            action: 'updateEmulationState',
            active: false,
            touchEnabled: false
        });

        return { success: true };
    } catch (error) {
        console.error('Failed to reset emulation:', error);
        return { error: error.message };
    }
}

async function sendDebuggerCommand(tabId, method, params = {}) {
    return new Promise((resolve, reject) => {
        chrome.debugger.sendCommand({ tabId }, method, params, (result) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(result);
        });
    });
}

async function dispatchTouchEvent(tabId, mouseEvent) {
    const touchPoints = [{
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
        radiusX: 1,
        radiusY: 1,
        force: 1,
        id: 1
    }];

    if (mouseEvent.eventType === 'mousedown') {
        // Only dispatch touchStart if it's a left click
        if (mouseEvent.button === 0) {
            touchActive[tabId] = true;
            await sendDebuggerCommand(tabId, 'Input.dispatchTouchEvent', {
                type: 'touchStart',
                touchPoints: touchPoints,
                modifiers: 0,
                timeStamp: Date.now()
            });
        }
    } else if (mouseEvent.eventType === 'mousemove') {
        if (touchActive[tabId]) {
            await sendDebuggerCommand(tabId, 'Input.dispatchTouchEvent', {
                type: 'touchMove',
                touchPoints: touchPoints,
                modifiers: 0,
                timeStamp: Date.now()
            });
        }
    } else if (mouseEvent.eventType === 'mouseup') {
        if (touchActive[tabId]) {
            touchActive[tabId] = false;
            await sendDebuggerCommand(tabId, 'Input.dispatchTouchEvent', {
                type: 'touchEnd',
                touchPoints: touchPoints,
                modifiers: 0,
                timeStamp: Date.now()
            });
        }
    }
}