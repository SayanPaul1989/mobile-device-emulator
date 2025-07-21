# Mobile Device Emulator Pro

A Chrome extension that provides advanced mobile device emulation with modern devices, enhanced features, and precise simulation capabilities.

## Features

- **Modern Device Database**: Latest devices including iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, Google Pixel 8 Pro, OnePlus 12, and more
- **Device Orientation**: Portrait and landscape mode switching
- **Touch Simulation**: Accurate touch event emulation for mobile interactions
- **Dark Mode Support**: Toggle dark mode for better testing
- **Accurate DPR**: Device pixel ratio simulation for high-density displays
- **User Agent Spoofing**: Proper user agent string simulation
- **Custom Dimensions**: Set custom viewport dimensions and DPR values
- **Responsive Design**: Clean, modern popup interface

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your toolbar

## Usage

1. Click the extension icon to open the popup
2. Select a device from the dropdown menu
3. Adjust orientation, touch, and dark mode settings as needed
4. Click "Activate" to enable emulation
5. Visit any website to see the mobile emulation in action
6. Click "Reset" to disable emulation

## Files Structure

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality and UI controls
- `devices.js` - Device database and specifications

- `background.js` - Background service worker
- `icons/` - Extension icons

## Device Database

Includes specifications for:
- iPhone models (15 Pro Max, 15 Pro, 14 Pro Max, 14 Pro, 13 Pro Max, 13 Pro, 12 Pro Max, 12 Pro)
- Samsung Galaxy models (S24 Ultra, S24+, S23 Ultra, S23, Note 20, Z Fold 5, Z Flip 5)
- Google Pixel models (8 Pro, 8, 7 Pro, 7)
- OnePlus models (12, 11)
- iPad models (Pro 12.9", Pro 11", Air)
- Custom responsive sizes

## Development

The extension is built using:
- Manifest V3 for Chrome extensions
- Vanilla JavaScript (no external dependencies)
- Modern CSS with responsive design
- Chrome Extension APIs for tab management and storage

## License

This project is open source and available under the MIT License.