import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import homeAdd from '@/assets/images/homeAdd.svg';
import homeNoAdd from '@/assets/images/homeNoAdd.svg';
import { Skeleton } from '@nutui/nutui-react-taro';
import { useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const GoodList = (props) => {
  const dispatch = useDispatch();
  const { dataList } = props;

  // 跳转商品详情
  const goGoodInfo = async (itm) => {
    if (itm.stock === 0) {
      return Taro.showToast({
        title: '该商品已售空',
        icon: 'none',
        duration: 2000,
      });
    }
    await dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: itm?.id,
      },
    });
    Taro.navigateTo({ url: '/pages/goodInfo/index' });
  };

  // 最低价
  const min = (data) => {
    const datas = data.filter((vel) => {
      return vel.price !== 0;
    });
    let str =
      datas?.reduce((prev, current) => {
        if (current?.membershipPrice < prev) {
          return current?.membershipPrice;
        } else {
          return prev;
        }
      }, Infinity) || 0;
    if (str === Infinity) {
      return '';
    } else {
      return '¥' + str;
    }
  };

  // 最高价
  const aPrice = (sma, item) => {
    if (sma === Infinity) {
      return;
    }
    let price = sma.replace(/[^0-9]/gi, '');
    let str = item
      ?.filter((a) => {
        return a.membershipPrice === Number(price);
      })
      .map((e) => e.referencePrice)
      .flat();
    // js 过滤空值
    let str2 = str?.filter((s) => {
      return s;
    });
    // js 最小值
    let str3 = Math.min(...str2);
    if (str3?.length === 0 || str3 === undefined || str3 === Infinity) {
      return;
    } else {
      return '¥' + str3?.toString();
    }
  };

  return (
    <View className="list">
      {dataList.map((item) => {
        return (
          <View
            className="middle-search-result-info-item"
            key={item.id}
            onTap={() => goGoodInfo(item)}
          >
            <View className="search-result-image">
              <Skeleton
                loading={item.mainGraph ? true : false}
                width="auto"
                height="auto"
                title
                animated
                className="search-result-image"
              >
                <Image mode="widthFix" src={item.mainGraph} className="image"></Image>
              </Skeleton>
              {item.stock === 0 && (
                <View className="image-state">
                  <Text>{item.stock === 0 ? '已售空' : ''}</Text>
                </View>
              )}
            </View>
            <View className="search-result-content">
              <View className="search-result-content-head">
                <Text className="tag">{item.suppliersId === 1 ? '自营' : '严选'}</Text>
                <Text className="title">{item.itemName}</Text>
              </View>
              <View className="search-result-content-middle">
                {item?.savedPrice === 0 ||
                item?.savedPrice === '' ||
                item?.savedPrice === undefined ? (
                    <Text></Text>
                  ) : (
                    <>
                      <Text className="activity">自购省</Text>
                      <Text className="activity-price">¥ {item?.savedPrice}</Text>
                    </>
                  )}
              </View>
              <View className="search-result-content-bottom">
                <View>
                  <Text className="lastPrice">{min(item.itemSkuDtos) || '¥0'}</Text>
                  <Text className="firstPrice">
                    {aPrice(min(item.itemSkuDtos), item.itemSkuDtos)}
                  </Text>
                </View>
                <View className="searchCart">
                  <Image
                    mode="widthFix"
                    src={item.stock === 0 ? homeNoAdd : homeAdd}
                    className="searchCart"
                  ></Image>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default GoodList;
