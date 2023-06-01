import React from 'react';
import './index.scss';
import { View } from '@tarojs/components';
import Share from './share';
import HeadsInfo from './HeadsInfo';
import Poster from './poster';

const Index = () => {
  return (
    <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeadsInfo />
      <Share />
      <Poster />
    </View>
  );
};
export default Index;
