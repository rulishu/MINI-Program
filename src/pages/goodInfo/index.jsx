import React from 'react';
import './index.scss';
import Heads from './heads';
import Card from './card';
import Content from './content';
import { View } from '@tarojs/components';

const Index = () => {
  return (
    <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Heads />
      <Card />
      <Content />
    </View>
  );
};
export default Index;
