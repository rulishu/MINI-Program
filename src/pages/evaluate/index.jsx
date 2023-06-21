import React, { useState } from 'react';
import { View, Text, Image, Textarea } from '@tarojs/components';
import { Collapse, Button, Uploader } from '@taroify/core';
import { chooseImage } from '@tarojs/taro';
import { useDispatch } from 'react-redux';
import { list } from './item';
import Popup from './popup';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

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
  const recommendation = (event) => {
    event.stopPropagation();
    window.console.log('推荐');
  };

  // 一般
  const commonly = (event) => {
    event.stopPropagation();
    window.console.log('一般');
  };

  // 不推荐
  const notRecommended = (event) => {
    event.stopPropagation();
    window.console.log('不推荐');
  };

  // 发布
  const release = () => {
    dispatch({
      type: 'evaluate/update',
      payload: {
        releaseOpen: true,
      },
    });
  };

  return (
    <View className="evaluate">
      <View className="evaluate-top-title">
        <View>
          <Text className="text">商品评价（0/5）</Text>
        </View>
        <View>
          <Text className="text primary">一键好评</Text>
        </View>
      </View>
      <View className="evaluate-body">
        <View>
          <Collapse defaultValue={[0]}>
            {list?.map((item) => {
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
                                {item?.itemSkuDtos[0].attributes?.map((val) => (
                                  <Text key={item.id} className="doc">
                                    {val.skuValue},
                                  </Text>
                                ))}
                              </View>
                            </View>
                          </View>
                        </View>
                        <View className="custom-collapse-btn">
                          <Button
                            color="primary"
                            block
                            size="small"
                            className="btn-left"
                            onClick={recommendation}
                          >
                            推荐
                          </Button>
                          <Button
                            size="small"
                            block
                            variant="outlined"
                            color="default"
                            onClick={commonly}
                          >
                            一般
                          </Button>
                          <Button
                            size="small"
                            block
                            variant="outlined"
                            color="default"
                            className="btn-right"
                            onClick={notRecommended}
                          >
                            不推荐
                          </Button>
                        </View>
                      </View>
                    </>
                  }
                  extra="收起"
                >
                  <View style={{ width: '100%' }}>
                    <Textarea
                      className="textarea"
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
