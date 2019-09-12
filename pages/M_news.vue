<template>
      <news/>
</template>

<script>
import news from '~/components/more/M_news.vue'

export default {
  components: {
    news
  },
  head(){
    return{
      'title':'关于族蚂资讯-族蚂资讯zuma.com',
      meta:[
        { hid: 'description', name: 'description', content: '族蚂资讯,汇集生活、时尚、育儿、旅游、娱乐八卦、体育赛事、资讯等各大类型新闻资讯,关注社会生活。创建个人的站点博客,搭建自己的博客页面,分享生活,发表态度,制作自己的网络日志,发布图文视频,展现自我。' },
        {hid:'keywords',name:'keywords',content:'生活资讯,时尚资讯,网络日志,行业资讯,个人博客,新闻资讯,新闻热点,'}
      ]
    }
  },  
}
</script>