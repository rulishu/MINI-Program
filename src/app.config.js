export default defineAppConfig({
  entryPagePath: 'pages/home/index', // 首页
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/categories/index',
    'pages/select/index',
    'pages/cart/index',
    'pages/my/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        iconPath: 'assets/tabar/home.png',
        selectedIconPath: 'assets/tabar/homeActive.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'assets/tabar/categories.png',
        selectedIconPath: 'assets/tabar/categoriesActive.png',
        pagePath: 'pages/categories/index',
        text: '分类',
      },
      {
        iconPath: 'assets/tabar/select.png',
        selectedIconPath: 'assets/tabar/selectActive.png',
        pagePath: 'pages/select/index',
        text: '镖族严选',
      },
      {
        iconPath: 'assets/tabar/cart.png',
        selectedIconPath: 'assets/tabar/cartActive.png',
        pagePath: 'pages/cart/index',
        text: '购物车',
      },
      {
        iconPath: 'assets/tabar/my.png',
        selectedIconPath: 'assets/tabar/myActive.png',
        pagePath: 'pages/my/index',
        text: '个人中心',
      },
    ],
    color: '#000',
    selectedColor: '#A05635',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
  },
  window: {
    // navigationStyle: "custom",
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#A05635',
    navigationBarTitleText: '镖族严选',
    navigationBarTextStyle: 'white',
  },
});
