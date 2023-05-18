import React from 'react';
import { View } from '@tarojs/components';
import { Popup } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const { visible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();
  return (
    <View>
      <Popup
        visible={visible}
        style={{ height: 456 }}
        position="bottom"
        onClose={() => {
          dispatch({
            type: 'goodInfo/update',
            payload: {
              visible: false,
            },
          });
        }}
      />
    </View>
  );
};
export default Index;
