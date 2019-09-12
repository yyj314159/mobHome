<template>

    <div class="head">
    <div class="commonHead">
        <a  class="commonLeft" @click="linkIndex">
          <div class="leftIcon" v-show="afterhide">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <!--登录前-->
          <div class="memberCenter" v-show="beforehide">
            <i class="logo"></i>
          </div>
        </a>
        <div class="webText" @click="goHomePage"><i></i></div>
        <div class="commonRight" >
            <a  class="shopCar" v-show="activeIndex == 1" @click="linkshopCar">
                <i></i>
            </a>
            <a class="searchLogo" @click="toSearch">
                <i></i>
            </a>
        </div>
    </div>
  <div class="slide" ref="slideEle" :class="{slideHide:scrollTop}">
        <ul ref="slideBox" class="slideBoxUl">
           <li  class="slideTab slideTabC" :class={slideBtmClass:slideBtmShowClass} v-for="(route,n) in searchRoutes"   @click="switchTab(route.route,n)">
                <span>{{route.name}}</span>
            </li>

        </ul>
        <!--m-video-->
        <div class="moreTab"  @click="linkMore">
          <div class="tabBot">
            <span></span>

          </div>
          <div class="moreTabVideo" v-if="moreTab">
            <nuxt-link to="/M_video/?to=1">在线教学 </nuxt-link>
          </div>

        </div>
        <div class="transtionLine">
            <span class="slideBtm" ref="slideBtmLine" v-show="slideBtmShow"></span>
        </div>
   </div>

    </div>
</template>
<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import Loading from "../public/loading.vue";
import eventBus from "@/assets/js/eventBus";
import MethodsUtil from "@/assets/js/MethodsUtil"
    export default {
        data(){
            return {
                resultArray:[],
                activeIndex:-1,
                scrollTop:false,
                login:false,
                moreTab:false,
                beforehide:false,
                afterhide:false,
                slideBtmShow:false,
                slideBtmShowClass:true,
                searchRoutes: [
                  { route: "site", name: "模板" },
                    { route: "product", name: "购物"},
                    { route: "server", name: "服务" },
                    { route: "music", name: "音频" },
                    { route: "information", name: "资讯" },

                ]

            }
        },
        mounted(){
          eventBus.$on("scrollTop",(arg)=>{
            this.moreTab = false;
          })
            console.log("statuscommonsearch",this.$store.state.loginStatus)
          if(MethodsUtil.getcookie("token")){
            this.afterhide= true;
          }else{
            this.beforehide = true;
          }
            this.restBottomline()
            //上划收起
            eventBus.$on("scrollTop",(arg)=>{
                this.scrollTop = arg;
            })
          eventBus.$on("login",(arg)=>{
            this.afterhide = arg.bl;
            this.beforehide = !arg.bl;

          })
        },
        methods: {
            goHomePage(){
              location.href = '/'
            },
            switchTab(route,index){
                this.slideBtmShowClass = false;
                var slideLeft = (this.$refs.slideBox.offsetWidth/5)*index+5;
                var slideBtmObj = this.$refs.slideBtmLine;
                this.activeIndex = index;
                localStorage.setItem('saveIndex',0)//点击五个模块 的tab切换 重置音频
/*             this.$router.push({
               path: route,
               })*/

              setTimeout(function(){
                location.href=route
              },500)

                slideBtmObj.style.left = slideLeft+'px';
            },
            restBottomline(){
                var _this = this;
                var routePath = this.$route.path;
                //增加/情况的判断

                if(routePath == '/'){
                    routePath = '/site'
                }
                //根据路由跳转不同tab
                this.searchRoutes.forEach(function(item,index){
                    if('/'+item.route == routePath){
                      /*  _this.switchTab(routePath,index)*/
                      const tabIndex = index;
                      var TabObj = document.getElementsByClassName('slideTabC');
                      TabObj[tabIndex].classList.add('active');
                      setTimeout(function () {
                        _this.slideBtmShow=true
                      },500)
                        var slideLeft = (_this.$refs.slideBox.offsetWidth/5)*index+5;
                        var slideBtmObj = _this.$refs.slideBtmLine;
                        slideBtmObj.style.left = slideLeft+'px';
                        _this.activeIndex = index;
                    }
                })
            },
            toSearch(){
               //清除记录过的关键词
                localStorage.removeItem('myKeyword');
                location.href = '/searchResult2?tabIndex='+this.activeIndex

            },
            //判断登录
            linkIndex(event){
               console.log(event.target.tagName)
                var logonUrl = '/z-member/member/getUserLoginStatusPhone1';
                this.HttpCli.get(logonUrl)
                    .then(function (res) {
                        if(res.data.message == "未登录"){

                          //location.href = '/mlogin?redirectUrl=/wap/member/memberCenterIndexPhone1&linkType=center'
                          location.href = '/mlogin?redirectUrl=/mobMemberCenter/'

                        }else{
                            var fId = res.data.data.fId;
                            var fUserType = res.data.data.fUserType;
                           // location.href = '/wap/member/memberCenterIndexPhone1?fId='+fId+'&fUserType='+fUserType;
                            location.href = '/mobMemberCenter/';
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });



            },
            //购物车
            linkshopCar(event){

                if(this.$store.state.loginStatus){
                    location.href = '/mobMemberCenter/shopCar'
                }else{
                    //eventBus.$emit("tosignIn",{bl:true});
                  location.href = '/mlogin?redirectUrl=/mobMemberCenter/shopCar'
                }
            /*    var logonUrl = this.ConstStr.Logon;
                this.HttpCli.post(logonUrl)
                    .then(function (response) {
                        if(response.data.message == "未登录"){
                            location.href = '/wap/userLogin'
                        }else{
                            location.href = '/product_wap/cart/toGetShopCart'
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });*/

            },
          linkMore(){
                this.moreTab = !this.moreTab;
          }


        },
        computed:{

        },
        watch:{

       '$route'(){
             this.restBottomline()
            }
        },
        components:{

            Loading
        }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .head
        z-index 0;
    .cube-tab-bar-slider
        height:4px;
    .commonHead
        position: relative;
        height: 46px;
        width: 100%;
        background-color: rgb(47, 183, 236);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        justify-content:center;
        z-index: 3;
        transform: translateY(0px);
        transition: transform 0.25s ease 0s;
        .commonLeft
            position: absolute;
            left: 0;
         .leftIcon
             width 30px;
             font-size 0;
             margin: 10px 10px;
             span
                 display inline-block;
                 width 20px;
                 height 3px;
                 background #fff;
                 margin 2px 0;
                 border-radius 2px;
         .memberCenter
              width: 46px;
              padding: 10px 0;
              .logo
                display:inline-block;
                width:20px;
                height:20px;
                background:url(../../assets/images/memberCenter.png) no-repeat;
                background-size: cover;
        .webText
            font-size: 16px;
            color: #fff;
            z-index: -1;
            text-align: center;
            i
                display inline-block;
                width 54px;
                height 46px;
                background:url(/images/zuma.png) 50% 50% no-repeat;
                background-size: 54px 15px;
        .commonRight
            position: absolute;
            right: 10px;
            .shopCar
                display inline-block;
                i
                 display inline-block;
                 width 23px;
                 height 23px;
                 background:url('/images/shopCarIcon.png') no-repeat;
                 background-size cover;
                 margin 10px 5px;
            .searchLogo
                display inline-block;
                i
                  display inline-block;
                  width 20px;
                  height 20px;
                  background:url('/images/searchIconRight.png') no-repeat;
                  background-size cover;
                  margin 11.5px 5px;
    .slide
         position relative;
         top: 0px;
         transition: all 0.5s;

         ul
          display: flex;
          justify-content: space-around;
          background: #fff;
          width 280px;
          .slideTab
              position:relative;
              height: 37px;
              line-height: 33px;
              width: 20%;
              font-size 14px;
              color: #122F46;
    .transtionLine
        position: absolute;
        width: 100%;
        height:4px;
        bottom: 0;
        background: #fff;

        span
            display: inline-block;
            height: 4px;
            width: 50px;
            background: #2FB7EC;
            position: absolute;
            left: 10px;
            transition: all 0.5s;
    .tab-slide-container
         position: absolute;
         top: 88px;
         bottom: 0;
         left: 0;
         right: 0;

    .cube-tab-bar
        height 40px;
        line-height 40px;
    .slideHide
        top: -40px;

    .slideTabC.active:after{
      content: "";
      width: 50px;
      height: 4px;
      background: #2FB7EC;
      position: absolute;
      bottom: 0px;
      left: 5px;
      z-index 5;
    }
   .moreTab
      position: absolute;
      right: 0;
      top: 0;
      width: 40px;
     .tabBot
        span
          width 20px;
          height 20px;
          display inline-block;
          background:url(../../assets/images/u168.png) no-repeat;
          background-size: contain;
          margin: 6px 0;
     .moreTabVideo
        position: absolute;
        bottom: -58px;
        background: #fff;
        padding: 14px 0px;
        width: 90px;
        z-index: 10;
        right: 5px;
        box-shadow: 0 0 5px rgba(18,47,70,0.2);
        a
         color:#122F46;
        &:after
            content:"";
            width:0;
            height:0;
            border-right:10px solid transparent;
            border-left:10px solid transparent;
            border-bottom:10px solid #fff;
            position: absolute;
            top: -10px;
            right: 5px;
   .wrapperBg
      position fixed;
      top:86px;
      right 0;
      bottom 0;
      left 0;
      background rgba(0,0,0,0)
      z-index: 9;
</style>
