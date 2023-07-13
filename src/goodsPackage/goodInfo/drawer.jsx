import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Popup, Button, InputNumber } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import { min, aPrice } from '@/utils/min';
import Taro from '@tarojs/taro';

const Index = () => {
  const { visible, queryInfo, type, attributeVos, skuSpecs, skuList } = useSelector(
    (state) => state.goodInfo,
  );
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [memberPrice, setMemberPrice] = useState();
  const [referencePrice, setReferencePrice] = useState();
  const [active, setActive] = useState({});
  const [amount, setAmount] = useState(1);
  const [stock, setStock] = useState();

  // 选中的规格值[查找会员价和相对应的图片]
  let newArr = skuList?.map((item) => {
    let obj = { ...item };
    let arr = [];
    item.attributes.forEach((i) => {
      if (active?.[i?.attributeName]?.value === i?.value) {
        arr.push(true);
      } else {
        arr.push(false);
      }
    });
    const isThisSku =
      arr.length === Object.keys(active).length ? !arr.some((i) => i === false) : false;
    return { ...obj, isThisSku };
  });
  let skuInfo = newArr.find((arrItem) => arrItem?.isThisSku === true);

  useEffect(() => {
    if (queryInfo.isActivityItem) {
      setMemberPrice(skuInfo?.activityPrice);
      setReferencePrice(skuInfo?.price);
      setStock(Number(skuInfo?.availableStock));
    } else {
      setMemberPrice(skuInfo?.membershipPrice);
      setReferencePrice(skuInfo?.referencePrice);
      setStock(skuInfo?.stock);
    }
    setImageUrl(skuInfo?.imageUrl);
  }, [skuInfo, imageUrl, memberPrice, referencePrice, stock, queryInfo]);

  const updateFn = (params) => {
    dispatch({
      type: 'goodInfo/update',
      payload: params,
    });
  };
  // 数量提示
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
  const maxLimit = () => {
    return Taro.showToast({
      title: '已达最大限购数',
      icon: 'none',
      duration: 2000,
    });
  };

  // 商品金额明细
  const onChangeFuc = (e) => {
    setAmount(Number(e));
    dispatch({
      type: 'goodInfo/update',
      payload: {
        productDetails: {
          // goodsTotalNum: Number(e),
          storageFee: 0,
          insurancePremium: 0,
          coupon: 0,
          coSubtractive: 0,
          goodPrice: queryInfo.price,
          goodsPrice: Number(e) * queryInfo.price,
          allGoodsPrice: Number(e) * queryInfo.price,
          goodsName: queryInfo?.itemName,
          goodsImage: queryInfo?.mainGraph,
          categoryName: queryInfo?.categoryName,
          details: queryInfo?.details,
          skuSpecs: skuSpecs,
        },
      },
    });
  };

  const onClickCart = (state) => {
    const token = Taro.getStorageSync('token');
    if (token === '') {
      Taro.navigateTo({ url: '/pages/login/index' });
    } else if (queryInfo?.onShelf === 0) {
      Taro.showToast({
        title: '商品已下架',
        icon: 'none',
        duration: 2000,
      });
    } else if (queryInfo?.stock === 0) {
      Taro.showToast({
        title: '商品已售空',
        icon: 'none',
        duration: 2000,
      });
    } else if (queryInfo?.isDelete === 1) {
      Taro.showToast({
        title: '商品已删除',
        icon: 'none',
        duration: 2000,
      });
    } else if (amount > stock) {
      Taro.showToast({
        title: `库存数量为${stock}`,
        icon: 'none',
        duration: 2000,
      });
    } else if (Object.keys(active).length !== Object.keys(attributeVos).length) {
      Taro.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 2000,
      });
    } else {
      // let goodsSpecification = '';
      // for (var key in active) {
      //   if (active.hasOwnProperty(key)) {
      //     goodsSpecification += active[key].value + ' ';
      //   }
      // }
      if (state === 'addCart') {
        dispatch({
          type: 'cart/cartGoodsCreate',
          payload: {
            mainGraph: imageUrl ? imageUrl : queryInfo?.mainGraph,
            goodsName: queryInfo?.itemName,
            goodsId: queryInfo?.id,
            goodsDetails: queryInfo?.details,
            goodsAmount: amount,
            goodsSpecification: skuInfo?.skuId,
            goodsUnitPrice: memberPrice ? memberPrice : queryInfo.price,
            callBack: () => {
              dispatch({ type: 'cart/cartGoodsCount' });
            },
          },
        });
        updateFn({ visible: false });
        return Taro.navigateTo({ url: `/goodsPackage/goodInfo/index?id=${queryInfo?.id}` });
      }
      if (state === 'nowCart') {
        setAmount(1);
        dispatch({
          type: 'goodInfo/newConfirm',
          payload: {
            activityId: queryInfo?.activityDto?.id,
            skuLockVoList: [
              {
                count: amount,
                skuId: skuInfo?.skuId,
                activityId: queryInfo?.activityDto?.id,
              },
            ],
          },
        });
      }
    }
  };

  const limite = () => {
    if (amount <= 1) {
      return overlimit;
    } else if (amount === queryInfo.userBuyCount) {
      return maxLimit;
    } else {
      return morelimit;
    }
  };

  const stockCalc = () => {
    if (stock === 0 || queryInfo.userBuyCount === 0) {
      return (
        <View style={{ marginRight: 7, display: 'flex', flexDirection: 'row' }}>
          {queryInfo.userBuyCount === 0 && (
            <View style={{ marginRight: 15, color: '#ec7f8c' }}>
              限购{queryInfo.userBuyCount}件
            </View>
          )}
          <InputNumber modelValue={0} min="0" disabled />
        </View>
      );
    } else {
      if (
        Object.keys(active).length > 0 &&
        Object.keys(active).length === Object.keys(attributeVos).length
      ) {
        if (queryInfo.userBuyCount !== 0) {
          return (
            <View style={{ marginRight: 7, display: 'flex', flexDirection: 'row' }}>
              {queryInfo.userBuyCount && (
                <View style={{ marginRight: 15, color: '#ec7f8c' }}>
                  限购{queryInfo.userBuyCount}件
                </View>
              )}
              <InputNumber
                modelValue={amount}
                min="1"
                max={queryInfo.userBuyCount ? queryInfo.userBuyCount : stock}
                onOverlimit={limite()} //amount <= 1 ? overlimit : morelimit
                onChangeFuc={(e) => {
                  onChangeFuc(e);
                }}
              />
            </View>
          );
        }
      } else {
        return (
          <View style={{ marginRight: 7, display: 'flex', flexDirection: 'row' }}>
            {queryInfo.userBuyCount && (
              <View View style={{ marginRight: 15, color: '#ec7f8c' }}>
                限购{queryInfo.userBuyCount}件
              </View>
            )}
            <InputNumber modelValue={amount} min="1" disabled />
          </View>
        );
      }
    }
  };
  return (
    <Popup
      closeable
      closeIcon="circle-close"
      visible={visible}
      closeIconSize={20}
      position="bottom"
      onClose={() => {
        updateFn({ visible: false });
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <View className="popupInfo">
          <View className="infoImage">
            <Image
              mode="widthFix"
              src={imageUrl ? imageUrl : queryInfo?.mainGraph}
              className="infoImage"
            ></Image>
          </View>

          <View className="infoTextBox">
            <View>
              <Text style={{ color: '#d9001c', fontSize: 24 }}>
                {memberPrice
                  ? `¥${memberPrice}`
                  : queryInfo?.isActivityItem
                  ? queryInfo?.activityItemSkuDtoList && min(queryInfo?.activityItemSkuDtoList)
                  : queryInfo?.itemSkuDtos && min(queryInfo?.itemSkuDtos)}
              </Text>
              <Text
                style={{ textDecoration: 'line-through', fontSize: 12, color: 'rgb(127,127,127)' }}
              >
                {referencePrice
                  ? `¥${referencePrice}`
                  : queryInfo?.isActivityItem
                  ? queryInfo?.activityItemSkuDtoList &&
                    aPrice(
                      min(queryInfo?.activityItemSkuDtoList),
                      queryInfo?.activityItemSkuDtoList,
                    )
                  : queryInfo?.itemSkuDtos &&
                    aPrice(min(queryInfo?.itemSkuDtos), queryInfo?.itemSkuDtos)}
              </Text>
            </View>
            <View>
              <Text className="infoTextTwo">{queryInfo?.itemName}</Text>
            </View>
          </View>
        </View>

        {attributeVos?.map((attri, attrindex) => {
          return (
            <View View className="infoSpecsOne" key={attri?.attribute_value}>
              <View>
                <Text className="infoSpecsTitle">{attri?.attribute_name}</Text>
              </View>
              <View className="infoSpecsDes">
                {attri?.valueList?.map((valueItem) => {
                  return valueItem?.value ? (
                    <Button
                      className={
                        active[attri?.attribute_name]?.id === valueItem?.id
                          ? 'activeStyle'
                          : 'infoSpecsButOne '
                      }
                      key={valueItem?.id}
                      onClick={() => {
                        let obj = active;
                        obj[attri?.attribute_name] = { id: valueItem?.id, value: valueItem?.value };
                        setActive(obj);

                        dispatch({
                          type: 'goodInfo/update',
                          payload: {
                            activeSku: active,
                            goodsName: queryInfo?.itemName,
                          },
                        });
                        setAmount(1);
                      }}
                      disabled={
                        attrindex === 0 ? false : Object.keys(active).length > 0 ? false : true
                      }
                    >
                      {valueItem?.value}
                    </Button>
                  ) : (
                    ''
                  );
                })}
              </View>
            </View>
          );
        })}

        <View className="infoNumber">
          <View>
            <Text>购买数量</Text>
          </View>
          {stockCalc()}
          {/* {stock === 0 ? (
            <View style={{ marginRight: 7 }}>
              <InputNumber modelValue={0} min="0" disabled />
            </View>
          ) : Object.keys(active).length > 0 &&
            Object.keys(active).length === Object.keys(attributeVos).length ? (
            <View style={{ marginRight: 7 }}>
              <InputNumber
                modelValue={amount}
                min="1"
                max={stock}
                onOverlimit={amount <= 1 ? overlimit : morelimit}
                onChangeFuc={(e) => {
                  onChangeFuc(e);
                }}
              />
            </View>
          ) : (
            <View style={{ marginRight: 7 }}>
              <InputNumber modelValue={amount} min="1" disabled />
            </View>
          )} */}
        </View>
        {type === 'nowCart' || type === 'addCart' ? (
          <Button
            type="primary"
            style={{
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 6,
            }}
            onClick={() => {
              onClickCart(type === 'nowCart' ? 'nowCart' : type === 'addCart' && 'addCart');
            }}
            disabled={queryInfo.userBuyCount === 0 ? true : false}
          >
            {type === 'nowCart' ? '立即购买' : type === 'addCart' && '加入购物车'}
          </Button>
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              with: '100%',
            }}
          >
            {!queryInfo?.isActivityItem && (
              <Button
                style={{ borderRadius: '6px', width: '40%' }}
                onClick={() => onClickCart('addCart')}
              >
                加入购物车
              </Button>
            )}
            <Button
              type="primary"
              style={{ borderRadius: '6px', width: queryInfo?.isActivityItem ? '100%' : '40%' }}
              onClick={() => onClickCart('nowCart')}
              disabled={queryInfo.userBuyCount === 0 ? true : false}
            >
              立即购买
            </Button>
          </View>
        )}
      </View>
    </Popup>
  );
};
export default Index;
