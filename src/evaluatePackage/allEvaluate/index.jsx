import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Icon, Empty } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import NavBar from '../../component/navBar';
import { useSelector } from 'react-redux';
import './index.scss';
import moment from 'moment';
import { renderComment } from '@/utils/min';

const Index = () => {
  const { evaluationList, evaluationTotal } = useSelector((state) => state.evaluate);
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
                <Text>全部评价 {`(${evaluationTotal})`}</Text>
              </View>
            </View>
          }
        />
      </View>
      <View>
        <View className="allEvaluate">
          {evaluationList.length === 0 ? (
            <Empty className="empty" description="无数据" imageSize={100} />
          ) : (
            <View className="allEvaluate-info">
              {evaluationList?.map((item) => {
                return (
                  <View key={item.id} className="allEvaluate-info-item">
                    <View className="allEvaluate-info-item-title">
                      <View className="allEvaluate-info-item-title-left">
                        <View className="head-icon">
                          <Image src={item.headUrl} className="head-icon" />
                        </View>
                        <View className="head-name">
                          <Text>{item.consumerName}</Text>
                        </View>
                      </View>
                      <View className="allEvaluate-info-item-title-right">
                        <View style={{ display: 'flex' }}>
                          <Text className="head-type">
                            {item.rating === 1 ? '推荐' : item.rating === 2 ? '一般' : '不推荐'}
                          </Text>
                        </View>

                        <View className="head-size">
                          <Text style={{ margin: '0 4px' }}>
                            {moment(item?.createTime).format('YYYY.MM.DD')}
                          </Text>
                          <Text>{'来自' + item?.orderReceipt}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="allEvaluate-info-item-mid">
                      {renderComment(item.comment, item.receivingDate)}
                    </View>
                    <View className="allEvaluate-info-item-foot">
                      {item?.image?.split(',')?.map((a, i) => {
                        if (a.indexOf('https') !== -1) {
                          return (
                            <View key={i} className="image">
                              <Image src={a} className="image" />
                            </View>
                          );
                        }
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Index;
