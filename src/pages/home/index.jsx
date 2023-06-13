import React, { useState, useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperItem, Skeleton } from '@nutui/nutui-react-taro';
import homeSearch from '@/assets/images/homeSearch.svg';
import homeAddress from '@/assets/images/homeAddress.svg';
import Navs from './navs';
import { getRequest } from '@/utils/min';
import TabList from './tabList';

const Index = () => {
  const dispatch = useDispatch();
  const { bannerList } = useSelector((state) => state.home);
  // const [initPage1, setInitPage1] = useState(0)
  const [addressInfo, setAddressInfo] = useState('');
  const [homeTopMarginLeft, setHomeTopMarginLeft] = useState(0);
  const [homeTopMarginTop, setHomeTopMarginTop] = useState(0);
  const [homeTopWidth, setHomeTopWidth] = useState(0);
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
  useEffect(() => {
    dispatch({
      type: 'home/getBannerList',
      payload: {
        category: 1,
      },
    });
    // 一级分类
    dispatch({ type: 'home/getLevel' });
    // 获取当前定位
    Taro.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 纬度
        const latitude = res.latitude;
        // 经度
        const longitude = res.longitude;
        // 请求腾讯地图逆地址解析接口
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=ZMJBZ-P6N3G-ICBQ7-QRBK6-UKYBS-IMBB3`,
          success(val) {
            const role = val.data.result.address;
            setAddressInfo(role);
          },
        });
      },
      fail: function () {
        setAddressInfo('点击获取地址位置');
        Taro.showToast({
          title: '获取用户位置信息失败！',
          icon: 'none',
          duration: 2000,
        });
      },
    });

    //获取顶部导航栏位置
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { top, width, height, right } = menuButtonInfo;
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res;
        const margin = top - statusBarHeight;
        const searchWidth = right - width;
        const marginTop = top + margin;
        const navHeight = height + statusBarHeight + margin * 2;
        setHomeTopMarginLeft(margin);
        setHomeTopMarginTop(marginTop);
        setHomeTopWidth(searchWidth);
        setHomeTopNavHeight(navHeight);
      },
      fail: function (res) {
        window.console.log('fail', res);
        Taro.showToast({
          title: '获取定位失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
    // eslint-disable-next-line global-require, react-hooks/exhaustive-deps
  }, []);

  // 点击轮播图跳转
  const goBanner = async (jumpPath) => {
    const url = '/' + jumpPath;
    if (url.indexOf('pages/home/index') !== -1) {
      Taro.switchTab({ url: url });
    } else if (url.indexOf('pages/categories/index') !== -1) {
      Taro.switchTab({ url: url });
    } else if (url.indexOf('pages/select/index') !== -1) {
      Taro.switchTab({ url: url });
    } else if (url.indexOf('pages/cart/index') !== -1) {
      Taro.switchTab({ url: url });
    } else if (url.indexOf('pages/my/index') !== -1) {
      Taro.switchTab({ url: url });
    } else if (url.indexOf('pages/goodInfo/index') !== -1) {
      Taro.navigateTo({ url: `/pages/goodInfo/index?id=${getRequest(url)}` });
    } else {
      Taro.navigateTo({ url: url });
    }
  };

  // 再次获取定位
  const getReAddress = () => {
    // 先判断用户是否已经授权，如果没有授权，则调用 wx.authorize 请求授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户同意授权，可以使用 wx.getLocation 获取定位信息
              wx.getLocation({
                type: 'wgs84',
                success(ress) {
                  const latitude = ress.latitude;
                  const longitude = ress.longitude;
                  // 请求腾讯地图逆地址解析接口
                  wx.request({
                    url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=ZMJBZ-P6N3G-ICBQ7-QRBK6-UKYBS-IMBB3`,
                    success(val) {
                      const role = val.data.result.address;
                      setAddressInfo(role);
                    },
                  });
                },
              });
            },
            fail() {
              // 用户拒绝授权，可以提示用户进入授权设置页面进行授权
              wx.showModal({
                title: '提示',
                content: '请在小程序的设置页面中打开定位权限',
                showCancel: false,
                success(re) {
                  if (re.confirm) {
                    wx.openSetting({
                      success() {
                        // 获取当前定位
                        Taro.getLocation({
                          type: 'wgs84',
                          success: function (ress) {
                            // 纬度
                            const latitude = ress.latitude;
                            // 经度
                            const longitude = ress.longitude;
                            // 请求腾讯地图逆地址解析接口
                            wx.request({
                              url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=ZMJBZ-P6N3G-ICBQ7-QRBK6-UKYBS-IMBB3`,
                              success(val) {
                                const role = val.data.result.address;
                                setAddressInfo(role);
                              },
                            });
                          },
                          fail: function () {
                            setAddressInfo('点击获取地址位置');
                            Taro.showToast({
                              title: '获取用户位置信息失败！',
                              icon: 'none',
                              duration: 2000,
                            });
                          },
                        });
                      },
                    });
                  }
                },
              });
            },
          });
        }
      },
    });
  };

  return (
    <View className="index">
      <View className="page-homes-header-image"></View>
      {/* 首页顶部操作 */}
      <View
        className="home-top"
        style={{ top: homeTopMarginTop, left: homeTopMarginLeft, width: homeTopWidth }}
      >
        <View className="home-top-content">
          <View className="address" onTap={() => getReAddress()}>
            <Skeleton
              width="200px"
              height="10px"
              animated
              avatar
              avatarSize="32px"
              loading={addressInfo ? true : false}
            >
              <Image
                src={homeAddress}
                style={{ width: 14, height: 16, marginLeft: 8, marginRight: 8 }}
                className="homeAddressIcon"
              />
              <Text>{addressInfo ? addressInfo : '点击获取地址位置'}</Text>
            </Skeleton>
          </View>
          <View className="search" onTap={() => Taro.navigateTo({ url: '/pages/search/index' })}>
            <Image src={homeSearch} style={{ width: 18, height: 18, marginLeft: 8 }} />
          </View>
        </View>
      </View>
      {/* 轮播图 */}
      <View className="demo-box home-banner" style={{ top: homeTopNavHeight + 20, height: 200 }}>
        <Skeleton
          loading={bannerList ? true : false}
          width="400px"
          height="200px"
          title
          animated
          style={{ height: 200, width: '100%', marginTop: -20, marginRight: 20 }}
        >
          <Swiper
            paginationColor="#000000"
            autoPlay="3000"
            // initPage={initPage1}
            paginationVisible
            style={{
              height: '200px',
              width: '100%',
              borderRadius: '10px',
            }}
          >
            {bannerList?.map((item) => {
              return (
                <SwiperItem className="home-banner-content" key={item.id}>
                  <Image
                    src={item.path}
                    className="home-banner-content-img"
                    onTap={() => goBanner(item.jumpPath)}
                  />
                </SwiperItem>
              );
            })}
          </Swiper>
        </Skeleton>
      </View>

      {/* 主体内容 */}
      <View className="home-body" style={{ top: homeTopNavHeight + 220 }}>
        <Navs />
        <TabList />
        <View className="tab-footer"></View>
      </View>
    </View>
  );
};
export default Index;
