import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { Tag, Skeleton } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import homeAdd from '@/assets/images/homeAdd.svg';
import { min, aPrice } from '@/utils/min';
import './index.scss';

const Index = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { getCategoriesTwoTree } = props;
  const { subList } = useSelector((state) => state.categories);
  const [activeItem, setActiveItem] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(0);
  const dispatch = useDispatch();

  const onTagTap = (id) => {
    setScrollIntoView(`a${id}`);
  };
  const onTap = (id) => {
    Taro.navigateTo({ url: `/pages/goodInfo/index?id=${id}` });
    dispatch({
      type: 'goodInfo/update',
      payload: {
        activeSku: [],
      },
    });
  };
  return (
    <>
      {/* 二级标签 */}
      <View className="two-tag">
        <ScrollView className="my-code" scrollX scrollWithAnimation>
          {subList?.map((item, index) => {
            return (
              <Tag
                key={index}
                plain
                onClick={() => {
                  setActiveItem(index);
                }}
                className="right-title"
                color={subList && index !== activeItem ? '#999999' : '#965A3C'}
                // textColor="#999999"
              >
                <Text onClick={() => onTagTap(item?.id)}>{item?.marketingName}</Text>
              </Tag>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView
        scrollY
        style={{
          height: '100%',
        }}
        scrollIntoView={scrollIntoView}
        // scrollWithAnimation
      >
        <View
          className="right"
          style={{ minHeight: 'calc(100% - 230rpx)', border: '1px solid red' }}
        >
          <View style={{ marginBottom: 8 }} className="right-title-box">
            <View style={{ width: '100%' }}>
              {/* 二级标签下内容 */}
              <View className="right-content">
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
                                {(dto.stock === 0 || dto.onShelf === 0 || dto.isDelete === 1) && (
                                  <View className="image-state">
                                    <Text>
                                      {dto.stock === 0
                                        ? '已售空'
                                        : dto.onShelf === 0
                                        ? '已下架'
                                        : dto.isDelete === 1
                                        ? '已删除'
                                        : ''}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              <View className="right-content-text-box">
                                <View
                                  className="right-content-text-header"
                                  onTap={() => {
                                    onTap(dto?.id);
                                  }}
                                >
                                  <Tag color="rgb(170, 170, 170)">
                                    {dto?.suppliersId === 1 ? '自营' : '严选'}
                                  </Tag>
                                  <Text style={{ marginLeft: 10, wordBreak: 'break-all' }}>
                                    {dto?.itemName}
                                  </Text>
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
                                    <Text style={{ color: '#d9001c', fontSize: 16 }}>
                                      {dto?.price}
                                    </Text>
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
                <View style={{ marginBottom: 100 }}></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Index;
