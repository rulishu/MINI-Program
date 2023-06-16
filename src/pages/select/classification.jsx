import React, { useState } from 'react';
import { View, Text, Video } from '@tarojs/components';
import { Swiper, SwiperItem, Grid, GridItem } from '@nutui/nutui-react-taro';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';

const Index = (props) => {
  const dispatch = useDispatch();
  const { itemList, title } = props;
  const { list, currentIndex, interval } = useSelector((state) => state.select);
  // 轮播视频
  const videos = itemList?.videos?.split(',');
  const [video, setVideos] = useState(videos?.at(0));

  // 会员价
  const min = (item) => {
    const data = item?.filter((vel) => {
      return vel.price !== 0;
    });
    let str =
      data?.reduce((prev, current) => {
        if (current?.membershipPrice < prev) {
          return current?.membershipPrice;
        } else {
          return prev;
        }
      }, Infinity) || 0;
    if (str === Infinity) {
      return 0;
    } else {
      return str;
    }
  };

  // 参考价
  const aPrice = (sma, item) => {
    if (sma === Infinity) {
      return;
    }
    let str = item
      ?.filter((a) => {
        return a.membershipPrice === sma;
      })
      .map((e) => e.referencePrice)
      .flat();
    // js 过滤空值
    let str2 = str?.filter((s) => {
      return s;
    });
    if (str2 === undefined) {
      return;
    }
    // js 最小值
    let str3 = Math.min(...str2);
    if (str3?.length === 0 || str3 === undefined || str3 === Infinity) {
      return;
    } else {
      return '¥' + str3;
    }
  };

  // 视频轮播
  const switchCard = (e) => {
    dispatch({
      type: 'select/update',
      payload: {
        currentIndex: e,
      },
    });
    setVideos(videos?.at(e));
  };
  const w = Taro.getSystemInfoSync().screenWidth - 20;
  return (
    <View className="classification">
      <View className="classification-content">
        <View className="classification-content-title">
          <Text>{title}</Text>
        </View>
        {videos && (
          <View className="classification-content-banner">
            <Swiper
              height={150}
              width={250}
              paginationColor="#426543"
              autoPlay="3000"
              interval={interval}
              current={currentIndex}
              paginationVisible
              onChange={switchCard}
              style={{
                height: '150px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {videos?.map((val, index) => {
                return (
                  <SwiperItem
                    key={index}
                    style={{
                      height: '150px',
                      width: w,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Video
                      style={{
                        height: '150px',
                        width: w,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      id="video"
                      src={video}
                      initialTime={0}
                      autoplay
                      loop
                      muted={false}
                      playBtnPosition="center"
                    />
                  </SwiperItem>
                );
              })}
            </Swiper>
          </View>
        )}

        <View className="classification-content-goods">
          <Grid gutter={3}>
            {list?.map((vel) => (
              <GridItem
                icon={vel.mainGraph}
                key={vel.id}
                iconSize="77"
                className="middle-search-result-info-item"
                text={
                  <View className="search-result-content">
                    <View className="search-result-content-head">
                      <Text className="title">{vel.itemName}</Text>
                    </View>
                    <View className="search-result-content-bottom">
                      <View>
                        <Text className="lastPrice">
                          <Text style={{ fontSize: 8 }}>¥ </Text>
                          {min(vel.itemSkuDtos) || 0}
                        </Text>
                        <Text className="firstPrice">
                          {aPrice(min(vel.itemSkuDtos), vel.itemSkuDtos)}
                        </Text>
                      </View>
                    </View>
                  </View>
                }
              ></GridItem>
            ))}
          </Grid>
          {list.length !== 0 ? (
            <View className="pageEnd">
              <Text>——页面到底了——</Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </View>
  );
};
export default Index;
