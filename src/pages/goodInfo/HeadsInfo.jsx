import React, { useState, useEffect } from 'react';
import { View, Text, Image, Video } from '@tarojs/components';
import { Swiper, SwiperItem, Icon, Button, Skeleton, Tag } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import searchLeft from '@/assets/images/searchLeft.svg';
import kefu from '@/assets/images/kefu.svg';
import share from '@/assets/images/share.svg';
import shareblack from '@/assets/images/shareblack.svg';
import cart from '@/assets/images/cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from './drawer';
import { min, aPrice } from '@/utils/min';
import { Countdown, Badge } from '@taroify/core';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { queryInfo, activeSku, swiperList } = useSelector((state) => state.goodInfo);
  const { evaluationRating, evaluationList } = useSelector((state) => state.evaluate);
  const [navTops, setnavTops] = useState(0);
  const [navLefts, setnavLefts] = useState(0);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const pageHistory = getCurrentPages();

  const itemList = queryInfo?.itemImageDtoList?.map((item) => item?.path);

  useEffect(() => {
    // 获取胶囊的位置
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { top, width, right } = menuButtonInfo;
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res;
        const margin = top - statusBarHeight;
        // const navHeight = height + statusBarHeight + margin * 2; //导航栏总高
        // const searchMarginTop = statusBarHeight + margin // 状态栏 + 胶囊按钮边距
        const searchHeight = top + margin; // 与胶囊按钮同高
        const searchWidth = right - width; // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        setnavTops(searchHeight);
        setnavLefts(searchWidth);
      },
    });
    // 轮播图
    const len = queryInfo?.mainGraphs ? queryInfo?.mainGraphs?.map((item) => item?.path) : [];
    const newLen = queryInfo?.itemVideo ? len.concat(queryInfo?.itemVideo) : len;
    setTotal(newLen?.length);
  }, [queryInfo]);

  const onChange3 = (e) => {
    setCurrent(e + 1);
  };
  const title = () => {
    if (queryInfo?.onShelf === 0) {
      return '商品已下架';
    } else if (queryInfo?.stock === 0) {
      return '商品已售空';
    } else if (queryInfo?.isDelete === 1) {
      return '商品已删除';
    }
  };
  const onClickCart = (type) => {
    const token = Taro.getStorageSync('token');
    if (token === '') {
      Taro.navigateTo({ url: '/pages/login/index' });
    } else if (queryInfo?.onShelf === 0) {
      Taro.showToast({
        title: '商品已下架',
        icon: 'none',
        duration: 2000,
      });
    } else if (queryInfo?.stock === 0) {
      Taro.showToast({
        title: '商品已售空',
        icon: 'none',
        duration: 2000,
      });
    } else if (queryInfo?.isDelete === 1) {
      Taro.showToast({
        title: '商品已删除',
        icon: 'none',
        duration: 2000,
      });
    } else {
      if (type === 'addCart') {
        dispatch({
          type: 'goodInfo/update',
          payload: {
            visible: true,
            type: 'addCart',
          },
        });
      } else if (type === 'nowCart') {
        dispatch({
          type: 'goodInfo/update',
          payload: {
            visible: true,
            type: 'nowCart',
          },
        });
      }
    }
  };

  return (
    <Skeleton animated loading={queryInfo?.mainGraphs ? true : false}>
      <View>
        <View>
          {/* 轮播图/可展示图片和video */}
          <Swiper
            loop
            onChange={onChange3}
            pageContent={
              <div className="currentPages">
                {current} / {total}
              </div>
            }
          >
            {swiperList.map((item, index) =>
              item?.type === 'video' ? (
                <SwiperItem key={index}>
                  <Video
                    controls
                    autoplay
                    muted
                    showBottomProgress
                    showMuteBtn
                    loop={false}
                    showFullscreenBtn={false}
                    id="video"
                    style={{ height: '40vh', width: '100%' }}
                    src={item?.url}
                    initialTime={0}
                  />
                </SwiperItem>
              ) : (
                <SwiperItem key={index}>
                  <Image style={{ height: '40vh', width: '100%' }} src={item?.url} />
                </SwiperItem>
              ),
            )}
          </Swiper>
          {/* 返回/客服/分享按钮 */}
          <View style={{ position: 'fixed', top: navTops, zIndex: 99 }}>
            <View
              onClick={() => {
                if (pageHistory.length <= 1) {
                  dispatch({
                    type: 'global/update',
                    payload: {
                      activeIndex: 0,
                    },
                  });
                  Taro.reLaunch({ url: '/pages/home/index' });
                } else {
                  Taro.navigateBack({ delta: 1 });
                }
              }}
            >
              <Image mode="widthFix" src={searchLeft} style={{ width: 24, height: 24 }} />
            </View>
            <View className="shareButtonsBox" style={{ left: navLefts }}>
              <View className="shareButtonsBox-kefu">
                <Image
                  mode="widthFix"
                  src={kefu}
                  style={{ width: 20, height: 20, color: '#ffffff' }}
                />
              </View>
              <View
                className="shareButtonsBox-share"
                onClick={() =>
                  dispatch({ type: 'goodInfo/update', payload: { shareVisible: true } })
                }
              >
                <Image mode="widthFix" src={share} style={{ width: 20, height: 20 }} />
              </View>
            </View>
          </View>
          {/* 限时抢购 */}
          <View className="flashSale">
            <View className="flashSaleBox">
              <View className="flashSaleBox-left">
                <View className="flashSaleBox-left-title">限时抢购</View>
                <View className="flashSaleBox-left-number">已抢0件</View>
              </View>
              <View className="flashSaleBox-right">
                <View className="flashSaleBox-right-title">距离开枪仅剩16天</View>
                <Countdown value={30 * 60 * 60 * 1000}>
                  {(curr) => (
                    <>
                      <View className="block">{curr.hours}</View>
                      <View className="colon">:</View>
                      <View className="block">{curr.minutes}</View>
                      <View className="colon">:</View>
                      <View className="block">{curr.seconds}</View>
                    </>
                  )}
                </Countdown>
              </View>
            </View>
          </View>
          {/* 详情文本 */}
          <View className="detailTextBox">
            <View className="detailTextBox-price">
              <Text style={{ color: '#d9001c', fontSize: 24 }}>
                {queryInfo?.itemSkuDtos && min(queryInfo?.itemSkuDtos)}
              </Text>
              <Text style={{ color: '#7f7f7f', textDecoration: 'line-through', fontSize: 15 }}>
                {queryInfo?.itemSkuDtos &&
                  aPrice(min(queryInfo?.itemSkuDtos), queryInfo?.itemSkuDtos)}
              </Text>
            </View>
            <View className="detailTextBox-state">
              <View style={{ width: '100%' }}>
                <Tag color="rgb(170, 170, 170)">
                  {queryInfo?.suppliersId === 1 ? '自营' : '严选'}
                </Tag>
                <Text style={{ fontSize: 15, paddingLeft: 5 }}>{queryInfo?.itemName}</Text>
              </View>
            </View>
            <View style={{ color: '#818181', fontSize: 12 }}>{queryInfo?.details}</View>
          </View>
          {/* 优惠卷 */}
          <View
            className="couponDetailBox"
            onClick={() => dispatch({ type: 'goodInfo/update', payload: { couponVisible: true } })}
          >
            <View className="couponDetailBox-layout">
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ paddingLeft: 15, paddingRight: 15, color: '#7f7f7f' }}>优惠卷</Text>
                <View className="couponDetailBox-content">满100减10</View>
              </View>
              <View style={{ marginRight: 15, display: 'flex', alignItems: 'center' }}>
                <Icon name="rect-right" size={20}></Icon>
              </View>
            </View>
          </View>
          {/* 规格值 */}
          <View style={{ margin: '10px 10px', backgroundColor: '#ffffff', height: 100 }}>
            <View
              className="skuDetailBox"
              onClick={() =>
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: true,
                    type: 'skuCart',
                  },
                })
              }
            >
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ paddingLeft: 15, color: '#7f7f7f' }}>规格</Text>
                {activeSku?.length === 0 ? (
                  <Text style={{ paddingLeft: 15, fontSize: 15 }}>请选择规格</Text>
                ) : (
                  Object.keys(activeSku).map((item) => {
                    return (
                      <Text style={{ paddingLeft: 15, fontSize: 15 }} key={item?.attributeId}>
                        {`${activeSku[item]?.value}`}
                      </Text>
                    );
                  })
                )}
              </View>
              <View style={{ marginRight: 15, display: 'flex', alignItems: 'center' }}>
                <Icon name="rect-right" size={20}></Icon>
              </View>
            </View>
            {/* 运费 */}
            <View className="freightDetailBox">
              <Text style={{ paddingLeft: 15, color: '#7f7f7f' }}>运费</Text>
              <Text style={{ paddingLeft: 15, fontSize: 15 }}>{queryInfo?.templateName}</Text>
            </View>
            {/* 评价 */}
            {evaluationRating.length > 0 && (
              <View
                className="commentDetailBox"
                onClick={() => Taro.navigateTo({ url: '/pagesB/allEvaluate/index' })}
              >
                <View style={{ width: '100%', padding: '10px 15px', height: '30%' }}>
                  <View className="commentDetailBox-header">
                    <View>
                      <Text>评价</Text>
                      <Text>{`(${evaluationList?.length})`}</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                      <Text>查看全部</Text>
                      <Icon name="rect-right" size={20}></Icon>
                    </View>
                  </View>
                </View>
                {evaluationRating?.slice(0, 2).map((item) => {
                  return (
                    <View className="commentDetailBox-content" key={item?.id}>
                      <View className="commentDetailBox-content-box">
                        <View className="commentDetailBox-content-box-left">
                          <View style={{ width: 20, height: 20 }}>
                            <Image
                              mode="widthFix"
                              src={item?.headUrl}
                              style={{ width: 20, height: 20, background: '#aaaaaa' }}
                            ></Image>
                          </View>
                          <View style={{ paddingLeft: 5 }}>{item?.consumerName}</View>
                        </View>
                        <View className="commentDetailBox-content-box-right">
                          <Tag color="#965A3C" style={{ fontSize: 10 }}>
                            推荐
                          </Tag>
                          <Text>{item?.createTime}</Text>
                          {/* <Text style={{ paddingLeft: 2 }}>来自四川</Text> */}
                        </View>
                      </View>
                      <View className="evaluationInfo">{item?.comment}</View>
                    </View>
                  );
                })}
              </View>
            )}
            {/* 商品详情 */}
            <View className="goodInfoDetailBox">
              <View style={{ marginLeft: 15, marginTop: 20 }}>商品详情</View>
              <View className="goodInfoDetailBox-list">
                {itemList?.map((item) => {
                  return (
                    <View key={item} style={{ width: '100%', display: 'flex' }}>
                      <Image src={item} style={{ width: '100%', margin: '5px 15px' }}></Image>
                    </View>
                  );
                })}
              </View>
              <View style={{ marginBottom: 70 }}></View>
            </View>
          </View>
          {/* 页脚按钮 */}
          <View className="footButtonsBox">
            {(queryInfo?.onShelf === 0 || queryInfo?.stock === 0 || queryInfo?.isDelete === 1) && (
              <View className="footButtonsBox-title">{title()}</View>
            )}
            <View className="footButtonsBox-buttons">
              <View className="footButtonsBox-buttons-box">
                <View
                  style={{ marginRight: 15, marginLeft: 15 }}
                  onClick={() =>
                    dispatch({ type: 'goodInfo/update', payload: { shareVisible: true } })
                  }
                >
                  <Image mode="widthFix" src={shareblack} style={{ width: 25, height: 25 }}></Image>
                </View>
                <View>
                  <Badge content={1}>
                    <Image mode="widthFix" src={cart} style={{ width: 25, height: 25 }}></Image>
                  </Badge>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
                <View style={{ marginRight: 10, width: '45%' }}>
                  <Button
                    style={{ borderRadius: 0, width: '100%' }}
                    onClick={() => {
                      onClickCart('addCart');
                    }}
                  >
                    加入购物车
                  </Button>
                </View>
                <View style={{ width: '45%' }}>
                  <Button
                    type="primary"
                    style={{ borderRadius: 0, width: '100%' }}
                    onClick={() => {
                      onClickCart('nowCart');
                    }}
                  >
                    立即购买
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Drawer />
    </Skeleton>
  );
};
export default Index;
