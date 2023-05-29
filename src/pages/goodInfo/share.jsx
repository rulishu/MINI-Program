import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Popup, Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
// import Taro from '@tarojs/taro';
import goodInfoShare from '@/assets/images/goodInfoShare.svg';
import goodInfoCollect from '@/assets/images/goodInfoCollect.svg';
import goodInfoDownload from '@/assets/images/goodInfoDownload.svg';
import './index.scss';

const Index = () => {
  const { shareVisible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();

  const shareList = [
    {
      id: 1,
      img: goodInfoShare,
      title: '分享给朋友',
      onClick: () => onShare(),
    },
    {
      id: 2,
      img: goodInfoCollect,
      title: '收藏',
      onClick: () => onCollect(),
    },
    {
      id: 3,
      img: goodInfoDownload,
      title: '保存到相册',
      onClick: () => onDownload(),
    },
  ];

  // const onClickChat = () => {
  //   // Taro.showModal({
  //   //   title: '提示',
  //   //   content: '请手动打开微信消息列表',
  //   //   confirmText: '好的',
  //   //   showCancel: false
  //   // })
  //   Taro.navigateToMiniProgram({
  //     appId: 'wxeb490c6f9b154ef9', // 要跳转的公众号appid
  //     path: 'pages/chat/chat?toUserName=xxxxx', // 要打开的聊天页面路径，toUserName为对方用户名或公众号原始id
  //     extraData: {
  //       foo: 'bar', // 自定义参数，可选
  //     },
  //     // success(res) {
  //     // }
  //   });
  // };

  // 分享给朋友
  const onShare = () => {
    wx.updateShareMenu({
      withShareTicket: true,
      success: function (res) {
        window.console.log('分享成功', res);
      },
    });
  };

  // 收藏
  const onCollect = () => {};

  // 保存到相册
  const onDownload = () => {};
  return (
    <Popup
      visible={shareVisible}
      position="bottom"
      style={{ height: '24%' }}
      onClose={() => dispatch({ type: 'goodInfo/update', payload: { shareVisible: false } })}
    >
      <View className="share-box">
        <View className="share-box-top">
          {shareList.map((a) => {
            if (a.title === '分享给朋友') {
              return (
                <View key={a.id} className="share-box-share" onTap={a?.onClick}>
                  <Button className="share-box-share-img share-box-share-botton" open-type="share">
                    <Image mode="widthFix" src={a.img} className="share-img" />
                  </Button>
                  <View className="share-box-share-text">
                    <Text>{a.title}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={a.id} className="share-box-share" onTap={a?.onClick}>
                  <View className="share-box-share-img">
                    <Image mode="widthFix" src={a.img} className="share-img" />
                  </View>
                  <View className="share-box-share-text">
                    <Text>{a.title}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
        {/* <View className="share-image">
          <View
            className="share-image-item1"
            onClick={() => {
              onClickChat();
            }}
          >
            <Text>微信</Text>
          </View>
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
        </View> */}
        <View className="share-box-bottom">
          <Button
            className="botton"
            shape="square"
            onClick={() => dispatch({ type: 'goodInfo/update', payload: { shareVisible: false } })}
          >
            取消
          </Button>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
