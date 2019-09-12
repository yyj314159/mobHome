<template>
    <div class="M_service" :style="{height:HeightW}">
        <div class="tit">
            <i @click="goB"></i>
            <span>{{tit}}</span>
        </div>
        <div class="con" :style="{height:HeightW}">
            <div class="one">
                <img :src=title.img >
                <div @click="onLine"><span>在线教学</span> ></div>
                <p>{{title.tit}}</p>
            </div>
            <ul>
                <li :key="n" v-for="(item,n) in content">
                    <video-player
                            ref="player"
                            :index="item.id"
                            :list='list.length===0 ? obj : list[n]'
                    ></video-player>
                    <p>{{item.tit}}</p>
                    <div class="des">{{item.con}}</div>
                    <i>视频教学</i>
                </li>
            </ul>
            <p class="web" @click="login"><span>注册入驻</span> ></p>
            <div class="wel">
                <p v-html="wel.tit"></p>
                <span>{{wel.con}}</span>
                <cube-button @click="addService" class="dialog">{{wel.btn}}</cube-button>
            </div>
            <div class="ft">
                {{ft}}
            </div>
        </div>
        <more-mod :mcontent="mcontent" ref="more"></more-mod>
    </div>
</template>
<script>
// import ZMplayer from "../public/ZMplayer";
import videoPlay from "../product/videoPlay";
import moreMod from "../public/moreModal";
import axios from "axios";
import eventBus from "../../assets/js/eventBus";
import { mapState } from 'vuex'
export default {
    name:'M_service',
    data(){
        return{
            lists:[],
            HeightW:undefined,
            tit:'服务交易详解',
            title:{img:require("~/static/images/more/service/lookService.jpg"),tit:"强大的服务交易流程"},
            content:[
                {img:{url: ''},tit:"定制化服务的在线定价及销售",con:"卖家设定变量及公式，买家拍单时在线计价，彻底解决高度定制化行业交易痛点",id:1},
                {img:{url: ''},tit:"分阶段付款",con:"诚意金、预付定金分阶段付款模式，彻底解决定设计、教育、家政服务业、便民维修、商业服务、建筑装修、评估业、广告业、影视音产业、运输业、加工业等行业以及大额交易信任缺失和毁单风险",id:2},
                {img:{url: ''},tit:"服务时间预约",con:"买家拍单设定服务时间，减少沟通时间成本，适用于家教、家政、便民维修、美容到家等到家服务以及其它需要预约时间的服务交易",id:3},
                {img:{url: ''},tit:"住宅、设备长期租赁服务",con:"按月结算付款，买家月付费并为交易订单展期，适用于房屋及土地租赁，设备、汽车长租服务的在线交易",id:4},
                {img:{url: ''},tit:"短期租赁服务交易流程",con:"买家按天付费，交易订单展期，随时结算功能，适用于车辆、工程机械、数码、电子、办公用品、表演用品、会展用品等行业的短租服务，解决租赁时长变动较大的交易难题",id:5},
                {img:{url: ''},tit:"电话及线上服务交易",con:"支持电话及线上服务类型交易，如：代办事儿、家庭医生、心理咨询、法律咨询、财务咨询，侦探、调查、代跑腿儿",id:6},
                {img:{url: ''},tit:"宾馆、民宿及共享公寓交易",con:"通过时间预约、预付定金或诚意金、多笔支付交易款、服务展期及结算功能，解决宾馆酒店、民宿及共享公寓撤单率高，交易时长不固定，信任缺失难题，让买家轻松拍单",id:7},
                {img:{url: ''},tit:"到家服务交易",con:"家政、家教、搬家服务、家庭医疗、美容美甲、企业培训，演出服务、摄影摄像以及劳务服务都可轻松实现在线交易",id:8},
                {img:{url: ''},tit:"门票、团购券、会员卡在线销售",con:"支持各种虚拟服务以及卡、票、券类服务的在线交易",id:9},
                {img:{url: ''},tit:"保险服务在线交易",con:"通过预付诚意金或定金实现拍单，以及线上计价，实现意外险、运输险、车险、健康保险及财产险等保险业务的在线交易",id:10},
            ],
            wel:{
                tit:'可能有26亿种交易流程？',
                con:"族蚂网提供36种单体交易流程，可根据行业自由搭配，帮你实现更多服务在线交易",
                btn:"添加服务",
            },
            ft:'Copyright © 2017 -2018  上海族蚂信息科技有限公司    版权所有',
            nowId:null,
            autoplay:false,
            mcontent:'请使用PC电脑浏览器登录族蚂网zuma.com添加服务！',
            obj:{},
        }
    },
    components: {
        // "d-player": ZMplayer,
        "video-player":videoPlay,
        "more-mod":moreMod
    },
    props:['list'],
    //  created(){
        // console.log(this.list)


    //     axios({
    //         url:'/admin/c_m/sysSiteDemoVideo/demonStration?fVideoAffiliationId=2'
    //     }).then((res)=>{
    //         let data = res.data.data;
    //         eventBus.$emit("getSrc",data)
    //     })
    // },
    mounted(){
        this.$nextTick(() => {
      //根据不同手机设置不同高度
            let phoneHeight = window.innerHeight;
            this.HeightW= phoneHeight+'px';
        });
        // axios({
        //     url:'/admin/c_m/sysSiteDemoVideo/demonStration',
        //     method:'post',
        //     data:{fVideoAffiliationId:"1"}
        // }).then((res)=>{
        //     console.log(res)
        // })
    },
    methods:{
        goB(){
          var UA = navigator.appVersion;
          var ua = UA.toLowerCase();
          if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i)=='qq'){
            location.href = '/server'
          }else{
            this.$router.go(-1);
          }
        },
        // startPlay(videoPlayer,aid){
        //         videoPlayer.map((play,index)=>{
        //             if(index!=aid-1){
        //                 play.player.pause()
        //             }
        //         });
        // },
        addService() {
            let _this = this;
            this.loginStatus ? this.$refs.more.diaoshow() :
              window.location.href = '/mlogin?redirectUrl=/M_service';

        },
        onLine(){
            this.$router.push({path:'/M_video',query:{to:1}});
        },
        login(){
            this.loginStatus ? this.$refs.more.diaoshow() : window.location.href = '/mregister?redirectUrl=/M_service';
              //eventBus.$emit("showReg",{bl:true,callBack:()=>{this.$refs.more.diaoshow();}});
            // eventBus.$emit("showReg");
        }
    },
    computed:{
        ...mapState(['loginStatus'])
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .M_service{
        width: 100%;
        // height: 500px;
        top: 0;
        z-index: 10;
        .tit{
            width: 100%;
            height: 46px;
            position: fixed;
            z-index: 99;
            top: 0;
            background: #2FB7EC;
            font-weight: bold;
            font-size: 14px;
            color: white;
            display: flex;
            align-items: center;
            i{
                width: 32px;
                height: 32px;
                margin-right: 6px;
                background: url('/images/mem/goB.png') 0 0 no-repeat;
                display: inline-block;
                background-size: 100%;
            }
            span{
                font-weight: bold;
            }
        }
        .con{
            width: 100%;
            padding-top: 46px;
            box-sizing: border-box;
            background: #fff;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            .one{
                padding-top: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img{
                  display: block;
                  width: 280px;
                  height: auto;
                }
                p{
                    height: 40px;
                    margin: 20px auto;
                    font-size: 22px;
                    text-align: center;
                    line-height: 40px;
                    font-weight: bolder;
                    border-bottom: 2px solid #122F46;
                    color: #122F46;
                }
                div{
                    font-size: 18px;
                    color: #122F46;
                    font-weight: bold;
                    width: 118px;
                    align-self: flex-start;
                    text-align: left;
                    margin: 20px 0 0 20px;
                    span{
                        font-size: 18px;
                        color: #122F46;
                        font-weight: bold;
                        border-bottom: 2px solid #122F46;
                    }
                }
            }
            ul{
                width: 100%;
                li{
                    margin-bottom: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    p{
                        width:240px;
                        height: 40px;
                        margin-top: 20px;
                        font-size: 16px;
                        font-weight: bold;
                        text-align: center;
                        line-height: 40px;
                        color: #122F46;
                    }
                    .des{
                        width:280px;
                        color: #718290;
                        text-align: center;
                        line-height: 20px;
                        font-size: 14px;
                    }
                    i{
                        display: block;
                        padding: 0 2px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 10px;
                        background: #2FB7EC;
                        color: #fff;
                        font-style: normal;
                        position: absolute;
                        top: 0;
                        left: 20px;
                        z-index: 3;
                    }
                    .video-mark{
                        background: #122F46;
                        width: 280px;
                        height: 210px;
                        position: absolute;
                        left: 20px;
                        top: 0;
                        text-align: center;
                        z-index: 2;
                        img{
                           width: 45px;
                           height: 43px;
                            margin-top: 84px;
                        }
                    }
                }
            }
            .web{
                width: 118px;
                height: 24px;
                margin-left: 20px;
                margin-bottom: 40px;
                text-align: left;
                line-height: 24px;
                font-size: 18px;
                font-weight: bolder;
                span{
                    font-size: 18px;
                    font-weight: bolder;
                    border-bottom: 2px solid #000;
                }
            }
            .wel{
                height: 400px;
                background: #2FB7EC;
                padding: 0 40px;
                color: white;
                text-align: left;
                overflow: hidden;
                p{
                    width: 200px;
                    font-size: 32px;
                    font-weight: bolder;
                    line-height: 40px;
                    margin:36px 0;
                }
                span{
                    width: 240px;
                    font-size: 14px;
                    line-height: 20px;
                }
                .dialog{
                    width: 180px;
                    height: 40px;
                    font-size: 16px;
                    text-align: center;
                    float: right;
                    background: rgba(255,255,255,.4);
                    margin:20px 0;
                    padding: 0;
                }
            }
            .ft{
                width: 240px;
                text-align: left;
                line-height: 20px;
                color: #949494;
                font-size: 10px;
                margin: 20px auto;
            }
        }
    }
    .cube-dialog-content-def p{
        font-size: 10px;
    }
</style>
