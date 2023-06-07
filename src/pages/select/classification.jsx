import React, { useEffect } from 'react';
import { View, Text, Image, Video } from '@tarojs/components';
import { Swiper, SwiperItem, Skeleton } from '@nutui/nutui-react-taro';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';

const Index = (props) => {
  const dispatch = useDispatch();
  const { itemList, title } = props;
  const { secondLevelAreaClassAgent, list } = useSelector((state) => state.select);
  useEffect(() => {
    dispatch({
      type: 'select/selectList',
      payload: {
        pageNum: 1,
        pageSize: 20,
        provenance: parseInt(secondLevelAreaClassAgent.at(0)?.areaId),
      },
    });
    // eslint-disable-next-line global-require, react-hooks/exhaustive-deps
  }, [secondLevelAreaClassAgent.at(0)?.areaId]);

  // 轮播视频
  const videos = itemList?.videos?.split(',');

  // 会员价
  const min = (item) => {
    const data = item.filter((vel) => {
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
    if (str2?.length === 0 || str2 === undefined) {
      return;
    } else {
      return '¥' + str2;
    }
  };

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
              paginationColor="#426543"
              autoPlay="3000"
              initPage={0}
              paginationVisible
            >
              {videos?.map((val, index) => (
                <SwiperItem key={index}>
                  <Video
                    id="video"
                    src={val}
                    initialTime={0}
                    autoplay={false}
                    loop={false}
                    muted={false}
                  />
                </SwiperItem>
              ))}
            </Swiper>
          </View>
        )}

        <View className="classification-content-goods">
          {list?.map((vel) => (
            <View className="middle-search-result-info-item" key={vel.id}>
              <View className="search-result-image">
                <Skeleton
                  loading={vel.mainGraph ? true : false}
                  width="auto"
                  height="auto"
                  title
                  animated
                  className="search-result-image"
                >
                  <Image mode="widthFix" src={vel.mainGraph} className="image"></Image>
                </Skeleton>
              </View>
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
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default Index;
