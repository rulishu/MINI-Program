import React from 'react';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { getRequest } from '@/utils/min';
import './index.scss';

const Navs = () => {
  const { activityList } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  // 点击活动图跳转
  const goActivity = async (jumpPath) => {
    const url = '/' + jumpPath;
    if (url.indexOf('pages/home/index') !== -1) {
      Taro.switchTab({ url: url });
      dispatch({
        type: 'global/update',
        payload: {
          activeIndex: 0,
        },
      });
    } else if (url.indexOf('pages/categories/index') !== -1) {
      Taro.switchTab({ url: url });
      dispatch({
        type: 'global/update',
        payload: {
          activeIndex: 1,
        },
      });
    } else if (url.indexOf('pages/select/index') !== -1) {
      Taro.switchTab({ url: url });
      dispatch({
        type: 'global/update',
        payload: {
          activeIndex: 2,
        },
      });
    } else if (url.indexOf('pages/cart/index') !== -1) {
      Taro.switchTab({ url: url });
      dispatch({
        type: 'global/update',
        payload: {
          activeIndex: 3,
        },
      });
    } else if (url.indexOf('pages/my/index') !== -1) {
      Taro.switchTab({ url: url });
      dispatch({
        type: 'global/update',
        payload: {
          activeIndex: 4,
        },
      });
    } else if (url.indexOf('goodsPackage/goodInfo/index') !== -1) {
      Taro.navigateTo({ url: `/goodsPackage/goodInfo/index?id=${getRequest(url)}` });
    } else {
      Taro.navigateTo({ url: url });
    }
  };

  return (
    <View className="nav">
      <Skeleton
        loading={activityList?.at(0)?.path !== '' ? true : false}
        width="auto"
        height="auto"
        title
        animated
        className="nav-activity"
      >
        <View className="nav-activity">
          <Image
            src={activityList?.at(0)?.path}
            style={{ width: '100%', height: '100%' }}
            onTap={() => goActivity(activityList?.at(0)?.jumpPath)}
          />
        </View>
      </Skeleton>
      <View className="nav-content">
        <View className="nav-escort-clan">
          {/* <Skeleton loading={activityList?.at(1)?.path ? true : false} width="auto" height="auto" title animated className="nav-escort-clan"> */}
          <Image
            src={activityList?.at(1)?.path}
            style={{ width: '100%', height: '100%' }}
            onTap={() => goActivity(activityList?.at(1)?.jumpPath)}
          />
          {/* </Skeleton> */}
        </View>
        <View className="nav-content-right">
          <Skeleton
            loading={activityList?.at(2)?.path ? true : false}
            width="auto"
            height="auto"
            title
            animated
            className="nav-customize-now"
          >
            <View className="nav-customize-now">
              <Image
                src={activityList?.at(2)?.path}
                style={{ width: '100%', height: '100%' }}
                onTap={() => goActivity(activityList?.at(2)?.jumpPath)}
              />
            </View>
          </Skeleton>
          <Skeleton
            loading={activityList?.at(3)?.path ? true : false}
            width="auto"
            height="auto"
            title
            animated
            className="nav-member-exclusive"
          >
            <View className="nav-member-exclusive">
              <Image
                src={activityList?.at(3)?.path}
                style={{ width: '100%', height: '100%' }}
                onTap={() => goActivity(activityList?.at(3)?.jumpPath)}
              />
            </View>
          </Skeleton>
        </View>
      </View>
      <View className="nav-content-foot1">
        <View className="nav-self-operated-zone">
          {/* <Skeleton loading={activityList?.at(4)?.path ? true : false} width="auto" height="auto" title animated className="nav-self-operated-zone"> */}
          <Image
            src={activityList?.at(4)?.path}
            style={{ width: '100%', height: '100%' }}
            onTap={() => goActivity(activityList?.at(4)?.jumpPath)}
          />
          {/* </Skeleton> */}
        </View>
        <View className="nav-self-operated-zone">
          {/* <Skeleton loading={activityList?.at(5)?.path ? true : false} width="auto" height="auto" title animated className="nav-self-operated-zone"> */}
          <Image
            src={activityList?.at(5)?.path}
            style={{ width: '100%', height: '100%' }}
            onTap={() => goActivity(activityList?.at(5)?.jumpPath)}
          />
          {/* </Skeleton> */}
        </View>
      </View>
      <Skeleton
        loading={activityList?.at(6)?.path ? true : false}
        width="auto"
        height="auto"
        title
        animated
        className="nav-content-foot2"
      >
        <View className="nav-content-foot2">
          <Image
            src={activityList?.at(6)?.path}
            style={{ width: '100%', height: '100%' }}
            onTap={() => goActivity(activityList?.at(6)?.jumpPath)}
          />
        </View>
      </Skeleton>
    </View>
  );
};
export default Navs;
