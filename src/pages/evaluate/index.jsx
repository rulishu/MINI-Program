import React, { useEffect, useState } from 'react';
import { View, Text, Image, Textarea } from '@tarojs/components';
import { Collapse, Button, Uploader } from '@taroify/core';
import Taro, { chooseImage } from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './popup';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const btns = ['推荐', '一般', '不推荐'];

  const { orderInfo } = useSelector((state) => state.orderDetails);

  const params = Taro.getCurrentInstance().router.params;
  useEffect(() => {
    dispatch({
      type: 'orderDetails/selectPrimaryKey',
      payload: {
        id: params?.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ]);
    });
  }

  // 推荐
  const onBtnState = (event, item) => {
    event.stopPropagation();
    setActive(item);
  };

  // 发布
  const release = () => {
    if (active === '') {
      return Taro.showToast({
        title: '请先评价等级',
        icon: 'none',
        duration: 2000,
      });
    }
    const imgs = files.map((a) => a.url).toString();
    const mainImages = orderInfo.items?.map((a) => a.mainGraph).toString();
    const skuIds = orderInfo.items?.map((a) => a.itemId).toString();
    const skus = orderInfo.items
      ?.at(0)
      .attributes.map((attributeItem) => {
        let str = `${attributeItem.value}${attributeItem.attributeName}`;
        return str;
      })
      .toString();
    dispatch({
      type: 'evaluate/update',
      payload: {
        releaseOpen: true,
        releaseData: [
          {
            comment: textareaValue,
            image: imgs,
            mainImage: mainImages,
            orderId: orderInfo?.orderNumber,
            rating: active == '推荐' ? 1 : active == '一般' ? 2 : active == '不推荐' ? 3 : '',
            sku: orderInfo.items?.at(0)?.attributes.length >= 2 ? skus?.replace(',', '*') : skus,
            skuId: Number(skuIds),
          },
        ],
      },
    });
    setNum(1);
  };

  // 备注
  const onChangeTextarea = (e) => {
    setTextareaValue(e.detail.value);
  };

  // 一键好评
  const onGoodEvaluate = () => {
    setActive('推荐');
  };

  return (
    <View className="evaluate">
      <View className="evaluate-top-title">
        <View>
          <Text className="text">
            商品评价（{num}/{orderInfo?.items?.length}）
          </Text>
        </View>
        <View onClick={() => onGoodEvaluate()}>
          <Text className="text primary">一键好评</Text>
        </View>
      </View>
      <View className="evaluate-body">
        <View>
          <Collapse defaultValue={[0]}>
            {orderInfo.items?.map((item) => {
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
                              color={active === a ? 'primary' : 'default'}
                              block
                              size="small"
                              className="btn-left"
                              onClick={(e) => onBtnState(e, a)}
                            >
                              {a}
                            </Button>
                          ))}
                        </View>
                      </View>
                    </>
                  }
                  extra="收起"
                >
                  <View style={{ width: '100%' }}>
                    <Textarea
                      className="textarea"
                      onInput={(e) => onChangeTextarea(e)}
                      placeholder="20字以上，认真填写的评价更容易被优先展示~"
                    />
                    <Uploader
                      className="uploader"
                      value={files}
                      multiple
                      maxFiles={6}
                      onUpload={onUpload}
                      onChange={setFiles}
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
