import React, { useEffect, useState } from 'react';
import { Tabs } from '@taroify/core';
import { View } from '@tarojs/components';
import MyCoupons from './coupon';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { couponUserAllList, couponUsedAllList, couponUsedStaleAllList } = useSelector(
    (state) => state.myCoupons,
  );
  const list = [
    { state: 0, title: `待使用（${couponUserAllList?.length}）` },
    { state: 1, title: `已使用(${couponUsedAllList?.length})` },
    { state: 2, title: `已过期(${couponUsedStaleAllList?.length})` },
  ];
  useEffect(() => {
    dispatch({ type: 'myCoupons/couponUserAll' });
    dispatch({ type: 'myCoupons/couponUsedAll' });
    dispatch({ type: 'myCoupons/couponUsedStaleAll' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Tabs
        theme="card"
        value={value}
        onChange={async (val) => {
          setValue(val);
          if (val === 0) {
            dispatch({ type: 'myCoupons/couponUserAll' });
          }
          if (val === 1) {
            dispatch({ type: 'myCoupons/couponUsedAll' });
          }
          if (val === 2) {
            dispatch({ type: 'myCoupons/couponUsedStaleAll' });
          }
        }}
      >
        {list?.map((item) => {
          return (
            <Tabs.TabPane title={item?.title} key={item?.state}>
              <MyCoupons activeTab={value} status={item?.state} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
