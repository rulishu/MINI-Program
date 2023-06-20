import React from 'react';
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
  // padding: '20px 0',
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
  const onPicture = (img) => {
    // console.log('保存图片', img)
    wx.createSelectorQuery()
      .select('#myCanvas')
      .fields({ node: true, size: true })
      .exec(async (res) => {
        init(res, img);
      });
  };
  const picture = async (tempFilePath) => {
    // console.log('xiazai', tempFilePath)
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

  //canvas单行文本自动省略
  const fittingString = (_ctx, str, maxWidth) => {
    let strWidth = _ctx.measureText(str).width;
    const ellipsis = '…';
    const ellipsisWidth = _ctx.measureText(ellipsis).width;
    if (strWidth <= maxWidth || maxWidth <= ellipsisWidth) {
      return str;
    } else {
      var len = str.length;
      while (strWidth >= maxWidth - ellipsisWidth && len-- > 0) {
        str = str.slice(0, len);
        strWidth = _ctx.measureText(str).width;
      }
      return str + ellipsis;
    }
  };

  const drawBall = (context, canvas, img) => {
    // console.log('drawBall', context, canvas, img)
    function ball() {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.beginPath(0);
      context.fill();
      context.stroke();
      context.font = '24px Arial';
      context.fillStyle = '#000000';
      if (min === max) {
        context.fillText(`¥ ${min === max ? min : min + '~' + max}`, 10, 390, 300);
        context.fillStyle = '#929292';
        context.font = '12px Arial';
        context.fillText(` 原价：¥ ${queryInfo.price}`, 80, 390, 300);
      } else {
        context.fillText(`¥ ${min === max ? min : min + '~' + max}`, 10, 390, 300);
        context.fillStyle = '#929292';
        context.font = '12px Arial';
        context.fillText(` 原价：¥ ${queryInfo.price}`, 140, 390, 300);
      }
      context.fillStyle = '#000000';
      context.font = '16px Arial';
      context.fillText(
        `${fittingString(context, queryInfo.itemName, 280)}`,
        // `${queryInfo.itemName}`,
        10,
        420,
      );
      context.fillStyle = '#000000';
      context.font = '12px Arial';
      context.fillText(`${userInfos.consumerName} 为你推荐`, 50, 450, 250);
      context.fillStyle = '#929292';
      context.font = '10px Arial';
      context.fillText(`值得买的好宝贝，别错过了哟`, 10, 480, 300);
      if (userInfos.headUrl === '' || userInfos.headUrl === undefined) {
        // 绘制
        context.beginPath();
        context.arc(25, 445, 15, 0, Math.PI * 2);
        context.fillStyle = '#D7D7D7';
        context.fill();
      }
    }
    ball();
    // 图片
    const image = canvas.createImage();
    image.src = img;

    image.onload = () => {
      context.drawImage(image, 0, 0, 290, 360); // 图片资源，x坐标，y坐标，图片宽度，图片高度

      // console.log('111', image)
      const image1 = canvas.createImage();
      image1.src = userInfos.headUrl;
      // console.log('userInfos.headUrl,', userInfos.headUrl);
      image1.onload = () => {
        context.save();
        context.beginPath();
        context.arc(25, 445, 15, 0, 2 * Math.PI);
        context.clip(); //剪切路径
        context.drawImage(image1, 10, 430, 30, 30); // 图片资源，x坐标，y坐标，图片宽度，图片高度
        //恢复状态
        context.restore();

        // console.log('222', image1)
        const image2 = canvas.createImage();
        image2.src = posterCode;
        // console.log('userInfos.posterCode,', posterCode);

        image2.onload = () => {
          // console.log('333', image2)
          context.drawImage(image2, 200, 430, 60, 60); // 图片资源，x坐标，y坐标，图片宽度，图片高度

          // 生成图片
          wx.canvasToTempFilePath({
            canvas,
            success: (ress) => {
              // console.log('生成图片', ress)
              // 生成的图片临时文件路径
              const tempFilePath = ress.tempFilePath;
              // 下载
              picture(tempFilePath);
            },
          });
        };
      };
    };
  };

  const init = (res, img) => {
    const width = res[0].width;
    const height = res[0].height;
    const canvas = res[0].node;
    const ctx = canvas.getContext('2d');
    const dpr = wx.getSystemInfoSync().pixelRatio;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    // const renderLoop = () => {
    //   canvas.requestAnimationFrame(renderLoop)
    // }
    // canvas.requestAnimationFrame(renderLoop)
    drawBall(ctx, canvas, img);
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
                  {true && (
                    <canvas
                      style="width: 74vw; height: 100%;background-color:#ffffff;z-index:2;position: absolute; top: 0; left: -10000px;"
                      canvas-id="myCanvas"
                      class="canvas"
                      type="2d"
                      id="myCanvas"
                    ></canvas>
                  )}
                  <View class={currentIndex == index ? 'swiper-item current' : 'swiper-item'}>
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
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
        <View style={PictureStyle}>
          <View
            style={{ width: '100%', paddingTop: 20 }}
            onClick={() => onPicture(queryInfo?.mainGraphs[currentIndex]?.path)}
          >
            <Text style={{ color: '#A05635' }}>保存图片</Text>
          </View>
          <Divider styles={{ color: '#D7D7D7', borderColor: '#D7D7D7', width: '80%' }} />
          <View style={{ width: '100%', paddingBottom: 20 }} onClick={() => onClose()}>
            <Text>取消</Text>
          </View>
        </View>
      </div>
    </Overlay>
  );
};
export default Index;
