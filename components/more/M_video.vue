<template>
    <div class='look'>
        <div class="lookTit">
            <div class='lookTit-left'>
                <i @click="goBack"></i>
                <!-- <img src="/images/mem/goB.png" alt="" @click="goBack"> -->
                <span>在线教学</span>
            </div>
        </div>

        <div class="teachVideo">
         <!--   <div class="video-top">
                    <p></p>
                    <img src="../../static/images/liveMob.png" alt="">
                </div>-->
<!--                <div class="video-wx">
                    <div class='video-wx-top'>
                        <span>通知：自6月4日起，周一至周五，每晚8点抖音直播准时开播！</span>
                        <em>请关注抖音号：zumawang</em>
                    </div>
                    <div class='video-wx-left'>
                        <img src="../../static/images/zumaDouyinCode.png" alt="">
                        <span>抖音二维码</span>
                    </div>
                    <div class='video-wx-right'>
                        <p><i></i><span>全面讲解族蚂网各项功能</span></p>
                        <p><i></i><span>1小时包学会</span></p>
                        <p><i></i><span>主播在线答疑解惑</span></p>
                    </div>
                </div>-->

                <div class="tab">
                    <p v-for="(tab,index) in tabs" :class="{active:tabActive==index}" @click='changeTab(index)'>
                        <a href="JavaScript:;">{{tab.name}}</a>
                    </p>
                </div>
                <div class="tabCon">
                    <div class="tabConBox" ref="tabConBox">
                            <div class="video-con"  v-for="(item,index) in tabs">
                                <ul>
                                    <li :key="n" v-for="(sList,n) in item.list">
                                        <!-- <div class="videoBox">
                                            <img :src="sList.fVideoThumbnail" alt="">
                                            <i class="inforplay" @click="goPlay(sList.fVideoAddress,sList.fVideoName,sList.fVideoThumbnail)"></i>
                                        </div> -->
                                        <span class="video-tit" @click="goPlay(sList.fVideoAddress,sList.fVideoName,sList.fVideoThumbnail)">{{n+1|indexFilters}}、{{sList.fVideoName}}</span>
                                        <!-- <div class='video-tip'>{{item.name}}</div> -->
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
                <div class="video-bottom">
                    <p class="web" @click="onRegister"><span>注册入驻</span> <em>></em></p>
                    <div class="wel">
                        <div>
                            <p>建站也可以</p>
                            <p>如此轻松！</p>
                        </div>
                        <span>{{wel.con}}</span>
                        <cube-button @click="showAlert" class="dialog">{{wel.btn}}</cube-button>
                    </div>
                    <div class="ft">
                        {{ft}}
                    </div>
                </div>
        </div>
        <div>
            <moreModal :mcontent='mcontent' ref="moreModal"></moreModal>
        </div>
        <div v-if="playShow">
            <videoPop @postVideoPop='getVideoPop' :playUrl='playUrl'></videoPop>
        </div>
    </div>
</template>
<script>
import { setInterval, setTimeout } from 'timers';
import moreModal from "../public/moreModal";
import videoPop from "./videoPop";
import eventBus from "~/assets/js/eventBus";
    export default {
        name:'M_video',
        data(){
            return{
                mcontent:'请使用PC电脑浏览器登录族蚂网zuma.com创建网站',
                loop: false,
                autoPlay: false,
                showDots: false,
                initialIndex:0,
                options: {
                    pullDownRefresh:false,
                    pullUpLoad: false,
                    bounce:false,
                },
                content:[],
                from:'',
                wel:{
                    tit:'建站也可以如此轻松！',
                    con:"族蚂网致力于打造全球最强大建站工具，为您提供个性化、人性化、高度自由化的应用环境，多样化的交易流程，为更多行业提供电子商务解决方案，同时为用户提供安全可靠的售后保障体系",
                    btn:"入驻建站",
                },
                pathName:'',
                ft:'Copyright © 2017 -2018  上海族蚂信息科技有限公司    版权所有',
                obj:{},
                tabs: [{
                    name: '在线教学',
                    list:this.list
                }, {
                    name: '精彩广告',
                    list:this.posterList
                }],
                tabActive:0,
                playUrl:{
                    playName:'',//视频名称
                    fVideoAddress:'',//视频地址
                    fVideoThumbnail:'',//视频缩略图

                },//视频地址
                playShow:false,//视频弹窗显示
            }
        },
        props:['list','posterList'],
        mounted(){
            // this.getContent();
            let video = document.getElementById('video')
            this.text=navigator.appVersion
            this.mobile = navigator.appVersion.indexOf('iPhone') !== -1 ? 'iPhone' :  'android';
        },
        computed:{
        },
        methods:{
            getVideoPop(val){
                this.playShow=val;
            },
            starMove(e,type){
                this.offsetLeft=e.currentTarget.offsetLeft;
                this.sliderElWidth=e.currentTarget.getElementsByTagName('i')[0].clientWidth
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
                    this.timeSpeed=parseInt(left/(eWidth-this.sliderElWidth)*100).toFixed(0)+'%';

                }else{
                    this.soundLeft=left;
                    this.soundSpeed=parseInt(left/(eWidth-this.sliderElWidth)*100).toFixed(0)+'%';
                    this.$refs.video.volume=parseInt(left/(eWidth-this.sliderElWidth));
                }
            },
            goPlay(url,name,fVideoThumbnail){
                this.playShow=true;
                this.playUrl={
                    playName:name,
                    fVideoAddress:url,
                    fVideoThumbnail:fVideoThumbnail,
                }
            },
            changeTab(index){
                this.tabActive=index;
                var tabConBox=this.$refs.tabConBox
                tabConBox.style.transform = 'translateX(-' + index*50 + '%)';
                tabConBox.style.transition='all .3s ease';
                var boxHeight=document.getElementsByClassName('video-con')[index].clientHeight;
                tabConBox.style.height = boxHeight+'px';
            },
            goBack(){
                this.from=this.$route.query.to;
                if(this.from==1){
                    this.$router.go(-1)
                }else{
                    this.$router.push({path:'/site'})
                }
            },
            showAlert() {
                // 先判断登录
                let _this=this;
                if(this.$store.state.loginStatus==false){
                    // eventBus.$emit("tosignIn",true)
/*                    eventBus.$emit("tosignIn",{
                        bl:true,
                        callBack:function(){
                            _this.$refs.moreModal.diaoshow();
                        }
                    })*/
                  window.location.href = '/mlogin?redirectUrl=/M_video';

                }else{
                    _this.$refs.moreModal.diaoshow();
                }
            },
            onRegister(){ //注册
                if(this.$store.state.loginStatus==false){
/*                    eventBus.$emit("showReg",{
                        bl:true,
                        callBack:()=>{
                            this.$refs.moreModal.diaoshow();
                        }
                    })*/
                  window.location.href = '/mregister?redirectUrl=/M_video';
                }else{
                    this.$refs.moreModal.diaoshow();
                }
            }
        },
        components:{
            'moreModal':moreModal,
            'videoPop':videoPop
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
                secondTime=secondTime>10?secondTime:'0'+secondTime;
                minuteTime=minuteTime>10?minuteTime:'0'+minuteTime;
                result=minuteTime+':'+secondTime;
                return result
            },
            indexFilters(val){
                var lastIndex='';
                var newVal=val.toString();
                for(var i=0;i<newVal.length;i++){
                   let forVal=newVal.charAt(i);
                   console.log(i);
                   switch(forVal) {
                        case '1':
                            newVal.length>1&&i==0?lastIndex+='十':lastIndex+='一';
                            break;
                        case '2':
                            newVal.length>1&&i==0?lastIndex+='二十':lastIndex+='二';
                            break;
                        case '3':
                            newVal.length>1&&i==0?lastIndex+='三十':lastIndex+='三';
                            break;
                        case '4':
                            newVal.length>1&&i==0?lastIndex+='四十':lastIndex+='四';
                            break;
                        case '5':
                            newVal.length>1&&i==0?lastIndex+='五十':lastIndex+='五';
                            break;
                        case '6':
                            newVal.length>1&&i==0?lastIndex+='六十':lastIndex+='六';
                            break;
                        case '7':
                            newVal.length>1&&i==0?lastIndex+='七十':lastIndex+='七';
                            break;
                        case '8':
                            newVal.length>1&&i==0?lastIndex+='八十':lastIndex+='八';
                            break;
                        case '9':
                            newVal.length>1&&i==0?lastIndex+='九十':lastIndex+='九';
                            break;
                        default:
                    } 
                }
                return lastIndex
            }
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
    .video-bottom{
        margin-top: 40px;
    }
    .tab{
        margin-top: 15px;
        overflow: hidden;
        p:hover::before {
            width: 100%;
            top: 0;
            left: 0;
            transition-delay: 0.1s;
            border-bottom-color: #000;
            z-index: -1;
        }
        p{
            float: left;
            width: 50%;
            font-size: 24px;
            text-align: center;
            a{
                display: inline-block;
                position: relative;
                color: rgba(18,47,70,0.2);
                line-height: 38px;
                font-weight: bold;
                &::before {
                    content: "";
                    top: -2px;
                    left: 0%;
                    width: 0;
                    height: 100%;
                    border-bottom: 2px solid #fff;
                    transition: 0.3s all linear;
                }
            }
            &.active {
                a{
                    &::before {
                        content: "";
                        position: absolute;
                        top: -2px;
                        left: 0%;
                        width: 100%;
                        height: 100%;
                        border-bottom: 2px solid #000;
                        transition: 0.3s all linear;
                    }
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
    .tabCon{
        width: 100%;
        overflow: hidden;
        .tabConBox{
            width: 200%;
            overflow: hidden;
        }
    }
    .video-con{
        margin-top:20px;
        float: left;
        width: 50%;
        padding: 0 20px 3px 20px;
        ul{
            li{
                position: relative;
                border-bottom: 1px solid #EAF1F5;
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
                    text-align: left;
                    display: block;
                    word-break:break-all;
                    height: 60px;
                    line-height: 60px;
                    overflow: hidden;
                    // text-overflow: ellipsis;
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
