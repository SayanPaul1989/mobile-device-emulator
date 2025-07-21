
class DeviceSkinManager {
    constructor() {
        this.currentSkin = null;
        this.isActive = false;
        this.deviceName = null;
        this.orientation = 'portrait';
        this.injectSkinStyles(); // Inject styles on instantiation
    }

    injectSkinStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
/* Device Skins CSS */
.device-skin {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999998;
    pointer-events: none;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
}

.device-skin.active {
    opacity: 1;
    visibility: visible;
}

.device-skin .device-frame {
    position: relative;
    background: #2c3e50;
    border-radius: 25px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.device-skin .device-screen {
    position: relative;
    background: #000;
    border-radius: 15px;
    overflow: hidden;
    border: 2px solid #1a1a1a;
}

.device-skin .page-content-wrapper {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch !important;
    pointer-events: auto !important; /* Allow interaction with content */
    z-index: 1; /* Ensure content is above the screen overlay */
}

.device-skin .screen-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.05);
    pointer-events: none;
    z-index: 1;
}

/* iPhone 15 Pro Max Skin */
.device-skin.iphone-15-pro-max .device-frame {
    width: 470px;
    height: 972px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 30px;
    padding: 20px;
    position: relative;
}

.device-skin.iphone-15-pro-max .device-frame::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 25px;
    background: #000;
    border-radius: 15px;
    z-index: 2;
}

.device-skin.iphone-15-pro-max .device-frame::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 15px;
    background: #333;
    border-radius: 10px;
    z-index: 3;
}

.device-skin.iphone-15-pro-max .device-screen {
    width: 430px;
    height: 932px;
    border-radius: 25px;
}

.device-skin.iphone-15-pro-max .home-indicator {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 134px;
    height: 5px;
    background: #fff;
    border-radius: 3px;
    opacity: 0.7;
    z-index: 2;
}

/* Samsung Galaxy S24 Ultra Skin */
.device-skin.galaxy-s24-ultra .device-frame {
    width: 424px;
    height: 894px;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    border-radius: 20px;
    padding: 20px;
    position: relative;
}

.device-skin.galaxy-s24-ultra .device-frame::before {
    content: '';
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
    z-index: 2;
}

.device-skin.galaxy-s24-ultra .device-screen {
    width: 384px;
    height: 854px;
    border-radius: 15px;
}

.device-skin.galaxy-s24-ultra .camera-punch {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: #000;
    border-radius: 50%;
    z-index: 2;
}

/* Google Pixel 8 Pro Skin */
.device-skin.pixel-8-pro .device-frame {
    width: 424px;
    height: 894px;
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
    border-radius: 25px;
    padding: 20px;
    position: relative;
}

.device-skin.pixel-8-pro .device-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 40px;
    background: #333;
    border-radius: 0 0 20px 20px;
    z-index: 2;
}

.device-skin.pixel-8-pro .device-screen {
    width: 384px;
    height: 854px;
    border-radius: 20px;
}

.device-skin.pixel-8-pro .camera-bar {
    position: absolute;
    top: 80px;
    left: 30px;
    right: 30px;
    height: 60px;
    background: rgba(0,0,0,0.8);
    border-radius: 30px;
    z-index: 2;
}

.device-skin.pixel-8-pro .camera-bar::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background: #444;
    border-radius: 50%;
}

.device-skin.pixel-8-pro .camera-bar::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background: #444;
    border-radius: 50%;
}

/* iPad Pro 12.9" Skin */
.device-skin.ipad-pro-12 .device-frame {
    width: 1064px;
    height: 1406px;
    background: linear-gradient(135deg, #434343 0%, #000000 100%);
    border-radius: 35px;
    padding: 20px;
    position: relative;
}

.device-skin.ipad-pro-12 .device-screen {
    width: 1024px;
    height: 1366px;
    border-radius: 25px;
}

.device-skin.ipad-pro-12 .home-indicator {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 5px;
    background: #fff;
    border-radius: 3px;
    opacity: 0.7;
    z-index: 2;
}

/* OnePlus 12 Skin */
.device-skin.oneplus-12 .device-frame {
    width: 424px;
    height: 894px;
    background: linear-gradient(135deg, #8360c3 0%, #2ebf91 100%);
    border-radius: 25px;
    padding: 20px;
    position: relative;
}

.device-skin.oneplus-12 .device-frame::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 20px;
    background: #000;
    border-radius: 10px;
    z-index: 2;
}

.device-skin.oneplus-12 .device-screen {
    width: 384px;
    height: 854px;
    border-radius: 20px;
}

.device-skin.oneplus-12 .alert-slider {
    position: absolute;
    top: 100px;
    left: -5px;
    width: 10px;
    height: 50px;
    background: #555;
    border-radius: 5px;
    z-index: 2;
}

/* Samsung Galaxy Z Fold 5 Skin */
.device-skin.galaxy-z-fold-5 .device-frame {
    width: 384px;
    height: 788px;
    background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
    border-radius: 20px;
    padding: 20px;
    position: relative;
}

.device-skin.galaxy-z-fold-5.unfolded .device-frame {
    width: 713px;
    height: 881px;
    transform: translate(-50%, -50%) scale(0.8);
}

.device-skin.galaxy-z-fold-5 .device-screen {
    width: 344px;
    height: 748px;
    border-radius: 15px;
}

.device-skin.galaxy-z-fold-5.unfolded .device-screen {
    width: 673px;
    height: 841px;
}

.device-skin.galaxy-z-fold-5 .fold-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: rgba(255,255,255,0.1);
    z-index: 2;
    display: none;
}

.device-skin.galaxy-z-fold-5.unfolded .fold-line {
    display: block;
}

/* Landscape mode adjustments */
.device-skin.landscape {
    transform: translate(-50%, -50%) rotate(90deg);
}

.device-skin.landscape.iphone-15-pro-max .device-frame {
    width: 972px;
    height: 470px;
}

.device-skin.landscape.iphone-15-pro-max .device-screen {
    width: 932px;
    height: 430px;
}

.device-skin.landscape.galaxy-s24-ultra .device-frame {
    width: 894px;
    height: 424px;
}

.device-skin.landscape.galaxy-s24-ultra .device-screen {
    width: 854px;
    height: 384px;
}

.device-skin.landscape.pixel-8-pro .device-frame {
    width: 894px;
    height: 424px;
}

.device-skin.landscape.pixel-8-pro .device-screen {
    width: 854px;
    height: 384px;
}

/* Skin controls */
.skin-controls {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px;
    border-radius: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    pointer-events: auto;
}

.skin-controls button {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 2px;
    font-size: 11px;
}

.skin-controls button:hover {
    background: #0056b3;
}

.skin-controls button.active {
    background: #28a745;
}

/* Responsive scaling for smaller screens */
@media (max-width: 1200px) {
    .device-skin {
        transform: translate(-50%, -50%) scale(0.8);
    }
}

@media (max-width: 900px) {
    .device-skin {
        transform: translate(-50%, -50%) scale(0.6);
    }
}

@media (max-width: 600px) {
    .device-skin {
        transform: translate(-50%, -50%) scale(0.4);
    }
}
`;
        document.head.appendChild(styleElement);
    }

    activateSkin(deviceName, orientation = 'portrait') {
        this.deactivateSkin();

        this.deviceName = deviceName;
        this.orientation = orientation;
        
        this.currentSkin = this.createSkin();
        if (!this.currentSkin) return;

        this.pageContentWrapper = document.createElement('div');
        this.pageContentWrapper.className = 'page-content-wrapper';

        while (document.body.firstChild) {
            this.pageContentWrapper.appendChild(document.body.firstChild);
        }

        const deviceScreen = this.currentSkin.querySelector('.device-screen');
        deviceScreen.appendChild(this.pageContentWrapper);

        document.body.appendChild(this.currentSkin);
        this.currentSkin.classList.add('active');
        
        this.addSkinControls();
        this.isActive = true;
    }

    deactivateSkin() {
        if (this.currentSkin && this.pageContentWrapper) {
            while (this.pageContentWrapper.firstChild) {
                document.body.appendChild(this.pageContentWrapper.firstChild);
            }
        }

        if (this.currentSkin) {
            this.currentSkin.remove();
            this.currentSkin = null;
        }

        const controls = document.querySelector('.skin-controls');
        if (controls) {
            controls.remove();
        }

        this.isActive = false;
        this.pageContentWrapper = null;
    }

    createSkin() {
        const skinClass = this.getSkinClass(this.deviceName);
        if (!skinClass) {
            console.warn(`No skin available for device: ${this.deviceName}`);
            return null;
        }

        const skinElement = document.createElement('div');
        skinElement.className = `device-skin ${skinClass}`;
        
        if (this.orientation === 'landscape') {
            skinElement.classList.add('landscape');
        }

        const deviceFrame = document.createElement('div');
        deviceFrame.className = 'device-frame';

        const deviceScreen = document.createElement('div');
        deviceScreen.className = 'device-screen';

        const screenOverlay = document.createElement('div');
        screenOverlay.className = 'screen-overlay';
        deviceScreen.appendChild(screenOverlay);

        this.addDeviceSpecificElements(deviceFrame, skinClass);

        deviceFrame.appendChild(deviceScreen);
        skinElement.appendChild(deviceFrame);

        return skinElement;
    }

    getSkinClass(deviceName) {
        const skinMap = {
            'iPhone 15 Pro Max': 'iphone-15-pro-max',
            'iPhone 15 Pro': 'iphone-15-pro-max', // Similar design
            'iPhone 14 Pro Max': 'iphone-15-pro-max',
            'iPhone 14 Pro': 'iphone-15-pro-max',
            'iPhone 13 Pro Max': 'iphone-15-pro-max',
            'iPhone 13 Pro': 'iphone-15-pro-max',
            'iPhone 12 Pro Max': 'iphone-15-pro-max',
            'iPhone 12 Pro': 'iphone-15-pro-max',
            'Samsung Galaxy S24 Ultra': 'galaxy-s24-ultra',
            'Samsung Galaxy S24+': 'galaxy-s24-ultra',
            'Samsung Galaxy S23 Ultra': 'galaxy-s24-ultra',
            'Samsung Galaxy S23': 'galaxy-s24-ultra',
            'Samsung Galaxy Note 20': 'galaxy-s24-ultra',
            'Samsung Galaxy Z Fold 5': 'galaxy-z-fold-5',
            'Samsung Galaxy Z Flip 5': 'galaxy-z-fold-5',
            'Google Pixel 8 Pro': 'pixel-8-pro',
            'Google Pixel 8': 'pixel-8-pro',
            'Google Pixel 7 Pro': 'pixel-8-pro',
            'Google Pixel 7': 'pixel-8-pro',
            'OnePlus 12': 'oneplus-12',
            'OnePlus 11': 'oneplus-12',
            'iPad Pro 12.9" (2024)': 'ipad-pro-12',
            'iPad Pro 11" (2024)': 'ipad-pro-12',
            'iPad Air (2024)': 'ipad-pro-12'
        };

        return skinMap[deviceName] || null;
    }

    addDeviceSpecificElements(deviceFrame, skinClass) {
        switch (skinClass) {
            case 'iphone-15-pro-max':
                this.addHomeIndicator(deviceFrame);
                break;
            case 'galaxy-s24-ultra':
                this.addCameraPunch(deviceFrame);
                break;
            case 'pixel-8-pro':
                this.addCameraBar(deviceFrame);
                break;
            case 'oneplus-12':
                this.addAlertSlider(deviceFrame);
                break;
            case 'ipad-pro-12':
                this.addHomeIndicator(deviceFrame);
                break;
            case 'galaxy-z-fold-5':
                this.addFoldLine(deviceFrame);
                break;
        }
    }

    addHomeIndicator(deviceFrame) {
        const homeIndicator = document.createElement('div');
        homeIndicator.className = 'home-indicator';
        deviceFrame.appendChild(homeIndicator);
    }

    addCameraPunch(deviceFrame) {
        const cameraPunch = document.createElement('div');
        cameraPunch.className = 'camera-punch';
        deviceFrame.appendChild(cameraPunch);
    }

    addCameraBar(deviceFrame) {
        const cameraBar = document.createElement('div');
        cameraBar.className = 'camera-bar';
        deviceFrame.appendChild(cameraBar);
    }

    addAlertSlider(deviceFrame) {
        const alertSlider = document.createElement('div');
        alertSlider.className = 'alert-slider';
        deviceFrame.appendChild(alertSlider);
    }

    addFoldLine(deviceFrame) {
        const foldLine = document.createElement('div');
        foldLine.className = 'fold-line';
        deviceFrame.appendChild(foldLine);
    }

    addSkinControls() {
        // Remove existing controls
        const existingControls = document.querySelector('.skin-controls');
        if (existingControls) {
            existingControls.remove();
        }

        const controls = document.createElement('div');
        controls.className = 'skin-controls';
        controls.innerHTML = `
            <div>Device Skin: ${this.deviceName}</div>
            <button id="rotateSkin">Rotate</button>
            <button id="scaleSkin">Scale</button>
            <button id="hideSkin">Hide</button>
        `;

        document.body.appendChild(controls);

        // Add event listeners
        document.getElementById('rotateSkin').addEventListener('click', () => {
            this.toggleOrientation();
        });

        document.getElementById('scaleSkin').addEventListener('click', () => {
            this.toggleScale();
        });

        document.getElementById('hideSkin').addEventListener('click', () => {
            this.toggleVisibility();
        });
    }

    toggleOrientation() {
        if (this.currentSkin) {
            this.orientation = this.orientation === 'portrait' ? 'landscape' : 'portrait';
            this.currentSkin.classList.toggle('landscape');
        }
    }

    toggleScale() {
        if (this.currentSkin) {
            const currentScale = this.currentSkin.style.transform.includes('scale(0.8)');
            if (currentScale) {
                this.currentSkin.style.transform = this.currentSkin.style.transform.replace('scale(0.8)', 'scale(1)');
            } else {
                this.currentSkin.style.transform += ' scale(0.8)';
            }
        }
    }

    toggleVisibility() {
        if (this.currentSkin) {
            this.currentSkin.style.display = this.currentSkin.style.display === 'none' ? 'block' : 'none';
        }
    }

    updateSkinOrientation(orientation) {
        this.orientation = orientation;
        if (this.currentSkin) {
            this.currentSkin.classList.toggle('landscape', orientation === 'landscape');
        }
    }

    handleSpecialDevices(deviceName) {
        if (deviceName === 'Samsung Galaxy Z Fold 5') {
            // Add unfold functionality
            setTimeout(() => {
                if (this.currentSkin) {
                    this.currentSkin.classList.add('unfolded');
                }
            }, 2000);
        }
    }
}

class DeviceSkinApplier {
    constructor() {
        this.skinManager = null;
        this.emulationActiveAndTouchEnabled = false; // New flag
        this.setupMessageListener();
        this.setupMouseEventListeners();
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'applyDeviceSkin') {
                this.applyDeviceSkin(request.settings);
            } else if (request.action === 'resetDeviceSkin') {
                this.resetDeviceSkin();
            } else if (request.action === 'updateEmulationState') { // New message type
                this.emulationActiveAndTouchEnabled = request.active && request.touchEnabled;
            }
        });
    }

    setupMouseEventListeners() {
        document.addEventListener('mousedown', this.handleMouseEvent.bind(this), true);
        document.addEventListener('mousemove', this.handleMouseEvent.bind(this), true);
        document.addEventListener('mouseup', this.handleMouseEvent.bind(this), true);
    }

    handleMouseEvent(event) {
        if (!this.emulationActiveAndTouchEnabled) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        try {
            chrome.runtime.sendMessage({
                action: 'dispatchMouseEvent',
                eventType: event.type,
                clientX: event.clientX,
                clientY: event.clientY,
                button: event.button,
                buttons: event.buttons,
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                metaKey: event.metaKey
            });
        } catch (error) {
            if (error.message.includes('Extension context invalidated')) {
                console.warn('Extension context invalidated. Stopping mouse event dispatch.');
                this.emulationActiveAndTouchEnabled = false;
            } else {
                console.error('Error dispatching mouse event:', error);
            }
        }
    }

    applyDeviceSkin(settings) {
        if (!this.skinManager) {
            this.skinManager = new DeviceSkinManager();
        }
        this.skinManager.activateSkin(settings.deviceName, settings.orientation);
    }

    resetDeviceSkin() {
        if (this.skinManager) {
            this.skinManager.deactivateSkin();
        }
    }
}

new DeviceSkinApplier();
