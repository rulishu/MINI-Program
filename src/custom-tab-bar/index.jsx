import React from 'react';
import { Tabbar, TabbarItem } from '@nutui/nutui-react-taro';
import homeIcon from '@/assets/tabar/homeIcon.svg';
import categories from '@/assets/tabar/categories.svg';
import select from '@/assets/tabar/select.svg';
import car from '@/assets/tabar/car.svg';
import my from '@/assets/tabar/my.svg';
import homeIcon1 from '@/assets/tabar/homeIcon1.svg';
import categories1 from '@/assets/tabar/categories1.svg';
import select1 from '@/assets/tabar/select1.svg';
import car1 from '@/assets/tabar/car1.svg';
import my1 from '@/assets/tabar/my1.svg';
import Taro from '@tarojs/taro';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const { activeIndex } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const list = [
    {
      title: '首页',
      icon: homeIcon,
      iconActive: homeIcon1,
      href: '/pages/home/index',
    },
    {
      title: '分类',
      icon: select,
      iconActive: select1,
      href: '/pages/categories/index',
    },
    {
      title: '镖族严选',
      icon: categories,
      iconActive: categories1,
      href: '/pages/select/index',
    },
    {
      title: '购物车',
      icon: car,
      iconActive: car1,
      href: '/pages/cart/index',
    },
    {
      title: '我的',
      icon: my,
      iconActive: my1,
      href: '/pages/my/index',
    },
  ];
  return (
    <Tabbar
      className="tab"
      bottom
      activeVisible={activeIndex}
      onSwitch={async (child, id) => {
        dispatch({
          type: 'global/update',
          payload: {
            activeIndex: id,
          },
        });
        await Taro.switchTab({ url: list[id].href });
      }}
      activeColor="#B08B57"
      size="22"
    >
      {list.map((item, index) => (
        <TabbarItem
          key={index}
          tabTitle={item.title}
          icon={index === activeIndex ? item.iconActive : item.icon}
        />
      ))}
    </Tabbar>
  );
};

export default Index;
