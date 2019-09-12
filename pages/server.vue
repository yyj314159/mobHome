<template>
      <server :pageData="pageData"/>
</template>

<script>
import server from '~/components/service/service.vue'
import ConstStr from '~/assets/js/ConstStr.js';
import requestUtil from '~/assets/js/requestUtil.js';
import BrowserMatch from '~/assets/js/operationLog.js';

export default {
  components: {
    server
  },
  async asyncData({app,query}){
      let serverObj = {
        page:1,//当前页
        pageSize:30,// 每页条数
        keyword:null,//搜索词
        priceSort:null,//价格排序 1由低到高,2由高到底,3定制价格
        isOpenPrice:null,//是否议价 0:一口价，1:接受议价
        payType:null,//付款方式 0一次性，1分阶段，2分时段
        takeType:null,//1分钟，2小时，3按天，4按月
        serviceType:null,//(服务方式)1上门服务，2到店服务，3线上服务，4电话服务，5代办服务，
        serviceShopAddress:null,//(地址字符串">"隔开)
        fShopId: null,
      };

      if(query && query.searchWord){
        serverObj.keyword = decodeURI(query.searchWord);
      }
      let serverList = requestUtil.validateData(await requestUtil.getData(ConstStr.serviceSearchKeyWord,serverObj)); 

      return {
        pageData:{
          serverList:serverList,
          obj:serverObj
        }
      }
    },
    head(){
      return{
        'title':'服务-提供租房,租车,保姆,代驾,家教,装修等生活服务-族蚂商城zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂商城为您提供了餐饮、住宿、保洁、搬家、租房、租车、婚庆、洗车等多种服务类型,支持微信、支付宝、银联的在线支付方式。品类丰富,安全快捷,满足不同用户的各种服务需求。' },
          {hid:'keywords',name:'keywords',content:'上海生活服务,休闲娱乐,设备租赁,生活服务,保姆,保洁服务,婚庆,房屋装修,家政服务,'}
        ]
      }
    },
  mounted(){
    if(this.$route.query && this.$route.query.zmfrom){
      localStorage.setItem("zmfrom",this.$route.query.zmfrom);
    }
    BrowserMatch.init("zuma-服务");
  },
}
</script>
