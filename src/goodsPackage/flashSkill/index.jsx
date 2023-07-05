import React, { useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import flashSkill from '@/assets/images/flashSkill.png';
import PullList from '@/component/pullList';
import { useDispatch } from 'react-redux';
import { Button } from '@taroify/core';
import { getFlashList } from '@/server/flashSkill';
import './index.scss';

const Index = () => {
  // const { pageNum, pageSize } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();
  // const updateFn = (payload) => {
  //   dispatch({
  //     type: 'flashSkill/update',
  //     payload: payload,
  //   });
  // };
  useEffect(() => {
    dispatch({
      type: 'flashSkill/getFlashDetails',
      payload: 49,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className="flashSkillBox">
      <View className="flashSkillBoxHeader">
        <View className="flashSkillBoxHeader-image">
          <Image mode="widthFix" src={flashSkill} className="flashSkillBoxHeader-image"></Image>
        </View>
        <View className="flashSkillBoxText">秒杀商品数量有限，先到先得~</View>
      </View>
      <View className="flashSkillBoxList">
        <PullList
          request={getFlashList}
          params={{ activityId: 49 }}
          style={{ height: '60vh' }}
          renderList={(dataSource) => {
            return dataSource?.map((item) => {
              return (
                <View className="flashSkillBoxList-box" key={item.id}>
                  <View className="flashSkillBoxList-box-padding">
                    <View className="flashSkillBoxList-box-left">
                      <View className="flashSkillBoxList-box-left-image">
                        <Image className="flashSkillBoxList-box-left-image" src={item?.mainGraph} />
                      </View>
                    </View>
                    <View className="flashSkillBoxList-box-right">
                      <View className="flashSkillBoxList-box-right-title">{item?.itemName}</View>
                      <View className="flashSkillBoxList-box-right-stock">
                        活动库存： {item?.stockTotal}
                      </View>
                      <View className="flashSkillBoxList-box-right-footer">
                        <View className="flashSkillBoxList-box-right-footer-title">
                          <View className="flashSkillBoxList-box-right-footer-price">
                            ￥{item?.activityItemPrice}
                          </View>
                          <View className="flashSkillBoxList-box-right-footer-memberPrice">
                            ￥{item?.price}
                          </View>
                        </View>
                        <Button
                          variant="outlined"
                          color="primary"
                          className="flashSkillBoxList-box-right-footer-button"
                        >
                          开抢
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              );
            });
          }}
          callback={({ refresh }) => {
            refresh?.();
          }}
          emptyStyle={{ background: '#f2f2f2' }}
          defaultPageSize={10}
          scrollViewProps={{ lowerThreshold: 10 }}
        />
      </View>
    </View>
  );
};
export default Index;
