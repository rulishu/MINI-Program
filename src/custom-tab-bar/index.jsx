import React, { useState } from 'react';
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

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const list = [
    {
      title: '首页',
      url: '../../pages/home/index',
      icon: homeIcon,
      iconActive: homeIcon1,
    },
    {
      title: '商品',
      url: '../../pages/categories/index',

      icon: select,
      iconActive: select1,
    },
    {
      title: '封坛',
      url: '../../pages/select/index',
      icon: categories,
      iconActive: categories1,
    },
    {
      title: '购物车',
      url: '../../pages/cart/index',
      icon: car,
      iconActive: car1,
    },
    {
      title: '我的',
      url: '../../pages/my/index',
      icon: my,
      iconActive: my1,
    },
  ];

  return (
    <Tabbar
      className="tab"
      bottom
      activeVisible={activeIndex}
      onSwitch={async (child, id) => {
        setActiveIndex(id);
        if (id === 0) {
          Taro.switchTab({ url: '/pages/home/index' });
        } else if (id === 1) {
          Taro.switchTab({ url: '/pages/categories/index' });
        } else if (id === 2) {
          Taro.switchTab({ url: '/pages/select/index' });
        } else if (id === 3) {
          Taro.switchTab({ url: '/pages/cart/index' });
        } else if (id === 4) {
          Taro.switchTab({ url: '/pages/my/index' });
        }
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
