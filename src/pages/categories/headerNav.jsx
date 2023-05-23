import React, { useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const { getCategoriesTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    let getCategoriesTwoTreeFirst = getCategoriesTree.map((a) => a.children).flat() || [];
    dispatch({
      type: 'categories/update',
      payload: {
        getCategoriesTwoTree: getCategoriesTwoTreeFirst.slice(0, 1),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoriesTree.length]);
  return (
    <View className="headerNavLayout">
      {getCategoriesTree?.map((item) => {
        return (
          <View key={item?.id}>
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
              <View className="headerNavText">
                <Text>{item?.label}</Text>
              </View>
            </View>
          </View>
        );
      })}

      <View
        className="headerNavAll"
        onTap={() => {
          dispatch({
            type: 'categories/update',
            payload: {
              visible: true,
            },
          });
        }}
      >
        <View className="headerNavAllText">
          <Text>全部</Text>
        </View>
        <Icon name="horizontal-n"></Icon>
      </View>
    </View>
  );
};

export default Index;
