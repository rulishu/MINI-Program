import React from 'react';
import { View, Text } from '@tarojs/components'; //Image
import { data } from './item';
import './index.scss';

const Navs = () => {
  return (
    <View className="nav">
      <View className="nav-activity">
        <Text>{data?.activityList?.at(0)?.title}</Text>
        {/* <Image src={data?.activityList?.at(0)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
      </View>
      <View className="nav-content">
        <View className="nav-escort-clan">
          <Text>{data?.activityList?.at(1)?.title}</Text>
          {/* <Image src={data?.activityList?.at(1)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
        </View>
        <View className="nav-content-right">
          <View className="nav-customize-now">
            <Text>{data?.activityList?.at(2)?.title}</Text>
            {/* <Image src={data?.activityList?.at(2)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
          </View>
          <View className="nav-member-exclusive">
            <Text>{data?.activityList?.at(3)?.title}</Text>
            {/* <Image src={data?.activityList?.at(3)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
          </View>
        </View>
      </View>
      <View className="nav-content-foot1">
        <View className="nav-self-operated-zone">
          <Text>{data?.activityList?.at(4)?.title}</Text>
          {/* <Image src={data?.activityList?.at(4)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
        </View>
        <View className="nav-self-operated-zone">
          {/* <Text>镖族严选</Text> */}
          <Text>{data?.activityList?.at(5)?.title}</Text>
          {/* <Image src={data?.activityList?.at(5)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
        </View>
      </View>
      <View className="nav-content-foot2">
        <Text>{data?.activityList?.at(6)?.title}</Text>
        {/* <Image src={data?.activityList?.at(6)?.carousel} style={{ width: '100%', height: '100%' }} /> */}
      </View>
    </View>
  );
};
export default Navs;
