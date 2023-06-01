import React from 'react';
import './index.scss';
import { Overlay } from '@nutui/nutui-react-taro';
import { Swiper, SwiperItem, Image, View } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';

const WrapperStyle = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

const Index = () => {
  const dispatch = useDispatch();
  const { posterVisible, currentIndex, list, autoplay, interval, duration } = useSelector(
    (state) => state.goodInfo,
  );

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
            {list.map((item, index) => {
              return (
                <SwiperItem class="swiper-item-wrap" key={index}>
                  <view class={currentIndex == index ? 'swiper-item current' : 'swiper-item'}>
                    <Image showMenuByLongpress class="swiper-item-img" src={item.img}></Image>
                  </view>
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
