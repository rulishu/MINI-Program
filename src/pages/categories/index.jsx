import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useDispatch } from 'react-redux';
import './index.scss';
import Left from './left';
// import HeaderNav from './headerNav'

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'categories/getCategoriesTree' });
    // eslint-disable-next-line global-require
  }, []);

  return (
    <View className="all">
      {/* <HeaderNav /> */}
      <Left />
    </View>
  );
};
export default Index;
