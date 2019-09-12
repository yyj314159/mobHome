<template>
    <div class='look' @touchmove.prevent>
        <div class="lookTit">
            <div class='lookTit-left'>
                <i @click="goBack"></i>
                <!-- <img src="/images/mem/goB.png" alt="" > -->
                <span></span>
            </div>
            <em class="lookLogo" @click='clickLogin'></em>
            <p class='lookTit-right'>
                <a href="JavaScript:;" @click="showAlert">使用</a>
            </p>
        </div>
        <!-- <audio id="audio">
            <source src="@/assets/audio/10923.wav" >
        </audio> -->
        <transition name='fade'>
            <div class='tipT' name='bounce' v-show=tipShow>
                <div>无需介意行业、布局及内容，使用后可任意编辑！</div>
            </div>
        </transition>
        <div class='lookCon' id='show-iframeBox'>
            <iframe id='show-iframe' :src="lookUrl" frameborder="0" @load.once="iframeLoad"></iframe>
        </div>
        <div>
            <moreModal :mcontent='mcontent' ref="moreModal"></moreModal>
        </div>
    </div>
</template>
<script>
import { setInterval, setTimeout } from 'timers';
import eventBus from "~/assets/js/eventBus";
import {getTemplateData} from '~/static/http'
import MethodsUtil from "~/assets/js/MethodsUtil"
import moreModal from "../public/moreModal";
    export default {
        data(){
            return{
                tipShow:false,
                mcontent:'请使用PC电脑浏览器登录族蚂网zuma.com创建网站',
                fId:'',
                fName:'',
                version:'',
                lookUrl:'',
                winHeight:'',
                pathName:'',
                from:''
            }
        },
        components:{
            'moreModal':moreModal
        },
        methods:{
            getParams(){
            // 取到路由带过来的参数
                this.fId = this.$route.query.id;
                this.fName = this.$route.query.fName;
                this.version = this.$route.query.version;
                this.winHeight = this.$route.query.winHeight;
                this.from=this.$route.query.to;
                // this.lookUrl='http://mobview.dev-zuma.com/pre/'+this.fId+'?type=template&version='+this.version+'&winHeight='+this.winHeight;
                this.lookUrl='https://mobview.zuma.com/pre/'+this.fId+'?type=template&version='+this.version+'&winHeight='+this.winHeight;
            },
            goBack(){
                if(this.from!=1&&this.from!=2){
                    this.$router.push({path:'/site'})
                }else{
                    this.$router.go(-1)
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
                            console.log(1);
                            _this.$refs.moreModal.diaoshow();
                        }
                    })*/
                  window.location.href = '/mlogin'
                }else{
                    _this.$refs.moreModal.diaoshow();
                }
            },
            clickLogin(){
                this.$router.push({path:'/site'})
            },
            iframeLoad(){
                console.log(1);
                this.tipShow=true;
                setTimeout(()=>{
                    this.tipShow=false;
                },2500)
            }
        },
        // beforeRouteEnter (to, from, next) {
        //     console.log(to);
        //     next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
        //         vm.pathName=from.path.substr(1);
        //     })
        // },
        mounted(){
            const oIframe = document.getElementById('show-iframeBox');
            const oIframeS = document.getElementById('show-iframe');
            const titHeight=document.getElementsByClassName('lookTit')[0].clientHeight;
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            oIframe.style.width = deviceWidth + 'px';
            oIframe.style.height = deviceHeight-titHeight + 'px';
            try {
              //wx模板分享
              var that = this;
              getTemplateData(this.fId).then(function(res){

                if(res.data.status == 0){
                  var host = location.host;

                  var thumbImg = res.data.data.templateBean.fUrl2;
                  var preImg = thumbImg;
                  var data = {};

                  data.title = res.data.data.templateBean.fTemplateSharingName ? res.data.data.templateBean.fTemplateSharingName : '快速建站,企业建站,免费自助建站-族蚂建站zuma.com';
                  data.fDescription = res.data.data.templateBean.fDescription;

                  if(host.indexOf('www.zuma.com') > -1){
                    data.img = 'https://www.zuma.com'+preImg;
                  }else{
                    data.img ='http://www.pre-zuma.com'+preImg;
                  }
                  console.log("分享数据",data)
                  MethodsUtil.templateWXshare(data);
                }

              })

            }catch(err) {
              console.log(err)
            }
            // const _this=this;
            // this.$nextTick(() =>{
            //     oIframeS.onload = function(){
            //         // let audio = document.querySelector('#audio');
            //         // audio.play();
            //         _this.tipShow=true;
            //         setTimeout(()=>{
            //             _this.tipShow=false;
            //         },2500)
            //     };
            // })
        },
        created(){
            this.getParams();
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
    .lookLogo{
        position: absolute;
        display: inline-block;width: 53px;height: 15px;
        background:url('/images/zuma.png') 50% 50% no-repeat;
        background-size: 53px 15px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .lookCon{
        -webkit-overflow-scrolling: touch;
        overflow-y:scroll;
        // overflow:hidden
    }
    .fade-enter-active, .fade-leave-active{
		transition: all 0.5s linear;
    }
    .fade-enter,.fade-leave-active{
        // 只需改变括号中三个参数其中一个为100%，即可控制动画的方向
        height: 0px!important;
    }
    .fade-leave,.fade-enter-active{
        height: 26px;
    }
    .tipT{
        background: rgba(255,0,102,0.27);
        color: #fff;
        height: 26px;
        line-height: 26px;
    }
    .look.transitionBody  {
        top: 0px!important;
        z-index: 5;
         overflow: hidden;
    }
    ::-webkit-scrollbar{
        display:none;
    }
    .lookTit{
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 46px;
        background: #2FB7EC;
        font-weight: bold;
        font-size: 14px;
        color: white;
        .lookTit-left{
            i{
                margin-top: 7px;
                width: 32px; height: 32px; margin-right: 6px;
                float: left;
                margin-left: 10px;
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
    .look iframe{
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
