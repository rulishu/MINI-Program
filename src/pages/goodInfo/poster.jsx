import React, { useEffect } from 'react';
import './index.scss';
import { Overlay } from '@nutui/nutui-react-taro';
import { Swiper, SwiperItem, Image, View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';

const WrapperStyle = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

const Index = () => {
  const dispatch = useDispatch();
  const { queryInfo, posterVisible, currentIndex, autoplay, interval, duration, posterCode } =
    useSelector((state) => state.goodInfo);
  useEffect(() => {
    dispatch({
      type: 'goodInfo/miniprogramcode',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <View class={currentIndex == index ? 'swiper-item current' : 'swiper-item'}>
                    <View className=".swiper-imgs">
                      <Image showMenuByLongpress class="swiper-item-img" src={item.path}></Image>
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
                              <Image
                                src="https://sucai.suoluomei.cn/sucai_zs/images/20191203142553-10e8e9b9f13c14b6ac3aa516a30802b.png"
                                className="img"
                              />
                            </View>
                            <View style={{ marginLeft: 8, fontSize: 12 }}>
                              <Text>333为你推荐</Text>
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
      </div>
    </Overlay>
  );
};
export default Index;
