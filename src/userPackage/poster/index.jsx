import React from 'react';
import { View, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import wechat from '../../assets/images/wechat.svg';
import save from '../../assets/images/save.svg';
import './index.scss';

const Poster = () => {
  const share = () => {
    wx.updateShareMenu({
      withShareTicket: true,
      fail(res) {
        Taro.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };
  const saveImg = () => {
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success() {
        wx.getImageInfo({
          src: '../../assets/images/logo.png',
          success(imgres) {
            wx.saveImageToPhotosAlbum({
              filePath: imgres.path,
              success() {
                Taro.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 3000,
                });
              },
              fail(res) {
                Taro.showToast({
                  title: res.errMsg,
                  icon: 'none',
                  duration: 2000,
                });
              },
            });
          },
          fail(res) {
            Taro.showToast({
              title: res.errMsg,
              icon: 'none',
              duration: 2000,
            });
          },
        });
      },
      fail() {
        Taro.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };
  return (
    <View>
      <View className="big_img_view">
        <Image className="big_img"></Image>
      </View>

      <View className="button_group">
        <View>
          <View className="button_view">
            <View className="img_position">
              <Image className="img" src={wechat}></Image>
            </View>
            <Button
              plain="true"
              onClick={share}
              className="but_position"
              open-type="share"
            ></Button>
          </View>
          <View>分享到微信</View>
        </View>
        <View className="img_view">
          <View>
            <Image className="img" onClick={saveImg} src={save}></Image>
          </View>
          <View>保存图片</View>
        </View>
      </View>
    </View>
  );
};
export default Poster;
