import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { Tag, Price, Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = (props) => {
  const { getCategoriesTwoTreeItem } = props;
  const { subList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(0);

  return (
    <View className="right" style={{ paddingBottom: 70, margin: -15 }}>
      <View style={{ marginBottom: 8 }} className="right-title-box">
        {getCategoriesTwoTreeItem?.map((itm, idx) => {
          return (
            <View
              key={idx}
              onTap={() => {
                setActiveItem(idx);
              }}
            >
              <Text
                className="right-title"
                style={{
                  background:
                    getCategoriesTwoTreeItem && idx !== activeItem ? 'rgb(245, 245, 245)' : '',
                }}
              >
                {itm?.label}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{ marginTop: 15 }}>
        {getCategoriesTwoTreeItem?.map((item, index) => {
          return (
            <View key={index} className="right-content">
              <View className="right-content-title">{item?.label}</View>
              <View className="right-content-box">
                {subList?.map((itm, idx) => {
                  return (
                    <View className="right-content-item" key={idx}>
                      <Image
                        mode="widthFix"
                        // eslint-disable-next-line global-require
                        src={itm?.mainGraph}
                        className="rightImage"
                        onTap={() => {
                          dispatch({
                            type: 'goodInfo/infoDetails',
                            payload: {
                              id: itm?.id,
                            },
                          });
                          Taro.navigateTo({ url: '/pages/goodInfo/index' });
                        }}
                      ></Image>
                      <View className="right-content-text-box">
                        <View
                          className="right-content-text-header"
                          onTap={() => {
                            dispatch({
                              type: 'goodInfo/infoDetails',
                              payload: {
                                id: itm?.id,
                              },
                            });
                            Taro.navigateTo({ url: '/pages/goodInfo/index' });
                          }}
                        >
                          <Tag color="rgb(170, 170, 170)">自营</Tag>
                          <Text style={{ marginLeft: 10 }}>秋然长粒香大米5kg/袋</Text>
                        </View>
                        <View className="right-content-text-tag">返 ¥9.10</View>
                        <View className="right-content-text-footer">
                          <Price price={11} size="normal" needSymbol thousands />
                          <Icon name="cart" size={15}></Icon>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
        {/* {subList.map((item, index) => {
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
        })} */}
      </View>
    </View>
  );
};
export default Index;
