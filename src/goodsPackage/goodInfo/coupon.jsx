import React from 'react';
import { Popup, Button, Empty } from '@taroify/core';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '@tarojs/components';
import Coupons from '@/component/coupons';
import Taro from '@tarojs/taro';
import coupon from '@/assets/images/coupon.svg';
import './index.scss';

const Index = () => {
  const { couponVisible, couponsList } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();
  const params = Taro.getCurrentInstance()?.router?.params;

  const renderButton = (data) => {
    return (
      <Button
        className={
          data?.userReceiveCount !== data?.limitCount
            ? 'couponBorderBox-list-right-content-button'
            : 'couponBorderBox-list-right-content-buttoned'
        }
        disabled={data?.userReceiveCount === data?.limitCount ? true : false}
        onClick={() => {
          const token = Taro.getStorageSync('token');
          if (token === '') {
            Taro.navigateTo({ url: '/pages/login/index' });
          } else {
            dispatch({
              type: 'goodInfo/receiveCoupon',
              payload: {
                couponId: data?.id,
                callBack: () => {
                  dispatch({
                    type: 'goodInfo/selectCoupons',
                    payload: {
                      id: params?.id,
                    },
                  });
                },
              },
            });
          }
        }}
      >
        {data?.userReceiveCount !== data?.limitCount ? '领取' : '已领取'}
      </Button>
    );
  };
  return (
    <Popup
      open={couponVisible}
      placement="bottom"
      style={{ height: '50%' }}
      onClose={() => {
        dispatch({ type: 'goodInfo/update', payload: { couponVisible: false } });
      }}
    >
      <Popup.Close />
      <View className="couponBorderBox">
        <View className="couponBorderBox-title">优惠卷</View>
        {couponsList.length > 0 ? (
          couponsList?.map((item) => {
            return (
              <Coupons
                key={item?.id}
                couponData={{
                  discount: item.type === 3 ? `${item?.price}折` : `¥${item?.price}`,
                  reduction: `满${item?.minimumConsumption}可用`,
                  title:
                    item.type === 3
                      ? `满${item?.minimumConsumption}打${item?.price}折券`
                      : `满${item?.minimumConsumption}减${item?.price}元券`,
                  content: item?.name,
                  fistTime: item?.useBeginDate,
                  lastTime: item?.useEndTime,
                }}
                renderButton={renderButton(item)}
              />
            );
          })
        ) : (
          <View style={{ marginTop: '25%' }}>
            <Empty>
              <Empty.Image className="custom-empty__image" src={coupon} />
              <Empty.Description>暂无优惠券</Empty.Description>
            </Empty>
          </View>
        )}
      </View>
    </Popup>
  );
};
export default Index;
