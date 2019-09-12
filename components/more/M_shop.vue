<template>
    <div class="M_shop" :style="{height:HeightW}">
        <div class="tit">
            <div @click="goB"></div>
            <span>{{tit}}</span>
        </div>
        <div class="con" :style="{height:HeightW}">
            <div class="one">
                <img :src=title.img >
                <span @click="line" class="line"><span>在线教学</span> ></span>
                <p>{{title.tit}}</p>
            </div>
            <ul>
                <li :key="n" v-for="(item,n) in content">
                    <video-player
                            ref="player"
                            :index="item.id"
                            :list="lists.length==0 ? obj : lists[n]"
                    ></video-player>
                    <p>{{item.tit}}</p>
                    <div class="des">{{item.con}}</div>
                    <i>视频教学</i>
                </li>
            </ul>
            <p class="web" @click="regAndgoIn"><span>注册入驻</span> ></p>
            <div class="wel">
                <p v-html="wel.tit"></p>
                <span>{{wel.con}}</span>
                <cube-button @click="addProduct" class="dialog">{{wel.btn}}</cube-button>
            </div>
            <div class="ft">
                {{ft}}
            </div>
        </div>
        <more-mod :mcontent="mcontent" ref="more"></more-mod>
    </div>
</template>
<script>
import videoPlay from "../product/videoPlay";
import moreMod from "../public/moreModal";
import axios from "axios";
import eventBus from "~/assets/js/eventBus";
import {mapGetters} from 'vuex'
export default {
    name:'M_shop',
    data(){
        return{
            HeightW:undefined,
            tit:'关于族蚂购物',
            title:{img:require("~/static/images/more/shop/shopBanner.jpg"),tit:"强大的购物交易流程"},
            content:[
                {img:{url: ''},tit:"定制化产品的在线定价及销售",con:"卖家设定变量及公式，精准在线计算价格彻底解决定制化产品在线交易难的瓶颈，对于包装行业，印刷行业，家具、家居及建材、五金、生产原料等行业有重大意义",id:1},
                {img:{url: ''},tit:"二手/翻新货品销售",con:"族蚂网支持二手商品的在线销售，尤其适合二手车辆、数码家电、图书、日用百货、家具、服饰、玩具、乐器等生活用品的二手及翻新销售",id:2},
                {img:{url: ''},tit:"在线批发",con:"支持零售、预售及批发业务",id:3},
                {img:{url: ''},tit:"设备、车辆及贵重商品在线签约",con:"诚意金、预付定金、协议保证金三种分阶段付款选项，彻底解决定制商品和大额交易信任缺失和风险问题",id:4},
                {img:{url: ''},tit:"定制产品交易风险解决方案",con:"族蚂网的预付定金拍单功能，专门解决定制品买家撤单问题",id:5},
                {img:{url: ''},tit:"产品预售功能",con:"预售功能，适用于新品发布前预售，节日预售、房产预售、图书预售、进口商品提前预售",id:6},
                {img:{url: ''},tit:"本地及同城交易",con:"不但支持全国配送，更支持同城交易，特别适合外卖，果蔬生鲜，大宗原材料，车辆交易，液态商品，大件商品，化学品及工程机械类产品的交易",id:7},
                {img:{url: ''},tit:"议价砍价功能",con:"提供议价交易流程，撮合买卖双方议价成交。",id:8},
            ],
            wel:{
                tit:'可能有26万种交易流程？',
                con:"族蚂网提供36种单体交易流程，可根据行业搭配组合，轻松实现更多商品的在线交易",
                btn:"添加产品",
            },
            ft:'Copyright © 2017 -2018  上海族蚂信息科技有限公司    版权所有',
            nowId:null,
            autoplay:false,
            mcontent:'请使用pc电脑浏览器登录族蚂网zuma.com添加产品！',
            obj:{},
            a:0
        }
    },
    components: {
        "video-player":videoPlay,
        "more-mod":moreMod
    },
    props:['lists'],
    mounted(){
        this.$nextTick(() => {
      //根据不同手机设置不同高度
            let phoneHeight = window.innerHeight;
            this.HeightW= phoneHeight+'px';
        });
    },
    methods:{
        goB(){
          var UA = navigator.appVersion;
          var ua = UA.toLowerCase();
          if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i)=='qq'){
            location.href = '/product'
          }else{
            this.$router.go(-1);
          }
        },
        addProduct() {
            let _this = this;
            this.loginStatus ? this.$refs.more.diaoshow() :
              //eventBus.$emit("tosignIn",{bl:true,callBack:function(){_this.$refs.more.diaoshow()}})
              window.location.href = '/mlogin?redirectUrl=/M_shop';

        },
        regAndgoIn(){
            let _this = this
            if(this.loginStatus){
                this.$refs.more.diaoshow();
            }else{
                // eventBus.$emit("showReg",{bl:true,callBack:()=>{_this.$refs.more.diaoshow()}})
                window.location.href = '/mregister?redirectUrl=/M_shop';
                //this.$router.push({name:'register'})
            }

        },
        line(){
             this.$router.push({
                path: "/M_video",
                query:{
                    to:1
                }
            });
        }
    },
    computed:{
        ...mapGetters(['token','loginStatus'])
    }
}
</script>
<style lang="scss" scoped>
    .M_shop{
        width: 100%;
        /*height: 500px;*/
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
            div{
                display: inline-block;
                width: 32px;
                height: 32px;
                margin-right: 6px;
                background: url("/images/mem/goB.png") no-repeat 0 center;
                background-size: 32px 32px;
            }
            span{
                font-weight: bold;
            }
        }
        .con{
            width: 100%;
            background: white;
            overflow: scroll;
            padding-top: 46px;
            box-sizing: border-box;
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
                .line{
                    font-size: 18px;
                    color: #122F46;
                    display: block;
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
