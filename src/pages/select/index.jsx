import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Report from './report';
import Traceability from './traceability';
import { Tabs } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const [tab9value, setTab9value] = useState('0');
  return (
    <View className="strict-selection">
      <View className="strict-selection-top">
        <View className="strict-selection-top-content">
          <View className="strict-selection-top-content-title">
            <Text>镖族严选认证</Text>
          </View>
          <View>
            <Text>镖族买手团</Text>
          </View>
          <View>
            <Text>甄选全球好物</Text>
          </View>
        </View>
      </View>
      <View className="strict-selection-body">
        <Tabs
          className="tabs"
          value={tab9value}
          onChange={({ paneKey }) => {
            setTab9value(paneKey);
          }}
          direction="horizontal"
        >
          <Tabs.TabPane title="检测报告" className="tab-content">
            <Report />
          </Tabs.TabPane>
          <Tabs.TabPane title="镖族溯源" className="tab-content">
            <Traceability />
          </Tabs.TabPane>
        </Tabs>
      </View>
      <View className="tab-footer"></View>
    </View>
  );
};
export default Index;
