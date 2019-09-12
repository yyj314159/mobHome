<template>
      <site :pageData="pageData"/>
</template>

<script>
import site from '~/components/website/website.vue'
import ConstStr from '~/assets/js/ConstStr.js';
import requestUtil from '~/assets/js/requestUtil.js';
import BrowserMatch from '~/assets/js/operationLog.js';

export default {
  components: {
    site
  },
  async asyncData({app,query}){

      let obj={
          pageNow: 1, //页码
          pageSize: 10, //页长度
          keyWord:null,
        };
      let templateBigCategory = null;
      if(query && query.searchWord){
        obj.keyWord = decodeURI(query.searchWord);

      }
      let templateList = requestUtil.validateData(await requestUtil.getData(ConstStr.webA,obj));
      return {
        pageData:{
          templateList:templateList,
          obj:obj
        }
      }
    },
    head(){
      return{
        'title':'快速建站,企业建站,免费自助建站-族蚂建站zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂建站用户无需懂技术代码,无需租用服务器和存储空间,只需要了解和掌握基础的电脑知识,即可以通过简单的拖拽、编辑和设置功能设计属于自己的网站、网页并实现一键式在线发布,并且族蚂网为建站用户提供了大量的免费网站模板供“懒汉”用户使用。' },
          {hid:'keywords',name:'keywords',content:'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'}
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
    BrowserMatch.init("zuma-模板");
  }
}
</script>
