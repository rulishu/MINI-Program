import React, { Fragment, useState } from 'react';
import { View } from '@tarojs/components';
import { dataSource } from './eumn';
import { Tag } from '@nutui/nutui-react-taro';
import { ArrowDown } from '@taroify/icons';
import { DatetimePicker, Popup } from '@taroify/core';
import './index.scss';
import moment from 'moment';
import { changeDate } from '@/utils/min';

const Index = () => {
  const [maxDate] = useState(new Date(moment().format('YYYY,MM')));
  const [defaultValue] = useState(new Date(moment().format('YYYY,MM')));
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(moment().format('MM月/YYYY'));

  // 取消
  const onCancel = () => {
    setOpenTime(false);
  };

  // 确定
  const onConfirm = (value) => {
    setTime(changeDate(value));
    setOpenTime(false);
  };
  return (
    <Fragment>
      <View className="dividendDetails">
        <View className="selectTime" onClick={() => setOpenTime(true)}>
          {time}
          <ArrowDown />
        </View>
        <Popup open={openTime} defaultOpen placement="bottom" style={{ height: '50%' }}>
          <DatetimePicker
            type="year-month"
            max={maxDate}
            defaultValue={defaultValue}
            onCancel={() => onCancel()}
            onConfirm={(e) => onConfirm(e)}
            formatter={(type, val) => {
              if (type === 'year') {
                return `${val}年`;
              }
              if (type === 'month') {
                return `${val}月`;
              }
              return val;
            }}
          >
            <DatetimePicker.Toolbar>
              <DatetimePicker.Button>取消</DatetimePicker.Button>
              <DatetimePicker.Title>选择年月</DatetimePicker.Title>
              <DatetimePicker.Button>确认</DatetimePicker.Button>
            </DatetimePicker.Toolbar>
          </DatetimePicker>
        </Popup>
        {dataSource.map((item, index) => (
          <View className="dividendDetails-info" key={index}>
            <View className="dividendDetails-info-top">
              <View className="dividendDetails-info-top-left">
                <View>{item.title}</View>
                <View className="name">邀请人：{item.name}</View>
                {item.state === 1 ? (
                  <Tag plain color="#999999" style={{ fontSize: 10 }}>
                    已结算
                  </Tag>
                ) : (
                  <Tag color="#999999" style={{ fontSize: 10 }}>
                    {' '}
                    未结算
                  </Tag>
                )}
              </View>
              <View className="dividendDetails-info-top-right">+{item.money}</View>
            </View>
            <View className="dividendDetails-info-mid">{item.type}</View>
            <View className="dividendDetails-info-bot">
              <View> {item.time}</View>
            </View>
          </View>
        ))}
      </View>
      <View className="foot">-没有更多了-</View>
    </Fragment>
  );
};
export default Index;
