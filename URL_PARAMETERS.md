# URL Parameters for Device Emulation

## Overview
The Mobile Device Emulator Pro now supports URL parameters for automatic device emulation activation. This is perfect for Selenium automation and programmatic testing.

## Supported Parameters

### Device Selection
- `emulator_device` - Predefined device name (see Device List below)
- `emulator_orientation` - `portrait` or `landscape`
- `emulator_touch` - `true` or `false`
- `emulator_dark` - `true` or `false` (dark mode)
- `emulator_skin` - `true` or `false` (device skin)

### Custom Dimensions
- `emulator_width` - Viewport width in pixels
- `emulator_height` - Viewport height in pixels  
- `emulator_dpr` - Device pixel ratio (0.5 to 4.0)

## Device List (URL-friendly names)
- `iPhone15ProMax` - iPhone 15 Pro Max
- `iPhone15Pro` - iPhone 15 Pro
- `iPhone14ProMax` - iPhone 14 Pro Max
- `iPhone14Pro` - iPhone 14 Pro
- `GalaxyS24Ultra` - Samsung Galaxy S24 Ultra
- `GalaxyS24Plus` - Samsung Galaxy S24+
- `GalaxyS23Ultra` - Samsung Galaxy S23 Ultra
- `Pixel8Pro` - Google Pixel 8 Pro
- `Pixel8` - Google Pixel 8
- `OnePlus12` - OnePlus 12
- `iPadPro12` - iPad Pro 12.9"
- `iPadPro11` - iPad Pro 11"

## Usage Examples

### Java/Selenium
```java
// iPhone 15 Pro Max with device skin
String url = "https://example.com?emulator_device=iPhone15ProMax&emulator_skin=true";
driver.get(url);

// Samsung Galaxy in landscape with dark mode
String url = "https://example.com?emulator_device=GalaxyS24Ultra&emulator_orientation=landscape&emulator_dark=true&emulator_skin=true";
driver.get(url);

// Custom dimensions
String url = "https://example.com?emulator_width=800&emulator_height=600&emulator_dpr=2.0&emulator_touch=true";
driver.get(url);
```

### Python/Selenium
```python
# iPhone testing
driver.get("https://example.com?emulator_device=iPhone15ProMax&emulator_skin=true")

# Pixel testing
driver.get("https://example.com?emulator_device=Pixel8Pro&emulator_orientation=portrait&emulator_dark=true")
```

### JavaScript/Puppeteer
```javascript
// Navigate with emulation
await page.goto('https://example.com?emulator_device=iPhone15ProMax&emulator_skin=true');
```

### Direct Browser Testing
```
https://example.com?emulator_device=iPhone15ProMax&emulator_orientation=portrait&emulator_touch=true&emulator_dark=false&emulator_skin=true
```

## How It Works

1. **URL Detection**: Extension detects emulator parameters in URL
2. **Auto-Activation**: Automatically applies emulation settings
3. **Device Configuration**: Maps device names to specifications
4. **Visual Feedback**: Console logs show activation status

## Complete Example URLs

### iPhone 15 Pro Max (Portrait, with skin)
```
https://example.com?emulator_device=iPhone15ProMax&emulator_orientation=portrait&emulator_touch=true&emulator_dark=false&emulator_skin=true
```

### Samsung Galaxy S24 Ultra (Landscape, dark mode)
```
https://example.com?emulator_device=GalaxyS24Ultra&emulator_orientation=landscape&emulator_touch=true&emulator_dark=true&emulator_skin=true
```

### Custom Tablet Size
```
https://example.com?emulator_width=1024&emulator_height=768&emulator_dpr=2.0&emulator_touch=true&emulator_dark=false&emulator_skin=false
```

### iPad Pro (Portrait, with skin)
```
https://example.com?emulator_device=iPadPro12&emulator_orientation=portrait&emulator_touch=true&emulator_skin=true
```

## Java Helper Class

Use the provided `MobileEmulatorConfig` class for clean URL building:

```java
String url = new MobileEmulatorConfig("https://example.com")
    .device("iPhone15ProMax")
    .orientation("portrait")
    .deviceSkin(true)
    .build();

driver.get(url);
```

## Notes

- Parameters are processed automatically when page loads
- Extension must be installed and enabled
- Works with all supported browsers
- Console logs show activation status
- Emulation activates ~1 second after page load
- Override manual settings - URL parameters take precedence