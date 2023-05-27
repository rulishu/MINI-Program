import React from 'react';
import './index.scss';
import { View } from '@tarojs/components';
import Drawer from './drawer';
import Payment from './payment';
import Share from './share';
import HeadsInfo from './HeadsInfo';

const Index = () => {
  return (
    <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeadsInfo />
      <Drawer />
      <Payment />
      <Share />
    </View>
  );
};
export default Index;
