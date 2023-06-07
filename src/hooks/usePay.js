import { wxpay } from '@/server/goodInfo';
import Taro from '@tarojs/taro';

export default ({ success, error }) => {
  const payOrder = async (params) => {
    Taro.showLoading({ title: '加载中...', mask: true });
    const { code, result, message } = await wxpay(params);
    if (code && code == 200) {
      let { gatewayBody } = result;
      Taro.requestPayment({
        timeStamp: gatewayBody.timeStamp,
        nonceStr: gatewayBody.nonceStr,
        package: gatewayBody.package, // 订单包
        signType: gatewayBody.signType, // 加密方式统一'
        paySign: gatewayBody.paySign, // 后台支付签名返回
        provider: gatewayBody.provider, //支付类型
        appId: gatewayBody.appId, //小程序Appid
        success: function (res) {
          Taro.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 2000,
          });
          if (res.errMsg === 'requestPayment:ok') {
            success?.();
          }
          Taro.hideLoading();
        },
        fail: async function () {
          Taro.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 2000,
          });
          Taro.hideLoading();
          error?.();
        },
      });
    } else {
      Taro.hideLoading();
      Taro.showToast({
        title: message,
        icon: 'none',
        duration: 2000,
      });
    }
  };

  return {
    payOrder,
  };
};
