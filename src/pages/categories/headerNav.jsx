import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const { getCategoriesTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  return (
    <View className="headerNav">
      <View className="headerNavLayout">
        {getCategoriesTree?.map((item, idx) => {
          return (
            <View key={idx}>
              <View
                className="headerNavBox"
                onTap={() => {
                  dispatch({
                    type: 'categories/update',
                    payload: {
                      getCategoriesTwoTree: item?.children,
                    },
                  });
                }}
              >
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={require('@/assets/images/home8.png')}
                  className="headerNavItem"
                ></Image>
                <View className="headerNavText">{item?.label}</View>
              </View>
            </View>
          );
        })}

        <View className="headerNavAll">
          <View>
            <Text>全部</Text>
          </View>
          <Icon name="more-s"></Icon>
        </View>
      </View>
    </View>
  );
};

export default Index;
