<template>
      <product :pageData="pageData"/>
</template>

<script>
import product from '~/components/product/product.vue'
import ConstStr from '~/assets/js/ConstStr.js';
import requestUtil from '~/assets/js/requestUtil.js';
import BrowserMatch from '~/assets/js/operationLog.js';

export default {
  components: {
    product
  },
  async asyncData({app,query}){
      let productObj = {
        pageNow: 1, //当前页
        pageSize: 30, // 每页条数
        keyWord: null, //搜索词
        priceType: null, //价格类型
        productType: null, //产品类型
        productPayMent: null, //付款方式
        placeOrigin: null, //所在地
      };
      if(query && query.searchWord){
        productObj.keyWord = decodeURI(query.searchWord);
      }
      let productList = requestUtil.validateData(await requestUtil.getData(ConstStr.productSearchKeyWord,productObj));
      return {
        pageData:{
          productList:productList,
          obj:productObj
        }
      }
    },
    head(){
      return{
        'title':'购物-支持：服装、家居、数码、母婴等商品交易-族蚂商城zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂商城是一家多行业、综合性的在线商城,为您提供免费上传产品和服务,族蚂商城囊括了服装、美妆、食品、电器、电子、箱包等产品类型的在线交易,支持微信、支付宝、银联的支付方式,提供在线砍价、议价等功能。' },
          {hid:'keywords',name:'keywords',content:'族蚂商城,网上购物平台,在线商城,二手交易,交易平台,服装,美妆,家电,数码,电子产品,零食,玩具,器材,电子商务平台,网上购物,'}
        ]
      }
    },
  mounted(){
    if(this.$route.query && this.$route.query.zmfrom){
      localStorage.setItem("zmfrom",this.$route.query.zmfrom);
    }
    if(this.$route.query && this.$route.query.bd_vid){
      localStorage.setItem("bd_vid",this.$route.query.bd_vid);
    }
    BrowserMatch.init("zuma-购物");
  },
}
</script>
