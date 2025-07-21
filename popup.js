class DeviceEmulatorPopup {
    constructor() {
        this.currentDevice = null;
        this.currentOrientation = 'portrait';
        this.isActive = false;
        this.customMode = false;
        this.isBackendReady = false;

        this.initializeElements();
        this.setupEventListeners();
        this.loadDevices();
        this.loadState();
        this.checkBackendStatus();
    }

    initializeElements() {
        this.deviceSelect = document.getElementById('deviceSelect');
        this.deviceInfo = document.getElementById('deviceInfo');
        this.orientationBtns = document.querySelectorAll('.orientation-btn');
        this.touchToggle = document.getElementById('touchToggle');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        
        this.customWidth = document.getElementById('customWidth');
        this.customHeight = document.getElementById('customHeight');
        this.customDpr = document.getElementById('customDpr');
        this.dimensionsDisplay = document.getElementById('dimensionsDisplay');
        this.activateBtn = document.getElementById('activateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.status = document.getElementById('status');
    }

    setupEventListeners() {
        // Device selection
        this.deviceSelect.addEventListener('change', (e) => {
            this.selectDevice(e.target.value);
        });

        // Orientation buttons
        this.orientationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setOrientation(btn.dataset.orientation);
            });
        });

        // Custom dimensions
        [this.customWidth, this.customHeight, this.customDpr].forEach(input => {
            input.addEventListener('input', () => {
                this.updateCustomDimensions();
            });
        });

        // Control buttons
        this.activateBtn.addEventListener('click', () => {
            this.toggleEmulation();
        });

        this.resetBtn.addEventListener('click', () => {
            this.resetEmulation();
        });

        // Dark mode toggle
        this.darkModeToggle.addEventListener('change', (e) => {
            this.toggleDarkMode(e.target.checked);
        });

        
    }

    loadDevices() {
        // Clear existing options
        this.deviceSelect.innerHTML = '<option value="">Choose a device...</option>';
        
        // Group devices by type
        const deviceTypes = {};
        Object.keys(DEVICE_DATABASE).forEach(deviceName => {
            const device = DEVICE_DATABASE[deviceName];
            if (!deviceTypes[device.type]) {
                deviceTypes[device.type] = [];
            }
            deviceTypes[device.type].push(deviceName);
        });

        // Add devices to select, grouped by type
        Object.keys(deviceTypes).forEach(type => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = type;
            
            deviceTypes[type].forEach(deviceName => {
                const option = document.createElement('option');
                option.value = deviceName;
                option.textContent = deviceName;
                optgroup.appendChild(option);
            });
            
            this.deviceSelect.appendChild(optgroup);
        });
    }

    selectDevice(deviceName) {
        if (!deviceName) {
            this.currentDevice = null;
            this.deviceInfo.textContent = '';
            this.customMode = false;
            this.updateDimensionsDisplay();
            return;
        }

        this.currentDevice = DEVICE_DATABASE[deviceName];
        this.customMode = false;
        
        // Update device info
        const info = `${this.currentDevice.width}×${this.currentDevice.height} • ${this.currentDevice.dpr}x DPR • ${this.currentDevice.type}`;
        this.deviceInfo.textContent = info;
        
        // Update touch toggle
        this.touchToggle.checked = this.currentDevice.touch;
        
        // Update custom inputs
        this.customWidth.value = this.currentDevice.width;
        this.customHeight.value = this.currentDevice.height;
        this.customDpr.value = this.currentDevice.dpr;
        
        this.updateDimensionsDisplay();
    }

    setOrientation(orientation) {
        this.currentOrientation = orientation;
        
        // Update button states
        this.orientationBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.orientation === orientation);
        });
        
        // Swap dimensions for landscape
        if (this.currentDevice && orientation === 'landscape') {
            const temp = this.customWidth.value;
            this.customWidth.value = this.customHeight.value;
            this.customHeight.value = temp;
        } else if (this.currentDevice && orientation === 'portrait') {
            // Ensure portrait orientation (height > width)
            const width = parseInt(this.customWidth.value);
            const height = parseInt(this.customHeight.value);
            if (width > height) {
                this.customWidth.value = height;
                this.customHeight.value = width;
            }
        }
        
        this.updateDimensionsDisplay();
    }

    updateCustomDimensions() {
        this.customMode = true;
        this.updateDimensionsDisplay();
    }

    updateDimensionsDisplay() {
        const width = this.customWidth.value || 'auto';
        const height = this.customHeight.value || 'auto';
        const dpr = this.customDpr.value || 'auto';
        
        if (this.customMode) {
            this.dimensionsDisplay.textContent = `Custom: ${width}×${height} • ${dpr}x DPR`;
        } else if (this.currentDevice) {
            const actualWidth = this.currentOrientation === 'landscape' ? 
                Math.max(this.currentDevice.width, this.currentDevice.height) : 
                Math.min(this.currentDevice.width, this.currentDevice.height);
            const actualHeight = this.currentOrientation === 'landscape' ? 
                Math.min(this.currentDevice.width, this.currentDevice.height) : 
                Math.max(this.currentDevice.width, this.currentDevice.height);
            
            this.dimensionsDisplay.textContent = `${actualWidth}×${actualHeight} • ${this.currentDevice.dpr}x DPR`;
        } else {
            this.dimensionsDisplay.textContent = 'Current: Not Active';
        }
    }

    async toggleEmulation() {
        if (this.isActive) {
            await this.resetEmulation();
        } else {
            await this.activateEmulation();
        }
    }

    async sendMessageWithRetry(message, retries = 3, delay = 100) {
        for (let i = 0; i < retries; i++) {
            try {
                return await chrome.runtime.sendMessage(message);
            } catch (error) {
                if (i < retries - 1 && error.message.includes('Receiving end does not exist')) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    throw error;
                }
            }
        }
    }

    async activateEmulation() {
        if (!this.currentDevice && !this.customMode) {
            alert('Please select a device or enter custom dimensions');
            return;
        }

        const width = parseInt(this.customWidth.value);
        const height = parseInt(this.customHeight.value);
        const dpr = parseFloat(this.customDpr.value);

        if (!width || !height || !dpr) {
            alert('Please ensure all dimensions are filled');
            return;
        }

        const emulationSettings = {
            width,
            height,
            dpr,
            touch: this.touchToggle.checked,
            userAgent: this.currentDevice ? this.currentDevice.userAgent : navigator.userAgent,
            orientation: this.currentOrientation,
            darkMode: this.darkModeToggle.checked,
            deviceSkin: false,
            deviceName: this.currentDevice ? Object.keys(DEVICE_DATABASE).find(name => 
                DEVICE_DATABASE[name] === this.currentDevice) : null
        };

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const response = await this.sendMessageWithRetry({
                action: 'activateEmulation',
                tabId: tab.id,
                settings: emulationSettings
            });

            if (response && response.success) {
                this.isActive = true;
                this.updateUI();
                this.saveState();
            } else {
                throw new Error(response.error || 'Failed to activate emulation');
            }
        } catch (error) {
            console.error('Failed to activate emulation:', error);
            alert(`Failed to activate emulation: ${error.message}`);
        }
    }

    async resetEmulation() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.runtime.sendMessage({
                action: 'resetEmulation',
                tabId: tab.id
            });

            this.isActive = false;
            this.updateUI();
            this.saveState();
        } catch (error) {
            console.error('Failed to reset emulation:', error);
        }
    }

    toggleDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
    }

    

    updateUI() {
        this.activateBtn.textContent = this.isActive ? 'Deactivate' : 'Activate';
        this.activateBtn.className = this.isActive ? 'btn btn-secondary' : 'btn btn-primary';
        
        this.status.textContent = this.isActive ? 'Emulation: Active' : 'Emulation: Inactive';
        this.status.className = this.isActive ? 'status active' : 'status inactive';

        // Enable or disable the activate button based on backend status
        this.activateBtn.disabled = !this.isBackendReady;
    }

    async checkBackendStatus() {
        try {
            const response = await this.sendMessageWithRetry({ action: 'ping' });
            if (response && response.action === 'pong') {
                this.isBackendReady = true;
                this.updateUI();
            }
        } catch (error) {
            console.error('Backend not ready:', error);
            this.status.textContent = 'Error: Backend not ready';
        }
    }

    saveState() {
        const state = {
            currentDevice: this.currentDevice,
            currentOrientation: this.currentOrientation,
            isActive: this.isActive,
            customMode: this.customMode,
            customWidth: this.customWidth.value,
            customHeight: this.customHeight.value,
            customDpr: this.customDpr.value,
            touchEnabled: this.touchToggle.checked,
            darkMode: this.darkModeToggle.checked,
            deviceSkin: false
        };

        chrome.storage.local.set({ deviceEmulatorState: state });
    }

    async loadState() {
        try {
            const result = await chrome.storage.local.get(['deviceEmulatorState']);
            const state = result.deviceEmulatorState;

            if (state) {
                this.currentDevice = state.currentDevice;
                this.currentOrientation = state.currentOrientation || 'portrait';
                this.isActive = state.isActive || false;
                this.customMode = state.customMode || false;

                // Restore UI state
                if (this.currentDevice) {
                    // Find device in select options
                    for (let option of this.deviceSelect.options) {
                        if (option.value === Object.keys(DEVICE_DATABASE).find(name => 
                            DEVICE_DATABASE[name] === this.currentDevice)) {
                            option.selected = true;
                            this.selectDevice(option.value);
                            break;
                        }
                    }
                }

                this.customWidth.value = state.customWidth || '';
                this.customHeight.value = state.customHeight || '';
                this.customDpr.value = state.customDpr || '';
                this.touchToggle.checked = state.touchEnabled !== undefined ? state.touchEnabled : true;
                this.darkModeToggle.checked = state.darkMode || false;
                this.deviceSkinToggle.checked = state.deviceSkin || false;

                this.setOrientation(this.currentOrientation);
                this.toggleDarkMode(this.darkModeToggle.checked);
                this.updateUI();
                this.updateDimensionsDisplay();
            }
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DeviceEmulatorPopup();
});