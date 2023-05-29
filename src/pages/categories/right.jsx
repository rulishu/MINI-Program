import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { Tag, Price } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import homeAdd from '@/assets/images/homeAdd.svg';
import './index.scss';

const Index = (props) => {
  const { getCategoriesTwoTreeItem } = props;
  const { subList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(0);
  let getCategoriesTwoTreeList = getCategoriesTwoTreeItem?.children;
  let twoLabel;

  return (
    <View className="right" style={{ paddingBottom: 70, margin: -15 }}>
      <View style={{ marginBottom: 8 }} className="right-title-box">
        <View style={{ width: '100%' }}>
          {/* 二级标签 */}
          <View
            onTap={() => {
              setActiveItem(index);
            }}
          >
            {getCategoriesTwoTreeList?.map((item, index) => {
              twoLabel = item?.label;
              return (
                <Text
                  key={item}
                  className="right-title"
                  style={{
                    background:
                      getCategoriesTwoTreeItem && index !== activeItem ? 'rgb(245, 245, 245)' : '',
                  }}
                >
                  {item?.label}
                </Text>
              );
            })}
          </View>
          {/* 二级标签下内容 */}
          <View className="right-content" style={{ marginTop: 6 }}>
            {twoLabel ? (
              <View className="right-content-title">
                <Text>{twoLabel}</Text>
              </View>
            ) : (
              ''
            )}
            {/* 标签图片内容调整 */}
            <View className="right-content-box">
              {subList?.map((itm, idx) => {
                return (
                  <View
                    className="right-content-item"
                    key={idx}
                    style={{ marginBottom: 5, overflow: 'hidden' }}
                  >
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
                        src={itm?.mainGraph}
                        className="right-content-item-img"
                        onTap={() => {
                          dispatch({
                            type: 'goodInfo/infoDetails',
                            payload: {
                              id: itm?.id,
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
                              id: itm?.id,
                            },
                          });
                          Taro.navigateTo({ url: '/pages/goodInfo/index' });
                        }}
                      >
                        <Tag color="rgb(170, 170, 170)">自营</Tag>
                        <Text style={{ marginLeft: 10 }}>{itm?.itemName}</Text>
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
                            price={itm?.costPrice}
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
                              ¥{itm?.price}
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
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
