import React, { useState, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { Icon, ImagePreview, Swiper, SwiperItem } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import './index.scss';
import { useSelector } from 'react-redux';

const Index = () => {
  const { queryInfo } = useSelector((state) => state.goodInfo);
  const [init, setInit] = useState(0);
  const swiperRef = useRef(null);

  const img = queryInfo?.skuImages?.map((a) => {
    return {
      src: a,
    };
  });
  const arr = queryInfo?.skuImages?.slice(0, 5);
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <View className="cardHeader">
        <Icon
          name="rect-left"
          size="20"
          // style={{ marginRight: 10, color: '#A0A1B4' }}
          className="rect-left"
          onClick={() => swiperRef.current.prev()}
        ></Icon>
        <Swiper
          ref={swiperRef}
          loop
          initPage={init}
          // onChange={(e) => setInit(e)}
          className="cardHeaderImage"
        >
          {queryInfo?.skuImages?.map((item, idx) => {
            return (
              <SwiperItem key={idx}>
                <img src={item} alt="" />
              </SwiperItem>
            );
          })}
        </Swiper>
        <Icon
          name="rect-right"
          size="20"
          style={{ marginLeft: 10 }}
          onClick={() => swiperRef.current.next()}
        ></Icon>

        {/* <Icon name="rect-left" size="20" style={{ marginRight: 10, color: '#A0A1B4' }}></Icon>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={queryInfo?.mainGraph}
          className="cardHeaderImage"
        ></Image>
        <Icon name="rect-right" size="20" style={{ marginLeft: 10 }}></Icon> */}
      </View>
      <View className="cardImages">
        {arr?.map((image, index) => (
          <span key={index} onClick={() => setInit(index + 1)}>
            <img src={image} alt={image} className="cardImagesItem" />
          </span>
        ))}
        <ImagePreview
          images={img}
          show={init}
          initNo={init}
          paginationVisible
          paginationColor="red"
        />

        {/* <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardImagesItem"
        /> */}
        <View className="cardImagesTextBox">
          <Text className="cardImagesText"> 1/7</Text>
        </View>
      </View>
    </View>
  );
};
export default Index;
