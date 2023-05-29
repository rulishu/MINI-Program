import React, { useState } from 'react';
import { Button, Popup, TextArea } from '@nutui/nutui-react-taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [value2, updateValue2] = useState('');
  const { orderNotesOpen } = useSelector((state) => state.goodInfo);

  const onClose = () => {
    dispatch({
      type: 'goodInfo/update',
      payload: {
        orderNotesOpen: false,
      },
    });
  };
  const onChange = (e) => {
    if (value2.length > 200) {
      return;
    }
    updateValue2(e);
  };

  const onClick = () => {
    dispatch({
      type: 'goodInfo/update',
      payload: {
        orderNotesInfo: value2,
        orderNotesOpen: false,
      },
    });
  };

  return (
    <Popup
      visible={orderNotesOpen}
      style={{ height: '60%' }}
      position="bottom"
      onClose={() => onClose()}
    >
      <View className="popupInfo">
        <View className="popupInfo-title">
          <Text>订单备注</Text>
        </View>
        <View className="popupInfo-textArea">
          <TextArea
            maxlength="200"
            limitShow
            className="textArea-info"
            autoHeight
            defaultValue={value2}
            placeholder="请先和客服协商一致"
            onChange={(e) => onChange(e)}
          />
          <View className="textArea-page">
            <Text>{value2.length}/200</Text>
          </View>
        </View>
        <View className="popupInfo-button">
          <Button
            shape="square"
            color="#009DD9"
            style={{ width: '80%', borderRadius: 8, border: 'none' }}
            onClick={() => onClick()}
          >
            保存
          </Button>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
