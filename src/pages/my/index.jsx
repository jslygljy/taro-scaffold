import {
  Image,
  View,
  Button} from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtSwitch} from "taro-ui"
import {setStorage} from '@utils/util'
import './index.less'

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user:{},
      isLogin:false,
      value: false
    }
  }
  componentDidMount() {
    this.setState({
      value: Taro.getStorageSync('isDev')
    });
  }
  componentDidShow() {
  }
  
  config = {
    navigationBarTitleText: '我的',
  }
  
  onGotUserInfo(){
    Taro.login({
      success: code=> {
        console.log(code)
            Taro.getUserInfo().then((res) => {
              const { errMsg, userInfo } = res
              if (errMsg === 'getUserInfo:ok') {
                this.setState({
                  user:userInfo,
                  isLogin:true
                })
              } else {
                Taro.showToast({
                  title: '授权失败',
                  icon: 'none'
                })
              }
            })
      }
    });
  }
  handleChange=(value)=>{
    Taro.clearStorage();
    setStorage('isDev',value);
    Taro.showToast({
      title:'请重启小程序即可生效',
      icon:'none'
    })
    this.setState({
      value:value,
      isLogin:false,
      user:{}
    });
  }
  render() {
    let {user,isLogin}=this.state;
    console.log(user)
    return (
      <View className='my'>
          <View className='header'>
            <Image src={user.avatarUrl?user.avatarUrl:'https://static-oss.qutoutiao.net/png2/default.png'} />
            {
              isLogin?
              <Button plain='true' className='btn-name' lang='zh_CN'>
                {
                  isLogin?(user.nickName?user.nickName:`用户${user.nickName}`):'未登录'
                }
              </Button>:
              <Button openType='getUserInfo' plain='true' className='btn-name' lang='zh_CN' onGetUserInfo={this.onGotUserInfo.bind(this)}>
                {
                  isLogin?(user.nickName?user.nickName:`用户${user.nickName}`):'未登录'
                }
              </Button>
            }
          </View>
          <View>
            {
              /* eslint-disable */
              __wxConfig.envVersion!='release'?
              <AtSwitch title={this.state.value?'线下':'线上'} checked={this.state.value} onChange={this.handleChange} />:null
            }
          </View>

      </View>
    )
  }
}
export default Index
