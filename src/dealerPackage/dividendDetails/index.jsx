import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Popup from './popup';
import { useDispatch, useSelector } from 'react-redux';
import Orders from './orders';
import { tabList } from './eumn';
import { QuestionOutlined, Arrow } from '@taroify/icons';
import { Tag } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import moment from 'moment';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [activeTag, setActiveTag] = useState(0);
  const [fort, setFort] = useState(new Date());
  const userInfo = Taro.getStorageSync('userInfo');
  const { dividendDetailData, pageNum, pageSize } = useSelector(
    (state) => state.proxyDividendDetails,
  );

  useEffect(() => {
    dispatch({
      type: 'proxyDividendDetails/dividendSelectDetail',
      payload: {
        id: parseInt(userInfo.id),
      },
    });
    dispatch({
      type: 'proxyDividendDetails/agentSelectList',
      payload: {
        pageNum: pageNum,
        pageSize: pageSize,
        dividendType: [3, 4],
        accountType: 2,
        startTime: moment().startOf('month').format('YYYY-MM-DD'),
        endTime: moment().endOf('month').format('YYYY-MM-DD'),
      },
    });
  }, []);

  const list = [
    {
      title: '今日预估分润',
      num: dividendDetailData?.today,
    },
    {
      title: '未结算分润',
      num: dividendDetailData?.unsettled,
    },
    {
      title: '累积分润',
      num: dividendDetailData?.total,
    },
    {
      title: '已提现',
      num: dividendDetailData?.withdrawn,
    },
  ];

  // 提示
  const onPrompt = () => {
    dispatch({
      type: 'dividendDetails/update',
      payload: {
        popupOpen: true,
      },
    });
  };
  const onChange = (type) => {
    let params = {
      dividendType: [3, 4],
      accountType: 2,
      startTime: moment(fort).startOf('month').format('YYYY-MM-DD'),
      endTime: moment(fort).endOf('month').format('YYYY-MM-DD'),
      isDelete: type === 3 ? 1 : 0,
      flowStatus: type === 2 ? 1 : 0,
      pageNum: pageNum,
      pageSize: pageSize,
    };
    if (type === 0) {
      delete params.flowStatus;
      delete params.isDelete;
    }
    dispatch({
      type: 'proxyDividendDetails/agentSelectList',
      payload: params,
    });
  };
  return (
    <View className="fans">
      <View className="fans-head">
        <View className="fans-head-top">
          <View>可提现 {dividendDetailData?.withdrawable}</View>
          <View className="fans-head-top-right">
            <View>立即提现</View>
            <Arrow />
          </View>
        </View>
        <View className="fans-head-bottom">
          {list.map((item, index) => (
            <View key={index} className="fans-head-bottom-item">
              <View className="fans-head-bottom-item-title">
                <Text>{item.title}</Text>
                <QuestionOutlined style={{ marginLeft: 4 }} onClick={() => onPrompt()} />
              </View>
              <View className="fans-head-bottom-item-num">
                <Text>{item.num}</Text>
              </View>
            </View>
          ))}
        </View>
        <View className="fans-head-foot">订单确认收货后，即完成收益结算，支持提现</View>
      </View>
      <View className="fans-body">
        <View className="fans-body-title">
          {tabList.map((a, index) => {
            return (
              <Tag
                plain
                onClick={() => {
                  setActiveTag(index);
                  onChange(a?.id);
                  dispatch({
                    type: 'proxyDividendDetails/update',
                    payload: {
                      typeId: a?.id,
                    },
                  });
                }}
                color={index !== activeTag ? '#999999' : '#965A3C'}
                key={index}
                className="tag"
              >
                {a.title}
              </Tag>
            );
          })}
        </View>
        <Orders setFort={setFort} />
      </View>
      <Popup />
    </View>
  );
};
export default Index;
