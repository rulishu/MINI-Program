import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import Left from './left';
import Drawer from './drawer';

const Index = () => {
  const dispatch = useDispatch();
  const { activeIndex } = useSelector((state) => state.global);
  useEffect(() => {
    if (activeIndex == 1) {
      dispatch({ type: 'categories/selectAllLevelTwo' });
    }
    // eslint-disable-next-line global-require
  }, [activeIndex, dispatch]);

  return (
    <View className="all">
      <Left />
      <Drawer />
    </View>
  );
};
export default Index;
