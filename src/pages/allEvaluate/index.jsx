import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Icon, Empty } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import NavBar from '../../component/navBar';
import { list } from './item';
import './index.scss';

const Index = () => {
  // 返回上一页
  const goOrderList = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  return (
    <View className="index">
      <View>
        <NavBar
          background="white"
          color="black"
          renderCenter={
            <View className="navbar-head">
              <View className="navbar-head-left">
                <Icon size="18" name="rect-left" onTap={() => goOrderList()} />
              </View>
              <View className="navbar-head-right">
                <Text>全部评价 (1000+)</Text>
              </View>
            </View>
          }
        />
      </View>
      <View>
        <View className="allEvaluate">
          {list.length === 0 ? (
            <Empty className="empty" description="无数据" imageSize={100} />
          ) : (
            <View className="allEvaluate-info">
              {list?.map((item) => (
                <View key={item.id} className="allEvaluate-info-item">
                  <View className="allEvaluate-info-item-title">
                    <View className="allEvaluate-info-item-title-left">
                      <View className="head-icon">
                        <Image src={item.headUrl} className="head-icon" />
                      </View>
                      <View className="head-name">
                        <Text>{item.name}</Text>
                      </View>
                    </View>
                    <View className="allEvaluate-info-item-title-right">
                      {item.type === 1 && (
                        <View style={{ display: 'flex' }}>
                          <Text className="head-type"> 推荐</Text>
                        </View>
                      )}

                      <View className="head-size">
                        <Text>{item.createTime}</Text>
                      </View>
                      <View className="head-size">
                        <Text>来自{item.address}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="allEvaluate-info-item-mid">{item.doc}</View>
                  <View className="allEvaluate-info-item-foot">
                    {item.mainGraphs?.map((a) => (
                      <View key={a.id} className="images">
                        <Image src={a.path} className="image" />
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Index;
