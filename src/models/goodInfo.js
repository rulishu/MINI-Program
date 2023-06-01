/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { infoDetails, orderConfirm, wxpay, orderSubmit, newConfirm } from '@/server/goodInfo';

const productDetail = {
  storageFee: 0,
  insurancePremium: 0,
  coupon: 0,
  coSubtractive: 0,
  goodsPrice: 0,
  allGoodsPrice: 0,
  goodsTotalNum: 1, //商品购买个数
  specs: [], // 选中规格数据
};
export default {
  namespace: 'goodInfo', // 这是模块名
  state: {
    // 初始化数据
    visible: false,
    type: '',
    shareVisible: false,
    queryInfo: {},
    productDetails: { ...productDetail },
    confirmList: [],
    orderInfo: {},
    payInfo: {}, //支付信息
    currentAddress: {}, //选中地址信息
    submitOrder: {}, //预订单信息
    orderNotesOpen: false, //订单备注弹窗
    orderNotesInfo: '', //订单备注
    attributeVos: [], // sku规格处理
    skuSpecs: [], // sku规格值
    skuList: [],
    shoppingCartVOList: [], // 购买数据
    orderToken: '',
    activeSku: [], //选中规格
    goodsName: '', //商品名称
  },

  effects: {
    *infoDetails({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(infoDetails, params);
        if (result) {
          let skuList = result?.result?.itemSkuDtos;
          // console.log('skuList', skuList);
          let attrLists = [];
          skuList.forEach((item) => {
            if (item?.attributes) {
              let arr = item?.attributes.concat([]);
              arr[0]['imageUrl'] = item?.imageUrl;
              attrLists = attrLists.concat(arr);
            }
          });
          //
          let arr = [];
          attrLists.forEach((item, index) => {
            const idx = arr.findIndex((i) => i?.attribute_value === item?.attributeId);
            if (idx > -1) {
              if (
                arr[idx].valueList.findIndex((attrdata) => attrdata?.value === item?.value) === -1
              ) {
                arr[idx].valueList = arr[idx].valueList.concat([
                  {
                    id: index,
                    value: item?.value,
                    imageUrl: item?.imageUrl,
                  },
                ]);
              }
            } else {
              arr.push({
                attribute_value: item?.attributeId,
                attribute_name: item?.attributeName,
                // attrOptions.find((obj) => obj?.id === String(item?.attributeId))
                // ?.item?.attributeName,
                valueList: [
                  {
                    id: index,
                    value: item?.value,
                    imageUrl: item?.imageUrl,
                  },
                ],
              });
            }
          });
          const attributeVos = arr;
          yield put({
            type: 'update',
            payload: {
              queryInfo: result.result,
              attributeVos,
              skuList: skuList,
            },
          });
        }
      } catch (err) {}
    },

    //确认订单
    *orderConfirm({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(orderConfirm, params);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              confirmList: result.result.shoppingCartVOList.map((a) => a.cartVOList).flat() || [],
              orderInfo: result.result || {},
            },
          });
          Taro.setStorageSync('orderInfo', result.result);
        }
      } catch (err) {}
    },

    // 预订单
    *orderSubmit({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(orderSubmit, params);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              submitOrder: result.result || {},
            },
          });
          Taro.setStorageSync('submitInfo', result.result);
        }
      } catch (err) {}
    },

    //微信支付
    *wxpay({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(wxpay, params);
        Taro.setStorageSync('payInfo', result.result.gatewayBody);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              payInfo: result.result.gatewayBody || {},
            },
          });
          callback();
          Taro.removeStorageSync('submitInfo');
          Taro.removeStorageSync('payInfo');
        }
      } catch (err) {}
    },

    //立即购买
    *newConfirm({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(newConfirm, params);
        if (result.code === 200) {
          Taro.navigateTo({ url: '/pages/confirmOrder/index' });
          yield put({
            type: 'update',
            payload: {
              shoppingCartVOList: result.result.shoppingCartVOList || {},
              orderToken: result.result.orderToken,
            },
          });
        } else {
          // Taro.showModal({
          //   title: '温馨提示',
          //   content: `${result?.message}`,
          //   showCancel: false,
          //   // confirmText:
          // });
          Taro.navigateTo({ url: '/pages/login/index' });
        }
      } catch (err) {}
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
