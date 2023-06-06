import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import { Tag, Popover, Button, Tabs } from '@nutui/nutui-react-taro';
import selectMenu from '@/assets/images/selectMenu.svg';
import Classification from './classification';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { scrollTop, Threshold, firstLevelAreaClassAgent, secondLevelAreaClassAgent, list } =
    useSelector((state) => state.select);
  useEffect(() => {
    getSub();
    // eslint-disable-next-line global-require, react-hooks/exhaustive-deps
  }, [firstLevelAreaClassAgent.length, secondLevelAreaClassAgent.length]);

  // 默认
  const getSub = async () => {
    if (firstLevelAreaClassAgent.length > 0) {
      await dispatch({
        type: 'select/selectAreaClassBagent',
        payload: {
          id: parseInt(firstLevelAreaClassAgent.at(0)?.id),
        },
      });
      if (secondLevelAreaClassAgent.length > 0) {
        await dispatch({
          type: 'select/selectList',
          payload: {
            pageNum: 1,
            pageSize: 20,
            provenance: parseInt(secondLevelAreaClassAgent.at(0)?.areaId),
          },
        });
      }
    }
  };
  const vStyleA = {
    display: 'inline-block',
    width: '80px',
    margin: '8px 0 20px 0',
  };

  const [tab5value, setTab5value] = useState('0');
  const [activeTag, setActiveTag] = useState(0);
  const [lightTheme, setLightTheme] = useState(false);

  const itemList = firstLevelAreaClassAgent.map((a) => {
    return {
      name: a.companyName,
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
            {firstLevelAreaClassAgent.map((item, index) => {
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
                    {item.companyName}
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
            dispatch({
              type: 'select/selectList',
              payload: {
                pageNum: 1,
                pageSize: 20,
                provenance: parseInt(secondLevelAreaClassAgent[parseInt(paneKey)]?.areaId),
              },
            });
          }}
          className="tabs"
          background="#ffffff"
          titleScroll
          direction="vertical"
          playBtnPosition="center"
        >
          {secondLevelAreaClassAgent.map((item) => (
            <Tabs.TabPane key={item.id} title={item.companyName} className="tab-content">
              <Classification data={list} itemList={item} title={item.companyName} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </View>
    </View>
  );
};
export default Index;
