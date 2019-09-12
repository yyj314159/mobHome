<template>
      <Website :list='list'/>
</template>

<script>
import Website from '~/components/more/M_website.vue'
import requestUtil from '~/assets/js/requestUtil.js';
export default {
  components: {
    Website
  },
  async asyncData({app,query}){
      let videoList = requestUtil.validateData(await requestUtil.getData('/admin/c_m/sysSiteDemoVideo/demonStration',{fVideoAffiliationId:3}));
      let gifList = requestUtil.validateData(await requestUtil.getData('/admin/c_m/sysSiteDemoVideo/demonStration',{fVideoAffiliationId:5}));
      let arr=[videoList,gifList]
      return {list:arr}
  },
  head(){
    return{
      'title':'免费网站建设-族蚂建站zuma.com',
      meta:[
        { hid: 'description', name: 'description', content: '族蚂建站是一家免费建站的平台,在线创建站点,即可免费领取域名和空间。其中一站式建站、拖拽式建站等功能为许多不懂技术的小白、中小型企业提供更方便的操作和更优质服务。自主设计网页布局,各类组件的使用,也可也让网站更具个人特色,搭建属于自己的网站。' },
        {hid:'keywords',name:'keywords',content:'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'}
      ]
    }
  },
}
</script>
