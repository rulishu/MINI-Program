import React from 'react';
import { View, Text } from '@tarojs/components';
import { Popup } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const { shareVisible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();
  const onClickChat = () => {
    // Taro.showModal({
    //   title: '提示',
    //   content: '请手动打开微信消息列表',
    //   confirmText: '好的',
    //   showCancel: false
    // })
    Taro.navigateToMiniProgram({
      appId: 'wxeb490c6f9b154ef9', // 要跳转的公众号appid
      path: 'pages/chat/chat?toUserName=xxxxx', // 要打开的聊天页面路径，toUserName为对方用户名或公众号原始id
      extraData: {
        foo: 'bar', // 自定义参数，可选
      },
      // success(res) {
      //   console.log(res)
      // }
    });
  };
  return (
    <Popup
      closeable
      visible={shareVisible}
      style={{ padding: '30px 30px', width: '80%' }}
      onClose={() => dispatch({ type: 'goodInfo/update', payload: { shareVisible: false } })}
    >
      <View className="share-box">
        <View className="share-text">分享给好友</View>
        <View className="share-image">
          {/* <Image
            mode="widthFix"
            className="share-image-item1"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
          ></Image> */}
          <View
            className="share-image-item1"
            onClick={() => {
              onClickChat();
            }}
          >
            <Text>微信</Text>
          </View>
          {/* <Image
            mode="widthFix"
            className="share-image-item2"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
          ></Image> */}
          <View
            className="share-image-item2"
            onClick={() => {
              Taro.showModal({
                title: '保存图片',
                // content: '请手动打开微信消息列表',
                confirmText: '取消',
                showCancel: false,
              });
            }}
          >
            <Text>海报</Text>
          </View>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
