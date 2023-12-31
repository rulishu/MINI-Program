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
  subpackages: [
    {
      root: 'goodsPackage',
      pages: [
        'myCoupons/index',
        'flashSkill/index',
        'goodInfo/index',
        'confirmOrder/index',
        'searchResult/index',
        'search/index',
      ],
    },
    {
      root: 'evaluatePackage',
      pages: ['evaluate/index', 'allEvaluate/index', 'dealDone/index'],
    },
    {
      root: 'proxyPackage',
      pages: ['proxyDividendDetails/index', 'proxyManagement/index'],
    },
    {
      root: 'dealerPackage',
      pages: ['dealer/index', 'myFans/index', 'dividendDetails/index'],
    },
    {
      root: 'userPackage',
      pages: [
        'editUser/index',
        'address/index',
        'addAddress/index',
        'editAddress/index',
        'poster/index',
      ],
    },
    {
      root: 'orderPackage',
      pages: ['logisticsInfo/index', 'orderDetails/index', 'afterSales/index', 'allOrders/index'],
    },
  ],
  requiredPrivateInfos: ['getLocation'],
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于获取收货地址信息',
    },
  },
  tabBar: {
    custom: true,
    list: [
      {
        iconPath: 'assets/tabar/homeIcon.png',
        selectedIconPath: 'assets/tabar/homeActiveIcon.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'assets/tabar/categoriesIcon.png',
        selectedIconPath: 'assets/tabar/categoriesActiveIcon.png',
        pagePath: 'pages/categories/index',
        text: '商品',
      },
      {
        iconPath: 'assets/tabar/select.png',
        selectedIconPath: 'assets/tabar/selectActive.png',
        pagePath: 'pages/select/index',
        text: '封坛',
      },
      {
        iconPath: 'assets/tabar/cartIcon.png',
        selectedIconPath: 'assets/tabar/cartActiveIcon.png',
        pagePath: 'pages/cart/index',
        text: '购物车',
      },
      {
        iconPath: 'assets/tabar/myIcon.png',
        selectedIconPath: 'assets/tabar/myAcitveIcon.png',
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
    color: '#000',
    selectedColor: '#B08B57',
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
