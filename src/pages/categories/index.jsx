import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useDispatch } from 'react-redux';
import './index.scss';
import Left from './left';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'categories/getCategoriesList' });
    // eslint-disable-next-line global-require
  }, []);

  return (
    <View className="all">
      <Left />
    </View>
  );
};
export default Index;
