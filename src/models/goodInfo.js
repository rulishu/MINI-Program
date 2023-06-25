/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import {
  infoDetails,
  orderConfirm,
  wxpay,
  orderSubmit,
  newConfirm,
  miniprogramcode,
} from '@/server/goodInfo';

const productDetail = {
  storageFee: 0,
  insurancePremium: 0,
  coupon: 0,
  coSubtractive: 0,
  goodsPrice: 0,
  allGoodsPrice: 0,
  // goodsTotalNum: 1, //商品购买个数
  specs: [], // 选中规格数据
};
export default {
  namespace: 'goodInfo', // 这是模块名
  state: {
    // 初始化数据
    visible: false, // 购买弹窗
    type: '',
    shareVisible: false, //分享弹窗
    couponVisible: false, // 详情优惠卷
    couponOrderVisible: false, // 确认订单优惠券
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
    currentIndex: 0,
    autoplay: true,
    interval: 2000,
    duration: 500,
    posterCode: '',
    swiperList: [],
  },

  effects: {
    *infoDetails({ payload }, { call, put }) {
      const { callback, id } = payload;
      try {
        const result = yield call(infoDetails, { id });
        if (result) {
          let skuList = result?.result?.itemSkuDtos;
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

          // 轮播视频&&轮播图处理
          const swiperList = [];
          if (result?.result?.itemVideo) {
            swiperList.push({ type: 'video', url: result?.result?.itemVideo });
          }
          if (result?.result?.mainGraphs && result?.result?.mainGraphs?.length > 0) {
            result?.result?.mainGraphs.forEach((item) => {
              if (item?.path) {
                swiperList.push({ type: 'img', url: item?.path });
              }
            });
          }
          yield put({
            type: 'update',
            payload: {
              queryInfo: result.result,
              swiperList,
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
        const { callBack, ...params } = payload;
        const result = yield call(orderSubmit, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              submitOrder: result.result || {},
            },
          });
          Taro.setStorageSync('submitInfo', result.result);
          callBack();
        } else {
          Taro.showToast({
            title: result.message,
            icon: 'none',
            duration: 2000,
          });
          setTimeout(() => {
            Taro.navigateTo({ url: `/pages/goodInfo/index?id=${params?.id}` });
          }, 500);
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
          // 默认地址
          const defultAddress = result.result.addresses
            ?.filter((item) => {
              return item.isDefault === 1;
            })
            ?.at(0);
          const lastAddress = defultAddress === undefined ? '添加收货地址' : defultAddress;
          Taro.setStorageSync('defultAddress', lastAddress);
          yield put({
            type: 'update',
            payload: {
              shoppingCartVOList: result.result.shoppingCartVOList || {},
              orderToken: result.result.orderToken,
              currentAddress: {},
              visible: false,
            },
          });
        }
      } catch (err) {}
    },

    // 小程序码
    *miniprogramcode({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(miniprogramcode, params);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              posterCode: result.result || '',
            },
          });
          Taro.hideLoading();
        } else {
          Taro.hideLoading();
        }
      } catch (err) {
        Taro.hideLoading();
      }
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
