import React from 'react';
import { View, Text } from '@tarojs/components';
import { Popup, Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const { shareVisible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();
  const token = Taro.getStorageSync('token');
  // 分享
  const onClickChat = () => {
    // const userInfo = Taro.getStorageSync('userInfo');
    if (token !== '') {
      wx.updateShareMenu({
        withShareTicket: true,
        success: function () {
          dispatch({
            type: 'goodInfo/update',
            payload: { shareVisible: false },
          });
          // Taro.navigateTo({ url: `/goodsPackage/goodInfo/index?id=${params?.id}&invitationCode=${userInfo?.consumerCode}` });
        },
        error: () => {},
      });
    } else {
      Taro.navigateTo({ url: '/pages/login/index' });
    }
  };

  // 保存海报
  const onPoster = () => {
    const userInfo = Taro.getStorageSync('userInfo');
    if (token !== '') {
      dispatch({
        type: 'my/getUserInfos',
        payload: {
          id: userInfo.id,
        },
      });
      dispatch({
        type: 'goodInfo/update',
        payload: {
          shareVisible: false,
          posterVisible: true,
        },
      });
      Taro.showLoading({
        title: '海报生成中',
        icon: 'none',
        mask: true,
      });
      dispatch({
        type: 'goodInfo/miniprogramcode',
      });
      // 这里实际上应该向后台发请求后去小程序码
      setTimeout(() => {
        async () => {
          Taro.hideLoading();
        };
      }, 1000);
    } else {
      Taro.navigateTo({ url: '/pages/login/index' });
    }
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
                open-type={token !== '' ? 'share' : ''}
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
