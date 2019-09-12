<template>
      <Video :list='list' :posterList='posterList'/>
</template>

<script>
import Video from '~/components/more/M_video.vue'
import requestUtil from '~/assets/js/requestUtil.js';
export default {
  components: {
    Video
  },
  async asyncData({app,query}){
      let videoList = requestUtil.validateData(await requestUtil.getData('/admin/c_m/sysSiteDemoVideo/demonStration',{fVideoColumnId:7}));
      let posterList = requestUtil.validateData(await requestUtil.getData('/admin/c_m/sysSiteDemoVideo/demonStration',{fVideoColumnId:8}));
      return {
            list:videoList,
            posterList:posterList
        }
  },
  head(){
    return{
      'title':'免费建站在线直播视频教程-族蚂建站zuma.com',
      meta:[
        { hid: 'description', name: 'description', content: 'zuma族蚂网免费建站系统,为个人,公司/企业,党政机关,事业单位等提供大量建站模板,遍布各行各业,样式精美,编辑方便,使用免费组件,随意增添网站功能模块。还可以自主设计网页,更具个人特色,满足各行各业的建站需求。' },
        {hid:'keywords',name:'keywords',content:'自助建站,免费建站,快速建站,智能建站,网站建设,网站模板,族蚂建站,建站教程,直播教学,在线直播,'}
      ]
    }
  },
}
</script>
