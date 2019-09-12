<template>
      <searchResult2 :pageData="pageData"/>
</template>

<script>
import searchResult2 from '~/components/public/searchResult2.vue'
import ConstStr from '~/assets/js/ConstStr.js';
import requestUtil from '~/assets/js/requestUtil.js';
export default {
  components: {
    searchResult2
  },
  async asyncData({app,query}){
    var list;//数据
    if(!query.word)  return {
      pageData:{
        list:[],
        tabindex:query.tabIndex,
        obj:{
          pageNow:1,
          pageSize:30,
          keyWord:false
        }
      }
    }

//产品
    // console.log("queryasdad",query)
    if( Number(query.tabIndex) == 1){
      var obj = {
        pageNow:1,
        pageSize:30,
        keyWord:query.word
      };
    list = requestUtil.validateData(await requestUtil.getData(ConstStr.productSearchKeyWord,obj));
    console.log("listq",list)
      return {
        pageData:{
          list:list,
          obj:obj,
          tabindex:query.tabIndex
        }

      }

  }
//服务
    if( Number(query.tabIndex) == 2){
      var obj = {
        pageNow:1,
        pageSize:30,
        keyword:query.word
      };
      list = requestUtil.validateData(await requestUtil.getData(ConstStr.serviceSearchKeyWord,obj));
      return {
        pageData:{
          list:list,
          obj:obj,
          tabindex:query.tabIndex
        }

      }
    }

//音频
    if( Number(query.tabIndex) == 3){
      var obj = {
        pageNow:1,
        pageSize:30,
        keyword:query.word,
      };
      if(Number(query.type)==2){
        list = requestUtil.validateData(await requestUtil.getData(ConstStr.getAlbumList,obj));
      }else if(Number(query.type)==3){
        list = requestUtil.validateData(await requestUtil.getData(ConstStr.getCreatorList,obj));
      }else{
        list = requestUtil.validateData(await requestUtil.getData(ConstStr.getAudioList,obj));
      }

      return {
        pageData:{
          list:list,
          obj:obj,
          tabindex:query.tabIndex,
          type:query.type
        },
         type:query.type
      }

    }

// 资讯
    if( Number(query.tabIndex) == 4){
      var obj = {
        pageNow:1,
        pageSize:12,
        keyword:query.word
      };
      if(Number(query.type)==1){
        list = requestUtil.validateData(await requestUtil.getData(ConstStr.blogSearchKeyWord,obj));
      }else{
        list = requestUtil.validateData(await requestUtil.getData(ConstStr.newsSearchKeyWord,obj));
      }
      return {
        pageData:{
          list:list,
          obj:obj,
          tabindex:query.tabIndex,
          type:query.type
        },
      }
    }

//模板
    if( Number(query.tabIndex) == 0){
      var obj = {
        pageNow:1,
        pageSize:10,
        keyWord:query.word
      };
      list = requestUtil.validateData(await requestUtil.getData(ConstStr.webA,obj));
      return {
        pageData:{
          list:list,
          obj:obj,
          tabindex:query.tabIndex
        }
      }
    }
  },
  head(){
    if(Number(this.pageData.tabindex) == 1){
      if(this.pageData.obj.keyWord){
        return{
          'title':this.pageData.obj.keyWord+'-购物-族蚂商城zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂商城是一家多行业、综合性的在线商城,为您提供免费上传产品和服务,族蚂商城囊括了服装,美妆,食品、电器、电子,箱包等产品类型的在线交易,支持微信、支付宝、银联的支付方式,提供在线砍价、议价等功能。' },
            {hid:'keywords',name:'keywords',content:'族蚂商城,网上购物平台,在线商城,二手交易,交易平台,服装,美妆,家电,数码,电子产品,零食,玩具,器材,电子商务平台,网上购物,'}
          ]
        }
      }else{
        return{
          'title':'产品搜索-族蚂商城zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂商城是一家多行业、综合性的在线商城,为你提供免费上传产品和服务,族蚂商城囊括了服装、母婴、家具、电器、建材、器械、手办等产品类型,支持微信、支付宝、银联的支付方式,提供在线议价等功能。' },
            {hid:'keywords',name:'keywords',content:'族蚂商城,网上购物平台,在线商城,二手交易,交易平台,砍价,电子商务平台,网上购物,'}
          ]
        }
      }
    }else if(Number(this.pageData.tabindex) == 2){
      if(this.pageData.obj.keyWord){
        return{
          'title':this.pageData.obj.keyWord+'-服务-族蚂商城zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂商城为您提供了餐饮、住宿、保洁、搬家、拖车、洗车等多种服务类型,支持微信、支付宝、银联的支付方式。品类丰富,安全快捷,满足不同用户的不同需求。' },
            {hid:'keywords',name:'keywords',content:'上海生活服务,休闲娱乐,设备租赁,生活服务,保洁服务,婚庆,房屋装修,家政服务,'}
          ]
        }
      }else{
        return{
          'title':'服务搜索-族蚂商城zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂商城为您提供了餐饮、住宿、保洁、搬家、拖车、洗车等多种服务类型,支持微信、支付宝、银联的支付方式。品类丰富,安全快捷,满足不同用户的不同需求。' },
            {hid:'keywords',name:'keywords',content:'上海生活服务,休闲娱乐,设备租赁,生活服务,保洁服务,婚庆,房屋装修,家政服务,'}
          ]
        }
      }
    }else if(Number(this.pageData.tabindex) == 3){
      if(this.type == 2 && this.pageData.obj.keyword){
        return{
          'title':this.pageData.obj.keyword+'-专辑-族蚂音频zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂音频—海量音频在线收听,音频、专辑、歌词、MV上传,支持作品打赏,让创作人可获取收益。在线评论功能,发表你的意见或建议。可上传流行音乐、英文音乐、经典老歌、戏曲、评书、有声小说、有声书、话剧、相声、脱口秀等多种类型音频。各种功能模块满足音频爱好者和音频创作者的需求。' },
            {hid:'keywords',name:'keywords',content:'音频下载,音频播放器,音乐专辑,原创歌曲,有声书,相声小品,音乐制作人,音乐网站,热门歌曲,免费音乐下载,在线听歌,脱口秀,'}
          ]
        }
      }else if(this.type == 3 && this.pageData.obj.keyword){
        return{
          'title':this.pageData.obj.keyword+'-创作人-族蚂音频zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂音频—海量音频在线收听,音频、专辑、歌词、MV上传,支持作品打赏,让创作人可获取收益。在线评论功能,发表你的意见或建议。可上传流行音乐、英文音乐、经典老歌、戏曲、评书、有声小说、有声书、话剧、相声、脱口秀等多种类型音频。各种功能模块满足音频爱好者和音频创作者的需求。' },
            {hid:'keywords',name:'keywords',content:'音频下载,音频播放器,音乐专辑,原创歌曲,有声书,相声小品,音乐制作人,音乐网站,热门歌曲,免费音乐下载,在线听歌,脱口秀,'}
          ]
        }
      }else{
        return{
           'title':this.pageData.obj.keyword+'-音频-族蚂音频zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂音频—海量音频在线收听,音频、专辑、歌词、MV免费上传,支持作品打赏,让创作人可获取收益。在线评论功能,发表你的意见或建议。可上传流行音乐、英文音乐、经典老歌、戏曲、评书、话剧、相声、脱口秀等多种类型音乐。各种功能模块满足音乐爱好者和音乐创作者的需求。' },
            {hid:'keywords',name:'keywords',content:'音频下载,音频播放器,音乐专辑,原创歌曲,有声书,相声小品,音乐制作人,音乐网站,热门歌曲,免费音乐下载,在线听歌,脱口秀,'}
          ]
        }
      }
    }else if(Number(this.pageData.tabindex) == 4){
      if(this.pageData.type === 2 && this.pageData.obj.keyWord){
        return{
          'title':this.pageData.obj.keyWord+'-博客-族蚂音频zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂资讯,汇集生活、时尚、育儿、旅游、娱乐八卦、体育赛事、资讯等各大类型新闻资讯,关注社会生活。创建个人的站点博客,搭建自己的博客页面,分享生活,发表态度,制作自己的网络日志,发布图文视频,展现自我。' },
            {hid:'keywords',name:'keywords',content:'生活资讯,时尚资讯,网络日志,行业资讯,个人博客,新闻资讯,新闻热点,'}
          ]
        }
      }else{
        if(this.pageData.obj.keyWord){
          return{
            'title':this.pageData.obj.keyWord+'-资讯-族蚂资讯zuma.com',
            meta:[
              { hid: 'description', name: 'description', content: '族蚂资讯,汇集生活、时尚、育儿、旅游、娱乐八卦、体育赛事、资讯等各大类型新闻资讯,关注社会生活。创建个人的站点博客,搭建自己的博客页面,分享生活,发表态度,制作自己的网络日志,发布图文视频,展现自我。' },
              {hid:'keywords',name:'keywords',content:'生活资讯,时尚资讯,网络日志,行业资讯,个人博客,新闻资讯,新闻热点,'}
            ]
          }
        }else{
          return{
            'title':'资讯搜索-族蚂资讯zuma.com',
            meta:[
              { hid: 'description', name: 'description', content: '族蚂资讯,汇集生活、时尚、育儿、旅游、娱乐八卦、体育赛事、资讯等各大类型新闻资讯,关注社会生活。创建个人的站点博客,搭建自己的博客页面,分享生活,发表态度,制作自己的网络日志,发布图文视频,展现自我。' },
              {hid:'keywords',name:'keywords',content:'生活资讯,时尚资讯,网络日志,行业资讯,个人博客,新闻资讯,新闻热点,'}
            ]
          }
        }
      }
    }else if(Number(this.pageData.tabindex) == 0){
      if(this.pageData.obj.keyWord){
        return{
          'title':this.pageData.obj.keyWord+'-网站搭建-族蚂建站zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂建站是一家免费建站的平台,在线创建站点,即可免费领取域名和空间。其中一站式建站、拖拽式建站等功能为许多不懂技术的小白、中小型企业提供更方便的操作和更优质服务。自主设计网页布局,各类组件的使用,也可也让网站更具个人特色,搭建属于自己的网站。' },
            {hid:'keywords',name:'keywords',content:'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'}
          ]
        }
      }else{
        return{
          'title':'模板搜索-族蚂建站zuma.com',
          meta:[
            { hid: 'description', name: 'description', content: '族蚂建站是一家免费建站的平台,在线创建站点,即可免费领取域名和空间。其中一站式建站、拖拽式建站等功能为许多不懂技术的小白、中小型企业提供更方便的操作和更优质服务。自主设计网页布局,各类组件的使用,也可也让网站更具个人特色,搭建属于自己的网站。' },
            {hid:'keywords',name:'keywords',content:'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'}
          ]
        }
      }
    }
  },

}
</script>
