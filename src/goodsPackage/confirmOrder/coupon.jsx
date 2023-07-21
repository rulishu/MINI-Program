import React, { useEffect, useState } from 'react';
import { Popup, Checkbox } from '@taroify/core';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import Coupons from '@/component/coupons';
import './index.scss';

const Index = () => {
  const { couponOrderVisible, couponDtoList } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState({});
  useEffect(() => {
    const idData = couponDtoList.filter((item) => item.selected === 1);
    setChecked(idData?.at(0));
  }, []);
  // eslint-disable-next-line no-unused-vars

  const renderButton = (data) => {
    return (
      <View>
        {data?.available === 0 ? (
          <View className="checkDisableMargin" onClick={() => setChecked({})}>
            <View className="checkDisablePadding"></View>
          </View>
        ) : (
          <Checkbox
            className="custom-color"
            checked={checked?.id === data?.id ? true : false}
            onChange={() => {
              setChecked(data);
            }}
          />
        )}
      </View>
    );
  };
  return (
    <Popup
      open={couponOrderVisible}
      placement="bottom"
      style={{ height: '50%' }}
      onClose={() => {
        dispatch({ type: 'goodInfo/update', payload: { couponOrderVisible: false } });
      }}
    >
      <Popup.Close />
      <View className="couponBorderBox">
        <View className="couponBorderBox-title">优惠卷</View>
        {couponDtoList?.map((item) => {
          return (
            <Coupons
              key={item?.id}
              renderButton={renderButton(item)}
              couponData={{
                discount: `¥${item?.price}`,
                reduction: `满${item?.minimumConsumption}可用`,
                title: `满${item?.minimumConsumption}减${item?.price}元券`,
                content: item?.name,
                fistTime: item?.useBeginDate,
                lastTime: item?.useEndTime,
              }}
              disabled={item?.available}
            />
          );
        })}
        <View style={{ height: 50 }}></View>
        <View className="couponBorderBox-footer">
          <Button
            type="primary"
            style={{ borderRadius: 5, width: '100%' }}
            onClick={() => {
              dispatch({
                type: 'goodInfo/update',
                payload: { selectedCoupon: checked, couponOrderVisible: false },
              });
            }}
          >
            确认
          </Button>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
