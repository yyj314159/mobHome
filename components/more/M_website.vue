<template>
    <div class="M_website">
        <div class="tit">
            <i @click="goB"></i>
            <!-- <img src="/images/mem/goB.png" alt="" @click="goB"> -->
            <span>{{tit}}</span>
        </div>

        <div class="con" ref='con'>
            <!-- <cube-scroll ref="contentScroll" :options="options">

            </cube-scroll> -->
            <div class="one">
                <!-- <img :src=title.img > -->
                    <div class='VideoBox'>
                        <div class="videoBox" :key="n" v-for="(list,n) in title">
                            <!-- :autoplay='autoplay' -->
                            <video-player ref="player" :index="n+1"  :list='list'>
                            </video-player>
                        </div>
                        <span class='videoTip'>教学视频</span>
                    </div>
                    <p class="oneLinkTeacher" @click="toTeacherVideo"><span>在线教学</span> <em>></em></p>
                    <!-- <p class='oneTit'>{{title.tit}}</p> -->
                    <p class='oneTit'>强大的网页编辑功能</p>
                </div>
                <ul>
                    <li :key="n" v-for="(item,n) in content">
                        <p>{{item.fVideoName}}</p>
                        <p></p>
                        <span>{{item.fVideoDescribe}}</span>
                        <div class='M_webSite_img'>
                            <img :src=item.fVideoAddress alt="">
                        </div>
                    </li>
                </ul>
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
        <div>
            <moreModal :mcontent='mcontent' ref="moreModal"></moreModal>
        </div>
    </div>
</template>
<script>
import videoPlay from "../product/videoPlay";
import eventBus from "~/assets/js/eventBus";
import { setTimeout } from 'timers';
import moreModal from "../public/moreModal";
export default {
    name:'M_website',
    data(){
        return{
            mcontent:'请使用PC电脑浏览器登录族蚂网zuma.com创建网站',
            HeightW:undefined,
            tit:'页面编辑功能',
            title:[],
            // title:{},
            autoplay:true,
            content:[
            ],
            options: {
                pullDownRefresh:false,
                pullUpLoad: false,
                bounce:false,
            },
            wel:{
                tit:'建站也可以如此轻松！',
                con:"族蚂网致力于打造全球最强大建站工具，为您提供个性化、人性化、高度自由化的应用环境，多样化的交易流程，为更多行业提供电子商务解决方案，同时为用户提供安全可靠的售后保障体系",
                btn:"入驻建站",
            },
            ft:'Copyright © 2017 -2018  上海族蚂信息科技有限公司    版权所有',

        }
    },
    props:['list'],
    components: {
        "video-player":videoPlay,
        'moreModal':moreModal
        // moreModal
    },
    mounted(){
        this.$nextTick(() => {
      //根据不同手机设置不同高度
            let phoneHeight = window.innerHeight;
            this.HeightW= phoneHeight - 46 +'px';
        });
        this.title=this.list[0];
        this.content=this.list[1];
        // this.getVideo();
        // this.getGif();
    },
    created(){

    },
    beforeDestroy() {

    },
    methods:{
        // 滑动开始获取初始位置坐标
        // playVideo:function(event){
        //     console.log(event.target);
        //     event.target.play();
        // },
        toTeacherVideo: function(){
            this.$router.push({
                path: '/M_video',
                query: {
                    to:1,
                }
            })
        },
        goB(){
          var UA = navigator.appVersion;
          var ua = UA.toLowerCase();
          if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i)=='qq'){
            location.href = '/site'
          }else{
            this.$router.go(-1);
          }

        },
        play() {
            console.log('play callback')
        },
        startPlay(videoPlayer,aid){
            console.log(videoPlayer,aid)
                // videoPlayer.map((play,index)=>{
                //     if(index!=aid-1){
                //         play.player.pause();
                //     }
                // });
            },
        getVideo(){
            this.HttpCli.get(
                    "/admin/c_m/sysSiteDemoVideo/demonStration?fVideoAffiliationId=3"
                    // "/admin/c_m/sysSiteDemoVideo/demonStration?fVideoAffiliationId=3"
            ).then((res)=>{
                if(res.data.status==0){
                    this.title=res.data.data;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getGif(){
            this.HttpCli.get(
                    "/admin/c_m/sysSiteDemoVideo/demonStration?fVideoAffiliationId=5"
                    // "/admin/c_m/sysSiteDemoVideo/demonStration?fVideoAffiliationId=5"
            ).then((res)=>{
                if(res.data.status==0){
                    this.content=res.data.data;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        showAlert() {
            // 先判断登录
            let _this=this;
            if(this.$store.state.loginStatus==false){
                // eventBus.$emit("tosignIn",true)
         /*       eventBus.$emit("tosignIn",{
                    bl:true,
                    callBack:function(){
                        _this.$refs.moreModal.diaoshow();
                    }
                })*/
              window.location.href = '/mlogin?redirectUrl=/M_webSite';

            }else{
                _this.$refs.moreModal.diaoshow();
            }
        },
        onRegister(){ //注册
            let _this=this;
            if(this.$store.state.loginStatus==false){
/*                eventBus.$emit("showReg",{
                    bl:true,
                    callBack:()=>{
                        this.$refs.moreModal.diaoshow()
                    }
                })*/
              window.location.href = '/mregister?redirectUrl=/M_website';
            }else{
                this.$refs.moreModal.diaoshow()
            }
        }
    },
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
    .M_website{
        width: 100%;
        // height: 500px;
        z-index: 5;
        top: 0;
        .VideoBox{
            position: relative;
            width: 280px;
            .Video {
                height: 238px;
            }
            .videoTip{
                position: absolute;
                padding: 0 5px;
                height: 20px;
                line-height: 20px;
                background: #2FB7EC;
                display: block;
                text-align: center;
                color: #fff;
                font-size: 10px;
                top: 0px;
                left: 0px;
            }
        }
        .tit{
            width: 100%;
            height: 46px;
            background: #2FB7EC;
            font-weight: bold;
            font-size: 14px;
            color: white;
            display: flex;
            align-items: center;
            position: fixed;
            z-index: 10;
            i{
                width: 32px; height: 32px; margin-right: 6px;
                margin-left:10px;
                background: url("/images/mem/goB.png") 50% 50% no-repeat;
                background-size: cover;
            }
            span{
                font-size: 14px;
                font-weight: bold;
            }
        }
        .con{
            width: 100%; background: white;
                overflow-y:scroll;
                height: 100%;
                -webkit-overflow-scrolling:touch;
                padding-top: 46px;
            .one{
                padding-top: 30px;
                display: flex;
                width: 280px;
                margin: 0 auto;
                flex-direction: column;
                // align-items: left;
                img{
                  display: block;
                  width: 280px;
                  height: auto;
                }
                .oneTit{
                    width: 217px;
                    text-align: left;
                    height: 50px;
                    margin: 15px 0 0 0;
                    font-size: 24px;
                    line-height: 50px;
                    font-weight: bolder;
                    border-bottom: 2px solid black;
                }
                .oneLinkTeacher{
                    margin-top: 38px;
                    width: 100%;
                    height: 24px;
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
            }
            ul{
                width: 100%;
                padding:0 15px;
                margin-bottom: 40px;
                li{
                    margin-top:40px;
                    display: flex;
                    flex-direction: column;
                    // align-items: center;
                    .M_webSite_img{
                        margin-top: 10px;
                        background:url('../../static/images/webSiteBoxPC2.png') 50% 50% no-repeat;
                        background-size:100%;
                        width: 290px;
                        height: 179px;
                        position: relative;
                        overflow: hidden;
                        padding: 16px 3px 3px 3px;
                    }
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    p{
                        font-size: 16px;
                        font-weight: bold;
                        text-align: left;
                        // line-height: 40px;
                    }
                    span{
                        width:280px;
                        color: #949494;
                        text-align: left;
                        margin-top: 18px;
                        // line-height: 20px;
                        font-size: 14px;
                    }
                    em{
                        position: absolute;
                        top:3px;
                        left: 10px;
                        i{
                            display: inline-block;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background: #d7d7d7;
                            margin-right: 6px;

                        }
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
        }
    }
</style>
