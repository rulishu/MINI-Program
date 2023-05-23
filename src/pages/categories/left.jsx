import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Right from './right';
import './index.scss';

const Index = () => {
  const { getCategoriesTwoTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState(0);
  // let getCategoriesTwoTreeId = getCategoriesTwoTree?.map((item) => item?.children)
  // console.log('getCategoriesTwoTreeId', getCategoriesTwoTreeId?.flat()?.at(0)?.id);
  // useEffect(() => {
  //   getSub();
  // }, [getCategoriesTwoTreeId?.flat()?.at(0)?.id]);
  // const getSub = async () => {
  //   if (getCategoriesTwoTreeId?.flat().length > 0) {
  //     await dispatch({
  //       type: 'categories/getList',
  //       payload: {
  //         categoryId: getCategoriesTwoTreeId?.flat()?.at(0)?.id,
  //         onShelf: 2,
  //         groundType: 2,
  //         pageNum: 1,
  //         pageSize: 20,
  //       },
  //     });
  //   }
  // };

  return (
    <View>
      <Tabs
        value={tab5value}
        color="#B08B57"
        style={{ height: '100vh' }}
        autoHeight
        tabStyle={{ position: 'sticky', top: '0px', zIndex: 1, width: '30vw' }}
        onChange={({ paneKey }) => {
          setTab5value(paneKey);
          dispatch({ type: 'categories/getCategoriesTreeList' });
        }}
        titleScroll
        leftAlign
        direction="vertical"
      >
        {getCategoriesTwoTree?.map((item) => {
          return (
            <Tabs.TabPane key={item} title={item.label}>
              <Right
                getCategoriesThirdTreeItem={item?.children?.at(0)}
                style={{ width: '70vw', backgroundColor: '#ffffff' }}
              />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
