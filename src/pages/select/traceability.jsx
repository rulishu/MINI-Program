import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import { Tag, Popover, Button, Tabs } from '@nutui/nutui-react-taro';
import selectMenu from '@/assets/images/selectMenu.svg';
import Classification from './classification';
import { selectList } from '@/server/select';
import { useDispatch, useSelector } from 'react-redux';
import { useRequest } from 'ahooks';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const {
    scrollTop,
    Threshold,
    firstLevelAreaClassAgent,
    secondLevelAreaClassAgent,
    list,
    pageNum,
    pageSize,
    total,
  } = useSelector((state) => state.select);
  useEffect(() => {
    dispatch({
      type: 'select/selectAreaClassBagent',
      payload: {
        id: parseInt(firstLevelAreaClassAgent.at(0)?.id),
        callBack: (vel) => {
          run({
            pageNum: 1,
            pageSize: pageSize,
            provenance: vel,
          });
        },
      },
    });
    // eslint-disable-next-line global-require, react-hooks/exhaustive-deps
  }, [firstLevelAreaClassAgent.at(0)?.id]);
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
      name: a.shopName,
      value: a.id,
    };
  });

  const updateFn = (payload) => {
    dispatch({
      type: 'select/update',
      payload: payload,
    });
  };

  const { run, loading } = useRequest(selectList, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        updateFn({
          total: result.total,
          list: pageNum === 1 ? result.records || [] : [...list, ...(result.records || [])],
          refreshHasMore:
            pageNum === 1 ? false : [...list, ...(result.records || [])].length === total,
        });
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: pageNum,
      pageSize: pageSize,
      provenance: parseInt(secondLevelAreaClassAgent.at(tab5value)?.areaId),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, tab5value]);

  const refesh = () => {
    updateFn({ pageNum: 1 });
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: 1,
      pageSize: pageSize,
      provenance: parseInt(secondLevelAreaClassAgent.at(tab5value)?.areaId),
    });
  };
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
                    onClick={async () => {
                      await updateFn({ list: [] });
                      setActiveTag(index);
                      await dispatch({
                        type: 'select/selectAreaClassBagent',
                        payload: {
                          id: parseInt(item?.id),
                          callBack: (vel) => {
                            dispatch({
                              type: 'select/selectList',
                              payload: {
                                pageNum: 1,
                                pageSize: 20,
                                provenance: vel,
                              },
                            });
                          },
                        },
                      });
                    }}
                    color={index !== activeTag ? '#999999' : '#965A3C'}
                    // color="#F2F2F2"
                    // textColor="#333333"
                    className="tag"
                  >
                    {item.shopName}
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
            onChoose={async (item, index) => {
              setActiveTag(index);
              await dispatch({
                type: 'select/selectAreaClassBagent',
                payload: {
                  id: parseInt(item?.value),
                  callBack: (vel) => {
                    dispatch({
                      type: 'select/selectList',
                      payload: {
                        pageNum: 1,
                        pageSize: 20,
                        provenance: vel,
                      },
                    });
                  },
                },
              });
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
          onChange={async ({ paneKey }) => {
            setTab5value(paneKey);
            await dispatch({
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
            <Tabs.TabPane key={item.id} title={item.shopName} className="tab-content">
              <ScrollView
                scrollY
                style={{ height: '100vh' }}
                scrollWithAnimation
                refresherEnabled
                lowerThreshold={50}
                refresherTriggered={loading}
                onScrollToLower={() => {
                  let maxPage = Math.ceil(total / pageSize);
                  if (maxPage > pageNum) {
                    updateFn({ pageNum: pageNum + 1 });
                  }
                }}
                onRefresherRefresh={refesh}
              >
                <Classification itemList={item} title={item.shopName} />
              </ScrollView>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </View>
    </View>
  );
};
export default Index;
