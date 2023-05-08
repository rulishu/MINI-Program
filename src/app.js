import { useDidShow, useDidHide } from '@tarojs/taro'
import './app.less'

export default function App(props) {
  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}
