import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Icon, Avatar } from '@nutui/nutui-react-taro';
import { useSelector } from 'react-redux';
import vip from '../../assets/images/vip.svg';
import myfz from '../../assets/images/myfz.svg';
import './index.scss';

const Index = () => {
  const { userInfo } = useSelector((state) => state.my);

  const time = (date) => {
    //date作为一个时间变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    let dateBegin = new Date(date?.replace(/-/g, '/')); //将-转化为/，使用new Date
    let nowDate = new Date(); //获取当前时间
    let dateDiff = nowDate.getTime() - dateBegin.getTime(); //两个时间相差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    return dayDiff;
  };
  const list = [
    {
      title: '我的粉丝',
      num: 233,
    },
    {
      title: '今日涨粉',
      num: 12,
    },
    {
      title: '今日分润',
      num: 78.23,
    },
    {
      title: '待提现金额',
      num: 1278.23,
    },
  ];

  return (
    <View>
      <View className="heads">
        <View className="my-title">
          <Text>我的</Text>
        </View>
        <View className="option-icon">
          <View>
            <Icon name="comment" size="20" color="#B08B57" style={{ marginRight: 20 }}></Icon>
            <Icon name="setting" size="20" color="#B08B57"></Icon>
          </View>
        </View>
      </View>
      <View className="head-info">
        <View className="my-headIcon">
          <Avatar shape="square" size="large" icon="my" iconSize="24" />
        </View>
        <View className="head-infos">
          <View className="head-info-name">
            <Text>游客</Text>
            <Image
              mode="widthFix"
              src={vip}
              style={{ width: 24, height: 24, marginLeft: 10, marginRight: 6 }}
            ></Image>
            <Text className="head-info-name-xf">续费</Text>
          </View>
          <View className="head-info-id">
            <Text>经销商 ID：{userInfo.id}</Text>
            <Image
              mode="widthFix"
              src={myfz}
              style={{ width: 16, height: 20, marginLeft: 10 }}
            ></Image>
          </View>
          <View className="head-info-id">
            <Text>加入融辉第 {time(userInfo.createTime)} 天</Text>
          </View>
        </View>
      </View>
      <View className="semicircle">
        <View className="semicircle-info"></View>
      </View>
      <View className="head-list">
        {list.map((item, index) => (
          <View key={index} className="head-list-item">
            <View className="head-list-item-title">
              <Text>{item.num}</Text>
            </View>
            <View className="head-list-item-num">
              <Text>{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
