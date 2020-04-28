import {
  Block,
  Swiper,
  SwiperItem,
  Image,
  View,
  ScrollView
} from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import request from '@utils/request'
import { API_INDEX_TAB } from '@constants/api'
import Report from '@utils/Report'
import ContentOne from './bizComponents/contentOne'
import {getOrderDetail,setOrderSku} from "@store/order/action";
import './index.less'


@connect(
  ({ order }) => ({
    goods: order.goods,
    skuid:order.skuid,
    skuInfo:order.skuInfo,
    comment:order.comment
  }),
  {
    dispatchGetOrderDetail: getOrderDetail,
    dispatchSetOrderSku: setOrderSku
  }
)

class Index extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      goods: [
        {
          imgUrl: 'https://static-oss.qutoutiao.net/png/SKII2.png?x-oss-process=image/format,webp',
          url: '/pages/product/index?good_id=155'
        },
        {
          imgUrl: 'https://static-oss.qutoutiao.net/png/fangshai.png?x-oss-process=image/format,webp',
          url: '/pages/product/index?good_id=145'
        },
        {
          imgUrl: 'https://static-oss.qutoutiao.net/png/mianmo.png?x-oss-process=image/format,webp',
          url: '/pages/product/index?good_id=147'
        }
      ],
      contents: [{"cover_image":"https://static-image.haozan123.cn/admin/images/2020/03/26/1585202648055759893.jpg","end_time":"1天","id":145,"is_recommend":1,"market_price":"628","name":"【爆款】【李佳琦推荐】泰国Mistine小黄帽防晒霜乳女50+防紫外线秋冬身体面部隔离40ML","newcomer_offer":{"discount":"12.6","text":"首单再减"},"recommend_image":"https://static-image.haozan123.cn/admin/images/2020/04/10/1586510403293548957.jpg","sale_number":"27","sale_price":"79.0","selling_point":["李佳琦推荐"],"share_times":372,"commission_amount":"9.0"}],
      systemInfo:Taro.getSystemInfoSync()
    }
  }
  async componentDidMount() {
    Report({date:123});
    console.log(this.props);
  }
  async getTabListInfo() {
    return await request({
      url: API_INDEX_TAB,
      method: 'POST',
      payload: {}
    });
  }
  config = {
    enablePullDownRefresh:true,
    navigationBarBackgroundColor:'#FFEDEC'
  }
  
  async onScrollToLower(){
    
  }
  previewImage(url){
    Taro.navigateTo({
      url:url
    })
  }
  onShareAppMessage () {
    return {
      title: '省钱好货 买的多省的多 卖的多赚的多',
      path: '/pages/index/index'
    }
  }

  render() {
    const {
      goods,
      contents,
      systemInfo
    } = this.state;
    const Threshold = 50;
    const scrollStyle = {
      height: `${systemInfo.windowHeight}px`
    };
    return (
      <ScrollView 
        className='scrollview'
        scrollY='true'
        style={scrollStyle}
        scrollWithAnimation
        lowerThreshold={Threshold}
        onScrollToLower={this.onScrollToLower.bind(this)}
      >
      <View className='header-board'>
        <Swiper
          indicatorDots='true'
          indicatorColor='rgba(255, 255, 255, 1)'
          autoplay='true'
          interval={3000}
          className='banner'
          duration={1000}
          circular={1000}
        >
          {
            goods.map((item, index) => {
              return (
                <Block key={String(index)}>
                  <SwiperItem className='slide-item'>
                    <Image
                      src={item.imgUrl}
                      className='slide-image'
                      mode='scaleToFill'
                      webp='true'
                      data-src={item.imgUrl}
                      onClick={this.previewImage.bind(this,item.url)}
                    ></Image>
                  </SwiperItem>
                </Block>
              )
            })
          }
        </Swiper>
      </View>
        <View className='container'>
          <View className='tab-list-board'>
            <ContentOne res={contents} />
          </View>
        </View>        
      </ScrollView>
    )
  }
}
export default Index