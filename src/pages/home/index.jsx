import React, { useState, useEffect } from 'react';
import { View, Image, Input, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { useDispatch } from 'react-redux';
import { Ellipsis, Icon } from '@nutui/nutui-react-taro';
// import pic1 from '../../assets/images/jiutan.png';
import Navs from './navs';
// import Lists from './lists';
import Cards from './cards';
import Foots from './foots';

const Index = () => {
  const dispatch = useDispatch();
  const [addressInfo, setAddressInfo] = useState('');
  useEffect(() => {
    dispatch({ type: 'home/getCategoriesList' });
    Taro.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 纬度
        const latitude = res.latitude;
        // 经度
        const longitude = res.longitude;
        // 请求腾讯地图逆地址解析接口
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=ZMJBZ-P6N3G-ICBQ7-QRBK6-UKYBS-IMBB3`,
          success(val) {
            const role = val.data.result.address;
            setAddressInfo(role);
          },
        });
      },
      fail: function () {
        Taro.showToast({
          title: '获取用户位置信息失败！',
          icon: 'none',
          duration: 2000,
        });
      },
    });
    // eslint-disable-next-line global-require
  }, []);
  // const menus = [
  //   { image: pic1, title: '米面粮油', bg: 'rgba(246, 86, 93, 0.08)' },
  //   { image: pic1, title: '定制酒', bg: ' rgba(110, 162, 255, 0.08)' },
  //   { image: pic1, title: '养生茶饮', bg: 'rgba(249, 161, 218, 0.08)' },
  //   { image: pic1, title: '品质生鲜', bg: 'rgba(255, 132, 13, 0.08)' },
  //   { image: pic1, title: '南北干货', bg: 'rgba(255, 132, 13, 0.08)' },
  // ];
  return (
    <View className="index">
      <View>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/homebg.png')}
          className="page-homes-header-image"
        ></Image>
      </View>

      <View className="address">
        <Icon name="locationg3" size="18" style={{ marginLeft: 8, marginRight: 8 }} />
        <Ellipsis content={addressInfo ? addressInfo : '定位失败'} direction="end"></Ellipsis>
      </View>
      <View className="search">
        <View
          className="search-input"
          onTap={() => Taro.navigateTo({ url: '/pages/search/index' })}
        >
          <Input type="text" placeholder="搜索" />
          <View className="search-icon">
            <Image
              mode="widthFix"
              // eslint-disable-next-line global-require
              src={require('@/assets/images/search.png')}
              className="page-homes-header-search-image"
            ></Image>
          </View>
        </View>
      </View>
      <View className="qd">
        <View className="search-qd-icon">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/search1.png')}
            className="page-homes-header-search1-image"
          ></Image>
        </View>
        <View className="qd-content">
          <Text>签到</Text>
        </View>
      </View>
      <View className="listen">
        <View>
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/search2.png')}
            className="search2-image"
          ></Image>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/search3.png')}
            className="search2-image"
          ></Image>
        </View>
      </View>
      <View className="page-homes-body">
        {/* <View className="menu-conatiner">
          {menus.map((menu, i) => (
            <View key={i} className="page-grid-boxconatiner">
              <View className="box-conatiner">
                <View className="page-grid-box" style={{ background: menu.bg }}>
                  <Image
                    src={menu.image}
                    className="box"
                    style={{ width: '24px', height: '22px' }}
                  />
                </View>
                <Text className="text">{menu.title}</Text>
              </View>
            </View>
          ))}
        </View> */}
        <View>
          <Navs />
          {/* <Lists /> */}
          <Cards />
          <Foots />
        </View>
        <View className="tab-footer"></View>
      </View>
    </View>
  );
};
export default Index;
