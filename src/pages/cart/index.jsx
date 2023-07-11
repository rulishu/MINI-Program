/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Price, InputNumber, Swipe, Button, Checkbox, Tag, Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState(1);
  const { activeIndex } = useSelector((state) => state.global);
  const closeRef = useRef(null);

  useEffect(() => {
    if (activeIndex === 3) {
      dispatch({
        type: 'cart/cartGoodsAll',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

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
      content: '确认要清空所有商品',
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          dispatch({
            type: 'cart/cartGoodsClear',
            payload: {
              callBack: () => {
                dispatch({
                  type: 'cart/cartGoodsAll',
                });
              },
            },
          });
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

  const onDelete = (ids) => {
    Taro.showModal({
      content: '确认要删除所选商品',
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          dispatch({
            type: 'cart/cartGoodsDelete',
            payload: {
              ids: ids,
              callBack: () => {
                dispatch({
                  type: 'cart/cartGoodsAll',
                });
              },
            },
          });
        } else if (res.cancel) {
          closeRef.current?.close();
        }
      },
    });
  };

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
        {cartList.length > 0 ? (
          cartList?.map((item) => {
            const verification =
              item?.itemDto?.stock === 0 ||
              item?.itemDto?.onShelf === 0 ||
              item?.itemDto?.isDelete === 1;
            return (
              <Swipe
                key={item?.id}
                ref={closeRef}
                rightAction={
                  <Button
                    type="primary"
                    shape="square"
                    style={{ width: 50 }}
                    onClick={() => onDelete(item?.id)}
                  >
                    删除
                  </Button>
                }
                disabled={verification ? true : false}
              >
                <View style={{ backgroundColor: '#ffffff', width: '100%', marginBottom: 8 }}>
                  <View
                    style={{
                      zIndex: verification ? 1000 : 0,
                      backgroundColor: verification ? '#DCDCDC' : '',
                    }}
                  >
                    <View className="cartBoxListBox">
                      {verification && (
                        <View className="cartBoxListBox-state">
                          <Text>
                            {item?.itemDto?.stock === 0
                              ? '商品已售空'
                              : item?.itemDto?.onShelf === 0
                              ? '商品已下架'
                              : item?.itemDto?.isDelete === 1 && '商品已删除'}
                          </Text>
                        </View>
                      )}
                      <View>
                        <Checkbox
                          checked={verification ? false : checked}
                          onChange={() => handleChange(item)}
                          disabled={verification ? true : false}
                        />
                      </View>
                      <View style={{ width: 100, height: 100 }}>
                        <Image
                          mode="widthFix"
                          // eslint-disable-next-line global-require
                          src={item?.mainGraph}
                          style={{ width: 100, height: 100 }}
                        ></Image>
                      </View>
                      <View className="cartBoxListBox-right">
                        <View className="cartBoxListBox-right-title">
                          <Text style={{ color: '#333333', fontSize: 15 }}> {item?.goodsName}</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#adadad', fontSize: 13 }}>
                            {item?.goodsSpecification}
                          </Text>
                        </View>
                        <View>
                          <Tag color="#E9E9E9" textColor="#999999">
                            {item?.itemDto?.suppliersId === 1 ? '自营' : '严选'}
                          </Tag>
                        </View>
                        <View>
                          <View className="cartBoxListBox-right-state">
                            <Price
                              price={item?.goodsUnitPrice}
                              size="normal"
                              needSymbol
                              thousands
                            />
                            {/* <View>¥{item?.goodsUnitPrice}</View> */}
                            {item?.isDelete === 1 && (
                              <InputNumber
                                className="inputNumberStyle"
                                min="1"
                                modelValue={item?.goodsAmount}
                                max={10}
                                onOverlimit={item?.goodsAmount < 1 ? overlimit : morelimit}
                              />
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Swipe>
            );
          })
        ) : (
          <Empty description="购物车空空如也～" style={{ background: '#f5f5f5' }} />
        )}
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
