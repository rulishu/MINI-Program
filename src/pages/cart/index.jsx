/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Price, InputNumber, Swipe, Button, Checkbox, Tag } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { shoppingList } = useSelector((state) => state.cart);
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState(1);
  const { activeIndex } = useSelector((state) => state.global);

  useEffect(() => {
    if (activeIndex === 3) {
      dispatch({
        type: 'cart/goodsAll',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);
  const list = [
    {
      id: 0,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米,秋然长粒香大米,秋然长粒香大米,秋然长粒香大米,  5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
      state: 0,
    },
    {
      id: 1,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米 5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
      state: 0,
    },
    {
      id: 2,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米,秋然长粒香大米,秋然长粒香大米,秋然长粒香大米 5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
      state: 0,
    },
    {
      id: 3,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米 5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
      state: 1,
    },
  ];
  const handleChange = (check) => {
    if (check === true) {
      setChecked(true);
    }
    if (check === false) {
      setChecked(false);
    }
  };
  const onClear = () => {
    Taro.showModal({
      // title: "提示",
      content: '确认要删除所选商品',
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          // dispatch({})
        } else if (res.cancel) {
          return;
        }
      },
    });
  };
  const overlimit = () => {
    Taro.showModal({
      // title: "提示",
      content: '确定要删除吗',
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          // dispatch({})
        } else if (res.cancel) {
          return;
        }
      },
    });
  };
  const morelimit = () => {
    return Taro.showToast({
      title: '超过最大库存',
      icon: 'none',
      duration: 2000,
    });
  };
  const onDelete = () => {};

  return (
    <View>
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
        {/* 清空 */}
        <View className="cartBoxHeader" onClick={() => onClear()}>
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/clear.svg')}
            style={{ width: 25, height: 25 }}
          ></Image>
          <Text style={{ marginLeft: 5, color: '#7f7f7f' }}>清空</Text>
        </View>
        {/* 购车车列表 */}
        {list.map((item) => {
          return (
            <Swipe
              key={item?.id}
              rightAction={
                <Button
                  type="primary"
                  shape="square"
                  style={{ width: 50 }}
                  onClick={() => onDelete()}
                >
                  删除
                </Button>
              }
              disabled={item?.state === 1 ? true : false}
            >
              <View style={{ backgroundColor: '#ffffff', width: '100%' }}>
                <View
                  style={{
                    zIndex: item?.state === 1 ? 1000 : 0,
                    backgroundColor: item?.state === 1 ? '#c7c7c7' : '',
                  }}
                >
                  <View className="cartBoxListBox">
                    {item?.state === 1 && (
                      <View className="cartBoxListBox-state">
                        <Text>异常状态</Text>
                      </View>
                    )}
                    <View>
                      <Checkbox
                        checked={item?.state === 1 ? false : checked}
                        onChange={() => handleChange(item)}
                        disabled={item?.state === 1 ? true : false}
                      />
                    </View>
                    <View style={{ width: 100, height: 100 }}>
                      <Image
                        mode="widthFix"
                        // eslint-disable-next-line global-require
                        src={require('@/assets/images/home8.png')}
                        style={{ width: 100, height: 100 }}
                      ></Image>
                    </View>
                    <View className="cartBoxListBox-right">
                      <View className="cartBoxListBox-right-title">
                        <Text style={{ color: '#333333', fontSize: 15 }}> {item?.title}</Text>
                      </View>
                      <View>
                        <Text style={{ color: '#adadad', fontSize: 13 }}>{item?.sku}</Text>
                      </View>
                      <View>
                        {item?.state !== 1 && (
                          <Tag color="#E9E9E9" textColor="#999999">
                            标签
                          </Tag>
                        )}
                      </View>
                      {item?.state !== 1 && (
                        <View className="cartBoxListBox-right-state">
                          <Price price={item?.price} size="normal" needSymbol thousands />
                          <InputNumber
                            className="inputNumberStyle"
                            min="1"
                            modelValue={inputValue}
                            max={10}
                            onOverlimit={inputValue <= 1 ? overlimit : morelimit}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </Swipe>
          );
        })}
      </View>
      {/* 页脚结算 */}
      <View style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <View className="cartFooterBox">
          <View>
            <Checkbox textPosition="right" label="全选" checked={false} onChange={handleChange} />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View className="cartFooterBox-total">
              <Text style={{ fontSize: 15, color: '#d9001c' }}> 合计: ¥ 111</Text>
              <Text style={{ fontSize: 12 }}> 不含运费</Text>
            </View>
            <Button
              style={{ borderRadius: 5, width: 80 }}
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'goodInfo/newConfirm',
                  payload: {
                    skuLockVoList: [
                      {
                        count: 1,
                        skuId: 1363,
                      },
                    ],
                  },
                });
              }}
            >
              结算
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
