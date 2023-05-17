import React from 'react';
import { Cell } from '@nutui/nutui-react-taro';
import './index.scss';
import Heads from './heads';
import Card from './card';
import Content from './content';
import Footer from './footer';

const Index = () => {
  return (
    <Cell style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Heads />
      <Card />
      <Content />
      <Footer />
    </Cell>
  );
};
export default Index;
