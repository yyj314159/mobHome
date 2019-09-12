<template>
      <Audio :pageData="pageData"/>
</template>

<script>
import Audio from '~/components/audio/audio.vue'
import ConstStr from '~/assets/js/ConstStr.js';
import requestUtil from '~/assets/js/requestUtil.js';
import BrowserMatch from '~/assets/js/operationLog.js';

export default {
  components: {
    Audio
  },
  async asyncData({app,query}){
    let audioCategory = null;
    let list = null;
    let creatorType = null;
    let nationalityList = null;
    let searchWord = null;
    let obj = null;
    let type = null;
    if(query && query.searchWord){
      searchWord = decodeURI(query.searchWord);
    }
    if(query && query.type){
      type = parseInt(query.type);
    }
    if(query && type === 2){
      obj = {
        pageNow:1,
        pageSize:60,
        keyword:searchWord
      };
      list = requestUtil.validateData(await requestUtil.getData(ConstStr.getAlbumList,obj));
    }else if(query && type === 3){
      obj = {
        pageNow:1,
        pageSize:60,
        keyword:searchWord,
        creatorType:null,
        creatorNationalityType:null
      };
      list = requestUtil.validateData(await requestUtil.getData(ConstStr.getCreatorList,obj));
      if(searchWord){
        creatorType = requestUtil.validateData(await requestUtil.getData(ConstStr.getCreatorCategory,null));
        nationalityList = requestUtil.validateData(await requestUtil.getData(ConstStr.getNationalityList,null));
      }
    }else{
      obj = {
        pageNow:1,
        pageSize:60,
        keyword:searchWord,
        firstCategory:null,
        secondCategory:null
      };
      list = requestUtil.validateData(await requestUtil.getData(ConstStr.getAudioList,obj));
      if(searchWord){
        audioCategory = requestUtil.validateData(await requestUtil.getData(ConstStr.getAudioCategory,null));
      }
    }

    return {
      pageData:{
        list:list,  //首屏数据
        audioCategory:audioCategory,  //音频筛选大类
        creatorType:creatorType,  //创作人类型
        nationalityList:nationalityList,  //创作人国籍
        obj:obj,    //请求传参
        type:type   //1:音频,2:专辑,3:创作人
      }
    }

  },
  head(){
    if(this.pageData.type === 2){
      return{
        'title':'专辑-音乐专辑,歌手专辑,相声专辑,音频专辑-族蚂音频zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂网-海量专辑在线收听,专辑,音频,音乐,歌词,mv上传,支持作品下载打赏,可点赞分享或加入自己喜欢的歌单在线随时免费听。找声音,找专辑,找音乐上族蚂音频网,国内、欧美、日韩等多种音乐专辑免费听。族蚂网提供专辑爱好者在线听的需求。' },
          {hid:'keywords',name:'keywords',content:'专辑下载,免费专辑下载,新专辑,音乐专辑,音乐制作人,热门歌曲,在线听歌,音乐播放器,专辑免费下载网站'}
        ]
      }
    }else if(this.pageData.type === 3){
      return{
        'title':'创作人-独立音乐人,音乐制作人-族蚂音频zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂音频海量知名创作人作品在线收听,创作歌手上传音乐,你喜欢的歌手都在这。提供2019最新网络歌曲、华语音乐、英文歌曲、相声、戏曲、脱口秀、有声小说等音频的在线收听。' },
          {hid:'keywords',name:'keywords',content:'独立音乐人,音频下载,音乐制作人,原创音乐,免费音乐下载,音乐人,创作人音乐免费下载'}
        ]
      }
    }else{
      return{
        'title':'音频-海量正版脱口秀,有声书,相声小品,新歌等无损音频免费畅听-族蚂音频zuma.com',
        meta:[
          { hid: 'description', name: 'description', content: '族蚂音频—海量音频在线收听,音频、专辑、歌词、MV上传,支持作品打赏,让创作人可获取收益。在线评论功能,发表你的意见或建议。可上传流行音乐、英文音乐、经典老歌、戏曲、评书、有声小说、有声书、话剧、相声、脱口秀等多种类型音频。各种功能模块满足音频爱好者和音频创作者的需求。' },
          {hid:'keywords',name:'keywords',content:'音频下载,音频播放器,有声书,相声小品,音乐网站,热门歌曲,免费音乐下载,在线听歌,脱口秀,'}
        ]
      }
    }
  },
  mounted(){
    if(this.$route.query && this.$route.query.zmfrom){
      localStorage.setItem("zmfrom",this.$route.query.zmfrom);
    }
    if(this.pageData.type === 1){
      BrowserMatch.init("zuma-音频");
    }else if(this.pageData.type === 2){
      BrowserMatch.init("zuma-专辑");
    }else if(this.pageData.type === 3){
      BrowserMatch.init("zuma-创作人");
    }else{
      BrowserMatch.init("zuma-音频");
    }
  }
}
</script>
