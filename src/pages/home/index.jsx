import React from 'react';
import { View, Image, Input, Text } from '@tarojs/components';
import './index.scss';
// import pic1 from '../../assets/images/jiutan.png';
import Navs from './navs';
// import Lists from './lists';
import Cards from './cards';
import Foots from './foots';

const Index = () => {
  // const menus = [
  //   { image: pic1, title: '米面粮油', bg: 'rgba(246, 86, 93, 0.08)' },
  //   { image: pic1, title: '定制酒', bg: ' rgba(110, 162, 255, 0.08)' },
  //   { image: pic1, title: '养生茶饮', bg: 'rgba(249, 161, 218, 0.08)' },
  //   { image: pic1, title: '品质生鲜', bg: 'rgba(255, 132, 13, 0.08)' },
  //   { image: pic1, title: '南北干货', bg: 'rgba(255, 132, 13, 0.08)' },
  // ];
  return (
    <View className="index">
      <Image
        mode="widthFix"
        // eslint-disable-next-line global-require
        src={require('@/assets/images/homebg.png')}
        className="page-homes-header-image"
      ></Image>
      <View className="search">
        <View className="search-input">
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
      </View>
    </View>
  );
};
export default Index;
