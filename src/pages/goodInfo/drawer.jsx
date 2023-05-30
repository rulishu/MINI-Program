import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Popup, Button, InputNumber, Price } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';

const Index = () => {
  const { visible, queryInfo, productDetails, type, attributeVos, skuSpecs } = useSelector(
    (state) => state.goodInfo,
  );
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [active, setActive] = useState([]);

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
    dispatch({
      type: 'goodInfo/update',
      payload: {
        productDetails: {
          goodsTotalNum: Number(e),
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
          <View>
            <Image
              mode="widthFix"
              // eslint-disable-next-line global-require
              src={imageUrl ? imageUrl : queryInfo?.mainGraph}
              className="infoImage"
            ></Image>
          </View>

          <View className="infoTextBox">
            <View>
              <Price
                price={queryInfo?.price}
                size="large"
                needSymbol
                thousands
                className="infoTextOne"
              />
              <Text
                style={{ textDecoration: 'line-through', fontSize: 12, color: 'rgb(127,127,127)' }}
              >
                ¥218
              </Text>
            </View>
            <View>
              <Text className="infoTextTwo">{queryInfo?.itemName}</Text>
            </View>
          </View>
        </View>

        {attributeVos?.map((attri) => {
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
                        setImageUrl(valueItem?.imageUrl);
                        dispatch({
                          type: 'goodInfo/update',
                          payload: {
                            skuSpecs: obj,
                          },
                        });
                      }}
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
              modelValue={productDetails?.goodsTotalNum}
              min="1"
              max={queryInfo?.stock}
              onOverlimit={productDetails?.goodsTotalNum <= 1 ? overlimit : morelimit}
              onChangeFuc={(e) => {
                onChangeFuc(e);
              }}
            />
          </View>
        </View>
        <Button
          type="primary"
          style={{
            borderRadius: 0,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 6,
          }}
          onClick={() => {
            if (type === 'nowCart') {
              Taro.navigateTo({ url: '/pages/confirmOrder/index' });
              dispatch({
                type: 'goodInfo/update',
                payload: {
                  visible: false,
                },
              });
            } else {
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
