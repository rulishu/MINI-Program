import React from 'react';
import { View } from '@tarojs/components';
import Coupons from '@/component/coupons';
import './index.scss';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Index = (props) => {
  const { activeTab } = props;
  const { couponUserAllList, couponUsedAllList, couponUsedStaleAllList } = useSelector(
    (state) => state.myCoupons,
  );

  return (
    <View className="couponBorderBox">
      {(activeTab === 0
        ? couponUserAllList
        : activeTab === 1
        ? couponUsedAllList
        : couponUsedStaleAllList
      ).map((item) => (
        <Coupons
          key={item?.id}
          state={activeTab}
          couponData={{
            discount: `¥${item?.price}`,
            reduction: `满${item?.minimumConsumption}可用`,
            title: `满${item?.minimumConsumption}减${item?.price}元券`,
            content: item?.name,
            fistTime: moment().format('YYYY-MM-DD', item?.useBeginDate),
            lastTime: moment().format('YYYY-MM-DD', item?.useEndTime),
          }}
        />
      ))}
    </View>
  );
};
export default Index;
