import React from 'react';
import { Input } from '@tarojs/components';
import { Popup, Form, Picker } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Drawer = () => {
  const { visible, companyList } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  return (
    <Popup
      visible={visible}
      onClose={() => {
        dispatch({
          type: 'sales/update',
          payload: {
            visible: false,
          },
        });
      }}
    >
      <Form>
        <Form.Item label="选中物流公司" name="logistics">
          <Picker listData={companyList} title="物流公司" />
        </Form.Item>
        <Form.Item label="填写运单号" name="waybillNumber">
          <Input placeholder="请输入运单号" type="text" />
        </Form.Item>
      </Form>
    </Popup>
  );
};
export default Drawer;
