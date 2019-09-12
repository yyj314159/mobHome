<template>
<div>
    <no-ssr>
        <video-player
            class="vjs-custom-skin video-play-box"
            ref="videoPlayer"
            :options="playerOptions"
            @play="play(index)"
            :aid="index"
        ></video-player>
    </no-ssr>
</div>
   
</template>

<script>
    import 'video.js/dist/video-js.css'
    import img from './images/video-mark.jpg'
    require('./css/video.css');
    export default {
        name: "videoPlay",
        props:{
            index:{
                required:true
            },
            autoplay:{
                default:false,
                required: false
            },
            list:{
                type:Object,
                required:true
            }
        },
        data(){
            return {
                playerOptions:{
                    sources:[
                        {
                            type:'video/mp4',
                            src:Object.keys(this.list).length==0 ? '' : this.list.fVideoAddress
                        }
                    ],
                    fluid:true,
                    aspectRatio: '16:9',
                    language:'zh-CN',
                    width:'100%',
                    height:'100%',
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    poster:img,
                    autoplay:this.autoplay,
                    preload:false,
                    controlBar:{
                        currentTimeDisplay:true,
                        durationDisplay:true,
                        remainingTimeDisplay:true,
                        fullscreenToggle:true
                    }
                },
            }
        },
        methods:{
            play(aid){
                console.log("播放")
                let video = document.querySelectorAll("video");
                Array.from(video).map((player,index)=>{
                    if(index==aid-1){

                    }else{
                        player.pause()
                    }
                })
            },
            pause(){
                console.log('暂停')
            }
        }
    }
</script>

<style >

</style>
