import React from 'react';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import './index.scss';

const Tabs = ({ value, tabList = [], onChange, type, background, className, style }) => {
  const handleTabClick = (item) => {
    onChange?.(item.id);
  };

  const getBorderClassName = (index) => {
    const active = index === value;
    const borderTopRight = index === value + 1;
    const borderBtmRight = index === value - 1;

    return classNames('normal', {
      active,
      borderTopRight,
      borderBtmRight,
    });
  };

  const children = () => {
    const child = tabList.find((item) => item.id === value);
    if (child) {
      return child.children;
    }
    return null;
  };
  return (
    <View
      className={classNames(type === 'vertical' ? 'vertical' : 'horizontal', className)}
      style={{ ...style }}
    >
      <View className="tabs" style={{ background }}>
        {tabList.map((item) => (
          <View className="tabsPack" key={item.id}>
            <View className={getBorderClassName(item.id)} onClick={() => handleTabClick(item)}>
              <Text>{item.title}</Text>
              <View
                className={classNames('tabsLine', { tabsLineActive: item.id === value })}
              ></View>
            </View>
          </View>
        ))}
      </View>
      <View className="tabMes">{children()}</View>
    </View>
  );
};

export default Tabs;
