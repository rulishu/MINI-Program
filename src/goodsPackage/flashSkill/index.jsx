import React from 'react';
import { View, Image } from '@tarojs/components';
import flashSkill from '@/assets/images/flashSkill.png';
import { Button } from '@taroify/core';
import './index.scss';

const Index = () => {
  const list = [
    {
      image:
        'https://fendouzhilu.oss-cn-hangzhou.aliyuncs.com/FDZL/mall/20230610/ea3a2177183847e994bf2c954a32ab2a.jpg',
      title: '【秒杀】秋然大米 5kg/袋,秋然大米 5kg/袋,秋然大米 5kg/袋,秋然大米 5kg/袋',
      stock: 100,
      price: '¥98',
      memberPrice: '¥218',
    },
    {
      image:
        'https://fendouzhilu.oss-cn-hangzhou.aliyuncs.com/FDZL/mall/20230610/ea3a2177183847e994bf2c954a32ab2a.jpg',
      title: '【秒杀】秋然大米 5kg/袋,秋然大米 5kg/袋,秋然大米 5kg/袋',
      stock: 100,
      price: '¥98',
      memberPrice: '¥218',
    },
    {
      image:
        'https://fendouzhilu.oss-cn-hangzhou.aliyuncs.com/FDZL/mall/20230610/ea3a2177183847e994bf2c954a32ab2a.jpg',
      title: '【秒杀】秋然大米 5kg/袋...',
      stock: 100,
      price: '¥98',
      memberPrice: '¥218',
    },
  ];
  return (
    <View className="flashSkillBox">
      <View className="flashSkillBoxHeader">
        <View className="flashSkillBoxHeader-image">
          <Image mode="widthFix" src={flashSkill} className="flashSkillBoxHeader-image"></Image>
        </View>
        <View className="flashSkillBoxText">秒杀商品数量有限，先到先得~</View>
      </View>

      <View className="flashSkillBoxList">
        {list?.map((item, index) => {
          return (
            <View className="flashSkillBoxList-box" key={index}>
              <View className="flashSkillBoxList-box-padding">
                <View className="flashSkillBoxList-box-left">
                  <View className="flashSkillBoxList-box-left-image">
                    <Image className="flashSkillBoxList-box-left-image" src={item?.image} />
                  </View>
                </View>
                <View className="flashSkillBoxList-box-right">
                  <View className="flashSkillBoxList-box-right-title">{item?.title}</View>
                  <View className="flashSkillBoxList-box-right-stock">
                    活动库存： {item?.stock}
                  </View>
                  <View className="flashSkillBoxList-box-right-footer">
                    <View className="flashSkillBoxList-box-right-footer-title">
                      <View className="flashSkillBoxList-box-right-footer-price">
                        {item?.price}
                      </View>
                      <View className="flashSkillBoxList-box-right-footer-memberPrice">
                        {item?.memberPrice}
                      </View>
                    </View>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="flashSkillBoxList-box-right-footer-button"
                    >
                      开抢
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default Index;
