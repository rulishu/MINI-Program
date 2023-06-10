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
  const [active, setActive] = useState({});
  const [activeSku, setActiveSku] = useState([]);
  const [amount, setAmount] = useState(1);

  // 选中的规格值[查找会员价和相对应的图片]
  let newArr = skuList.map((item) => {
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
    setImageUrl(skuInfo?.imageUrl);
    setMemberPrice(skuInfo?.membershipPrice);
  }, [skuInfo, imageUrl, memberPrice]);

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

  return (
    <Popup
      closeable
      closeIcon="circle-close"
      visible={visible}
      closeIconSize={20}
      position="bottom"
      onClose={() => {
        dispatch({
          type: 'goodInfo/update',
          payload: {
            visible: false,
          },
        });
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <View className="popupInfo">
          <View className="infoImage">
            <Image
              mode="widthFix"
              // eslint-disable-next-line global-require
              src={imageUrl ? imageUrl : queryInfo?.mainGraph}
              className="infoImage"
            ></Image>
          </View>

          <View className="infoTextBox">
            <View>
              {/* <Price
                price={min(queryInfo?.itemSkuDtos)}
                size="large"
                needSymbol={false}
                thousands
                className="infoTextOne"
              /> */}
              <Text style={{ color: '#d9001c', fontSize: 24 }}>
                {queryInfo?.itemSkuDtos && min(queryInfo?.itemSkuDtos)}
              </Text>
              <Text
                style={{ textDecoration: 'line-through', fontSize: 12, color: 'rgb(127,127,127)' }}
              >
                {queryInfo?.itemSkuDtos &&
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

                        let objSku = activeSku;
                        objSku[attri?.attribute_value] = {
                          id: valueItem?.id,
                          value: valueItem?.value,
                          label: attri?.attribute_name,
                        };
                        setActiveSku(objSku.filter((d) => d));
                        dispatch({
                          type: 'goodInfo/update',
                          payload: {
                            activeSku: activeSku.filter((d) => d),
                            goodsName: queryInfo?.itemName,
                          },
                        });
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
          <View style={{ marginRight: 7 }}>
            <InputNumber
              modelValue={amount}
              min="1"
              max={queryInfo?.stock}
              onOverlimit={amount <= 1 ? overlimit : morelimit}
              onChangeFuc={(e) => {
                onChangeFuc(e);
              }}
            />
          </View>
        </View>
        <Button
          type="primary"
          style={{
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 6,
          }}
          onClick={() => {
            if (type === 'nowCart') {
              setAmount(1);
              if (Object.keys(active).length !== Object.keys(attributeVos).length) {
                Taro.showToast({
                  title: '请选择规格',
                  icon: 'none',
                  duration: 2000,
                });
              } else {
                dispatch({
                  type: 'goodInfo/newConfirm',
                  payload: {
                    count: amount,
                    skuId: skuInfo?.skuId,
                  },
                });
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: false,
                  },
                });
              }
            }
            if (type === 'addCart') {
              if (Object.keys(active).length !== Object.keys(attributeVos).length) {
                Taro.showToast({
                  title: '请选择规格',
                  icon: 'none',
                  duration: 2000,
                });
              } else {
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: false,
                  },
                });
                Taro.navigateTo({ url: '/pages/goodInfo/index' });
              }
            }
          }}
        >
          {type === 'nowCart' ? '立即购买' : '加入购物车'}
        </Button>
      </View>
    </Popup>
  );
};
export default Index;
