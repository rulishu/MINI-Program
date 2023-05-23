import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Popup } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const { visible, getCategoriesTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  return (
    <Popup
      visible={visible}
      style={{ height: '50%', borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }}
      position="top"
      onClose={() => {
        dispatch({
          type: 'categories/update',
          payload: {
            visible: false,
          },
        });
      }}
    >
      <View className="popupNavLayout">
        {getCategoriesTree?.map((item) => {
          return (
            <View key={item?.id} className="popupNavLayout-item">
              <View
                onTap={() => {
                  dispatch({
                    type: 'categories/update',
                    payload: {
                      getCategoriesTwoTree: item?.children,
                    },
                  });
                }}
                className="allNavBox"
              >
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={require('@/assets/images/home8.png')}
                  className="allNavItem"
                ></Image>
                <View className="allNavText">
                  <Text>{item?.label}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Popup>
  );
};
export default Index;
