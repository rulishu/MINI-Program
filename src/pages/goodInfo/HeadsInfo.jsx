import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Swiper, SwiperItem, Price, Icon, Button, Skeleton } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import searchLeft from '@/assets/images/searchLeft.svg';
import kefu from '@/assets/images/kefu.svg';
import share from '@/assets/images/share.svg';
import shareblack from '@/assets/images/shareblack.svg';
import cart from '@/assets/images/cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from './drawer';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { queryInfo, loading } = useSelector((state) => state.goodInfo);
  const [navTops, setnavTops] = useState(0);
  const [navLefts, setnavLefts] = useState(0);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  const list = queryInfo?.mainGraphs ? queryInfo?.mainGraphs?.map((item) => item?.path) : [];
  const itemList = queryInfo?.itemImageDtoList?.map((item) => item?.path);
  useEffect(() => {
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
    const len = queryInfo?.mainGraphs ? queryInfo?.mainGraphs?.map((item) => item?.path) : [];
    setTotal(len?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInfo]);

  const onChange3 = (e) => {
    setCurrent(e + 1);
  };

  const pageStyle = {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: '46px',
    height: '22px',
    background: 'rgba(0, 0, 0, 0.33)',
    borderRadius: '22px',
    textAlign: 'center',
    color: '#fff',
    fontSize: '14px',
  };
  return (
    <Skeleton animated loading={!loading?.global}>
      <View>
        <View>
          {/* 轮播图/可展示图片和video */}
          {queryInfo?.mainGraphs && (
            <Swiper
              initPage={1}
              loop
              onChange={onChange3}
              pageContent={
                <div style={pageStyle}>
                  {' '}
                  {current} / {total}{' '}
                </div>
              }
            >
              {list.map((item) => {
                return (
                  <SwiperItem key={item}>
                    <Image style={{ height: '40vh', width: '100%' }} src={item}></Image>
                  </SwiperItem>
                );
              })}
            </Swiper>
          )}
          {/* 返回/客服/分享按钮 */}
          <View style={{ position: 'fixed', top: navTops, zIndex: 99 }}>
            <View onClick={() => Taro.navigateBack({ delta: 1 })}>
              <Image mode="widthFix" src={searchLeft} style={{ width: 24, height: 24 }}></Image>
            </View>
            <View
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                left: navLefts,
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                  background: '#acacac',
                  marginRight: 10,
                }}
                onClick={() => {}}
              >
                <Image
                  mode="widthFix"
                  src={kefu}
                  style={{ width: 20, height: 20, color: '#ffffff' }}
                ></Image>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                  background: '#acacac',
                }}
                onClick={() =>
                  dispatch({ type: 'goodInfo/update', payload: { shareVisible: true } })
                }
              >
                <Image mode="widthFix" src={share} style={{ width: 20, height: 20 }}></Image>
              </View>
            </View>
          </View>
          {/* 详情文本 */}
          <View
            style={{
              margin: '10px 10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: '#ffffff',
              paddingTop: 25,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Price
                price={queryInfo?.costPrice}
                size="large"
                needSymbol
                thousands
                style={{ color: '#d9001c' }}
              />
              <Text style={{ color: '#7f7f7f', textDecoration: 'line-through', fontSize: 15 }}>
                ¥{queryInfo?.price}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <View>
                <Text
                  style={{
                    color: '#E9E9E9',
                    textColor: '"#999999',
                    background: '#aaaaaa',
                    padding: '0px 5px',
                  }}
                >
                  自营
                </Text>
                <Text style={{ fontSize: 15, paddingLeft: 5 }}>{queryInfo?.itemName}</Text>
              </View>
            </View>
            <View style={{ color: '#818181', fontSize: 12 }}>{queryInfo?.details}</View>
          </View>
          {/* 规格值 */}
          <View
            style={{
              margin: '10px 10px',
              backgroundColor: '#ffffff',
              height: 100,
            }}
          >
            <View
              style={{
                height: '50%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f2f2f2',
              }}
              onClick={() =>
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: true,
                  },
                })
              }
            >
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Text style={{ paddingLeft: 15, color: '#7f7f7f' }}>规格</Text>
                {queryInfo?.itemSkuDtos?.at(0)?.attributes?.map((item) => {
                  return (
                    <Text style={{ paddingLeft: 15, fontSize: 15 }} key={item?.attributeId}>
                      {item?.attributeName}
                    </Text>
                  );
                })}
              </View>
              <View style={{ marginRight: 15, display: 'flex', alignItems: 'center' }}>
                <Icon name="rect-right" size={20}></Icon>
              </View>
            </View>
            <View
              style={{
                height: '50%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Text style={{ paddingLeft: 15, color: '#7f7f7f' }}>运费</Text>
              <Text style={{ paddingLeft: 15, fontSize: 15 }}>{queryInfo?.templateName}</Text>
            </View>
            {/* 商品详情 */}
            <View
              style={{
                margin: '10px 0',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <View style={{ marginLeft: 15, marginTop: 20 }}>商品详情</View>
              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {itemList?.map((item) => {
                  return (
                    <View key={item} style={{ width: '100%', display: 'flex' }}>
                      <Image src={item} style={{ width: '100%', margin: '5px 15px' }}></Image>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ marginBottom: 50 }}></View>
          </View>
          {/* 页脚按钮 */}
          <View
            style={{
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px 0 15px 0',
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', marginRight: 25, width: '20%' }}>
              <View
                style={{ marginRight: 15, marginLeft: 15 }}
                onClick={() =>
                  dispatch({ type: 'goodInfo/update', payload: { shareVisible: true } })
                }
              >
                <Image mode="widthFix" src={shareblack} style={{ width: 25, height: 25 }}></Image>
              </View>
              <View>
                <Image mode="widthFix" src={cart} style={{ width: 25, height: 25 }}></Image>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
              <View style={{ marginRight: 10, width: '45%' }}>
                <Button
                  style={{ borderRadius: 0, width: '100%' }}
                  onClick={() => {
                    dispatch({
                      type: 'goodInfo/update',
                      payload: {
                        visible: true,
                        type: 'addCart',
                      },
                    });
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
                    dispatch({
                      type: 'goodInfo/update',
                      payload: {
                        visible: true,
                        type: 'nowCart',
                      },
                    });
                  }}
                >
                  立即购买
                </Button>
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
