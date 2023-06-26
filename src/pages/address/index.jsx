import React, { useEffect, useRef } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Button, Swipe } from '@nutui/nutui-react-taro';
import editIcon from '../../assets/images/edit.svg';
import Taro, { useUnload } from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  const { addressList } = useSelector((state) => state.address);
  const userInfo = Taro.getStorageSync('userInfo');
  useEffect(() => {
    dispatch({
      type: 'address/getAddress',
      payload: {
        id: userInfo.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useUnload(() => {
    let pages = getCurrentPages(); // 页面对象
    let prevpage = pages[pages.length - 2]; // 上一个页面对象
    let path = prevpage?.route; // 上一个页面路由地址
    const params = Taro.getCurrentInstance().router.params;
    const curAddress = params.confirmAddress ? JSON.parse(params.confirmAddress) : {};
    const skuId = params.skuId;
    const count = params.count;
    if (path === 'pages/confirmOrder/index') {
      if (addressList.length === 0) {
        dispatch({
          type: 'goodInfo/update',
          payload: {
            currentAddress: {},
          },
        });
        dispatch({
          type: 'goodInfo/newConfirm',
          payload: {
            skuLockVoList: {
              count: count,
              skuId: skuId,
            },
          },
        });
      } else {
        let returnAddress;
        returnAddress = addressList.filter((items) => items.id === curAddress.id && items);
        if (returnAddress.length === 0) {
          dispatch({
            type: 'goodInfo/update',
            payload: {
              currentAddress: addressList[0],
            },
          });
          dispatch({
            type: 'goodInfo/newConfirm',
            payload: {
              areaCode: addressList[0]?.areaCode,
              skuLockVoList: {
                count: count,
                skuId: skuId,
              },
            },
          });
        }
      }
    }
  });
  // 添加
  const add = async () => {
    Taro.navigateTo({ url: '/pages/addAddress/index' });
    let isDefault;
    if (addressList.length === 0) {
      isDefault = 1;
    } else {
      isDefault = 0;
    }
    await dispatch({
      type: 'address/update',
      payload: {
        reData: {
          isDefault,
        },
      },
    });
  };

  //编辑
  const edit = async (item) => {
    Taro.navigateTo({ url: '/pages/editAddress/index' });
    await dispatch({
      type: 'address/update',
      payload: {
        reData: item,
      },
    });
  };

  // 删除
  const del = async (item) => {
    await dispatch({
      type: 'address/deleteAddress',
      payload: {
        id: item,
      },
    });
    await dispatch({
      type: 'address/getAddress',
      payload: {
        id: userInfo.id,
      },
    });
  };

  const onClose = () => {
    closeRef.current.close();
  };

  // 选择地址
  const onSelectAddress = (item) => {
    let pages = getCurrentPages(); // 页面对象
    let prevpage = pages[pages.length - 2]; // 上一个页面对象
    let path = prevpage?.route; // 上一个页面路由地址
    const params = Taro.getCurrentInstance().router.params;
    const skuId = params.skuId;
    const count = params.count;
    if (path === 'pages/confirmOrder/index') {
      dispatch({
        type: 'goodInfo/newConfirm',
        payload: {
          areaCode: item.areaCode,
          skuLockVoList: {
            count: count,
            skuId: skuId,
          },
        },
      });
      dispatch({
        type: 'goodInfo/update',
        payload: {
          currentAddress: item,
        },
      });
      Taro.navigateBack({ delta: 1 });
    }
  };

  return (
    <View>
      <View className="address" onClick={() => onClose()}>
        {addressList?.map((item, index) => {
          return (
            <Swipe
              ref={closeRef}
              key={index}
              rightAction={
                <Button shape="square" color="#BFBFBF" onClick={() => del(item.id)}>
                  <Text style={{ color: '#FFFFFF', fontWeight: 400, fontSize: 13 }}>删除</Text>
                </Button>
              }
              onActionClick={() => {
                closeRef.current.close();
              }}
              onClose={() => closeRef.current.close()}
            >
              <View className="address-item">
                <View
                  className="address-item-left"
                  onTap={() => {
                    onSelectAddress(item);
                  }}
                >
                  <View className="address-item-left-info">
                    <View className="address-item-left-info-top">
                      <View style={{ marginRight: 8 }}>
                        <Text>{item.province + item.city + item.area}</Text>
                      </View>
                      {item.isDefault === 1 && (
                        <View className="address-item-left-info-top-mr">
                          <Text className="address-item-left-info-top-mr-text">默认</Text>
                        </View>
                      )}
                    </View>
                    <View className="address-item-left-info-bottom">
                      <Text>{item.addressDetails}</Text>
                    </View>
                    <View className="address-item-left-info-bottom">
                      <View style={{ marginRight: 8 }}>
                        <Text>{item.consignee}</Text>
                      </View>
                      <View style={{ marginRight: 8 }}>
                        <Text>{item.phone}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="address-item-right" onTap={() => edit(item)}>
                  <Image mode="widthFix" src={editIcon} style={{ width: 24, height: 24 }}></Image>
                </View>
              </View>
            </Swipe>
          );
        })}
      </View>
      <View className="add-address">
        <Button size="small" color="#B08B57" className="add-address-btn" onTap={() => add()}>
          <Text className="add-address-btn-text">添加收货地址</Text>
        </Button>
      </View>
    </View>
  );
};
export default Index;
