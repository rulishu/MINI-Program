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
    // console.log('getCategoriesTwoTreeFirst', getCategoriesTwoTreeFirst.slice(0, 1)?.at(0)?.children[0]?.id);
    dispatch({
      type: 'categories/update',
      payload: {
        getCategoriesTwoTree: getCategoriesTwoTreeFirst.slice(0, 1),
      },
    });
    dispatch({
      type: 'categories/getList',
      payload: {
        categoryId: getCategoriesTwoTreeFirst.slice(0, 1)?.at(0)?.children[0]?.id,
        onShelf: 2,
        groundType: 2,
        pageNum: 1,
        pageSize: 20,
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
              onTap={async () => {
                let getCategoriesTwoTreeId = item?.children?.map((itm) => itm?.children);
                if (item?.children?.length > 0) {
                  await dispatch({
                    type: 'categories/getList',
                    payload: {
                      categoryId:
                        item?.children[0]?.leafOrder === 1
                          ? item?.children[0]?.id
                          : getCategoriesTwoTreeId?.flat()?.at(0)?.id,
                      onShelf: 2,
                      groundType: 2,
                      pageNum: 1,
                      pageSize: 20,
                    },
                  });
                }
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
