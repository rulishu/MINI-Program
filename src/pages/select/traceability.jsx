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
    // height: '40px',
    width: '80px',
    margin: '6px 0 20px 0',
  };

  // const [customized, setCustomized] = useState(false);
  const [tab5value, setTab5value] = useState('0');
  const [activeTag, setActiveTag] = useState(0);
  return (
    <View className="traceability" style={{ height: '50vh', overflow: 'scroll' }}>
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
            // visible={customized}
            location="left-start"
            onClick={() => {
              // customized ? setCustomized(false) : setCustomized(true);
            }}
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
            {/* {customized ? (
              <div className="self-content">
                {escortAgency.map((item) => {
                  return (
                    <View key={item.id} className="self-content-item">
                      <Tag color="#F2F2F2" textColor="#333333">
                        {item.name}
                      </Tag>
                    </View>
                  );
                })}
              </div>
            ) : (
              ''
            )} */}
          </Popover>
        </View>
      </View>
      <View className="traceability-bottom">
        <Tabs
          value={tab5value}
          style={{ height: '46vh' }}
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
