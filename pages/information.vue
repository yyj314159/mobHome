<template>
      <information :pageData="pageData"/>
</template>

<script>
import information from '~/components/information/information.vue'
import ConstStr from '~/assets/js/ConstStr.js';
import requestUtil from '~/assets/js/requestUtil.js';
import BrowserMatch from '~/assets/js/operationLog.js';

export default {
  components: {
    information
  },
  async asyncData({app,query}){
      
      let blogobj = {
        //当前页
        pageNow:1,
        //每页条数
        pageSize:12,
        //搜索词
        keyword:null,
        //博客类型   1文本/18视频/6图片
        fBlogType:null,     
      };

      //新闻传参
      let newsobj={
        //当前页
        pageNow:1,
        //每页条数
        pageSize:12,
        //搜索词
        keyword:null,
        //新闻类型
        fNewsType:null,
        //新闻类目id
        fFristZumaItemId:null,
      };
      let type;
      let DataList;
      let newsBigCategory;
      let bolgLabs;
      let titleType;
      if(parseInt(query.type) === 1){
        type = 1;
        titleType = 1;
        if(query && query.searchWord){
                  blogobj.keyword = decodeURI(query.searchWord);
                }
         DataList = requestUtil.validateData(await requestUtil.getData(ConstStr.blogSearchKeyWord,blogobj)); 

      }else{
        type = 2;
        if(query.type){
          titleType = 2;
        }else{
          titleType = null;
        }
      if(query && query.searchWord){
          newsobj.keyword = decodeURI(query.searchWord);
          newsBigCategory = await requestUtil.getData(ConstStr.newsFirstcategory,null).then((res)=>{
            if(res.data){
              return res.data;
            }
          });
        }
        DataList = requestUtil.validateData(await requestUtil.getData(ConstStr.newsSearchKeyWord,newsobj)); 
      }
      return {
        pageData:{
          DataList:DataList,
          newsBigCategory:newsBigCategory,
          newsobj:newsobj,
          blogobj:blogobj,
          type:type,
          titleType:titleType
        }
      }
    },
    head(){
      if(this.pageData.titleType === 1){
        return{
          'title':'文章-网络日志,个人文章-族蚂资讯zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '来族蚂网创建个人的主体文章,装修自己的文章页面,分享生活,发表态度,制作自己的网络日志,发布体育赛事,热点,科技,娱乐,图文视频,展现自我。' },
            {hid:'keywords',name:'keywords',content:'个人文章网站,网络日志,时尚资讯,个人文章模板,个人文章,'}
          ]
        }
      }else{
        return{
          'title':'资讯-新闻资讯,热点新闻-族蚂资讯zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂资讯zuma.com包含海量资讯,行业资讯,新闻事件,热点话题,人物动态,产品资讯,更多实时信息随时更新,让用户快速得知事件详情和时事新闻。' },
            {hid:'keywords',name:'keywords',content:'最新资讯,行业资讯,热点资讯,时事评论,新闻资讯,新闻热点,'}
          ]
        }
      }
    },
  mounted(){
    if(this.$route.query && this.$route.query.zmfrom){
      localStorage.setItem("zmfrom",this.$route.query.zmfrom);
    }
    if(this.pageData.type === 1){
      BrowserMatch.init("home-博客");
    }else{
      BrowserMatch.init("home-资讯");
    }
  }
}
</script>
