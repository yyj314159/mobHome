<template>
      <Audio/>
</template>

<script>
import Audio from '~/components/more/M_audio.vue'

export default {
  components: {
    Audio
  },
  head(){
    return{
      'title':'族蚂音乐平台-族蚂音频zuma.com',
      meta:[
        { hid: 'description', name: 'description', content: '族蚂音频—海量音频在线收听,音频、专辑、歌词、MV免费上传,支持作品打赏,让创作人可获取收益。在线评论功能,发表你的意见或建议。可上传流行音乐、英文音乐、经典老歌、戏曲、评书、话剧、相声、脱口秀等多种类型音乐。各种功能模块满足音乐爱好者和音乐创作者的需求。' },
        {hid:'keywords',name:'keywords',content:'音频下载,音频播放器,音乐专辑,原创歌曲,有声书,相声小品,音乐制作人,音乐网站,热门歌曲,免费音乐下载,在线听歌,脱口秀,'}
      ]
    }
  },
}
</script>