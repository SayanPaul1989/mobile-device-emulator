# How to Install and Test the Extension

## Step 1: Install in Chrome
1. Open Chrome browser
2. Go to `chrome://extensions/`
3. Toggle "Developer mode" ON (top right corner)
4. Click "Load unpacked"
5. Select folder: `/Users/spaul/Documents/mobile-device-emulator/`
6. Extension should appear with a phone icon

## Step 2: Test the Extension
1. **Go to any website** (e.g., google.com, apple.com)
2. **Click the extension icon** in Chrome toolbar
3. **Select a device** from dropdown (e.g., "iPhone 15 Pro Max")
4. **Toggle settings** (Touch, Dark Mode, Device Skin)
5. **Click "Activate"**
6. **Refresh the page** to see emulation

## What Should Happen:
- ✅ Page viewport changes to device dimensions
- ✅ User agent changes to mobile
- ✅ Touch events work
- ✅ Device skin appears around content (if enabled)
- ✅ Dark mode applies (if enabled)

## Troubleshooting:
- **"Failed to activate"**: Make sure you're on a real website (not chrome:// pages)
- **Nothing happens**: Try refreshing the page after activation
- **No device skin**: Make sure "Device Skin" toggle is ON before clicking Activate

## Test URLs:
- https://whatsmyuseragent.org/ (check user agent)
- https://developer.mozilla.org/en-US/docs/Web/API/Touch_events (test touch)
- Any responsive website to see viewport changes