import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.concurrent.TimeUnit;

public class SeleniumExample {
    
    public static void main(String[] args) {
        // Setup Chrome with extension
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--load-extension=/Users/spaul/Documents/mobile-device-emulator");
        
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        
        try {
            // Example 1: iPhone 15 Pro Max with device skin
            System.out.println("Testing iPhone 15 Pro Max...");
            String iPhoneURL = buildEmulatorURL(
                "https://example.com",
                "iPhone15ProMax",
                "portrait",
                true,  // touch
                false, // dark mode
                true   // device skin
            );
            driver.get(iPhoneURL);
            Thread.sleep(3000);
            
            // Example 2: Samsung Galaxy S24 Ultra in landscape
            System.out.println("Testing Samsung Galaxy S24 Ultra...");
            String samsungURL = buildEmulatorURL(
                "https://example.com",
                "GalaxyS24Ultra",
                "landscape",
                true,  // touch
                true,  // dark mode
                true   // device skin
            );
            driver.get(samsungURL);
            Thread.sleep(3000);
            
            // Example 3: Custom dimensions
            System.out.println("Testing custom dimensions...");
            String customURL = buildCustomEmulatorURL(
                "https://example.com",
                800,   // width
                600,   // height
                2.0,   // dpr
                true,  // touch
                false, // dark mode
                false  // device skin
            );
            driver.get(customURL);
            Thread.sleep(3000);
            
            // Example 4: iPad Pro
            System.out.println("Testing iPad Pro...");
            String iPadURL = buildEmulatorURL(
                "https://example.com",
                "iPadPro12",
                "portrait",
                true,  // touch
                false, // dark mode
                true   // device skin
            );
            driver.get(iPadURL);
            Thread.sleep(3000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
    
    /**
     * Build URL with emulator parameters for predefined devices
     */
    public static String buildEmulatorURL(String baseURL, String device, 
                                        String orientation, boolean touch, 
                                        boolean darkMode, boolean deviceSkin) {
        StringBuilder url = new StringBuilder(baseURL);
        url.append("?emulator_device=").append(device);
        url.append("&emulator_orientation=").append(orientation);
        url.append("&emulator_touch=").append(touch);
        url.append("&emulator_dark=").append(darkMode);
        url.append("&emulator_skin=").append(deviceSkin);
        return url.toString();
    }
    
    /**
     * Build URL with custom dimensions
     */
    public static String buildCustomEmulatorURL(String baseURL, int width, int height, 
                                               double dpr, boolean touch, 
                                               boolean darkMode, boolean deviceSkin) {
        StringBuilder url = new StringBuilder(baseURL);
        url.append("?emulator_width=").append(width);
        url.append("&emulator_height=").append(height);
        url.append("&emulator_dpr=").append(dpr);
        url.append("&emulator_touch=").append(touch);
        url.append("&emulator_dark=").append(darkMode);
        url.append("&emulator_skin=").append(deviceSkin);
        return url.toString();
    }
}

/**
 * Helper class for more structured approach
 */
class MobileEmulatorConfig {
    private String baseURL;
    private String device;
    private String orientation = "portrait";
    private boolean touch = true;
    private boolean darkMode = false;
    private boolean deviceSkin = false;
    private Integer width;
    private Integer height;
    private Double dpr;
    
    public MobileEmulatorConfig(String baseURL) {
        this.baseURL = baseURL;
    }
    
    public MobileEmulatorConfig device(String device) {
        this.device = device;
        return this;
    }
    
    public MobileEmulatorConfig orientation(String orientation) {
        this.orientation = orientation;
        return this;
    }
    
    public MobileEmulatorConfig touch(boolean touch) {
        this.touch = touch;
        return this;
    }
    
    public MobileEmulatorConfig darkMode(boolean darkMode) {
        this.darkMode = darkMode;
        return this;
    }
    
    public MobileEmulatorConfig deviceSkin(boolean deviceSkin) {
        this.deviceSkin = deviceSkin;
        return this;
    }
    
    public MobileEmulatorConfig customDimensions(int width, int height, double dpr) {
        this.width = width;
        this.height = height;
        this.dpr = dpr;
        return this;
    }
    
    public String build() {
        StringBuilder url = new StringBuilder(baseURL);
        boolean hasParams = false;
        
        if (device != null) {
            url.append(hasParams ? "&" : "?").append("emulator_device=").append(device);
            hasParams = true;
        }
        
        if (width != null && height != null && dpr != null) {
            url.append(hasParams ? "&" : "?").append("emulator_width=").append(width);
            url.append("&emulator_height=").append(height);
            url.append("&emulator_dpr=").append(dpr);
            hasParams = true;
        }
        
        if (hasParams || device != null) {
            url.append("&emulator_orientation=").append(orientation);
            url.append("&emulator_touch=").append(touch);
            url.append("&emulator_dark=").append(darkMode);
            url.append("&emulator_skin=").append(deviceSkin);
        }
        
        return url.toString();
    }
}

/**
 * Usage examples with builder pattern:
 * 
 * // iPhone with skin
 * String url = new MobileEmulatorConfig("https://example.com")
 *     .device("iPhone15ProMax")
 *     .orientation("portrait")
 *     .deviceSkin(true)
 *     .build();
 * 
 * // Custom dimensions
 * String url = new MobileEmulatorConfig("https://example.com")
 *     .customDimensions(800, 600, 2.0)
 *     .darkMode(true)
 *     .build();
 * 
 * // Samsung in landscape
 * String url = new MobileEmulatorConfig("https://example.com")
 *     .device("GalaxyS24Ultra")
 *     .orientation("landscape")
 *     .deviceSkin(true)
 *     .build();
 */