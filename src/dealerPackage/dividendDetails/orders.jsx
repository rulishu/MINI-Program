import React, { Fragment, useState } from 'react';
import { View } from '@tarojs/components';
// import { dataSource } from './eumn';
import { Tag } from '@nutui/nutui-react-taro';
import { ArrowDown } from '@taroify/icons';
import { DatetimePicker, Popup } from '@taroify/core';
import './index.scss';
import moment from 'moment';
import { changeDate } from '@/utils/min';
import { useSelector, useDispatch } from 'react-redux';

const Index = (props) => {
  const { setFort } = props;
  const dispatch = useDispatch();
  const [maxDate] = useState(new Date(moment().format('YYYY,MM')));
  const [defaultValue] = useState(new Date(moment().format('YYYY,MM')));
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(moment().format('MM月/YYYY'));
  const { agentDataList, pageNum, pageSize, typeId } = useSelector(
    (state) => state.proxyDividendDetails,
  );

  // 取消
  const onCancel = () => {
    setOpenTime(false);
  };

  // 确定
  const onConfirm = (value) => {
    setTime(changeDate(value));
    setFort(value);
    setOpenTime(false);
    const params = {
      dividendType: [3, 4],
      accountType: 2,
      startTime: moment(value).startOf('month').format('YYYY-MM-DD'),
      endTime: moment(value).endOf('month').format('YYYY-MM-DD'),
      pageNum: pageNum,
      pageSize: pageSize,
      isDelete: typeId === 3 ? 1 : 0,
      flowStatus: typeId === 2 ? 1 : 0,
    };
    if (typeId === 0) {
      delete params?.isDelete;
      delete params?.flowStatus;
    }
    dispatch({
      type: 'proxyDividendDetails/agentSelectList',
      payload: params,
    });
  };
  const dividendTypeStatus = {
    1: '经销商分润',
    2: '自购分润',
    3: '发起地分润',
    4: '收货地分润',
    5: '总部分润',
    6: '会员权益分润',
    7: '推荐人分润',
  };
  const levelStatus = {
    1: '一级经销商',
    2: '二级经销商',
    3: '奋斗者',
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
        {agentDataList.map((item, index) => (
          <View className="dividendDetails-info" key={index}>
            <View className="dividendDetails-info-top">
              <View className="dividendDetails-info-top-left">
                <View>{item.consumerName}</View>
                <View className="name">邀请人：{item.beneficiary}</View>
                {item.flowStatus === 1 ? (
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
              <View className="dividendDetails-info-top-right">+{item.paidInAmount}</View>
            </View>
            <View className="dividendDetails-info-mid">
              {`${levelStatus[item?.consumerLevel]}-${dividendTypeStatus[item.dividendType]}`}
            </View>
            <View className="dividendDetails-info-bot">
              <View> {moment(item.createTime).format('MM-HH hh:mm')}</View>
              {/* <View> 预计代缴个税:{item.price}</View> */}
            </View>
          </View>
        ))}
      </View>
      <View className="foot">-没有更多了-</View>
    </Fragment>
  );
};
export default Index;
