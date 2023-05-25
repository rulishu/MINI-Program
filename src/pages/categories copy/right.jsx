import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = (props) => {
  const { getCategoriesThirdTreeItem } = props;
  const { subList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  return (
    <View className="right" style={{ paddingBottom: 70, margin: -15 }}>
      <View
        style={{ marginBottom: 8 }}
        // onTap={() => {
        //   dispatch({
        //     type: 'goodInfo/infoDetails',
        //     payload: {
        //       id: getCategoriesThirdTreeItem?.id,
        //     },
        //   });
        //   Taro.navigateTo({ url: '/pages/goodInfo/index' });
        // }}
        className="right-title-box"
      >
        <Text
          className="right-title"
          style={{ background: getCategoriesThirdTreeItem ? 'rgb(245, 245, 245)' : '' }}
        >
          {getCategoriesThirdTreeItem?.label}
        </Text>
      </View>
      <View>
        {subList.map((item, index) => {
          return (
            <View key={index} className="right-content">
              <View
                onTap={() => {
                  dispatch({
                    type: 'goodInfo/infoDetails',
                    payload: {
                      id: item?.id,
                    },
                  });
                  Taro.navigateTo({ url: '/pages/goodInfo/index' });
                }}
              >
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={item.mainGraph}
                  className="rightImage"
                ></Image>
              </View>
              <View className="right-contents">
                <View
                  className="right-content-texts"
                  onTap={() => {
                    dispatch({
                      type: 'goodInfo/infoDetails',
                      payload: {
                        id: item?.id,
                      },
                    });
                    Taro.navigateTo({ url: '/pages/goodInfo/index' });
                  }}
                >
                  <Text className="right-content-text">{item.itemName}</Text>
                </View>
                <View className="right-content-bottom">
                  <View>
                    <Text className="right-content-price">
                      <Text className="right-content-price-icon">¥</Text>
                      {item.price}
                      <Text className="right-content-price-icon">.00</Text>
                    </Text>
                  </View>
                  <View>
                    <Image
                      mode="widthFix"
                      // eslint-disable-next-line global-require
                      src={require('@/assets/images/car1.png')}
                      className="right-content-car"
                    ></Image>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default Index;