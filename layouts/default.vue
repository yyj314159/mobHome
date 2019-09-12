<template>
  <div id="app">

       <zmTrans></zmTrans>
      <SearchInput v-if="show"></SearchInput>

      <nuxt class="transitionBody" ref="slidBox" :class="{transitionBodyscrollTop:scrollTop}">

      </nuxt>

    <!--  <log :visible="loginShow" :callback="callback"></log>-->

  </div>
</template>
<script>
import SearchInput from '@/components/public/commonsearch.vue';
import searchResult2 from '@/components/public/searchResult2.vue';
import eventBus from "@/assets/js/eventBus";
/*import log from '@/components/member/Log.vue';*/
import MethodsUtil from "@/assets/js/MethodsUtil"
import zmTrans from '@/components/public/retransmission.vue';
import tool  from "~/assets/js/tool";
//import 'amfe-flexible'
export default {
  data() {
   return {
        apiType:process.env.NODE_ENV,
        defaultUrl:process.env.VUE_APP_BASE_API,
      // 起始默认动画滑动方向
        transitionName: '',
        cache:/Main/,    //需要被
        show:true,
        templateTrans:{
            zmtm:false,
            zmnormal:true
        },
        loginShow:false,//登录弹框是否显示
        isAnimation:false,
        routeArray:['/','/product','/server','/music','/information','/site'],
        scrollTop:false,
        callback:null
   };
 },
    mounted(){

       //营销工具js
      tool.mountedF(true);
      this.$store.dispatch('LOGINSTATUS').then(function(res){
        if(res.data.message == '未登录'){
          eventBus.$emit("login",{bl:false});
        }else{
          eventBus.$emit("login",{bl:true});
        }
      })
      //store仓库里有cookie,所以默认值改为null,在这里判断和赋值.
     /* this.$store.commit('LOGIN',MethodsUtil.getcookie("token"));
      this.$store.commit('LOGINSTATUS',MethodsUtil.getcookie("token") ? true : false);*/
        //上划收起
        eventBus.$on("scrollTop",(arg)=>{
           this.scrollTop  = arg;
        })
        //跳转搜索
        eventBus.$on("toSearch",(arg)=>{
            this.show=arg;
        })
        //调登录弹窗
        eventBus.$on("tosignIn",(arg)=>{
            this.loginShow=arg.bl;
            arg.callBack && (this.callback = arg.callBack)
        })
        //关闭录弹窗
        eventBus.$on("Del",(arg)=>{
            this.loginShow=arg;

        })


    },
    methods:{
    //判断是否登录
        islogin:function(){
            if(!this.$store.state.loginStatus){
                this.loginShow = true;
            }
        }


    },
  watch: {
    "$route":{
      handler(to,from){
        //路由切换登录弹窗关闭

        this.loginShow = false;
        const arr = ['/product', '/server', '/service', '/music', '/information', '/site'];
        if(to.path.indexOf('/M_video') > -1||to.path.indexOf('/product') > -1 || to.path.indexOf('/server') > -1 ||to.path.indexOf('/service') > -1 || to.path.indexOf('/music') > -1|| to.path.indexOf('/information') > -1|| to.path.indexOf('/site') > -1){
          this.scrollTop = false;
          eventBus.$emit("scrollTop",false);
          this.show=true;
        }else{
          this.show=false;
        }
      },
      immediate: true,
    }

  },
    components: {
        SearchInput,

        zmTrans


    }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #fff;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
 //右滑动画
.transitionLeft-enter,
.transitionRight-leave-active {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
 //左滑动画
 .transitionRight-enter,
.transitionLeft-leave-active {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.slide-enter-active, .slide-leave-active{
    transition: all 1s ease;
}

 .slide-enter, .slide-leave-to{
     transform: translate3d(100%, 0, 0)
 }
.transitionBody{

    position: absolute;
    top: 86px;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.5s;
}
.transitionBodyscrollTop{
    top: 46px !important;
}
.slideContent{
    position: absolute;
    top: 86px;
    bottom: 0;
    left: 0;
    right: 0;
    height:auto !important;
    transition: all 0.5s;
}
input{
    caret-color: #122F46;
}
/*.searchResultContent .slideContent{
    top:0;
}*/


    </style>
