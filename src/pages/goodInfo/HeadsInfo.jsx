import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Swiper, SwiperItem, Price, Icon, Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import searchLeft from '@/assets/images/searchLeft.svg';
import kefu from '@/assets/images/kefu.svg';
import share from '@/assets/images/share.svg';
import shareblack from '@/assets/images/shareblack.svg';
import cart from '@/assets/images/cart.svg';
import './index.scss';
import { useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  const [navTops, setnavTops] = useState(0);
  const [navLefts, setnavLefts] = useState(0);
  const [current, setCurrent] = useState(1);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange3 = (e) => {
    setCurrent(e + 1);
  };
  const list = [
    'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
    'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
    'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
  ];
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
    <View>
      <View>
        {/* 轮播图/可展示图片和video */}
        <Swiper
          initPage={1}
          loop
          onChange={onChange3}
          pageContent={<div style={pageStyle}> {current} / 4 </div>}
        >
          {list.map((item) => {
            return (
              <SwiperItem key={item}>
                <Image style={{ height: '40vh', width: '100%' }} src={item}></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
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
              onClick={() => {
                dispatch({
                  type: 'goodInfo/update',
                  payload: { shareVisible: true },
                });
              }}
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
            <Price price={98} size="large" needSymbol thousands style={{ color: '#d9001c' }} />
            <Text style={{ color: '#7f7f7f', textDecoration: 'line-through', fontSize: 15 }}>
              ¥218.00
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
              <Text style={{ fontSize: 15, paddingLeft: 5 }}>
                五常民乐自然生态米纯正稻花香 2.5kg/5kg
              </Text>
            </View>
          </View>
          <View style={{ color: '#818181', fontSize: 12 }}>
            源自黄金稻场，产地直供，核心产区，可溯源，当季新米
          </View>
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
          >
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Text style={{ paddingLeft: 15, color: '#7f7f7f' }}>规格</Text>
              <Text style={{ paddingLeft: 15, fontSize: 15 }}>规格值1，规格值2</Text>
            </View>
            <View
              style={{ marginRight: 15, display: 'flex', alignItems: 'center' }}
              onClick={() =>
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: true,
                  },
                })
              }
            >
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
            <Text style={{ paddingLeft: 15, fontSize: 15 }}>免运费</Text>
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
              {list.map((item) => {
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
              onClick={() => dispatch({ type: 'goodInfo/update', payload: { shareVisible: true } })}
            >
              <Image mode="widthFix" src={shareblack} style={{ width: 25, height: 25 }}></Image>
            </View>
            <View>
              <Image mode="widthFix" src={cart} style={{ width: 25, height: 25 }}></Image>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
            <View style={{ marginRight: 10, width: '45%' }}>
              <Button style={{ borderRadius: 0, width: '100%' }}>加入购物车</Button>
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
  );
};
export default Index;
