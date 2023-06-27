import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@taroify/core';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { releaseOpen, releaseData } = useSelector((state) => state.evaluate);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'evaluate/update',
      payload: {
        releaseOpen: false,
      },
    });
  };

  // 发布
  const onClick = () => {
    dispatch({
      type: 'evaluate/getAddEvaluation',
      payload: {
        releaseData,
        callBack: () => {
          dispatch({
            type: 'evaluate/update',
            payload: {
              releaseOpen: false,
            },
          });
          Taro.navigateTo({ url: '/pages/allOrders/index' });
          dispatch({
            type: 'allOrders/update',
            payload: {
              orderActive: 0,
            },
          });
        },
      },
    });
  };

  return (
    <Dialog open={releaseOpen} onClose={onClose}>
      <Dialog.Content>
        <View>部分商品未评价，</View>
        <View>是否要立刻发布？</View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button shape="square" onClick={onClose} style={{ marginRight: 10 }}>
          继续评价
        </Button>
        <Button shape="square" onClick={onClick}>
          发布
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
export default Index;
