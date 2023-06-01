import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Steps, Step, Skeleton } from '@nutui/nutui-react-taro';
import { data } from './item';
import './index.scss';

const Index = () => {
  return (
    <View className="report" style={{ height: '50vh', overflow: 'scroll' }}>
      <View className="steps-wrapper">
        <Steps direction="vertical" progressDot style={{ backgroundColor: '#F2F2F2' }}>
          {data?.map((val) => {
            return (
              <>
                <Step
                  activeIndex={val.id}
                  title={
                    <View className="steps-wrapper-title">
                      <View>
                        <Text>{val.time?.slice(5, 7)}</Text>
                      </View>
                      <View className="steps-wrapper-title-right">
                        <View>
                          <Text>月</Text>
                        </View>
                        <View>
                          <Text>{val.time?.slice(0, 4)}</Text>
                        </View>
                      </View>
                    </View>
                  }
                  renderContent={() => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: '100%',
                        margin: '20px 0',
                      }}
                    >
                      {val.data.map((item) => {
                        return (
                          <View
                            key={item.id}
                            onTap={() => {}}
                            style={{
                              width: '45%',
                              height: 188,
                              display: 'flex',
                              flexDirection: 'column',
                              backgroundColor: '#ffffff',
                            }}
                          >
                            <View style={{ height: 148, width: 148, position: 'relative' }}>
                              <Skeleton
                                loading={item.mainGraph ? true : false}
                                width="148px"
                                height="148px"
                                title
                                animated
                                style={{ height: 148, width: 148 }}
                              >
                                <Image
                                  mode="widthFix"
                                  src={item.mainGraph}
                                  style={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: '#D7D7D7',
                                  }}
                                ></Image>
                              </Skeleton>
                              <View
                                style={{
                                  position: 'absolute',
                                  left: 10,
                                  bottom: 10,
                                  fontSize: 8,
                                  backgroundColor: '#F2F2F2',
                                  color: '#333333',
                                  padding: '2px 4px',
                                }}
                              >
                                <Text>已检测 {item.time}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#ffffff',
                                width: 148,
                                height: 40,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}
                            >
                              <Text style={{ padding: '0 10px' }}>{item.itemName || ''}</Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                ></Step>
              </>
            );
          })}
        </Steps>
      </View>
    </View>
  );
};
export default Index;
