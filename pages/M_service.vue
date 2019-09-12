<template>
      <service :list="video"/>
</template>

<script>
import service from '~/components/more/M_service.vue'
import requestUtil from '~/assets/js/requestUtil.js';
export default {
    components: {
      service
    },
    async asyncData({app,query}){
        let videoList = requestUtil.validateData(await requestUtil.getData('/admin/c_m/sysSiteDemoVideo/demonStration',{fVideoAffiliationId:2}));
        return {video:videoList}
    },
    head(){
      return{
        'title':'服务交易详情-族蚂商城zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂商城为您提供了餐饮、住宿、保洁、搬家、拖车、洗车等多种服务类型,支持微信、支付宝、银联的支付方式。品类丰富,安全快捷,满足不同用户的不同需求。' },
          {hid:'keywords',name:'keywords',content:'上海生活服务,休闲娱乐,设备租赁,生活服务,保洁服务,婚庆,房屋装修,家政服务,'}
        ]
      }
    },
}
</script>
