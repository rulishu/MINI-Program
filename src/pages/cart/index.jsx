/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Price, InputNumber, Swipe, Button, Checkbox, Tag, Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { cartGoodsSettlement } from '@/server/cart';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const { activeIndex } = useSelector((state) => state.global);
  const [amount, setAmount] = useState(1);
  const [checkData, setCheckData] = useState([]);
  const closeRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: 'cart/cartGoodsAll',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // 购物车选择和反选处理
  const handleChange = (val, data, all) => {
    if (all) {
      if (val === true) {
        setCheckData(data);
      }
      if (val === false) {
        setCheckData([]);
      }
    } else {
      if (val === true) {
        setCheckData(checkData.concat([data]));
      }
      if (val === false) {
        setCheckData(checkData.filter((item) => item.id !== data?.id));
      }
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
  // 减少/增加提示
  const overlimit = () => {
    return Taro.showToast({
      title: '不能再少了',
      icon: 'none',
      duration: 2000,
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
  };
  const onTap = (goodsId) => {
    Taro.navigateTo({ url: `/goodsPackage/goodInfo/index?id=${goodsId}` });
  };
  // 购物车商品总价
  let totalPrice = checkData
    .reduce((acc, cur) => {
      const itemTotalPrice = cur.goodsUnitPrice * cur.goodsAmount;
      return acc + itemTotalPrice;
    }, 0)
    .toFixed(2);
  // 加减
  const onClick = (item, type, num) => {
    let checkDataIndex = checkData.findIndex((it) => it.id === item?.id);
    if (checkDataIndex > -1) {
      checkData[checkDataIndex] = { ...item, goodsAmount: num };
    }
    dispatch({
      type: 'cart/additionSubtraction',
      payload: {
        shoppingCartGoodsId: item?.id,
        amount: num,
        callBack: () => {
          dispatch({
            type: 'cart/cartGoodsAll',
          });
        },
      },
    });
  };

  let skuLockVoList = checkData.map((item) => {
    return {
      count: item?.goodsAmount,
      skuId: item?.goodsSpecification,
    };
  });
  let shoppingSettlementVos = checkData.map((itm) => {
    return {
      goodsAmount: itm?.goodsAmount,
      goodsId: Number(itm?.goodsId),
      goodsSpecification: itm?.goodsSpecification,
      goodsUnitPrice: itm?.goodsUnitPrice,
      shoppingCartGoodsId: Number(itm?.id),
    };
  });
  // 结算校验接口
  const { run, loading } = useRequest(cartGoodsSettlement, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        dispatch({
          type: 'goodInfo/newConfirm',
          payload: {
            skuLockVoList: skuLockVoList,
          },
        });
        dispatch({
          type: 'cart/update',
          payload: {
            checkCartData: checkData,
          },
        });
        dispatch({
          type: 'cart/cartGoodsAll',
        });
      }
    },
  });
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
                          checked={
                            verification
                              ? false
                              : checkData.findIndex((i) => i?.id === item?.id) > -1
                          }
                          onChange={(val) => handleChange(val, item)}
                          disabled={verification ? true : false}
                        />
                      </View>
                      <View style={{ width: 100, height: 100 }} onTap={() => onTap(item?.goodsId)}>
                        <Image
                          // eslint-disable-next-line global-require
                          src={item?.mainGraph}
                          style={{ width: 100, height: 100 }}
                        ></Image>
                      </View>
                      <View className="cartBoxListBox-right">
                        <View onTap={() => onTap(item?.goodsId)}>
                          <View className="cartBoxListBox-right-title">
                            <Text style={{ color: '#333333', fontSize: 15 }}>
                              {' '}
                              {item?.goodsName}
                            </Text>
                          </View>
                          <View>
                            <Text style={{ color: '#adadad', fontSize: 13 }}>
                              {item?.goodsSpecificationDetail}
                            </Text>
                          </View>
                          <View>
                            <Tag color="#E9E9E9" textColor="#999999">
                              {item?.itemDto?.suppliersId === 1 ? '自营' : '严选'}
                            </Tag>
                          </View>
                        </View>
                        <View>
                          <View className="cartBoxListBox-right-state">
                            <Price
                              price={item?.goodsUnitPrice}
                              size="normal"
                              needSymbol
                              thousands
                            />
                            {!verification && (
                              <InputNumber
                                className="inputNumberStyle"
                                min="1"
                                max={item?.stock}
                                modelValue={item?.goodsAmount}
                                onOverlimit={amount <= 1 ? overlimit : morelimit}
                                readonly
                                onChangeFuc={(e) => {
                                  if (e >= amount) {
                                    if (amount <= item?.stock) {
                                      onClick(item, 'add', Number(e));
                                      setAmount(Number(e));
                                    } else {
                                      setAmount(item?.stock);
                                    }
                                  }
                                  if (e < amount) {
                                    if (amount > 1) {
                                      onClick(item, 'reduce', Number(e));
                                      setAmount(Number(e));
                                    } else {
                                      setAmount(1);
                                    }
                                  }
                                }}
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
        <View style={{ height: 130 }}></View>
      </View>
      {/* 页脚结算 */}
      <View style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <View className="cartFooterBox">
          <View>
            <Checkbox
              textPosition="right"
              label="全选"
              checked={checkData.length === cartList.length ? true : false}
              onChange={(val) => handleChange(val, cartList, 'all')}
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View className="cartFooterBox-total">
              <View style={{ width: 110 }}>
                <Text style={{ fontSize: 15, color: '#d9001c' }}> 合计: ¥ {totalPrice}</Text>
              </View>
              <Text style={{ fontSize: 12 }}> 不含运费</Text>
            </View>
            <Button
              style={{ borderRadius: 5 }}
              type="primary"
              onClick={() => {
                if (checkData.length > 0) {
                  run(shoppingSettlementVos);
                } else {
                  Taro.showToast({
                    title: '请选择商品',
                    icon: 'none',
                    duration: 2000,
                  });
                }
              }}
            >
              结算({checkData.length})
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
