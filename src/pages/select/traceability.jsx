import React, { useState } from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import { escortAgency, tabData } from './item';
import { Tag, Popover, Button, Tabs } from '@nutui/nutui-react-taro';
import selectMenu from '@/assets/images/selectMenu.svg';
import Classification from './classification';
import './index.scss';

const Index = () => {
  const scrollTop = 0;
  const Threshold = 20;
  const vStyleA = {
    display: 'inline-block',
    width: '80px',
    margin: '8px 0 20px 0',
  };

  const [tab5value, setTab5value] = useState('0');
  const [activeTag, setActiveTag] = useState(0);
  const [lightTheme, setLightTheme] = useState(false);

  const itemList = escortAgency.map((a) => {
    return {
      name: a.name,
    };
  });

  return (
    <View className="traceability" style={{ overflow: 'scroll' }}>
      <View className="traceability-top">
        <View className="traceability-top-left">
          <ScrollView
            className="scrollview"
            scrollX
            scrollWithAnimation
            scrollTop={scrollTop}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
          >
            {escortAgency.map((item, index) => {
              return (
                <View key={item.id} style={vStyleA} className="scrollview-item">
                  <Tag
                    plain
                    onClick={() => {
                      setActiveTag(index);
                    }}
                    color={index !== activeTag ? '#999999' : '#965A3C'}
                    // color="#F2F2F2"
                    // textColor="#333333"
                    className="tag"
                  >
                    {item.name}
                  </Tag>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View className="traceability-top-right">
          <Popover
            className="popover"
            location="bottom-end"
            visible={lightTheme}
            onClick={() => {
              lightTheme ? setLightTheme(false) : setLightTheme(true);
            }}
            list={itemList}
          >
            <Button
              color="#ffffff"
              shape="square"
              style={{
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={selectMenu} style={{ width: 20, height: 20, marginTop: 10 }} />
            </Button>
          </Popover>
        </View>
      </View>
      <View className="traceability-bottom">
        <Tabs
          value={tab5value}
          style={{ height: '52vh' }}
          onChange={({ paneKey }) => {
            setTab5value(paneKey);
          }}
          className="tabs"
          background="#ffffff"
          titleScroll
          direction="vertical"
        >
          {tabData.map((item) => (
            <Tabs.TabPane key={item.id} title={item.tab} className="tab-content">
              <Classification data={item.data} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </View>
    </View>
  );
};
export default Index;
