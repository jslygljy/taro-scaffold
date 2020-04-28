import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();
class App extends Component {
  componentDidMount () {}
  config = {
    pages: [
      'pages/index/index',
      'pages/my/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      // navigationStyle: 'custom',
    },
    tabBar: {
      selectedColor:'#FF4228',
      color:'#8E8E8E',
      list: [{
        pagePath: "pages/index/index",
        iconPath:'assets/home-icon.png',
        selectedIconPath:'assets/home-selected.png',
        text: "首页"
      }, {
        pagePath: "pages/my/index",
        iconPath:'assets/my-icon.png',
        selectedIconPath:'assets/my-selected.png',
        text: "我的"
      }]
    },
    navigateToMiniProgramAppIdList: [
    ],
  }

  componentDidShow () {
    //  /* 版本自动更新代码 */
    //  const updateManager = Taro.getUpdateManager()
    //  updateManager.onCheckForUpdate(function (res) {
    //    console.log(res.hasUpdate) // 请求完新版本信息的回调 true说明有更新
    //  })
    //  updateManager.onUpdateReady(function () {
    //   Taro.showModal({
    //      title: '更新检测', // 此处可自定义提示标题
    //      content: '检测到新版本，是否重启小程序？', // 此处可自定义提示消息内容
    //      success: function (res) {
    //        if (res.confirm) {
    //          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //          updateManager.applyUpdate()
    //        }
    //      }
    //    })
    //  })
    //  updateManager.onUpdateFailed(function () {
    //    // 新的版本下载失败
    //    Taro.showModal({
    //      title: '更新提示',
    //      content: '新版本下载失败',
    //      showCancel: false
    //    })
    //  })
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
