import Taro from '@tarojs/taro';
import { logError } from './logError';
import config from '../utils/config';

const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const token = Taro.getStorageSync('token');

// 获取api地址
const _getHostType = () => {
  if (config.production || config.testProduction) {
    return config.hosts.filter((itm) => itm.type === 'production');
  } else {
    return config.hosts[0];
  }
};

export default {
  baseOptions(params, method = 'GET', headers) {
    let { url, data } = params;
    if (!token) {
      Taro.clearStorage();
      Taro.navigateTo({ url: '/pages/OnLand/index' });
    }
    let header = {
      Accept: 'application/json',
      'content-type': 'application/json', // 默认值
      userToken: token,
      ...headers,
    };
    let hosts;
    let base;
    hosts = _getHostType();
    if (Array.isArray(hosts) && hosts.length > 1) {
      hosts.forEach((singleHost) => {
        if (url.indexOf(singleHost.label) > -1) {
          // 测试
          if (config.testProduction) {
            base = singleHost.urlTextService;
          }
          // 生产
          if (config.production) {
            base = singleHost.urlProdService;
          }
        }
      });
    } else {
      base = hosts.url;
    }
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base + url,
      data: data,
      method: method,
      header: { ...header },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在');
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题');
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问');
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data;
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e);
      },
    };
    return Taro.request(option);
  },
  get(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, 'POST');
  },
};
