import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import Heads from './heads';
import Orders from './orders';
// import Seals from './seals';
import Option from './option';

const Index = () => {
  const { activeIndex } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Taro.getStorageSync('token');
    const userInfo = Taro.getStorageSync('userInfo');
    if (token !== '' && activeIndex === 4) {
      dispatch({
        type: 'my/getUserInfos',
        payload: {
          id: userInfo.id,
        },
      });
      dispatch({
        type: 'my/getOrderNum',
      });
    }
    // eslint-disable-next-line global-require
  }, [activeIndex]);
  // const onLout = () => {
  //   Taro.clearStorageSync();
  //   Taro.navigateTo({ url: '/pages/login/index' });
  // };
  return (
    <View>
      <Heads />
      <Orders />
      {/* <Seals /> */}
      <Option />
      {/* <View className="goOut">
        <Button type="primary" onTap={onLout}>
          退出
        </Button>
      </View> */}
      <View className="tab-footer"></View>
    </View>
  );
};
export default Index;
