import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { Tag, Price, Skeleton } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import homeAdd from '@/assets/images/homeAdd.svg';
import { min, aPrice } from '@/utils/min';
import './index.scss';

const Index = (props) => {
  const { getCategoriesTwoTree } = props;
  const { subList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(0);

  const onTagTap = (e) => {
    const targetId = e.currentTarget?.dataset?.targetId;
    setScrollIntoView(`a${targetId}`);
  };
  const onTap = (id) => {
    dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: id,
      },
    });
    Taro.navigateTo({ url: '/pages/goodInfo/index' });
  };
  return (
    <ScrollView
      scrollY
      style={{
        height: '100%',
      }}
      scrollIntoView={scrollIntoView}
      scrollWithAnimation
    >
      <View className="right" style={{ paddingBottom: 70, height: 'auto' }}>
        <View style={{ marginBottom: 8 }} className="right-title-box">
          <View style={{ width: '100%' }}>
            {/* 二级标签 */}
            <ScrollView className="my-code" scrollX scrollWithAnimation>
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
                    <Text data-target-id={item?.id} onClick={(e) => onTagTap(e)}>
                      {item?.marketingName}
                    </Text>
                  </Tag>
                );
              })}
            </ScrollView>
            {/* 二级标签下内容 */}
            <View className="right-content" style={{ marginTop: 6 }}>
              {subList?.map((itm, idx) => {
                return (
                  <>
                    <View className="right-content-title" key={idx} id={`a${itm?.id}`}>
                      <Text>{itm?.marketingName}</Text>
                    </View>
                    {/* 标签图片内容调整 */}
                    {itm?.itemDto?.map((dto) => {
                      return (
                        <View
                          className="right-content-box"
                          key={dto}
                          style={{ marginTop: 5, marginRight: 10 }}
                        >
                          <View className="right-content-item" style={{ overflow: 'hidden' }}>
                            <View
                              className="right-content-item-img"
                              style={{
                                width: '40%',
                                alignItems: 'center',
                              }}
                              onTap={() => {
                                onTap(dto?.id);
                              }}
                            >
                              <Skeleton animated loading={dto?.mainGraph ? true : false}>
                                <Image
                                  mode="widthFix"
                                  // eslint-disable-next-line global-require
                                  src={dto?.mainGraph}
                                  className="right-content-item-img"
                                ></Image>
                              </Skeleton>
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
                                  onTap(dto?.id);
                                }}
                              >
                                <Tag color="rgb(170, 170, 170)">
                                  {dto?.suppliersId === 1 ? '自营' : '严选'}
                                </Tag>
                                <Text style={{ marginLeft: 10 }}>{dto?.itemName}</Text>
                              </View>
                              {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ fontSize: 10, border: '1px solid #aaaaaa', padding: '2px 3px' }}>
                                  <Text> 自购省</Text>
                                </View>
                                <View style={{
                                  fontSize: 10,
                                  borderTop: '1px solid #aaaaaa',
                                  borderRight: '1px solid #aaaaaa',
                                  borderBottom: '1px solid #aaaaaa',
                                  padding: '2px 3px',
                                  background: '#d9001c',
                                  padding: '2px 3px'
                                }}>
                                  <Text style={{ color: '#ffffff' }} >¥12.8</Text>
                                </View>
                              </View> */}
                              <View
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <View
                                  style={{ display: 'flex', flexDirection: 'row' }}
                                  onClick={() => onTap(dto?.id)}
                                >
                                  <Price
                                    price={min(dto?.itemSkuDtos)}
                                    size="normal"
                                    needSymbol={false}
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
                                      {dto?.itemSkuDtos &&
                                        aPrice(min(dto?.itemSkuDtos), dto?.itemSkuDtos)}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <Image
                                    mode="widthFix"
                                    src={homeAdd}
                                    style={{ width: 20, height: 20 }}
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
    </ScrollView>
  );
};
export default Index;
