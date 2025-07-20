const DEVICE_DATABASE = {
  // iPhone Models
  'iPhone 15 Pro Max': {
    width: 430,
    height: 932,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 15 Pro': {
    width: 393,
    height: 852,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 14 Pro Max': {
    width: 430,
    height: 932,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 14 Pro': {
    width: 393,
    height: 852,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 13 Pro Max': {
    width: 428,
    height: 926,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 13 Pro': {
    width: 390,
    height: 844,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 12 Pro Max': {
    width: 428,
    height: 926,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  'iPhone 12 Pro': {
    width: 390,
    height: 844,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPhone'
  },
  
  // Samsung Galaxy Models
  'Samsung Galaxy S24 Ultra': {
    width: 384,
    height: 854,
    dpr: 3.5,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Samsung Galaxy S24+': {
    width: 384,
    height: 854,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S926B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Samsung Galaxy S23 Ultra': {
    width: 384,
    height: 854,
    dpr: 3.5,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Samsung Galaxy S23': {
    width: 360,
    height: 780,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Samsung Galaxy Note 20': {
    width: 412,
    height: 915,
    dpr: 2.625,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-N981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  
  // Google Pixel Models
  'Google Pixel 8 Pro': {
    width: 384,
    height: 854,
    dpr: 2.625,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Google Pixel 8': {
    width: 412,
    height: 915,
    dpr: 2.625,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Google Pixel 7 Pro': {
    width: 412,
    height: 892,
    dpr: 3.5,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'Google Pixel 7': {
    width: 412,
    height: 915,
    dpr: 2.625,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  
  // OnePlus Models
  'OnePlus 12': {
    width: 384,
    height: 854,
    dpr: 3.5,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; CPH2573) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  'OnePlus 11': {
    width: 384,
    height: 854,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; CPH2449) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android'
  },
  
  // Tablet Models
  'iPad Pro 12.9" (2024)': {
    width: 1024,
    height: 1366,
    dpr: 2,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPad'
  },
  'iPad Pro 11" (2024)': {
    width: 834,
    height: 1194,
    dpr: 2,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPad'
  },
  'iPad Air (2024)': {
    width: 820,
    height: 1180,
    dpr: 2,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'iPad'
  },
  'Samsung Galaxy Tab S9 Ultra': {
    width: 960,
    height: 1344,
    dpr: 2.5,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-X916B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    touch: true,
    type: 'Android Tablet'
  },
  
  // Foldable Devices
  'Samsung Galaxy Z Fold 5': {
    width: 344,
    height: 748,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-F946B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android Foldable',
    foldable: true,
    unfoldedWidth: 673,
    unfoldedHeight: 841
  },
  'Samsung Galaxy Z Flip 5': {
    width: 374,
    height: 854,
    dpr: 2.5,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-F731B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    touch: true,
    type: 'Android Foldable',
    foldable: true
  },
  
  // Custom Responsive Sizes
  'Small Mobile': {
    width: 320,
    height: 568,
    dpr: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'Custom'
  },
  'Large Mobile': {
    width: 414,
    height: 896,
    dpr: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    touch: true,
    type: 'Custom'
  },
  'Desktop': {
    width: 1920,
    height: 1080,
    dpr: 1,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    touch: false,
    type: 'Desktop'
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEVICE_DATABASE;
}