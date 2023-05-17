import React, { useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Foots = () => {
  const { wineList, categoriesList } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  useEffect(() => {
    getSub();
    // eslint-disable-next-line global-require
  }, [categoriesList.length]);

  const getSub = async () => {
    if (categoriesList.length > 0) {
      await dispatch({
        type: 'home/getWineList',
        payload: {
          pageNum: 1,
          pageSize: 20,
          categoryId: categoriesList.at(3)?.id,
        },
      });
    }
  };

  return (
    <View className="foot">
      {wineList.map((item, index) => {
        return (
          <View key={index} className="foot-items">
            <View className="foot-item">
              <Image
                mode="widthFix"
                // eslint-disable-next-line global-require
                src={item.mainGraph}
                className="foot-item"
              ></Image>
              <View className="foot-price">
                <View className="price">
                  <Text className="price-text">¥ {item.price}</Text>
                </View>
              </View>
            </View>
            <View className="foot-content">
              <View className="foot-title">
                <Text className="foot-title">{item.categoryName}</Text>
              </View>
              <View className="foot-text">
                <Text className="foot-text">{item.details}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Foots;
