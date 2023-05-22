import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Popup, Button, InputNumber, Price } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';

const Index = () => {
  const { visible, queryInfo, productDetails } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();
  // 数量超出库存
  const overlimit = () => {
    Taro.showToast({
      title: '超出限制事件触发',
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
        },
      },
    });
  };

  return (
    <Popup
      visible={visible}
      style={{ height: 456, borderRadius: 24 }}
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
              src={queryInfo?.mainGraph}
              className="infoImage"
            ></Image>
          </View>

          <View className="infoTextBox">
            <View>
              <Price
                price={queryInfo?.price}
                size="normal"
                needSymbol
                thousands
                className="infoTextOne"
              />
            </View>
            <View>
              <Text className="infoTextTwo">{queryInfo?.itemName}</Text>
            </View>
          </View>
        </View>

        <View className="infoSpecs">
          <View>
            <Text className="infoSpecsTitle">净含量</Text>
          </View>
          <View className="infoSpecsDes">
            <Button className="infoSpecsButOne">{queryInfo?.specifications}</Button>
            {/* <Button className="infoSpecsButTwo">500ml*6/箱</Button> */}
          </View>
        </View>

        <View className="infoNumber">
          <View>
            <Text className="numberText">数量</Text>
          </View>
          <View style={{ marginTop: 12, marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
            <InputNumber
              className="cartCardRightAdd"
              modelValue={productDetails.goodsTotalNum}
              min="1"
              max={queryInfo?.stock}
              onOverlimit={(e) => overlimit(e)}
              onChangeFuc={(e) => {
                onChangeFuc(e);
              }}
              // buttonSize="26"
              // inputWidth="124"
            />
            {/* <Button className="numberButtonOne">-</Button>
            <Input className="numberInput" placeholder="1"></Input>
            <Button className="numberButtonTwo">+</Button> */}
          </View>
        </View>
      </View>
      <View className="foots"></View>
    </Popup>
  );
};
export default Index;
