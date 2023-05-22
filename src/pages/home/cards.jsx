import React, { useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Cards = () => {
  const { homeList, categoriesList } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  useEffect(() => {
    getSub();
    // eslint-disable-next-line global-require
  }, [categoriesList.length]);

  const getSub = async () => {
    if (categoriesList.length > 0) {
      await dispatch({
        type: 'home/getList',
        payload: {
          pageNum: 1,
          pageSize: 20,
          categoryId: categoriesList.at(0)?.id,
        },
      });
    }
  };

  return (
    <View className="card">
      {homeList.map((item, index) => {
        return (
          <View key={index} className="card-items">
            <View
              className="card-item"
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
                className="page-homes-card-image"
              ></Image>
            </View>
            <View className="card-content">
              <View className="card-head">
                <Text className="card-title">{item.categoryName}</Text>
                <Text className="card-text">{item.details}</Text>
              </View>
              <View className="card-foot">
                <Text className="card-price">¥{item.price}.00</Text>
                <View className="card-btn">
                  <Text className="card-btn-text">马上抢</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Cards;
