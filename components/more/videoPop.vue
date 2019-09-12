<template>
    <div class="playModal">
        <div class="playModal-top">
            <i @click="playClose"></i>
            <span>{{playUrl.playName}}</span>
        </div>
        <div class="playModal-con">
            <img v-show='thumbnailShow' :src="playUrl.fVideoThumbnail" alt="">
            <video v-if="mobile=='android'" id="video" ref='video'
                width="100%"
                height="100%"
                x5-video-player-fullscreen="true"
                x5-playsinline
                playsinline
                webkit-playsinline
                preload="auto"
                controls
                @pause="handPlay(2)"
                @play="handPlay(1)"
                @timeupdate="videoTimeUpdate"
                :src="playUrl.fVideoAddress"  >
            </video>
            <video v-if="mobile=='iPhone'" id="video" ref='video'
                width="100%"
                height="100%"
                controls
                @pause="handPlay(2)"
                @play="handPlay(1)"
                 @timeupdate="videoTimeUpdate"
                :src="playUrl.fVideoAddress" >
            </video>
        </div>
        <!-- <div class="playModal-bottom">
            <div class="timeBox">
                <div class="time">
                    <i class="isPlay" @click="clickIsPlay" :class="{active:playOrPause}"></i>
                    <span class="newTime ">{{currentTime|timeVal}}</span><span class="">/</span><span class="allTime ">{{videoDuration|timeVal}}</span>
                </div>
                <div class="sound">
                    <i class="soundSize" :class="{active:soundLeft<=0}"></i>
                    <p class="setSound" @touchstart.stop='starMove($event,"sound")' @touchmove='move($event,"sound")'><span><em :style="{width:soundLeft+'px'}"></em><i class="sliderEl" :style="{left:soundLeft+'px'}"></i></span></p>
                </div>
            </div>
            <div class="barBox">
                <p class="setTime" @touchstart.stop='starMove($event,"time")' @touchmove='move($event,"time")'><span><em :style="{width:timeLeft+'px'}"></em><i class="sliderEl" :style="{left:timeLeft+'px'}"></i></span></p>
            </div>
        </div> -->
    </div>
</template>
<script>
import { setInterval, setTimeout } from 'timers';
import moreModal from "../public/moreModal";
import eventBus from "~/assets/js/eventBus";
import { platform } from 'os';
    export default {
        name:'videoPop',
        data(){
            return{
                playOrPause:false,
                thumbnailShow:true,
                mobile:"",//ios or 安卓
                videoDuration:0,//视频时长
                currentTime:0,//当前播放时间

                offsetLeft:0,//
                soundLeft:0,//偏移量 声音大小

                sliderElWidth:0,//滑块的宽

                timeLeft:0,//偏移量 视频进度
                videoBarLength:0,//视频进度条滑块的长度,
                soundBarLength:0,//声音大小进度条条滑块的长度

            }
        },
        props:['playUrl'],
        mounted(){
            // this.getContent();
            let video = document.getElementById('video')
            this.text=navigator.appVersion
            this.mobile = navigator.appVersion.indexOf('iPhone') !== -1 ? 'iPhone' :  'android';
            console.log(this.playUrl)
            var _this=this;
            this.$nextTick(()=>{
                var video=this.$refs.video
                video.play();
                // this.sliderElWidth=document.getElementsByClassName('sliderEl')[0].clientWidth;
                // this.videoBarLength=document.getElementsByClassName('setTime')[0].clientWidth-this.sliderElWidth;
                // this.soundBarLength=document.getElementsByClassName('setSound')[0].clientWidth-this.sliderElWidth;
                // this.soundLeft=this.soundBarLength/2;
                // this.$refs.video.volume=0.5;
            })
        },
        computed:{
        },
        methods:{
            clickIsPlay(){
                if(this.playOrPause){
                    this.$refs.video.pause();
                }else{
                    this.$refs.video.play();
                }
                this.playOrPause=!this.playOrPause
            },
            handPlay(status){
                this.playOrPause=status==1?true:false
            },
            // 播放中
            videoTimeUpdate(){
                this.thumbnailShow=false;
                this.videoDuration=video.duration;
                this.currentTime=video.currentTime;
                this.timeLeft=(this.currentTime/this.videoDuration)*this.videoBarLength;
            },
            starMove(e,type){
                this.offsetLeft=e.currentTarget.offsetLeft;
            },
            move(e,type){
                var eWidth=e.currentTarget.clientWidth;
                var left=e.targetTouches[0].clientX-this.offsetLeft;
                // var 
                if(left<=0){
                    left=0
                }else if(left>=eWidth-this.sliderElWidth){
                    left=eWidth-this.sliderElWidth;
                }
                if(type=='time'){
                    this.timeLeft=left;
                    this.$refs.video.currentTime = (this.timeLeft/this.videoBarLength)*this.videoDuration;
                    if(this.videoDuration>this.$refs.video.currentTime){
                        this.$refs.video.play();
                    }
                }else{
                    this.soundLeft=left;
                    this.$refs.video.volume=left/(eWidth-this.sliderElWidth);
                }
            },
            playClose(){
                this.$refs.video.pause();
                setTimeout(()=>{
                    this.$emit('postVideoPop',false)
                },0)
            },
        },
        created(){
        },
        filters:{
            timeVal(val){
                var result='';
                var time = Math.round(val);// 时间
                var secondTime = 0;//秒
                var minuteTime = 0;// 分
                if(time >=60) {//如果秒数大于60，将秒数转换成整数
                    //获取分钟，除以60取整数，得到整数分钟
                    minuteTime = parseInt(time / 60);
                    //获取秒数，秒数取佘，得到整数秒数
                    secondTime = parseInt(time % 60);
                    //如果分钟大于60，将分钟转换成小时
                }else{
                secondTime=time
                }
                secondTime=secondTime>=10?secondTime:'0'+secondTime;
                minuteTime=minuteTime>=10?minuteTime:'0'+minuteTime;
                result=minuteTime+':'+secondTime;
                return result
            },
        }
    }
</script>

<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0;
        cursor: pointer;
        box-sizing:border-box;
        -webkit-tap-highlight-color:transparent;
    }
    
    .playModal{
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: #333;
        z-index: 20;
        .playModal-top{
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            i{
                width: 30px;
                height: 50px;
                display: inline-block;
                vertical-align: middle;
                background: url('../../static/images/mem/back.png') 50% 50% no-repeat;
                background-size: 10px 16px;
                float: left;
            }
            span{
                font-size: 14px;
                color: #fff;
                display: inline-block;
                vertical-align: middle;
                float: left;
                overflow: hidden;
                word-break: break-all;
                vertical-align: middle;
                overflow: hidden;
                width: 280px;
                height: 50px;
                line-height: 50px;
            }
        }
        .playModal-con{
            width: 100%;
            position: absolute;
            top: 46px;
            // bottom: 50px;
            bottom: 0px;
            left: 0px;
            video{
                width: 100%;
                height: 100%;
            }
            img{
                width: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
        }
        .playModal-bottom{
            position: absolute;
            height: 50px;
            bottom: 0;
            padding: 0 10px;
            width: 100%;
            overflow: hidden;
            .timeBox{
                overflow: hidden;
            }
            .setTime,.setSound{
                line-height: 24px;
                display: inline-block;
                span{
                     position: relative;
                     padding-right:8px;
                }
                i{
                    position: absolute;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    left: 0px;
                    top: -2px;
                }
                em{
                    position: absolute;
                    top: 0px;
                    display: inline-block;
                    height: 4px;
                    left: 0px;
                    background: #fff;
                    border-radius: 20px 0 0 20px;
                }
            }
            .barBox{
                overflow: hidden;
                span{
                    width: 300px;
                    height: 4px;
                    display: inline-block;
                    background: #555;
                    border-radius:20px;
                }
            }
            .time{
                font-size: 12px;
                color: #fff;
                float: left;
                line-height: 24px;
                .isPlay{
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    background:url('../../static/images/mPause.png') 50% 50% no-repeat;
                    background-size:24px 24px;
                    &.active{
                        background:url('../../static/images/mPlay.png') 50% 50% no-repeat;
                        background-size:24px 24px 
                    }
                    float: left;
                }
            }
            .sound{
                float: right;
                .soundSize{
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: middle;
                    background:url('../../static/images/setSound.png') 50% 50% no-repeat;
                    background-size:24px 24px;
                    &.active{
                        background:url('../../static/images/setSoundNone.png') 50% 50% no-repeat;
                        background-size:24px 24px 
                    }
                }
                .setSound{
                    height: 24px;
                    span{
                        background: #555;
                        width:100px;
                        height: 4px;
                        border-radius:20px;
                        line-height: 24px;
                        display: inline-block;
                    }
                    
                }
            }              
        }

    }
    .tab{
        margin-top: 15px;
        overflow: hidden;
        p{
            float: left;
            width: 50%;
            font-size: 24px;
            text-align: center;
            a{
                display: inline-block;
                color: rgba(18,47,70,0.2);
                line-height: 38px;
            font-weight: bold;
            }
            &.active {
                a{
                    border-bottom: 2px solid #122F46;
                    color: rgba(18,47,70,1);
                }
            }
        }
    }
    .head{
        display: none;
    }
    .look.transitionBody  {
        top: 0px!important;
        z-index: 5;
    }
    ::-webkit-scrollbar{
        display:none;
    }
    .lookTit{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 46px;
        z-index: 10;
        background: #2FB7EC;
        font-weight: bold;
        font-size: 14px;
        color: white;
        position: fixed;
        top: 0px;
        .lookTit-left{
            i{
                margin-top: 7px;
                width: 32px; height: 32px; margin-right: 6px;
                margin-left:10px;
                float: left;
                background: url("/images/mem/goB.png") 50% 50% no-repeat;
                background-size: cover;
            }
            span{
                font-size: 14px;
                line-height: 46px;
                font-weight: bold;
            }
        }
        .lookTit-right{
            a{
                border: 1px dotted #ffffff;
                width: 60px;
                height: 28px;
                display: block;
                margin-top: 9px;
                margin-right: 15px;
                text-align: center;
                line-height: 28px;
                font-size: 12px;
                color: #fff;
            }
        }
    }
    .web{
        width: 100%;
        height: 24px;
        padding: 0 15px;
        margin-bottom: 40px;
        font-size: 18px;
        text-align: left;
        line-height: 24px;
        // font-weight: bolder;
        span{
            color: #122F46;
            font-weight: bold;
            font-size: 18px;
            border-bottom:2px solid #122F46;
        }
        em{
            color: #122F46;
            font-weight: bold;
            font-size: 18px;
            margin-left:2px;
        }
    }
    .wel{
        height: 462px; background: #2FB7EC; padding: 0 40px; color: white; text-align: left; overflow: hidden;
        div{margin:60px 0 40px 0;}
        p{width: 200px; font-size: 32px; font-weight: bolder;  line-height: 40px; }
        span{width: 240px; font-size: 14px; line-height: 20px;display: block;text-indent: 30px;}
        .dialog{
            width: 180px; height: 40px; font-size: 16px; text-align: center; float: right; background:rgba(225, 225, 225, 0.4); margin:60px 0 0 0; padding: 0;
        }
    }
    .ft{
        width: 240px; text-align: left; line-height: 20px; color: #A1A1A1; font-size: 10px; margin: 15px auto;
    }
    .teachVideo{
        overflow-y:scroll;
        background: #fff;
        -webkit-overflow-scrolling:touch;
        height: 100%;
        padding-top:46px;
    }
    .video-top{
        padding: 0 15px;
        img{
            display: block;
            margin: 33px auto 0 auto;
            width: 290px;
            height: 180px;
        }
    }
    .video-wx{
        padding: 0 20px;
        overflow: hidden;
        .video-wx-top{
            margin-top: 23px;
            span{
                font-size: 14px;
                color: #122F46;
                display: block;
                text-align: left;
                line-height: 16px;
            }
            em{
                margin: 15px 0;
                font-style:normal;
                font-size: 14px;
                color: #718290;
                display: block;
                text-align: left;
            }
        }
        .video-wx-left{
            float: left;
            img{
                display: block;
                width: 99px;
                height: 99px;
            }
            span{
                display: block;
                text-align: center;
                margin: 10px;
                font-size: 14px;
                color: #718290;
            }

        }
        .video-wx-right{
            float: left;
            margin-left:10px;
            margin-top: 36px;
            i{
                display: inline-block;
                vertical-align: middle;
                margin-right: 8px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #718290;
            }
            span{
                display: inline-block;
                vertical-align: middle;
            }
            p{
                text-align: left;
                line-height: 20px;
            }
        }
    }
    .video-con{
        padding: 0 20px 3px 20px;
        ul{
            li{
                margin-bottom: 30px;
                position: relative;
                .videoBox{
                    width: 280px;
                    height: 157px;
                    margin-top:20px;
                    margin-bottom: 14px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    i{
                        position: absolute;
                        display: inline-block;
                        width: 44px;
                        height: 44px;
                        background:url('../../static/images/inforplay.png') 50% 50% no-repeat;
                        background-size:cover; 
                        top: 50%;
                        left: 50%;
                        margin-left: -22px;
                        margin-top: -22px;
                    }
                }
                .video-tit{
                    font-size: 16px;
                    color: #122F46;
                    font-weight: bold;
                }
                .video-tip{
                    position: absolute;
                    top: 0px;
                    padding: 0 5px;
                    height: 20px;
                    line-height: 20px;
                    background: #2FB7EC;
                    text-align: center;
                    color: #FFFFFF;
                    font-size: 10px;
                }
            }
        }
        p{
            display: inline-block;
            text-align: left;
            height: 50px;
            margin: 20px 0 0 0;
            font-size: 24px;
            line-height: 50px;
            font-weight: bolder;
            border-bottom: 2px solid black;
        }
    }

</style>
