import React from 'react';
import { View } from '@tarojs/components';
import { Image, Empty } from '@taroify/core';
import Coupons from '@/component/coupons';
import './index.scss';
import { useSelector } from 'react-redux';
import moment from 'moment';
import used from '@/assets/images/used.svg';
import expire from '@/assets/images/expire.svg';
import coupon from '@/assets/images/coupon.svg';

const Index = (props) => {
  const { activeTab, status } = props;
  const { couponUserAllList, couponUsedAllList, couponUsedStaleAllList } = useSelector(
    (state) => state.myCoupons,
  );

  const renderButton = (data) => {
    return (
      <View style={{ width: '60px', height: '60px' }}>
        <Image
          style={{ width: '60px', height: '60px' }}
          src={data === 1 ? used : data === 2 ? expire : ''}
        />
      </View>
    );
  };

  const isZero =
    activeTab === 0
      ? couponUserAllList.length
      : activeTab === 1
      ? couponUsedAllList.length
      : couponUsedStaleAllList.length;

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
            discount: item.type === 3 ? `${item?.price}折` : `¥${item?.price}`,
            reduction: `满${item?.minimumConsumption}可用`,
            title:
              item.type === 3
                ? `满${item?.minimumConsumption}打${item?.price}折券`
                : `满${item?.minimumConsumption}减${item?.price}元券`,
            content: item?.name,
            fistTime: moment().format('YYYY-MM-DD', item?.useBeginDate),
            lastTime: moment().format('YYYY-MM-DD', item?.useEndTime),
          }}
          renderButton={renderButton(status)}
        />
      ))}
      {isZero == 0 && (
        <View style={{ position: 'fixed', top: '35%', left: 0, width: '100%' }}>
          <Empty>
            <Empty.Image className="custom-empty__image" src={coupon} />
            <Empty.Description>暂无优惠券</Empty.Description>
          </Empty>
        </View>
      )}
    </View>
  );
};
export default Index;
