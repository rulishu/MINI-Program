const config = {
  development: {
    // '/': 'https://rh-api.nihaosi.com',
    '/': 'http://192.168.188.84:8888',
    // '/': 'https://wx.expiims.com',
    // '/cs-basic-file-api/file': 'http://192.168.188.51:8881',
    // '/': 'https://wx.phleky.com',
    // '/henry-wx-applet': 'http://192.168.188.51:11066',
    // "/api": "http://192.168.188.51:11004"
    // http://wx.phleky.com/
  },
  production: {
    // '/': 'https://rh-api.nihaosi.com',
    // '/': 'https://wx.phleky.com',
    // '/': 'https://wx.expiims.com',
  },
};

/**转发地址*/
const proxy = (url) => {
  try {
    const ENV = process.env.NODE_ENV || '';
    const newURL = url.replace(/^\//, '');

    const apiConfig = config[ENV] || {};
    let host = '';
    const apiKeys = Object.keys(apiConfig);
    let lg = apiKeys.length;
    let i = 0;
    while (i < lg) {
      const newApi = apiKeys[i];
      const Rex = new RegExp(`^${newApi.replace(/^\//, '')}`);
      if (Rex.test(newURL)) {
        host = apiConfig[newApi];
        break;
      }
      i++;
    }
    return host.replace(/\/$/, '') + '/' + newURL;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default proxy;
