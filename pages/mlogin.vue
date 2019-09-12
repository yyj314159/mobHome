<template>
  <login/>
</template>

<script>
  import login from '~/components/member/login.vue'

  export default {
    components: {
      login
    },
    head(){
      return{
        'title':'族蚂网',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂建站用户无需懂技术代码,无需租用服务器和存储空间,只需要了解和掌握基础的电脑知识,即可以通过简单的拖拽、编辑和设置功能设计属于自己的网站、网页并实现一键式在线发布,并且族蚂网为建站用户提供了大量的免费网站模板供“懒汉”用户使用。' },
          {hid:'keywords',name:'keywords',content:'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'}
        ]
      }
    },
  }
</script>
