import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, Icon } from '@tarojs/components';
import { Tag, Price } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import homeAdd from '@/assets/images/homeAdd.svg';
import './index.scss';

const Index = (props) => {
  const { getCategoriesTwoTree } = props;
  const { subList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(0);
  return (
    <View className="right" style={{ paddingBottom: 70, margin: -15 }}>
      <View style={{ marginBottom: 8 }} className="right-title-box">
        <View style={{ width: '100%' }}>
          {/* 二级标签 */}
          <View className="my-code">
            {getCategoriesTwoTree?.map((item, index) => {
              return (
                <Tag
                  key={index}
                  plain
                  onClick={() => {
                    setActiveItem(index);
                  }}
                  className="right-title"
                  color={getCategoriesTwoTree && index !== activeItem ? '#999999' : '#965A3C'}
                  // textColor="#999999"
                >
                  {item?.marketingName}
                </Tag>
              );
            })}
            <Icon name="horizontal-n" size="40"></Icon>
          </View>
          {/* 二级标签下内容 */}
          <View className="right-content" style={{ marginTop: 6 }}>
            {subList?.map((itm, idx) => {
              return (
                <>
                  <View className="right-content-title" key={idx}>
                    <Text>{itm?.marketingName}</Text>
                  </View>
                  {/* 标签图片内容调整 */}
                  {itm?.itemDto?.map((dto) => {
                    return (
                      <View className="right-content-box" key={dto}>
                        <View className="right-content-item" style={{ overflow: 'hidden' }}>
                          <View
                            className="right-content-item-img"
                            style={{
                              width: '40%',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              mode="widthFix"
                              // eslint-disable-next-line global-require
                              src={dto?.mainGraph}
                              className="right-content-item-img"
                              onTap={() => {
                                dispatch({
                                  type: 'goodInfo/infoDetails',
                                  payload: {
                                    id: dto?.id,
                                  },
                                });
                                Taro.navigateTo({ url: '/pages/goodInfo/index' });
                              }}
                            ></Image>
                          </View>

                          <View
                            className="right-content-text-box"
                            style={{
                              width: '60%',
                              height: 100,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}
                          >
                            <View
                              className="right-content-text-header"
                              onTap={() => {
                                dispatch({
                                  type: 'goodInfo/infoDetails',
                                  payload: {
                                    id: dto?.id,
                                  },
                                });
                                Taro.navigateTo({ url: '/pages/goodInfo/index' });
                              }}
                            >
                              <Tag color="rgb(170, 170, 170)">自营</Tag>
                              <Text style={{ marginLeft: 10 }}>{dto?.itemName}</Text>
                            </View>
                            {/* <View >
                            <Text style={{ fontSize: 12, border: '1px solid #aaaaaa' }}> 自购省</Text>
                            <Text style={{ fontSize: 12, borderTop: '1px solid #aaaaaa', }}>¥12.8</Text>
                          </View> */}
                            <View
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                              }}
                            >
                              <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Price
                                  price={dto?.costPrice}
                                  size="normal"
                                  needSymbol
                                  thousands
                                  style={{ color: '#d9001c' }}
                                />
                                <View>
                                  <Text
                                    style={{
                                      color: '#7f7f7f',
                                      textDecoration: 'line-through',
                                      fontSize: 12,
                                    }}
                                  >
                                    ¥{dto?.price}
                                  </Text>
                                </View>
                              </View>
                              <View>
                                <Image
                                  mode="widthFix"
                                  src={homeAdd}
                                  style={{ width: 25, height: 25 }}
                                ></Image>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
