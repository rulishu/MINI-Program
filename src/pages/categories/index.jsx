import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useDispatch } from 'react-redux';
import './index.scss';
import Left from './left';
import Drawer from './drawer';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'categories/selectAllLevelTwo' });
    // eslint-disable-next-line global-require
  }, []);

  return (
    <View className="all">
      <Left />
      <Drawer />
    </View>
  );
};
export default Index;
