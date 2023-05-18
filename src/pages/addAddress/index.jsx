import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Button, Input, Switch, Cascader } from '@nutui/nutui-react-taro';
import { selectList } from './item';
import './index.scss';

const Index = () => {
  const [isVisibleDemo1, setIsVisibleDemo1] = useState(false);
  const [value1, setValue1] = useState([]);
  const change1 = (value) => {
    setValue1(value);
  };
  const onPathChange = () => {};
  return (
    <View>
      <View className="address">
        <Input name="text" label="收货人" placeholder="请输入收货人" />
        <Input name="tel" label="手机号码" placeholder="请输入手机号" type="tel" />
        <Input
          name="text"
          label="所在地区"
          placeholder="请选择省、市、区、街道"
          defaultValue={value1}
          onClick={() => setIsVisibleDemo1(true)}
        />
        <Cascader
          visible={isVisibleDemo1}
          value={value1}
          title="地址选择"
          options={selectList}
          closeable
          onClose={() => {
            setIsVisibleDemo1(false);
          }}
          onChange={change1}
          onPathChange={onPathChange}
        />
        <Input name="text" label="详细地址" placeholder="请输入小区楼栋/乡村名称" />
        <Input
          label="设置为默认收货地址"
          placeholder=" "
          clearable
          inputAlign="right"
          border={false}
          labelWidth="150"
          slotButton={<Switch />}
        />
      </View>
      <View className="add-address">
        <Button size="small" color="#B08B57" className="add-address-btn">
          <Text className="add-address-btn-text">保存</Text>
        </Button>
      </View>
    </View>
  );
};
export default Index;
