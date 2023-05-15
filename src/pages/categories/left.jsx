import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';
import { menu } from './dataSource';

const Index = () => {
  const [value, setValue] = useState(0);
  return (
    <View className="left">
      <View>
        {menu.map((item, index) => (
          <View
            key={index}
            className={value === index ? 'left-content left-content-selected' : 'left-content'}
            onTap={() => setValue(index)}
          >
            {value === index ? (
              <View className="left-selected"></View>
            ) : (
              <View className="left-noselected"></View>
            )}
            <View>
              <Text className="left-title">{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
