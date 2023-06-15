import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button, Input, Switch, Cascader } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { treeDate, reData } = useSelector((state) => state.address);
  useEffect(() => {
    dispatch({ type: 'address/treeList' });
  }, []);

  // js tree数据处理
  const mapTree = (org) => {
    const haveChildren = Array.isArray(org.children) && org.children.length > 0;
    return {
      text: org.areaName,
      value: org.areaName,
      code: org.areaCode,
      children: haveChildren ? org.children.map((i) => mapTree(i)) : [],
    };
  };
  const addressTree = treeDate.map((org) => mapTree(org));

  // 级联选择器
  const [isVisibleDemo1, setIsVisibleDemo1] = useState(false);
  const [value1, setValue1] = useState([reData.province, reData.city, reData.area]);

  const [province, setProvince] = useState(reData.provinceCode);
  const [city, setCity] = useState(reData.cityCode);
  const [area, setArea] = useState(reData.areaCode);
  const change1 = (value, path) => {
    setValue1(value);
    setProvince(path?.at(0)?.code);
    setCity(path?.at(1)?.code);
    setArea(path?.at(2)?.code);
  };

  const [state, setState] = useState({
    consignee: reData.consignee,
    phone: reData.phone,
    addressDetails: reData.addressDetails,
    isDefault: reData.isDefault,
  });

  const onOk = async () => {
    const userInfo = Taro.getStorageSync('userInfo');
    const re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
    const isPhone = re.test(state.phone);
    if (state.consignee === '') {
      return Taro.showToast({
        title: '请输入收货人',
        icon: 'none',
        duration: 2000,
      });
    } else if (state.phone === '') {
      return Taro.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
      });
    } else if (!isPhone) {
      return Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
    } else if (state.province === '' && state.city === '' && state.area === '') {
      return Taro.showToast({
        title: '请选择省、市、区、街道',
        icon: 'none',
        duration: 2000,
      });
    } else if (state.addressDetails === '') {
      return Taro.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000,
      });
    }
    await dispatch({
      type: 'address/editAddress',
      payload: {
        id: reData.id,
        userId: parseInt(userInfo.id),
        consignee: state.consignee,
        phone: state.phone,
        province: value1?.at(0),
        provinceCode: parseInt(province),
        city: value1?.at(1),
        cityCode: parseInt(city),
        area: value1?.at(2),
        areaCode: parseInt(area),
        addressDetails: state.addressDetails,
        isDefault: state.isDefault ? 1 : 0,
      },
    });
    wx.navigateBack({
      delta: 1,
    });
    await dispatch({
      type: 'address/getAddress',
      payload: {
        id: userInfo.id,
      },
    });
  };
  return (
    <View>
      <View className="address">
        <Input
          name="consignee"
          defaultValue={reData.consignee}
          label="收货人"
          placeholder="请输入收货人"
          onChange={(val) => setState({ ...state, consignee: val })}
        />
        <Input
          name="phone"
          label="手机号码"
          defaultValue={reData.phone}
          placeholder="请输入手机号"
          type="tel"
          onChange={(val) => setState({ ...state, phone: val })}
        />
        <Input
          name="area"
          label="所在地区"
          placeholder="请选择省、市、区、街道"
          defaultValue={value1}
          disabled
          onClick={() => setIsVisibleDemo1(true)}
        />
        <Cascader
          visible={isVisibleDemo1}
          // value={value1}
          title="地址选择"
          options={addressTree}
          closeable
          onClose={() => {
            setIsVisibleDemo1(false);
          }}
          onChange={change1}
        />
        <Input
          name="addressDetails"
          label="详细地址"
          defaultValue={reData.addressDetails}
          placeholder="请输入小区楼栋/乡村名称"
          onChange={(val) => setState({ ...state, addressDetails: val })}
        />
        <Input
          label="设置为默认收货地址"
          name="isDefault"
          placeholder=" "
          clearable
          inputAlign="right"
          border={false}
          labelWidth="150"
          slotButton={
            <Switch
              checked={reData.isDefault === 1}
              onChange={(value) => setState({ ...state, isDefault: value })}
            />
          }
        />
      </View>
      <View className="add-address">
        <Button size="small" color="#B08B57" className="add-address-btn" onClick={() => onOk()}>
          <Text className="add-address-btn-text">保存</Text>
        </Button>
      </View>
    </View>
  );
};
export default Index;
