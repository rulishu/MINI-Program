import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon, Avatar, Image } from '@nutui/nutui-react-taro';
import { useSelector } from 'react-redux';
// import vip from '../../assets/images/vip.svg';
// import myfz from '../../assets/images/myfz.svg';
import ewm from '../../assets/images/ewm.svg';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const { userInfos } = useSelector((state) => state.my);

  const time = (date) => {
    const creatDate = new Date(date.split(' ')[0]);
    const now = new Date(); // 获取当前时间
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 获取今天的日期，时分秒都为0
    const todayTimestamp = today.getTime(); // 获取今天0点的时间戳
    const creatTimestamp = creatDate.getTime(); // 获取今天0点的时间戳
    const dateDiff = todayTimestamp - creatTimestamp;
    const joinDay = Math.ceil(dateDiff / (24 * 3600 * 1000));
    return joinDay + 1;
  };
  const list = [
    {
      title: '我的粉丝',
      num: userInfos.numberOfFans || 0,
      url: '/dealerPackage/myFans/index',
    },
    {
      title: '我的积分',
      num: 0,
      url: '/goodsPackage/flashSkill/index',
    },
    {
      title: '我的卡劵',
      num: userInfos.numberOfCoupons || 0,
      url: '/goodsPackage/myCoupons/index',
    },
    // {
    //   title: '今日涨粉',
    //   num: 12,
    // },
    // {
    //   title: '今日分润',
    //   num: 78.23,
    // },
    // {
    //   title: '待提现金额',
    //   num: 1278.23,
    // },
  ];

  //编辑信息
  const edit = () => {
    const token = Taro.getStorageSync('token');
    if (token === '') {
      Taro.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
      });
      return Taro.navigateTo({ url: '/pages/login/index' });
    }
    Taro.navigateTo({ url: '/userPackage/editUser/index' });
  };

  const goPoster = () => {
    const token = Taro.getStorageSync('token');
    if (token === '') {
      Taro.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    Taro.navigateTo({ url: '/userPackage/poster/index' });
  };

  const goUrl = (url) => {
    Taro.navigateTo({ url: url });
  };
  return (
    <View>
      <View className="TopPadding"></View>
      <View className="my-title">
        <Text>我的 1.0.1</Text>
      </View>
      <View className="head-info">
        <View className="my-headIcon" onTap={() => edit()}>
          <Avatar
            shape="square"
            size="large"
            icon={userInfos.headUrl && userInfos.headUrl !== '' ? userInfos.headUrl : 'my'}
            iconSize="60"
          />
        </View>
        <View className="head-infos">
          <View className="head-infos-name" onTap={() => edit()}>
            <Text>{userInfos.consumerName || '游客'}</Text>
            {/* <Image
              mode="widthFix"
              src={vip}
              style={{ width: 24, height: 24, marginLeft: 10, marginRight: 6 }}
            ></Image>
            <Text className="head-info-name-xf">续费</Text> */}
          </View>
          <View className="head-infos-id">
            <Text>
              {userInfos?.level === '3'
                ? '奋斗者'
                : userInfos?.level === '1'
                ? '一级经销商'
                : '二级经销商'}{' '}
              ID: {userInfos.id || '暂无信息'}
            </Text>
            <Image
              mode="widthFix"
              src={ewm}
              style={{ width: 16, height: 20, marginLeft: 10 }}
              onClick={goPoster}
            ></Image>
          </View>
          {userInfos.createTime && (
            <View className="head-infos-id">
              <Text>邀请人: {userInfos?.parentName}</Text>
              <Text style={{ marginLeft: 10 }}>
                加入奋斗之露第 {time(userInfos.createTime) || 0} 天
              </Text>
            </View>
          )}
        </View>
        <View className="head-info-date">
          <Icon name="date" size="20"></Icon>
        </View>
      </View>
      <View className="head-list">
        {list.map((item, index) => (
          <View key={index} className="head-list-item" onClick={() => goUrl(item.url)}>
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
