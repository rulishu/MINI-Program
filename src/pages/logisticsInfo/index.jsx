import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import top1 from '@/assets/images/top1.svg';
import { Ellipsis, Icon, Steps, Step } from '@nutui/nutui-react-taro';
import { logisticsList } from './item';
import './index.scss';

const Index = () => {
  return (
    <View className="index">
      <View className="logisticsInfo">
        <View className="logisticsInfo-head">
          <View className="logisticsInfo-head-left">
            <View className="logisticsInfo-img">
              <Image
                mode="widthFix"
                className="logisticsInfo-img"
                // eslint-disable-next-line global-require
                src={require('@/assets/images/home8.png')}
              ></Image>
            </View>
            <View className="logisticsInfo-head-middle">
              <View className="logisticsInfo-head-middle-top">
                <Text>奋斗之露·喜庆</Text>
              </View>
              <View className="logisticsInfo-head-middle-bottom">
                <Text>5年佳酿 53度酱香型白酒</Text>
              </View>
            </View>
          </View>

          <View className="logisticsInfo-head-right">
            <View className="logisticsInfo-head-right-text">
              <Text>已签收</Text>
            </View>
            <View className="logisticsInfo-icon-top">
              <Image
                mode="widthFix"
                className="logisticsInfo-icon-top"
                // eslint-disable-next-line global-require
                src={top1}
              />
            </View>
          </View>
        </View>
        <View className="logisticsInfo-cont">
          <View className="logisticsInfo-content">
            <View className="logisticsInfo-content-head">
              <View className="logisticsInfo-content-head-address">
                <Icon
                  name="locationg3"
                  size="14"
                  color="#231F20"
                  style={{ marginTop: 2, marginRight: 16 }}
                />
                <Ellipsis
                  content="[收货地址] 浙江省杭州市滨江区 长河街道 春波路春波小区13幢1单元701室"
                  direction="end"
                  rows="2"
                ></Ellipsis>
              </View>
            </View>
            <View className="logisticsInfo-content-middle">
              <View className="steps-wrapper">
                <Steps direction="vertical" progressDot current={5}>
                  {logisticsList.map((item) => (
                    <Step
                      key={item.id}
                      icon={item.icon}
                      iconColor={item.icon === 'check-checked' ? '#222B45' : '#A85230'}
                      size="14"
                      activeIndex={item.id}
                      title={
                        <View className="title">
                          <p className="state">{item.state}</p>
                          <p className="time">{item.time}</p>
                        </View>
                      }
                      content={<View className="content">{item.content}</View>}
                    ></Step>
                  ))}
                </Steps>
              </View>
            </View>
          </View>
          <View className="divider"></View>
          <View className="logisticsInfo-bottom">
            <View className="logisticsInfo-bottom-img">
              <Text className="text">收</Text>
            </View>
            <View className="logisticsInfo-bottom-address">
              <Text>
                涂珍珍，196****9381，浙江省杭州市滨江区 长河街道 春波路春波小区13幢1单元701市
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
