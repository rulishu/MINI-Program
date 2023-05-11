export default defineAppConfig({
  entryPagePath: 'pages/index/index', // 首页
  pages: ['pages/login/index', 'pages/index/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
