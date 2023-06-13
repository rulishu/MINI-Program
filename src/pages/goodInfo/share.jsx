import React from 'react';
import { View, Text } from '@tarojs/components';
import { Popup, Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const { shareVisible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();

  // 分享
  const onClickChat = () => {
    wx.updateShareMenu({
      withShareTicket: true,
      success: function () {
        dispatch({
          type: 'goodInfo/update',
          payload: { shareVisible: false },
        });
        Taro.setStorageSync('shareStatus', 1);
      },
    });
  };

  // 保存海报
  const onPoster = () => {
    dispatch({
      type: 'goodInfo/update',
      payload: {
        shareVisible: false,
        posterVisible: true,
      },
    });
    // Taro.previewImage({
    //   current: '', // 当前显示图片的http链接
    //   urls: images // 需要预览的图片http链接列表
    // })
  };

  return (
    <>
      <Popup
        visible={shareVisible}
        position="bottom"
        style={{ height: '20%', display: 'flex', justifyContent: 'center' }}
        onClose={() => dispatch({ type: 'goodInfo/update', payload: { shareVisible: false } })}
      >
        <View className="share-box">
          <View className="share-image-item1-info" onClick={() => onClickChat()}>
            <View className="share-image-item1">
              <Button
                shape="square"
                color="#D7D7D7"
                className="share-image-item1 share-box-share-botton"
                open-type="share"
              />
            </View>
            <View className="share-image-item1-info text">
              <Text>微信</Text>
            </View>
          </View>
          <View className="share-image-item1-info" onClick={() => onPoster()}>
            <View className="share-image-item1"></View>
            <View className="share-image-item1-info text">
              <Text>保存海报</Text>
            </View>
          </View>
        </View>
      </Popup>
    </>
  );
};
export default Index;
