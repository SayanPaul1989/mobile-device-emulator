    class URLConfigManager {
    constructor() {
        this.initializeURLConfig();
    }

    initializeURLConfig() {
        // Check for URL parameters on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.processURLParameters();
            });
        } else {
            this.processURLParameters();
        }
    }

    processURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check for emulator parameters
        const emulatorParams = this.extractEmulatorParams(urlParams);
        
        if (emulatorParams && Object.keys(emulatorParams).length > 0) {
            console.log('🔧 URL emulator parameters detected:', emulatorParams);
            this.applyEmulatorConfig(emulatorParams);
        }
    }

    extractEmulatorParams(urlParams) {
        const params = {};
        
        // Supported parameters
        const paramMap = {
            'emulator_device': 'device',
            'emulator_orientation': 'orientation',
            'emulator_touch': 'touch',
            'emulator_dark': 'darkMode',
            'emulator_skin': 'deviceSkin',
            'emulator_width': 'width',
            'emulator_height': 'height',
            'emulator_dpr': 'dpr'
        };

        // Extract parameters
        for (const [urlParam, configKey] of Object.entries(paramMap)) {
            if (urlParams.has(urlParam)) {
                let value = urlParams.get(urlParam);
                
                // Convert string values to appropriate types
                if (configKey === 'touch' || configKey === 'darkMode' || configKey === 'deviceSkin') {
                    value = value.toLowerCase() === 'true';
                } else if (configKey === 'width' || configKey === 'height') {
                    value = parseInt(value);
                } else if (configKey === 'dpr') {
                    value = parseFloat(value);
                }
                
                params[configKey] = value;
            }
        }

        return params;
    }

    async applyEmulatorConfig(params) {
        try {
            // Store configuration for extension
            await chrome.storage.local.set({
                urlConfiguredEmulation: {
                    ...params,
                    timestamp: Date.now(),
                    autoActivate: true
                }
            });

            // Trigger emulation activation
            setTimeout(() => {
                this.activateEmulation(params);
            }, 1000);

        } catch (error) {
            console.error('Failed to apply URL emulator config:', error);
        }
    }

    async activateEmulation(params) {
        try {
            // Get device specifications if device name is provided
            let deviceConfig = null;
            if (params.device) {
                deviceConfig = this.getDeviceConfig(params.device);
            }

            // Build emulation settings
            const settings = {
                width: params.width || (deviceConfig ? deviceConfig.width : 375),
                height: params.height || (deviceConfig ? deviceConfig.height : 667),
                dpr: params.dpr || (deviceConfig ? deviceConfig.dpr : 2),
                touch: params.touch !== undefined ? params.touch : (deviceConfig ? deviceConfig.touch : true),
                userAgent: deviceConfig ? deviceConfig.userAgent : navigator.userAgent,
                orientation: params.orientation || 'portrait',
                darkMode: params.darkMode || false,
                deviceSkin: params.deviceSkin || false,
                deviceName: params.device || null
            };

            // Apply orientation adjustments
            if (settings.orientation === 'landscape') {
                const temp = settings.width;
                settings.width = settings.height;
                settings.height = temp;
            }

            // Send activation message to content script
            const message = {
                action: 'activateEmulation',
                settings: settings
            };

            // Try to activate on current tab
            if (typeof chrome !== 'undefined' && chrome.tabs) {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                await chrome.tabs.sendMessage(tab.id, message);
            } else {
                // Fallback for content script context
                if (window.emulator) {
                    window.emulator.activateEmulation(settings);
                }
            }

            console.log('✅ URL-configured emulation activated:', settings);

        } catch (error) {
            console.error('Failed to activate URL-configured emulation:', error);
        }
    }

    getDeviceConfig(deviceName) {
        // Device database - subset for URL configuration
        const devices = {
            'iPhone15ProMax': {
                width: 430, height: 932, dpr: 3, touch: true,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            },
            'iPhone15Pro': {
                width: 393, height: 852, dpr: 3, touch: true,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            },
            'iPhone14ProMax': {
                width: 430, height: 932, dpr: 3, touch: true,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
            },
            'iPhone14Pro': {
                width: 393, height: 852, dpr: 3, touch: true,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
            },
            'GalaxyS24Ultra': {
                width: 384, height: 854, dpr: 3.5, touch: true,
                userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
            },
            'GalaxyS24Plus': {
                width: 384, height: 854, dpr: 3, touch: true,
                userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S926B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
            },
            'GalaxyS23Ultra': {
                width: 384, height: 854, dpr: 3.5, touch: true,
                userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36'
            },
            'Pixel8Pro': {
                width: 384, height: 854, dpr: 2.625, touch: true,
                userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
            },
            'Pixel8': {
                width: 412, height: 915, dpr: 2.625, touch: true,
                userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
            },
            'OnePlus12': {
                width: 384, height: 854, dpr: 3.5, touch: true,
                userAgent: 'Mozilla/5.0 (Linux; Android 14; CPH2573) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
            },
            'iPadPro12': {
                width: 1024, height: 1366, dpr: 2, touch: true,
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            },
            'iPadPro11': {
                width: 834, height: 1194, dpr: 2, touch: true,
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            }
        };

        return devices[deviceName] || null;
    }

    // Helper method to generate URL with emulator parameters
    static generateEmulatorURL(baseURL, config) {
        const url = new URL(baseURL);
        
        if (config.device) url.searchParams.set('emulator_device', config.device);
        if (config.orientation) url.searchParams.set('emulator_orientation', config.orientation);
        if (config.touch !== undefined) url.searchParams.set('emulator_touch', config.touch);
        if (config.darkMode !== undefined) url.searchParams.set('emulator_dark', config.darkMode);
        if (config.deviceSkin !== undefined) url.searchParams.set('emulator_skin', config.deviceSkin);
        if (config.width) url.searchParams.set('emulator_width', config.width);
        if (config.height) url.searchParams.set('emulator_height', config.height);
        if (config.dpr) url.searchParams.set('emulator_dpr', config.dpr);
        
        return url.toString();
    }
}

// Initialize URL configuration manager
const urlConfigManager = new URLConfigManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = URLConfigManager;
}