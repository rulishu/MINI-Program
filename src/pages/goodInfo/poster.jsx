import React, { useEffect } from 'react';
import './index.scss';
import { Overlay, Divider } from '@nutui/nutui-react-taro';
import { Swiper, SwiperItem, Image, View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';

const WrapperStyle = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
  margin: '120px 0',
};

const PictureStyle = {
  position: 'absolute',
  bottom: '10px',
  backgroundColor: '#ffffff',
  width: '74vw',
  textAlign: 'center',
  padding: '20px 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '16px',
};

const Index = () => {
  const dispatch = useDispatch();
  const { queryInfo, posterVisible, currentIndex, autoplay, interval, duration, posterCode } =
    useSelector((state) => state.goodInfo);
  const { userInfos } = useSelector((state) => state.my);
  useEffect(() => {
    dispatch({
      type: 'goodInfo/miniprogramcode',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = Taro.getStorageSync('token');
    const userInfo = Taro.getStorageSync('userInfo');
    if (token !== '') {
      dispatch({
        type: 'my/getUserInfos',
        payload: {
          id: userInfo.id,
        },
      });
    }
    // eslint-disable-next-line global-require
  }, []);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'goodInfo/update',
      payload: {
        posterVisible: false,
      },
    });
  };
  const switchCard = (e) => {
    let current = e.detail.current;
    dispatch({
      type: 'goodInfo/update',
      payload: {
        currentIndex: current,
      },
    });
  };

  // 最低价
  const min =
    queryInfo?.itemSkuDtos?.reduce((prev, current) => {
      if (current?.membershipPrice < prev) {
        return current?.membershipPrice;
      } else {
        return prev;
      }
    }, Infinity) || 0;

  // 最高价
  const max =
    queryInfo?.itemSkuDtos?.reduce((prev, curr) => {
      return prev?.membershipPrice > curr?.membershipPrice ? prev : curr;
    })?.membershipPrice || 0;

  // 保存图片
  const onPicture = async () => {
    await wx
      .createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .fields({ node: true, size: true })
      .exec((res) => {
        // Canvas 对象
        const canvas = res[0].node;
        // 渲染上下文
        // const ctx = canvas.getContext('2d')
        // 生成图片
        wx.canvasToTempFilePath({
          canvas,
          success: (ress) => {
            // 生成的图片临时文件路径
            const tempFilePath = ress.tempFilePath;
            // console.log('tempFilePath', tempFilePath)
            // 下载
            picture(tempFilePath);
          },
        });
      });
  };

  const picture = async (tempFilePath) => {
    await Taro.getSetting({
      complete() {},
    })
      .then((res) => {
        if (res.authSetting['scope.writePhotosAlbum']) {
          Taro.getImageInfo({
            src: tempFilePath,
            success(result) {
              if (result.path) {
                Taro.saveImageToPhotosAlbum({
                  filePath: result.path,
                }).then((getImageInfoResult) => {
                  if (getImageInfoResult.errMsg === 'saveImageToPhotosAlbum:ok') {
                    Taro.showToast({
                      title: '已成功保存至相册！',
                      icon: 'none',
                      duration: 2000,
                    });
                  } else {
                    Taro.showToast({
                      title: '图片保存失败！',
                      icon: 'none',
                      duration: 2000,
                    });
                  }
                });
              }
            },
          });
        } else {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
          }).then(() => {
            Taro.getImageInfo({
              src: tempFilePath,
              success(result) {
                if (result.path) {
                  Taro.saveImageToPhotosAlbum({
                    filePath: result.path,
                  }).then((getImageInfoResult) => {
                    if (getImageInfoResult.errMsg === 'saveImageToPhotosAlbum:ok') {
                      Taro.showToast({
                        title: '已成功保存至相册！',
                        icon: 'none',
                        duration: 2000,
                      });
                    } else {
                      Taro.showToast({
                        title: '图片保存失败！',
                        icon: 'none',
                        duration: 2000,
                      });
                    }
                  });
                }
              },
            });
          });
        }
      })
      .catch(() => {});
  };

  return (
    <Overlay visible={posterVisible} onClick={onClose}>
      <div style={WrapperStyle}>
        <View class="banner-wrap">
          <Swiper
            class="swiper"
            autoplay={autoplay}
            interval={interval}
            duration={duration}
            circular
            previousMargin="50px"
            nextMargin="50px"
            current="currentIndex"
            onChange={switchCard}
          >
            {queryInfo?.mainGraphs?.map((item, index) => {
              return (
                <SwiperItem class="swiper-item-wrap" key={index}>
                  <canvas
                    type="2d"
                    class={currentIndex == index ? 'swiper-item current' : 'swiper-item'}
                    id="myCanvas"
                  >
                    <View className=".swiper-imgs">
                      <Image class="swiper-item-img" src={item.path}></Image>
                    </View>
                    <View className="poster-info">
                      <View className="poster-info-top">
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                          ¥{min === max ? min : min + '~' + max}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#929292', fontWeight: 300 }}>
                          {' '}
                          原价：¥{queryInfo.price}
                        </Text>
                      </View>
                      <View className="poster-info-middle">
                        <Text>{queryInfo.itemName}</Text>
                      </View>
                      <View className="poster-info-bottom">
                        <View className="poster-info-bottom-left">
                          <View className="poster-info-bottom-left-top">
                            <View className="poster-info-bottom-left-top-img">
                              <Image src={userInfos.headUrl} className="img" />
                            </View>
                            <View style={{ marginLeft: 8, fontSize: 12 }}>
                              <Text>{userInfos.consumerName} 为你推荐</Text>
                            </View>
                          </View>
                          <View className="poster-info-bottom-left-bottom">
                            <Text>值得买的好宝贝，别错过了哟</Text>
                          </View>
                        </View>
                        <View className="poster-info-bottom-right">
                          <Image src={posterCode} className="img" />
                        </View>
                      </View>
                    </View>
                  </canvas>
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
        <View style={PictureStyle}>
          <Text style={{ color: '#A05635' }} onClick={() => onPicture()}>
            {' '}
            保存图片
          </Text>
          <Divider styles={{ color: '#D7D7D7', borderColor: '#D7D7D7', width: '80%' }} />
          <Text onClick={() => onClose()}>取消</Text>
        </View>
      </div>
    </Overlay>
  );
};
export default Index;
