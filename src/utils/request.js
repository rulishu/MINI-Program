import Taro from '@tarojs/taro';
import { logError } from './logError';
import proxy from './proxy';
// import { checkAuth } from './navigateTo';

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

// const checkAuth = () => {
//   const token = Taro.getStorageSync('userToken');
//   const saveTokenTime = Taro.getStorageSync('save-token-time') || new Date().getTime();
//   const newTime = new Date().getTime() - Number(saveTokenTime);
//   if ((token && newTime > 86400000) || !token) {
//     Taro.clearStorage();
//     Taro.reLaunch({ url: '/pages/login/index' });
//     return false;
//   }
//   return true;
// };

/**忽略判断 token */
// const ignoreAPI = [
//   // 登录
//   '/jcgl-user/wx/login/login',
// ];

export default {
  async baseOptions(params, method = 'GET') {
    const { url, data, headers } = params;
    const token = Taro.getStorageSync('userToken');
    try {
      // if (!ignoreAPI.includes(url)) {
      //   const check = checkAuth();
      //   if (!check) {
      //     return;
      //   }
      // }
      let header = {
        Accept: 'application/json',
        'content-type': 'application/json', // 默认值
        userToken: token,
        ...headers,
      };

      const option = {
        url: proxy(url),
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
      const restlt = await Taro.request(option);
      if (restlt.header.userToken) {
        Taro.setStorageSync('token', restlt.header.userToken);
        //24 小时 86400
        Taro.setStorageSync('save-token-time', `${new Date().getTime()}`);
      }
      return restlt.data;
    } catch (err) {
      Taro.hideLoading();
      Taro.showModal({
        title: '温馨提示',
        content: `${url}请求错误，${err.errMsg || err.message}`,
        showCancel: false,
        // confirmText:
      });
      throw new Error(err.errMsg || err.message);
    }
  },
  get(url, data = '', options) {
    let option = { url, data, ...options };
    return this.baseOptions(option);
  },
  post: function (url, data, options) {
    return this.baseOptions({ url, data, ...options }, 'POST');
  },
};
