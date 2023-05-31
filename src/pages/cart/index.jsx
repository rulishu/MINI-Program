/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Radio, Price, InputNumber, Swipe, Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { shoppingList } = useSelector((state) => state.cart);
  const [radioVal] = useState('1');

  useEffect(() => {
    dispatch({
      type: 'cart/goodsAll',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const list = [
    {
      id: 0,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米,秋然长粒香大米 ,秋然长粒香大米  5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
    },
    {
      id: 1,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米 5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
    },
    {
      id: 2,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米 5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
    },
    {
      id: 3,
      imageUrl: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      title: '秋然长粒香大米 5kg/袋标题',
      sku: '规格值1,规格值2',
      price: 70,
    },
  ];
  const handleChange = (v) => {};
  return (
    <View>
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
        {/* 清空 */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/clear.svg')}
            style={{ width: 25, height: 25 }}
          ></Image>
          <Text style={{ marginLeft: 5, color: '#7f7f7f' }}>清空</Text>
        </View>
        {list.map((item) => {
          return (
            <Swipe
              key={item?.id}
              rightAction={
                <Button type="primary" shape="square" style={{ width: 50 }}>
                  删除
                </Button>
              }
            >
              <View style={{ backgroundColor: '#ffffff' }}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: '15px 10px 15px 10px',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Radio.RadioGroup value={radioVal} onChange={handleChange}>
                        <Radio value={radioVal}></Radio>
                      </Radio.RadioGroup>
                    </View>
                    <View style={{ width: 100, height: 100 }}>
                      <Image
                        mode="widthFix"
                        // eslint-disable-next-line global-require
                        src={require('@/assets/images/home8.png')}
                        style={{ width: 100, height: 100 }}
                      ></Image>
                    </View>
                    <View
                      style={{
                        height: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <View
                        style={{
                          whiteSpace: 'nowrap', // 强制一行显示
                          overflow: 'hidden', // 超出隐藏
                          textOverflow: 'ellipsis', // 省略号
                        }}
                      >
                        <Text> {item?.title}</Text>
                      </View>

                      <Text>{item?.sku}</Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Price price={item?.price} size="normal" needSymbol thousands />
                        <InputNumber modelValue={1} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Swipe>
          );
        })}
      </View>
    </View>
  );
};
export default Index;
