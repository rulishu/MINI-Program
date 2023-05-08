import Taro from '@tarojs/taro';

const baseUrl = '';

export default (options = {
  method: 'POST',
  data: {}
}) => {
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
      ...options.header
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const {
      statusCode,
      data
    } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.status !== 'ok') {
        Taro.showToast({
          title: res.data.error.message || res.data.error.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
