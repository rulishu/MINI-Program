import Taro from '@tarojs/taro';

export default {
  // 微信版本号
  version: Taro.getSystemInfoSync().version,
  // 为true的话 接口是测试环境
  testProduction: true,
  // 为true的话 接口是生产环境
  production: false,
  hosts: [
    {
      label: '/api/basicData',
      type: 'production',
      // 测试地址
      urlTextService: 'http://192.168.1.101:8001',
      // 生产地址
      urlProdService: 'http://192.168.1.101:8002',
    },
    {
      label: '/api/login',
      type: 'production',
      // 测试地址
      urlTextService: 'http://192.168.1.101:8001',
      // 生产地址
      urlProdService: 'http://192.168.1.101:8002',
    },
  ],
};
