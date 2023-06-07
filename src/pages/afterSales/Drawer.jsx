import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { Input, Popup, Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Drawer = () => {
  const { visible } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  const { waybillNumber, setWaybillNumber } = useState(0);
  const confirm = () => {
    Taro.showLoading({ title: '确定中...', mask: true });
    dispatch({
      type: 'sales/bindReturns',
      payload: {
        num: waybillNumber,
      },
    });
  };
  return (
    <Popup
      visible={visible}
      onClose={() => {
        dispatch({
          type: 'sales/update',
          payload: {
            visible: false,
          },
        });
      }}
    >
      <View className="pop_view">
        <View className="pop_content">
          <View className="pop_title">填写运单号：</View>
          <View className="pop_input_view">
            <Input
              label="运单号"
              type="text"
              onChange={(e) => {
                setWaybillNumber(e);
              }}
            />
          </View>
          <View className="pop_button">
            <Button onClick={confirm} type="info">
              确定发货
            </Button>
          </View>
        </View>
      </View>
    </Popup>
  );
};
export default Drawer;
