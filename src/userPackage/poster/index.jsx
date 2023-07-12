import React, { useEffect, useState } from 'react';
import { View, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import wechat from '../../assets/images/wechat.svg';
import { useRequest } from 'ahooks';
import save from '../../assets/images/save.svg';
import { miniprogramcode } from '@/server/goodInfo';
import './index.scss';

const Poster = () => {
  const [imgUrl, setImgUrl] = useState('');
  const { run } = useRequest(miniprogramcode, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        setImgUrl(result);
        Taro.hideLoading();
      } else {
        Taro.hideLoading();
      }
    },
  });
  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          src: imgUrl,
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
        <Image className="big_img" src={imgUrl}></Image>
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
