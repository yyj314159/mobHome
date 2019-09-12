<template>
      <Shop :lists="video"/>
</template>

<script>
import Shop from '~/components/more/M_shop.vue'
import requestUtil from '~/assets/js/requestUtil.js';
export default {
  components: {
    Shop
  },
  async asyncData({app,query}){
      let videoList = requestUtil.validateData(await requestUtil.getData('/admin/c_m/sysSiteDemoVideo/demonStration',{fVideoAffiliationId:1}));
      return {video:videoList}
  },
  head(){
    return{
      'title':'关于族蚂购物-族蚂商城zuma.com',
      meta:[
        { hid: 'description', name: 'description', content: '族蚂商城是一家多行业、综合性的在线商城,为你提供免费上传产品和服务,族蚂商城囊括了服装、母婴、家具、电器、建材、器械、手办等产品类型,支持微信、支付宝、银联的支付方式,提供在线议价等功能。' },
        {hid:'keywords',name:'keywords',content:'族蚂商城,网上购物平台,在线商城,二手交易,交易平台,砍价,电子商务平台,网上购物,'}
      ]
    }
  },
}
</script>
