import "taro-ui/dist/style/components/flex.scss";
import {
    View,
    Text,
    Image
} from '@tarojs/components'
import Taro, { useState,useEffect } from '@tarojs/taro'
import './contentOne.less'


function ContentOne({ res }) {
    const [product,setProduct] = useState([]);

    useEffect(() => {
        setProduct(res);
    },[res]);
    return (
        <View className='content-one-list'>
            {
                product.map((item) => {
                    let coverImg=~item.cover_image.indexOf('?')?item.cover_image.split('?')[0]:item.cover_image;
                    return <View key={item.id} className='intro-board'>
                    <View  className='at-row'>
                        <View className='at-col-left'>
                            <View className='at-photo'>
                                <Image webp='true' className='photo' src={`${coverImg}?x-oss-process=image/format,webp`} mode='scaleToFill'></Image>
                            </View>
                        </View>
                        <View className='at-col'>
                            <View className='at-content'>
                                <View className='name'>
                                    <Text style='-webkit-box-orient:vertical;' className='pro-name'>{item.name}</Text>
                                </View>
                                <View className='other-board'>
                                <View className='tips'>
                                    {
                                        item.selling_point && item.selling_point.length && item.selling_point.map((value,index)=>{
                                            return (
                                            value && value.trim().length?
                                            <Text style='-webkit-box-orient:vertical;' className='tip' key={String(index)}>{value}</Text>:null
                                            )
                                        })
                                    }
                                </View>
                                    
                                    <View className='price'>
                                    <Text className='symbol'>¥</Text>
                                    <Text>{item.sale_price}</Text>
                                    {
                                        (parseFloat(item.market_price,10)>item.sale_price) &&
                                        <Text className='market'>市价{item.market_price}</Text>
                                    }
                                    <Text className='sale-num'>
                                        月售{item.sale_number}
                                    </Text>
                                    </View>
                                    {
                                    (item.newcomer_offer && item.newcomer_offer.discount && item.newcomer_offer.discount>0)?
                                    <View className='desc'>
                                        <Text>{item.newcomer_offer.text}{
                                        item.newcomer_offer.discount
                                    }元</Text>
                                        <Text className='at-icon at-icon-chevron-right'></Text>
                                    </View> : null
                                    }

                                </View>

                            </View>
                            </View>
                    </View>
                    </View>

                })
            }
        </View>
    );
}

export default ContentOne