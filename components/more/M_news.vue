<template>
    <div class="M_news">
        <div class="tit">
            <img src="/images/mem/goB.png" alt="" @click="goB">
            <span>{{tit}}</span>
        </div>
        <div class="con" :style="{height:HeightW}">
            <div class="one">
                <img :src=title.img >
                <h2 class="teachonline" @click="goTeachonline">在线教学 ></h2>
                <p>{{title.tit}}</p>
            </div>
            <ul>
                <li :key="n" v-for="(item,n) in content">
                    <img :src=item.img >
                    <p>{{item.tit}}</p>
                    <span>{{item.con}}</span>
                </li>
            </ul>
            <p class="web" @click="register">注册入驻 ></p>
            <div class="wel">
                <p v-html="wel.tit"></p>
                <span>{{wel.con}}</span>
               <div class="dialog"  @click.self="diaoshow">发布资讯</div>
            </div>
            <div class="ft">
                {{ft}}
            </div>
        </div>
    <div>
        <moreModal :mcontent="mcontent" ref="moreModal"></moreModal>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
import moreModal from "../public/moreModal";
import eventBus from "@/assets/js/eventBus";
import {mapGetters} from 'vuex';
export default {
    name:'M_news',
    data(){
        return{
            mcontent:'请使用PC电脑浏览器登录族蚂网zuma.com添加资讯',
            HeightW:undefined,
            tit:'关于族蚂资讯',
            title:{img:"/images/more/news/tit.jpg",tit:"多样化资讯发布功能"},
            content:[
                {img:"/images/more/news/1.jpg",tit:"博客发布功能",con:"支持实名认证站点发布博文，博客背景画布可自由替换，彰显博主个性"},
                {img:"/images/more/news/2.jpg",tit:"图集资讯发布功能",con:"更多轮播图片资讯，让你的资讯更具有观赏性"},
                {img:"/images/more/news/3.jpg",tit:"视频资讯发布功能",con:"用视频展示你的企业风貌和个人风采"},
                {img:"/images/more/news/4.jpg",tit:"图文资讯发布功能",con:"图文并茂的方式，更容易让读者理解，避免视觉疲劳"},
            ],
            wel:{
                tit:'多样化的资讯发布平台',
                con:"帮助你更好的宣传企业动态、品牌故事，分享你的精彩博文",
                btn:"发布资讯",
            },
            ft:'Copyright © 2017 -2018  上海族蚂信息科技有限公司    版权所有',

        }
    },
    components:{moreModal},
    mounted(){
    },
    methods:{
        register(){
           //判断注册
          let that = this;
        if(this.loginStatus){
             this.$refs.moreModal.diaoshow();
        }else{
   /*          eventBus.$emit("showReg",{bl:true,callBack:function(){
              that.$refs.moreModal.diaoshow();
             }})*/
          window.location.href = '/mregister?redirectUrl=/M_news';
          }

        },
        goTeachonline(){
          this.$router.push({path:'./M_video'})
        },
        diaoshow(){
        //判断登录
        let that = this;
        if(this.loginStatus){
             this.$refs.moreModal.diaoshow();
        }else{
/*             eventBus.$emit("tosignIn",{bl:true,callBack:function(){
              that.$refs.moreModal.diaoshow();
             }})*/
          window.location.href = '/mlogin?redirectUrl=/M_news';
         }
        },
        goB(){
          var UA = navigator.appVersion;
          var ua = UA.toLowerCase();
          if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i)=='qq'){
            location.href = '/information'
          }else{
            this.$router.go(-1);
          }
        },
    },
    computed:{
        ...mapGetters(['token','loginStatus'])
    }
}
</script>
<style lang="scss">
.M_news{
        width: 100%;
        height: 100%;
        top: 0 !important;
        color:#122F46;
        z-index: 10;
        .tit{
            width: 100%;
            height: 46px;
            background: #2FB7EC;
            font-weight: bold;
            font-size: 14px;
            color: white;
            display: flex;
            align-items: center;
            img{
                width: 32px; height: 32px; margin-right: 6px; margin-left: 14px;
            }
        }
        .con{
            width: 100%; background: white; overflow-y: scroll;  -webkit-overflow-scrolling: touch;
            position: absolute;
            top:46px;
            bottom: 0;
            left: 0;
            right: 0;
            .one{
                width:280px;
                padding-top: 30px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: auto;
                img{
                    width:280px;
                    height: auto;
                }
                .teachonline{
                    width: 90px;
                    height: 24px;
                    font-size: 18px;
                    text-align:left;
                    line-height: 24px;
                    font-weight: bolder;
                    margin-top: 20px;
                    box-sizing: border-box;
                    border-bottom: 2px solid #122F46;
                    overflow: hidden;
                }
                p{
                    height: 40px;
                    margin: 40px 0;
                    font-size: 22px;
                    text-align: left;
                    line-height: 40px;
                    font-weight: bolder;
                    border-bottom: 2px solid #122F46;
                }
            }
            ul{
                width: 100%;
                li{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 280px;
                    text-align: left;
                    margin:0 auto 40px auto;
                    img{
                        display: block;
                        width: 280px;
                        height: auto;
                    }
                    p{width:240px; height: 40px; margin-top: 20px; font-size: 16px; font-weight: bold; line-height: 40px;}
                    span{width:280px; color: #949494; line-height: 20px; font-size: 14px;}
                }
            }
            .web{
                width: 90px; height: 24px; margin-left: 20px; padding:0; margin-bottom: 40px; font-size: 18px; text-align:left; line-height: 24px; font-weight: bolder; box-sizing: border-box; border-bottom: 2px solid #122F46; overflow: hidden;

            }
            .wel{
                height: 400px; background: #2FB7EC; padding: 0 40px; color: white; text-align: left; overflow: hidden;
                p{width: 180px; font-size: 32px; font-weight: bolder;  line-height: 40px; margin:36px 0;}
                span{width: 240px; font-size: 14px; line-height: 20px;}
                .dialog{
                   width: 180px; height: 40px; font-size: 16px; text-align: center; float: right; background:rgba(255,255,255,.4); margin:20px 0; padding: 0; line-height: 40px;
                }
            }
            .ft{
                width: 240px; text-align: left; line-height: 20px; color: #949494; font-size: 10px; margin: 20px auto;
            }
        }
    }
</style>
