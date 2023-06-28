import React from 'react';
import { View } from '@tarojs/components';
import { Uploader } from '@taroify/core';
import { chooseImage } from '@tarojs/taro';
import { useDispatch } from 'react-redux';
import { fileToBase64 } from '@/utils/min';
import './index.scss';

const Uploads = ({ value, onChange, maxFiles = 6 }) => {
  const dispatch = useDispatch();

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(async ({ tempFiles }) => {
      let file = await fileToBase64(tempFiles[0]?.path);
      if (file) {
        dispatch({
          type: 'evaluate/upload',
          payload: {
            file,
            callBack: (res) => {
              onChange([
                ...value,
                ...tempFiles.map(({ type, originalFileObj }) => ({
                  type,
                  // url: path,
                  url: res,
                  name: originalFileObj?.name,
                })),
              ]);
            },
          },
        });
      }
    });
  }

  return (
    <View>
      <Uploader
        className="uploader"
        value={value}
        multiple
        maxFiles={maxFiles}
        onUpload={() => {
          onUpload && onUpload();
        }}
        onChange={onChange}
      />
    </View>
  );
};
export default Uploads;
