<template>
   <div class="zmAdvance " :class="{zmAdvancefixed:zmAdvancefixed}" >
      <div class="advanceHead">
        <div class="zmLogo"> <nuxt-link to="/"></nuxt-link></div>
        <div class="tel">
          <div class="telTop">
            <i></i>
            400-820-2178
          </div>
          <p class="telBtm">24小时热线</p>

        </div>

      </div>
      <div class="bannner" >
        <div class="buildSite" @click="buildSitelogin"></div>
      </div>
      <div class="features fadeInUp">
          <div class="featuresTitle">
            <p class="title-one">我 们 能 为 你 做 什 么</p>
            <p class="title-sec">WHAT CAN WE DO FOR YOU</p>
            <p class="title-three"><span></span></p>
            <p class="title-four">强大的编辑器，可视化操作，无需代码，无需设计，自由拖拽组合，5分钟建网站，电子商城，支付系统，PC+手机+微信网站三网合一</p>
          </div>
      </div>
     <div class="featuresDetail">
       <ul class="clearfix">
         <li class="detailLi zmfadeUp zmanimate">
           <div class="detailLiitem">
             <div class="detailtop"></div>
             <div class="detailtoptext">海量模板</div>
             <div class="detailBtm">大量免费的精美模板满足各行业建站需求</div>

           </div>
           <div class="moreBtn" @click="buildSitelogin">
             立即查看
           </div>

         </li>
         <li class="detailLi zmfadeUp zmanimate">
           <div class="detailLiitem">
             <div class="detailtop detailtopimg2"></div>
             <div class="detailtoptext">强大的网页编辑器</div>
             <div class="detailBtm">可视化网页编辑功能，上百种组件可以自由拖拽自由拼接和组合</div>

           </div>
           <div class="moreBtn" @click="buildSitelogin">
             立即查看
           </div>

         </li>
         <li class="detailLi zmfadeUp zmanimate">
           <div class="detailLiitem">
             <div class="detailtop detailtopimg3"></div>
             <div class="detailtoptext">三网合一</div>
             <div class="detailBtm">一次生成PC网站、手机网站和微信网站，匹配到不同屏幕，一步到位</div>

           </div>
           <div class="moreBtn" @click="buildSitelogin">
             立即查看
           </div>

         </li>
       </ul>
     </div>

     <div class="features zmfadeUp zmanimate">
       <div class="featuresTitle">
         <p class="title-one">你 还 在 烦 恼 这 些</p>
         <p class="title-sec">DON’T WORRY ABOUT THESE</p>
         <p class="title-three"><span></span></p>

       </div>
     </div>
     <div class="featuresDetailsec ">
        <ul class="detailsecUl">
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon"></i>
            <p class="liText">订单数量</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon cpgl"></i>
            <p class="liText">产品管理</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon bkdz"></i>
            <p class="liText">爆款打造</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon qwtg"></i>
            <p class="liText">全网推广</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon cbkz"></i>
            <p class="liText">成本控制</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon dchd"></i>
            <p class="liText">大促活动</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon dpyy"></i>
            <p class="liText">店铺运营</p>
          </li>
          <li class="detailLi zmfadeUp zmanimate">
            <i class="liIcon sjjj"></i>
            <p class="liText">视觉聚焦</p>
          </li>
        </ul>
       <div class="moreBtn zmfadeUp zmanimate" @click="buildSitelogin">
         立即解决
       </div>

     </div>

     <div class="features featuresmanagement">
       <div class="featuresTitle zmfadeUp zmanimate">
         <p class="title-one">多 渠 道 电 子 商 务 运 营</p>
         <p class="title-sec">E-COMMERCE MANAGEMENT</p>
         <p class="title-three"><span></span></p>
         <div class="title-five">
           <div class="btnbox" @click="buildSitelogin">
             <span class="fiveBtnL">多平台服务</span>
             <span class="fiveBtnR">MORE</span>
          </div>
         </div>
       </div>

       <ul class="managementBtnGroup clearfix">
         <li class="zmfadeUp zmanimate">独立网站</li>
         <li class="zmfadeUp zmanimate">小程序</li>
         <li class="zmfadeUp zmanimate">H5营销</li>
         <li class="zmfadeUp zmanimate">族蚂商城</li>
       </ul>
     </div>
     <div class="features featuresservice">
       <div class="featuresTitle zmfadeUp zmanimate">
         <p class="title-one">十 大 服 务 为 你 保 驾 护 航</p>
         <p class="title-sec">SERVICES RANGE</p>
         <p class="title-three"><span></span></p>
         <div class="title-five">
           <div class="btnbox" @click="buildSitelogin">
             <span class="fiveBtnL">了解更多</span>
             <span class="fiveBtnR">MORE</span>
           </div>
         </div>
       </div>

       <ul class="featuresserviceul clearfix">
         <li class="serviceLi zmfadeUp zmanimate">
            <i class="serviceLitop"></i>
            <p class="serviceText">电子商务</p>
            <p class="serviceLitext">自带支付系统，支持支付宝、微信、网银支付，无需交易佣金 </p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop2"></i>
           <p class="serviceText">SEO优化</p>
           <p class="serviceLitext">专业SEO关键词优化，PC端+手机端，快速有效提升排名</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop3"></i>
           <p class="serviceText">免费域名</p>
           <p class="serviceLitext">免费IP地址，域名解析，免费10G存储空间</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop4"></i>
           <p class="serviceText">微信营销</p>
           <p class="serviceLitext">网站链接到微信公众号，高效多维传播，助力引流</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop5"></i>
           <p class="serviceText">服务发布</p>
           <p class="serviceLitext">支持上门服务、到店服务、线上服务、电话服务、代办服务SKU在线发布，提供预约时间工具，提供分时段付款流程</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop6"></i>
           <p class="serviceText">产品发布</p>
           <p class="serviceLitext">支持新品、二手、定制商品的在线交易，支持分阶段分时段付款，支持议价交易，千余种交易流程组合，满足各行各业的交易需求</p>
        </li>

         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop7"></i>
           <p class="serviceText">音频发布</p>
           <p class="serviceLitext">提供创作人认领流程并提供创作人打赏功能，让创作人拥有自己的粉丝并实现丰厚创收</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop8"></i>
           <p class="serviceText">资讯发布</p>
           <p class="serviceLitext">支持图文资讯、图集资讯及视频资讯的快速发布</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop9"></i>
           <p class="serviceText">营销工具</p>
           <p class="serviceLitext">多种营销工具，引爆人气</p>
         </li>
         <li class="serviceLi zmfadeUp zmanimate">
           <i class="serviceLitop serviceLitop10"></i>
           <p class="serviceText">视频发布</p>
           <p class="serviceLitext">支持电影、电视剧作品发布，支持免费试看及收费播放。让您的视频作品不再闲置</p>
         </li>
       </ul>
     </div>

     <div class="features featureszuma">
       <div class="featuresTitle zmfadeUp zmanimate">
         <p class="title-one">关 于 族 蚂 建 站</p>
         <p class="title-sec">ABOUT  ZUMA</p>
         <p class="title-three"><span></span></p>
         <div class="title-five">
           <div class="btnbox" @click="buildSitelogin">
             <span class="fiveBtnL">立即体验</span>
             <span class="fiveBtnR">MORE</span>
           </div>
         </div>
       </div>
         <div class="aboutZuma">
            <p class="aboutTextone zmfadeUp zmanimate">族蚂网，1分钟上手，5分钟建站！</p>
            <p class="aboutTextSec zmfadeUp zmanimate">让你轻松快速搭建属于自己的独一无二的网站！</p>
            <p class="aboutThird zmfadeUp zmanimate">
              族蚂网致力于打造全球最强大建站工具，为您提供个性化、人性化、高度自由化的应用环境，多样化的交易流程，为更多行业提供电子商务解决方案，同时为用户提供安全可行的售后保障体系。
            </p>
           <p class="aboutThird zmfadeUp zmanimate">
             族蚂网专注于互联网的研究与开发，致力为中小微企业提供一站式互联网解决方案和服务！除自助建站功能，还是集H5网页制作、小程序发布、微传单、公众号发布助手、电子商城、O2O在线交易、音频、视频、资讯、电子书为一体的全品类互联网服务平台。满足企业建站的同时，提供电子商务解决方案，帮助企业开展全网营销！
           </p>

           <p class="aboutFour zmfadeUp zmanimate">
             <i></i>
           </p>
         </div>

     </div>
     <div class="features featuresmarket">
       <div class="featuresTitle zmfadeUp zmanimate">
         <p class="title-one">互 联 网 时 代  助 你 全 网 营 销</p>
         <p class="title-sec">INTERNET AGE HELPS YOUR MARKETING </p>
         <p class="title-three"><span></span></p>
       </div>
        <ul class="marketIcon clearfix">
          <li class="zmfadeUp zmanimate">
            <i class="iconBaidu"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="icon360"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="iconsg"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="icontt"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="icondy"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="iconyl"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="iconzfb"></i>
          </li>
          <li class="zmfadeUp zmanimate">
            <i class="iconwx"></i>
          </li>

        </ul>

         <div class="title-five zmfadeUp zmanimate">
           <div class="btnbox" @click="buildSitelogin">
             <span class="fiveBtnL">合作伙伴</span>
             <span class="fiveBtnR">MORE</span>
           </div>
         </div>


     </div>

     <div class="features featuresTemplate">
       <div class="featuresTitle zmfadeUp zmanimate">
         <p class="title-one">精 美 模 板   任 你 挑</p>
         <p class="title-sec">EXQUISITE TEMPLATE</p>
         <p class="title-three"><span></span></p>
       </div>
         <ul class="templateIcon clearfix">
              <li class="zmfadeUp zmanimate">
                <i class=templateIcon1></i>
              </li>
             <li class="zmfadeUp zmanimate">
               <i class=templateIcon2></i>
             </li>
           <li class="zmfadeUp zmanimate">
             <i class=templateIcon3></i>
           </li>
           <li class="zmfadeUp zmanimate">
             <i class=templateIcon4></i>
           </li>
           <li class="zmfadeUp zmanimate">
             <i class=templateIcon5></i>
           </li>
           <li class="zmfadeUp zmanimate">
             <i class=templateIcon6></i>
           </li>
           <li class="zmfadeUp zmanimate">
             <i class=templateIcon7></i>
           </li>
           <li class="zmfadeUp zmanimate">
             <i class=templateIcon8></i>
           </li>
         </ul>

         <div class="title-five zmfadeUp zmanimate">
           <div class="btnbox" @click="locationbuildSite">
             <span class="fiveBtnL">更多模板</span>
             <span class="fiveBtnR">MORE</span>
           </div>
         </div>


     </div>
     <div class="zmmarketbottom">
         <div class="bottomLine1">
           <nuxt-link to="/"></nuxt-link>
           <i></i>
         </div>
         <p class="bottomLine2">建站不求人，自助搭建在线交易网站！</p>
         <p class="bottomLine3">上海族蚂信息科技有限公司</p>
         <p class="bottomLine4">Copyright &copy 2017 Zuma.com</p>
         <p class="bottomLine5">沪ICP备18007337号-2</p>
     </div>




   </div>
</template>
<script>
  import eventBus from "@/assets/js/eventBus";
  export default {
    data(){
      return {
        zmAdvancefixed:false,
        clientHeight:'',//屏幕高度
        animateObjArray:[]
      }
    },
    mounted(){
      eventBus.$on("Del",(arg)=>{


      })
      //监听滚动，判断每个需要动画的部分，当该部分滚动的距离距底边100px时，加入动画
      window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
      this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      var animateObj = document.querySelectorAll(".zmfadeUp")
      this.animateObjArray = animateObj;

    },
    methods:{
      buildSitelogin(){
        //eventBus.$emit("showReg",{bl:true,callBack:()=>{location.href='/'}});
        location.href='/mregister';
      },
      locationbuildSite(){
          location.href = '/site'
      },
      handleScroll(){
        //获取屏幕高度this.clientHeight
        //获取对应dom距离视口的距离

        this.animateObjArray.forEach(function(ele,index){
          var disTop = ele.getBoundingClientRect().top;
           if( disTop < 500){
             ele.classList.add("fadeInUp")
           console.log("加动画",disTop)
           }
        })



      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 .zmAdvancefixed
      position fixed;
 .zmAdvance
     top 0 !important;
     background: #fff;
     z-index: 100;
     .advanceHead
          height 50px;
          display:box;
          display:-webkit-box;
          display:-webkit-flex;
          display:-moz-box;
          display:-ms-flexbox;
          display:flex;
          -moz-justify-content: space-between;
          -webkit-justify-content: space-between;
          -ms-justify-content: space-between;
          justify-content: space-between;
          -moz-align-items: center;
          -webkit-align-items: center;
          -ms-align-items: center;
          align-items: center;
          padding 0 15px;
          .zmLogo
             width 55px;
             height 20px;
             background url(../../assets/images/zmmarket/zmLogo.png) no-repeat;
             display: inline-block;
             background-size: contain;
             a
                display inline-block;
                width 100%;
                height 100%;
          .tel
             .telTop
                 width 120px;
                 height 20px;

                 background #F3F6F9;
                 border-radius 20px;
                 font-size 12px;
                 font-weight bold;
                 color #4C95FD;
                 i
                    width 14px;
                    height 14px;
                    background url(../../assets/images/zmmarket/tel.png) no-repeat;
                    display: inline-block;
                    background-size: contain;
                    margin-top: 3px;
                    vertical-align: bottom;
             .telBtm
                 color:#9FACBC;
                 font-size 10px;
                 margin-top: 3px;
     .bannner
          position relative;
          width 100%;
          height 377px;
          background url(../../assets/images/zmmarket/zmbanner.png) no-repeat;
          display: inline-block;
          background-size: contain;
          margin-bottom: 30px;
          .buildSite
                width 100px;
                height 25px;
                position absolute;
                bottom: 53px;
                right: 45px;


     .features

          .title-one
              font-size 18px;
              color #122F46;
              margin-bottom: 15px;
          .title-sec
              font-size 12px;
              color #122F46;
              margin-bottom: 10px;
          .title-three
              height: 5px;
              line-height: 5px;
              margin-bottom 20px;
              span
                  display inline-block;
                  width 70px;
                  height 5px;
                  background #4C95FD;
          .title-four
              line-height: 20px;
              padding: 0 20px;
          .title-five
              .btnbox
                display inline-block;
                width 200px;
                .fiveBtnL
                    display inline-block;
                    height 40px;
                    line-height 40px;

                    background #4C95FD;
                    color #fff;
                    font-size 14px;
                    box-sizing: border-box;
                    width: 100px;
                    float: left;
                .fiveBtnR
                     display inline-block;
                     height 40px;
                     padding 0 20px;
                     border: 2px solid #4C95FD;
                     box-sizing: border-box;
                     width: 100px;
                     color #fff;
                     font-size 14px;
                     border-left: none;
                     line-height: 1.25rem;


    .featuresDetail
        margin-top 35px;
        background:url(../../assets/images/zmmarket/beijing1.png) no-repeat;
        background-size: cover;
        background-position: bottom;
        margin-bottom 30px;
        ul
          width: 100%;
          padding: 0 15px;
          box-sizing: border-box;
        .detailLi
             width 140px;
             text-align center;
             margin-bottom: 20px;
             float left
        .detailLi:nth-child(1)
             margin-right 5px;
        .detailLi:nth-child(2)
             margin-left 5px;
        .detailLi:nth-child(3)
             margin-left 75px;
            .detailLiitem
                width 140px;
                height 170px;
                box-shadow: 0 10px 10px #ccc;
                padding: 0 13px;
                box-sizing: border-box;
                margin-bottom 20px;
                background: #fff;
                .detailtop
                    display: inline-block;
                    width 50px;
                    height 50px;
                    margin-top: 10px;
                    background url(../../assets/images/zmmarket/point1.png) no-repeat;
                    background-size: contain;
                .detailtopimg2
                    background url(../../assets/images/zmmarket/point2.png) no-repeat;
                    background-size: contain;
                .detailtopimg3
                    background url(../../assets/images/zmmarket/point3.png) no-repeat;
                    background-size: contain;
                .detailtoptext
                    font-size 14px;
                    color #122F46;
                    padding: 10px 0;
                .detailBtm
                    color #9FACBC;
                    line-height: 16px;
                    text-align: justify;
.moreBtn
    display inline-block;
    width 100px;
    height 30px;
    line-height 30px;
    border-radius 23px;
    background #4C95FD;
    color #fff;
    font-size 14px;
    font-weight bold;
.featuresDetailsec
    margin-bottom 30px;
    .detailsecUl
           width: 260px;
           display: flex;
           justify-content: space-evenly;
           flex-wrap: wrap;
           margin: 0px 30px;
       .detailLi
           width 130px;
           margin-bottom: 30px;
           .liIcon
                display inline-block;
                width 40px
                height 40px;
                background url(../../assets/images/zmmarket/orderNum.png) no-repeat;
                background-size: contain;
           .cpgl
             background url(../../assets/images/zmmarket/cpgl.png) no-repeat;
             background-size: contain;
           .bkdz
             background url(../../assets/images/zmmarket/bkdz.png) no-repeat;
             background-size: contain;
           .qwtg
             background url(../../assets/images/zmmarket/qwtg.png) no-repeat;
             background-size: contain;
           .cbkz
             background url(../../assets/images/zmmarket/cbkz.png) no-repeat;
             background-size: contain;
           .dchd
             background url(../../assets/images/zmmarket/dchd.png) no-repeat;
             background-size: contain;
           .dpyy
             background url(../../assets/images/zmmarket/dpyy.png) no-repeat;
             background-size: contain;
           .sjjj
             background url(../../assets/images/zmmarket/sjjj.png) no-repeat;
             background-size: contain;
         .liText
                margin-top: 5px;
                font-size 14px;
                color #122F46;
.featuresmanagement
      width 100%;
      height 410px;
      background url(../../assets/images/zmmarket/beijing3.png) no-repeat;
      background-size: contain;
      padding-top 35px;
      box-sizing: border-box;
      .title-five .fiveBtnR
          color #fff !important;
      .featuresTitle
          .title-one
            color #fff;
          .title-sec
            color #fff;

 .managementBtnGroup
      margin-top: 50px;
      li
          float left;
          font-size 18px;
          font-weight bold;
          color #fff;
          width 130px;
          height 45px;
          margin: 0 15px;
          margin-bottom: 25px;
          line-height 45px;
          border-radius 25px;
          background: -o-linear-gradient(top, rgba(246,152,47,1) ,  rgba(234,60,73,1))
          background: -moz-linear-gradient(top, rgba(246,152,47,1) ,  rgba(234,60,73,1))
          background: -webkit-linear-gradient(top, rgba(246,152,47,1) ,  rgba(234,60,73,1))
          background: linear-gradient(to bottom,rgba(246,152,47,1) ,  rgba(234,60,73,1)); /* 标准的语法（必须放在最后） */
 .clearfix{display: inline-block;} /* for IE/Mac */
 .clearfix:after
   content: '';
   display: block;
   clear: both;
   height:0;
.featuresservice
  height 1200px;
  width 100%;
  background url(../../assets/images/zmmarket/beijing4.png) no-repeat;
  background-size: contain;
  padding-top 30px;
  box-sizing border-box;
  .fiveBtnR
     color #122F46 !important;

.featuresserviceul
    padding-top: 30px;
    .serviceLi
         float left;
         width: 120px;
         margin-bottom 35px;
         padding: 0 20px;
         min-height: 150px;
        .serviceLitop
            display inline-block;
            width 50px;
            height 50px;
            background url(../../assets/images/zmmarket/serviceUl1.png) no-repeat;
            background-size: contain;
        .serviceLitop2
            background url(../../assets/images/zmmarket/serviceUl2.png) no-repeat;
            background-size: contain;
        .serviceLitop3
            background url(../../assets/images/zmmarket/serviceUl3.png) no-repeat;
            background-size: contain;
        .serviceLitop4
           background url(../../assets/images/zmmarket/serviceUl4.png) no-repeat;
           background-size: contain;
        .serviceLitop5
           background url(../../assets/images/zmmarket/serviceUl5.png) no-repeat;
           background-size: contain;
        .serviceLitop6
           background url(../../assets/images/zmmarket/serviceUl6.png) no-repeat;
           background-size: contain;
        .serviceLitop7
           background url(../../assets/images/zmmarket/serviceUl7.png) no-repeat;
           background-size: contain;
        .serviceLitop8
           background url(../../assets/images/zmmarket/serviceUl8.png) no-repeat;
           background-size: contain;
        .serviceLitop9
           background url(../../assets/images/zmmarket/serviceUl9.png) no-repeat;
           background-size: contain;
        .serviceLitop10
           background url(../../assets/images/zmmarket/serviceUl10.png) no-repeat;
           background-size: contain;
        .serviceText
           font-size 14px;
           color #122F46;
           padding: 15px 0;
        .serviceLitext
           color #9FACBC;
           text-align: left;
.featureszuma
    background #F3F6F9;
    padding-top 30px;
    padding-left 10px;
    padding-right 10px;
    .fiveBtnR
       color #122F46 !important;
    .aboutZuma
        margin-top 30px;
        .aboutTextone
            font-size 16px;
            font-weight bold;
            color #122F46;
        .aboutTextSec
            margin-top 15px;
            font-size 14px;
            font-weight bold;
            color #122F46;
        .aboutThird
            margin-top 20px;
            text-align: justify;
            line-height: 18px;
            color #9FACBC;
        .aboutFour
            margin-top 20px;
            i
              display inline-block;
              width 280px;
              height 160px;
              background url(../../assets/images/zmmarket/PC@2x.png) no-repeat;
              background-size: contain;
.featuresmarket
     padding-top 30px;
     padding-bottom: 30px;
    .title-five
        margin-top 20px;
        .fiveBtnR

            color #122F46 !important;
    .marketIcon
        margin-top 5px;
        li
            float left;
            margin: 0 10px;
            i
              display inline-block;
              width 140px
              height 60px;
            .iconBaidu
              background url(../../assets/images/zmmarket/baidu@2x.png) no-repeat;
              background-size: contain;
           .icon360
              background url(../../assets/images/zmmarket/360@2x.png) no-repeat;
              background-size: contain;
           .iconsg
              background url(../../assets/images/zmmarket/sougou@2x.png) no-repeat;
              background-size: contain;
          .icontt
              background url(../../assets/images/zmmarket/toutiao@2x.png) no-repeat;
              background-size: contain;
          .icondy
              background url(../../assets/images/zmmarket/douyin@2x.png) no-repeat;
              background-size: contain;
          .iconyl
              background url(../../assets/images/zmmarket/yinlian@2x.png) no-repeat;
              background-size: contain;
          .iconzfb
              background url(../../assets/images/zmmarket/zhifubao@2x.png) no-repeat;
              background-size: contain;
          .iconwx
              background url(../../assets/images/zmmarket/weixin@2x.png) no-repeat;
              background-size: contain;

.featuresTemplate
    padding-top 30px;
    padding-bottom: 30px;
    background #f2f2f2;
    .templateIcon
        margin-top 10px;
        li
            float left;
            margin: 0 10px;
            margin-bottom: 25px;
            i
              width 140px;
              height 84px;
              display inline-block;
            .templateIcon1
              background url(../../assets/images/zmmarket/1.png) no-repeat;
              background-size: contain;
            .templateIcon2
              background url(../../assets/images/zmmarket/2.png) no-repeat;
              background-size: contain;
            .templateIcon3
              background url(../../assets/images/zmmarket/3.png) no-repeat;
              background-size: contain;
            .templateIcon4
              background url(../../assets/images/zmmarket/4.png) no-repeat;
              background-size: contain;
            .templateIcon5
              background url(../../assets/images/zmmarket/5.png) no-repeat;
              background-size: contain;
            .templateIcon6
              background url(../../assets/images/zmmarket/6.png) no-repeat;
              background-size: contain;
            .templateIcon7
              background url(../../assets/images/zmmarket/7.png) no-repeat;
              background-size: contain;
            .templateIcon8
              background url(../../assets/images/zmmarket/8.png) no-repeat;
              background-size: contain;
    .title-five
        margin-top 0px !important
.zmmarketbottom
      width 100%;
      height 230px;
      background:#2c2c2c;
/*      background: -o-linear-gradient(right, rgba(76,149,253,1) ,  rgba(55,114,250,1))
      background: -moz-linear-gradient(right, rgba(76,149,253,1) ,  rgba(55,114,250,1))
      background: -webkit-linear-gradient(right, rgba(76,149,253,1) ,  rgba(55,114,250,1))
      background: linear-gradient(to right,rgba(76,149,253,1) ,  rgba(55,114,250,1)); !* 标准的语法（必须放在最后） *!*/

      .bottomLine1
          padding-top 50px;
          position relative;
          a
            display inline-block;
            width 100px;
            height 36px;
            position absolute;
          i
            display inline-block;
            width 100px;
            height 36px;
            background url(../../assets/images/zmmarket/bottomlogo.png) no-repeat;
            background-size: contain;
      .bottomLine2
          font-size 14px;
          color #FFFFFF;
          margin-top 20px;
      .bottomLine3
         font-size 12px;
         color #FFFFFF;
         margin-top 30px;
      .bottomLine4
         font-size 12px;
         color #FFFFFF;
         line-height: 20px;
      .bottomLine5
         font-size 12px;
         color #FFFFFF;

  /*上推动动画*/
 @-webkit-keyframes fadeInUp {
   from {
     opacity: 0;
     -webkit-transform: translate3d(0, 100%, 0);
     transform: translate3d(0, 100%, 0);
   }

   to {
     opacity: 1;
     -webkit-transform: translate3d(0, 0, 0);
     transform: translate3d(0, 0, 0);
   }
 }
 @keyframes fadeInUp {
   from {
     opacity: 0;
     -webkit-transform: translate3d(0, 100%, 0);
     transform: translate3d(0, 100%, 0);
   }

   to {
     opacity: 1;
     -webkit-transform: translate3d(0, 0, 0);
     transform: translate3d(0, 0, 0);
   }
 }

 .fadeInUp {
   visibility: visible !important;
   animation:fadeInUp 1s 1;
   -webkit-animation:fadeInUp 1s 1; /*Safari and Chrome*/
 }
.zmanimate{
  visibility: hidden;
}

</style>
