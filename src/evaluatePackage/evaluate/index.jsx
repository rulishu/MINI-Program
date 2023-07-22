import React, { useEffect, useState } from 'react';
import { View, Text, Image, Textarea } from '@tarojs/components';
import { Collapse, Button } from '@taroify/core';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import Uploads from '@/component/Uploads';
import Popup from './popup';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [goodsList, setGoodsList] = useState([]);
  const [value, setValue] = useState([0]);

  const btns = [
    { label: '推荐', value: 1 },
    { label: '一般', value: 2 },
    { label: '不推荐', value: 3 },
  ];

  const { orderInfo } = useSelector((state) => state.orderDetails);
  const paramRoute = Taro.getCurrentInstance().router.params;
  useEffect(() => {
    dispatch({
      type: 'orderDetails/selectPrimaryKey',
      payload: {
        id: paramRoute?.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const datas = (orderInfo.items || []).filter((item) => !item.evaluateStatus);
    const list = (datas || []).map((item, idx) => ({
      ...item,
      expanded: idx === 0,
      rating: undefined,
      comment: '',
      image: [],
    }));
    setGoodsList(list);
  }, [orderInfo.id]);

  // 推荐
  const onBtnState = (event, res, item, code) => {
    event.stopPropagation();
    setGoodsList((prevList) => {
      return prevList.map((goods) => {
        if (goods.id === item.id) {
          return {
            ...goods,
            [code]: res.value,
          };
        }
        return goods;
      });
    });
  };

  // 发布
  const release = () => {
    const skus = orderInfo.items
      ?.at(0)
      .attributes.map((attributeItem) => {
        let str = `${attributeItem.value}${attributeItem.attributeName}`;
        return str;
      })
      .toString();

    const params = goodsList.map((item) => ({
      comment: item.comment,
      image: (item.image?.map((a) => a?.url) || []).join(','),
      rating: item.rating,
      mainImage: item.mainGraph,
      sku: orderInfo.items?.at(0)?.attributes.length >= 2 ? skus?.replace(',', '*') : skus,
      orderId: orderInfo?.id,
      skuId: Number(item.itemId),
    }));

    const indexActive = params.findIndex((item) => item.rating);
    if (indexActive === -1) {
      toast.show('请先评价等级', { placement: 'center', duration: 1000 });
      return;
    }

    const isAllActive = params.findIndex((item) => !item.rating);
    if (isAllActive !== -1) {
      dispatch({
        type: 'evaluate/update',
        payload: {
          releaseOpen: true,
          params,
        },
      });
    } else {
      dispatch({
        type: 'evaluate/getAddEvaluation',
        payload: {
          releaseData: params,
          callBack: () => {
            Taro.navigateTo({ url: '/orderPackage/allOrders/index' });
            dispatch({
              type: 'order/update',
              payload: {
                orderActive: 0,
              },
            });
          },
        },
      });
    }
  };

  // 备注
  const onChangeTextarea = (e, item, code) => {
    setGoodsList((prevList) => {
      return prevList.map((goods) => {
        if (goods.id === item.id) {
          return {
            ...goods,
            [code]: e.detail.value,
            expanded: !goods.expanded,
          };
        }
        return goods;
      });
    });
  };
  const onChangeData = (idx, item, code) => {
    const arr = goodsList.concat([]);
    arr.splice(idx, 1, {
      ...goodsList?.[idx],
      [code]: item,
    });
    setGoodsList(arr);
  };

  // 一键好评
  const onGoodEvaluate = (e, item) => {
    if (e) {
      e.stopPropagation();
    }
    setGoodsList((prevList) => {
      return prevList.map((goods) => {
        if (goods.id === item.id) {
          return {
            ...goods,
            expanded: !goods.expanded,
          };
        }
        return goods;
      });
    });
  };

  // 展开/收起
  const onChangeCollapes = (e) => {
    setValue(e);
  };

  return (
    <View className="evaluate">
      <View className="evaluate-top-title">
        <View>
          <Text className="text">商品评价（0/{goodsList?.length}）</Text>
        </View>
        <View onClick={() => onGoodEvaluate()}>
          <Text className="text primary">一键好评</Text>
        </View>
      </View>
      <View className="evaluate-body">
        <View>
          <Collapse value={value} onChange={(e) => onChangeCollapes(e)}>
            {(goodsList || []).map((item, ind) => {
              return (
                <Collapse.Item
                  key={item.id}
                  className="custom-collapse-item1"
                  title={
                    <>
                      <View className="popupInfo-textArea">
                        <View className="popupInfo-textArea-box" key={item.id}>
                          <View className="popupInfo-textArea-box-content">
                            <View className="popupInfo-textArea-box-content-img">
                              <Image
                                mode="widthFix"
                                src={item?.mainGraph}
                                className="popupInfo-textArea-box-content-img"
                              ></Image>
                            </View>
                            <View className="popupInfo-textArea-box-content-left">
                              <View className="popupInfo-textArea-box-content-left-title">
                                <Text>{item.itemName}</Text>
                              </View>
                              <View className="popupInfo-textArea-box-content-left-doc">
                                <Text className="doc">
                                  {item.attributes.map((attributeItem) => {
                                    let str = `${attributeItem.attributeName}:${attributeItem.value} `;
                                    return str;
                                  })}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View className="custom-collapse-btn">
                          {btns.map((a, index) => (
                            <Button
                              key={index}
                              color={item?.rating === a.value ? 'primary' : 'default'}
                              block
                              size="small"
                              className="btn-left"
                              onClick={(e) => onBtnState(e, a, item, 'rating')}
                            >
                              {a.label}
                            </Button>
                          ))}
                        </View>
                      </View>
                    </>
                  }
                  extra={ind === value.at(0) ? '收起' : '展开'}
                >
                  <View style={{ width: '100%' }}>
                    <Textarea
                      className="textarea"
                      onInput={(e) => onChangeTextarea(e, item, 'comment')}
                      placeholder="20字以上，认真填写的评价更容易被优先展示~"
                    />
                    <Uploads
                      value={item?.image}
                      multiple
                      maxFiles={6}
                      onChange={(val) => {
                        onChangeData(ind, val, 'image');
                      }}
                    />
                  </View>
                </Collapse.Item>
              );
            })}
          </Collapse>
        </View>
      </View>
      <View className="footer-height"></View>
      <View className="evaluate-foot">
        <View className="footer-content">
          <Button color="primary" block onClick={release}>
            发布
          </Button>
        </View>
      </View>
      <Popup />
    </View>
  );
};
export default Index;
