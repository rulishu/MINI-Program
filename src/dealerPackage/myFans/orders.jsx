import React, { Fragment } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useSelector } from 'react-redux';
import { useCountDown } from 'ahooks';
// import Taro from '@tarojs/taro';
import './index.scss';
import moment from 'moment';

const ListItem = ({ item, keys, orderActive, refresh }) => {
  const { predictEndTime } = item;
  // eslint-disable-next-line no-unused-vars
  const [countdown, formattedRes] = useCountDown({
    leftTime: moment(predictEndTime).valueOf() - moment().valueOf(),
    onEnd: async () => {
      if (keys === orderActive) {
        refresh?.();
      }
    },
  });

  const list = [
    {
      title: '粉丝人数',
      num: 1,
    },
    {
      title: '上月营业额',
      num: '21.11',
    },
    {
      title: '本月营业额',
      num: '12.30',
    },
    {
      title: '本月个人消费',
      num: '1232.31',
    },
  ];

  return (
    <Fragment>
      <View className="fansList">
        <View className="fansList-info">
          <View className="fansList-info-top">
            <View className="fansList-info-top-left">
              <Image
                className="fansList-info-top-left-img"
                src="https://fendouzhilu.oss-cn-hangzhou.aliyuncs.com/FDZL/mall/20230616/000a889ada584c4f8b57a10610217134.png"
              />
              <View className="fansList-info-top-left-info">
                <View className="name">Miracle-</View>
                <View>会员编号:HZ_XZ8797</View>
              </View>
            </View>
            <View className="fansList-info-top-mid">
              <View>邀请人:李高峰</View>
              <View>邀请层级:1</View>
            </View>
            <View className="fansList-info-top-right">
              <Text className="fansList-info-top-right-text">奋斗者</Text>
            </View>
          </View>
          <View className="fansList-info-mid">
            {list.map((ite, index) => (
              <View key={index} className="fansList-info-mid-item">
                <View className="fansList-info-mid-item-title">
                  <Text>{ite.title}</Text>
                </View>
                <View className="fansList-info-mid-item-num">
                  <Text>
                    {ite.title !== '粉丝人数' ? '¥' : ''}
                    <Text className="num">{ite.num}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View className="fansList-info-bottom">{item.createTime}</View>
        </View>
      </View>
    </Fragment>
  );
};

const Index = ({ keys, dataSource, refresh }) => {
  const { orderActive } = useSelector((state) => state.allOrders);
  return (
    <View className="order">
      <View className="order-content">
        {dataSource.map((item) => (
          <ListItem
            item={item}
            keys={keys}
            orderActive={orderActive}
            key={item.id}
            refresh={refresh}
          />
        ))}
      </View>
    </View>
  );
};
export default Index;
