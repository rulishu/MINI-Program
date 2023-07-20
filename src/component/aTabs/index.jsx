import React from 'react';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import { Sticky } from '@taroify/core';
import './index.scss';

const Tabs = ({
  value,
  tabList = [],
  onChange,
  type,
  background,
  className,
  titleScroll = false,
  style,
}) => {
  const handleTabClick = (item) => {
    onChange?.(item.id);
  };

  const getBorderClassName = (index) => {
    const active = index === value;
    return classNames('normal', {
      active,
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
    <Sticky offsetTop={100}>
      <View
        className={classNames(type === 'vertical' ? 'vertical' : 'horizontal', className)}
        style={{ ...style }}
      >
        <View className={classNames('tabs', { scrollable: titleScroll })} style={{ background }}>
          {tabList.map((item) => (
            <View
              key={item.id}
              className={getBorderClassName(item.id)}
              onClick={() => handleTabClick(item)}
            >
              {type === 'vertical' && (
                <View className={classNames({ tabsLine: item.id === value })}></View>
              )}
              <Text>{item.title}</Text>
              {type === 'horizontal' && (
                <View
                  className={classNames('tabsLine', { tabsLineActive: item.id === value })}
                ></View>
              )}
            </View>
          ))}
        </View>
        <View className="tabMes">{children()}</View>
      </View>
    </Sticky>
  );
};

export default Tabs;
