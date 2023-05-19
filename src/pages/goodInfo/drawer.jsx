import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Popup, Button, InputNumber } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const { visible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();

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
              src={require('@/assets/images/wine.png')}
              className="infoImage"
            ></Image>
          </View>

          <View className="infoTextBox">
            <View>
              <Text className="infoTextOne">￥1890.00</Text>
            </View>
            <View>
              <Text className="infoTextTwo">奋斗之露·喜庆 53度酱香型白酒</Text>
            </View>
          </View>
        </View>

        <View className="infoSpecs">
          <View>
            <Text className="infoSpecsTitle">净含量</Text>
          </View>
          <View className="infoSpecsDes">
            <Button className="infoSpecsButOne">500ml*6/箱</Button>
            <Button className="infoSpecsButTwo">500ml*6/箱</Button>
          </View>
        </View>

        <View className="infoNumber">
          <View>
            <Text className="numberText">数量</Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <InputNumber
              className="cartCardRightAdd"
              modelValue={1}
              buttonSize="26"
              inputWidth="124"
            />
          </View>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
