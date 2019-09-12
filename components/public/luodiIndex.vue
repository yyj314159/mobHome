<template>
<div class="newIndexBox">
  <div class="slidebanner">
    <cube-slide ref="slide" :data="items"  :interval="2000"  :auto-play="false" :showDots="true">
      <cube-slide-item >
        <a href="/site" class="slideItemone">
         <!-- <img src="/images/newIndex/banner1.png">-->
          <div class="zmlogo"></div>
          <div class="bannerSlide">
            <h1 class="bannerTitle">建站不求人，自主搭建在线交易网站 !</h1>
            <div class="bannerContent bannerContentone">
              <ul class="clearfix">
                <li class="banner-advance-select"><i></i>商品</li>
                <li class="banner-advance-select"><i></i>服务</li>
                <li class="banner-advance-select"><i></i>支付</li>
                <li class="banner-advance-select"><i></i>营销</li>
                <li class="banner-advance-select"><i></i>会员管理</li>
              </ul>
            </div>
            <div class="bannerBtn"><span>免费咨询</span></div>
          </div>
        </a>
      </cube-slide-item>
      <cube-slide-item >
        <a href="/product" class="slideItemSec">
          <!--<img src="/images/newIndex/banner2.png">-->
          <div class="zmlogo"></div>
          <div class="bannerSlide">
            <h1 class="bannerTitle">族蚂建站，是商家也是买家</h1>
            <div class="bannerContent bannerContentSecond">
              <ul class="clearfix">
                <li class="banner-advance-select">发布产品、服务、音频、资讯、文章</li>
                <li class="banner-advance-select">族蚂商城智能推送全网用户，迅速获得百万流量!</li>
              </ul>
            </div>
            <div class="bannerBtn"><span>免费咨询</span></div>
          </div>

        </a>
      </cube-slide-item>
      <cube-slide-item >
        <a href="/site" class="slideItemThree">
        <!--  <img src="/images/newIndex/banner3.png">-->
          <div class="zmlogo"></div>
          <div class="bannerSlide bannerSlideThree">
            <h1 class="bannerTitle">全行业交易解决方案</h1>
            <div class="bannerContent">
              <ul class="clearfix">
                <li class="banner-advance-select">智能订单管理终端、会员管理工具、趣味营销工具</li>
                <li class="banner-advance-select">助力中小微企业进入电商快车道</li>
              </ul>
            </div>
            <div class="bannerBtn"><span>免费咨询</span></div>
          </div>
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
  <!--搭建线上门店-->
  <div class="buildSite">
    <h1 class="title">极速搭建多终端线上门店</h1>
    <p class="descText">多终端访问，PC站、手机站、微商城、小程序助力中小微企业进入电商快车道而生</p>
    <div class="buildlist">
      <div class="zmBuild">
        <a href="/site" class="zmBuildOne">
          <!--<img src="/images/newIndex/zmsite.png" alt="">-->
          <div class="zmBuildBtm">
            <p class="textOne">不会代码,想建一个企业网站?</p>
            <span class="btn">族蚂建站</span>
          </div>
        </a>
      </div>
      <div class="zmBuild">
        <a href="/product" class="zmBuildSec">
          <!--<img src="/images/newIndex/zmshangcheng.png" alt="">-->
          <div class="zmBuildBtm">
            <p class="textOne">没有推广渠道,数据同步族蚂商城推广</p>
            <span class="btn">族蚂商城</span>
          </div>
        </a>
      </div>
    </div>
  </div>
  <!--功能组件-->
  <div class="functionComponent">
    <h1 class="componentTitle">数百款功能组件</h1>
    <p class="componentdesc">可视化操作，功能组件自带交易流程</p>
    <div class="componentList">
      <ul class="clearfix">
        <li class="componentListitem">
          <i class="iconTop iconTop1"></i>
          <div class="componentName">商品组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop2"></i>
          <div class="componentName">资讯组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop3"></i>
          <div class="componentName">文章组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop4"></i>
          <div class="componentName">视频组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop5"></i>
          <div class="componentName">地图组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop6"></i>
          <div class="componentName">音频组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop7"></i>
          <div class="componentName">轮播组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop8"></i>
          <div class="componentName">容器组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop9"></i>
          <div class="componentName">调研问卷</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop10"></i>
          <div class="componentName">搜索功能</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop11"></i>
          <div class="componentName">文件下载</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop12"></i>
          <div class="componentName">照片组件</div>
        </li>
        <li class="componentListitem">
        <i class="iconTop iconTop13"></i>
        <div class="componentName">导航组件</div>
        </li>
        <li class="componentListitem">
          <i class="iconTop iconTop14"></i>
          <div class="componentName">按钮组件</div>
        </li>
        <li class="componentListitem">
         <i class="iconTop iconTop15"></i>
         <div class="componentName">文字组件</div>
        </li>

        <li class="componentListitem">
          <i class="iconTop iconTop16"></i>
          <div class="componentName">形状组件</div>
        </li>

      </ul>
    </div>
  </div>
  <!--功能只展示-->
 <div class="functionShow">
     <h1 class="functionTitle">功能展示</h1>
     <p class="functionText">自定义功能组件样式、任意布局</p>
     <div class="functionSwiper">
       <section class="pc-banner">
       <div class="swiper-container swiper-containerfunction">
         <div class="swiper-wrapper">
           <div class="swiper-slide swiper-slide-center none-effect">
             <a  class="productSlider"></a>
             <p class="sliderText">产品列表</p>
           </div>
           <div class="swiper-slide">
             <a  class="zixunSlider"></a>
             <p class="sliderText">资讯列表</p>
           </div>
           <div class="swiper-slide">
             <a class="videoSlider"></a>
             <p class="sliderText">视频列表</p>
           </div>
           <div class="swiper-slide">
             <a class="musicSlider"></a>
             <p class="sliderText">音乐列表</p>
           </div>
           <div class="swiper-slide">
             <a  class="questionSlider"></a>
             <p class="sliderText">调研列表</p>
           </div>
         </div>
       </div>
       <div class="swiper-pagination"></div>
<!--       <div class="button">
         <div class="swiper-button-prev"></div>
         <div class="swiper-button-next"></div>
       </div>-->
       </section>
     </div>
 </div>
<!--智能线上商城-->
  <div class="linemall">
    <h1 class="mallTitle">智能线上商城</h1>
    <p class="malltext">完整的线上线下商城系统 , 实现一体化运营管理</p>
    <div class="mallList">
      <ul class="clearfix">
        <li class="mallListitem">
          <i class="iconTop iconTop1"></i>
          <div class="mallListitemRight">
            <h2 class="listitemText">便捷操作</h2>
            <p class="funcDesc">智能管理系统，员工权限控制，操作便捷</p>
          </div>
        </li>
        <li class="mallListitem">
          <i class="iconTop iconTop2"></i>
          <div class="mallListitemRight">
            <h2 class="listitemText">支付系统</h2>
            <p class="funcDesc">支持支付宝、微信、银联支付</p>
          </div>
        </li>
        <li class="mallListitem">
          <i class="iconTop iconTop3"></i>
          <div class="mallListitemRight">
            <h2 class="listitemText">聊天工具</h2>
            <p class="funcDesc">提供即时客服聊天工具，提高客量转化</p>
          </div>
        </li>
        <li class="mallListitem">
          <i class="iconTop iconTop4"></i>
          <div class="mallListitemRight">
             <h2 class="listitemText">视频弹幕</h2>
             <p class="funcDesc">实时弹幕效果娱乐互动，让视频趣味升级</p>
          </div>
        </li>
        <li class="mallListitem">
          <i class="iconTop iconTop5"></i>
          <div class="mallListitemRight">
             <h2 class="listitemText">运费模板</h2>
             <p class="funcDesc">自定义运费模板，按商品属性收取运费</p>
          </div>
        </li>
        <li class="mallListitem">
          <i class="iconTop iconTop6"></i>
          <div class="mallListitemRight">
              <h2 class="listitemText">周边交易</h2>
              <p class="funcDesc">本地交易、服务精确定位，锁定客户群体</p>
          </div>
        </li>

      </ul>
    </div>
  </div>

  <!--精美模板-->

  <div class="beautyTemplate">
    <h1 class="templateTitle">精美模板</h1>
    <p class="templateText">一键套用，快速生成可在线交易网站  </p>
    <div class="functionSwiper">
      <section class="pc-banner bannerTwo">
       <div class="swiper-container swiper-containertemplate">
          <div class="swiper-wrapper">

            <div class="swiper-slide" ><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide" ><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
           <div class="swiper-slide"><a class="templateInnerSlide" href="#">
             <div class="temlatePc">
               <div class="templatePCtop">
                 <span class="circle"></span>
                 <span class="circle"></span>
                 <span class="circle"></span>
               </div>
               <div class="templatePcbody">
                 <img src="" alt="">
               </div>
             </div>
             <div class="templatePhone">
               <div class="templateBody">
                 <img src="" alt="">
               </div>
             </div>
             <p class="templateName"></p>
           </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide" href="#">

              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide"  href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
            <div class="swiper-slide"><a class="templateInnerSlide" href="#">
              <div class="temlatePc">
                <div class="templatePCtop">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
                <div class="templatePcbody">
                  <img src="" alt="">
                </div>
              </div>
              <div class="templatePhone">
                <div class="templateBody">
                  <img src="" alt="">
                </div>
              </div>
              <p class="templateName"></p>
            </a></div>
          </div>
        </div>
        <!--div class="swiper-paginationtemplate"></div>-->
        <!--查看更多-->
        <div class="checkMoreBtn"><a class="moreText" href="/site">查看更多</a></div>
      </section>
    </div>
  </div>
  <!--完整的交易生态系统-->
  <div class="tradeSystem">
    <h1 class="systemTitle">完整的交易生态系统</h1>
    <p class="systemText">功能全面  简易操作</p>
    <div class="systemImg">
      <img src="/images/newIndex/tradeSystem.png" alt="">
    </div>
    <div class="copyright copyrightText">Copyright &copy; 2017 -2018  上海族蚂信息科技有限公司</div>
    <p class="copyrightText">版权所有</p>
  </div>
  <div class="contactBottom">
    <footer>
      <div class="contactL"> <p class="bottomP" @click="consultFunc"><i class="message"></i>在线咨询</p></div>
      <div class="contactR"><a class="bottomP" href="tel:400-820-2178"><i class="phone"></i>电话咨询</a></div>
    </footer>
  </div>
</div>
</template>
<script>
  import MethodsUtil from "@/assets/js/MethodsUtil"
  import eventBus from "@/assets/js/eventBus";
  export default {
    data() {
      return {
        items: [
          {

            url: '/site',
            image: '/images/newIndex/banner1.png'
          },
          {
            title1:'',
            url: '/product',
            image: '/images/newIndex/banner2.png'
          },
          {
            title1:'',
            url: '/site',
            image: '/images/newIndex/banner3.png'
          }
        ],
        templateData:[],
        loginStatus:"",
        recordId:''

      };
    },
    mounted() {
        var _this = this;
      eventBus.$on("login",(arg)=>{
        _this.loginStatus = arg.bl;
        console.log("登录状态落地",_this.loginStatus)
      })
      var swiper = new Swiper('.swiper-containerfunction',{
        autoplay:false,
        speed:1000,
        autoplayDisableOnInteraction : false,
        loop:true,
        roundLengths : true,
        centeredSlides : true,
        slidesPerView:2,
        spaceBetween: 8,
        pagination : '.swiper-pagination',
        paginationClickable:true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next'
       /* onInit:function(swiper){
          swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
        },*/

      });
    var swiperTemplate = new Swiper('.swiper-containertemplate',{
       autoplay:false,
       speed:1000,
       autoplayDisableOnInteraction : false,
       loop:true,
       height:116,
       width:320,
       roundLengths : false,
       centeredSlides : true,
       slidesPerView:1.66,
       spaceBetween: -5,
       pagination : '.swiper-paginationtemplate',
       paginationClickable:true,
       prevButton:'.swiper-button-prev',
       nextButton:'.swiper-button-next',
       onInit:function(swiperTemplate){

       },

       });
      this.getTemplateData();
      console.log("sdsdddddd",this.loginStatus)


    },
    methods:{
       getRecordId(){
         var _this = this;
         var func = new Promise(function(resolve, reject){
           _this.HttpCli.get('/z-chat/wap/skip/zm_service', {
             fIsUrgency:0,
             fTitle:'会员咨询'
           })
             .then(function (response) {
               if(response.data.status == 0){
                 _this.recordId = response.data.recordId
                 resolve(true);
                 console.log('recordIDsssssssss',_this.recordId )
               }
             })
             .catch(function (error) {
               reject(false)
               console.log(error);
             });


         })
         return func;

       },
      getTemplateData(){
        var _this = this;
        this.HttpCli.get('/manage-api/template/searchTenTemplateESBeansToPhone', {})
          .then(function (response) {
              if(response.data.status == 0){
                _this.templateData = response.data.data.content;
                _this.templateData.push(_this.templateData[0]);
                _this.templateData.unshift(_this.templateData[9]);
                var sliderArray = document.querySelectorAll(".bannerTwo .swiper-slide");
                var sliderArrayName = document.querySelectorAll(".bannerTwo .swiper-slide .templateName");
                var slideArrayPcimg = document.querySelectorAll(".bannerTwo .swiper-slide .temlatePc img");
                var slideArrayPhoneimg = document.querySelectorAll(".bannerTwo .swiper-slide .templatePhone img");
                _this.templateData.forEach(function(ele,index){
                  sliderArrayName[index].innerHTML = ele.fName
                  slideArrayPcimg[index].src = ele.fUrl ? ele.fUrl : "";
                  slideArrayPhoneimg[index].src = ele.fUrl2 ? ele.fUrl2 : "";
                })



              }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      consultFunc(){
          //判断是否登录
          var _this = this;
          this.getRecordId().then(function(data){
              if(data){
                location.href = '/mobMemberCenter/memberConsultDetail?fRecordId='+_this.recordId
              }
          })


      }
    }

  }
</script>

<style scoped>
  .clearfix{display: inline-block;} /* for IE/Mac */
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
    height:0;
  }

 .newIndexBox{
    top: 0 !important;
  }
  .slidebanner{
    height: 204px;
  }
 .imgBox{
  position: relative;
  width: 160px;
  height: 230px;
  border: 1px solid #ccc;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;

  }

 .pc-banner {

   width: 100%;
   float: left;
 }


   .pc-banner {
     background-size: auto 100%;
   }


 .swiper-container {
   width: 100%;
   height: 300px;
   margin: 35px 0;
   /*overflow: visible !important;*/
   padding-bottom: 30px;
   margin-bottom: 0 !important;
 }

  .beautyTemplate  .swiper-container{
    padding-bottom: 20px !important;
  }
   .swiper-container {
     margin: 20px 0 15px;
   }


 .swiper-slide {

   -webkit-transition: transform 1.0s;
   -moz-transition: transform 1.0s;
   -ms-transition: transform 1.0s;
   -o-transition: transform 1.0s;
   -webkit-transform: scale(0.8);
   transform: scale(0.8);
 }

 .bannerTwo .swiper-slide{
   height: 120px;
   border: none;
   border-bottom-left-radius:0;
   border-bottom-right-radius:0;
 }
/*   .swiper-slide {
     -webkit-transform: scale(0.97);
     transform: scale(0.97);
   }*/


 .swiper-slide-active,.swiper-slide-duplicate-active {

   -webkit-transform: scale(1);
   transform: scale(1);
 }


   .swiper-slide-active,.swiper-slide-duplicate-active {
     -webkit-transform: scale(0.97);
     transform: scale(0.97);
   }


 .none-effect {
   -webkit-transition: none;
   -moz-transition: none;
   -ms-transition: none;
   -o-transition: none;
 }

/* .swiper-slide a {
   background: #fff;
   display: block;
   border-radius: 14px;
 }*/

  /* .swiper-slide a:after {
     position: absolute;
     top: 0;
     left: 0;
     display: block;
     box-sizing: border-box;
     border: 10px solid #fff;
     content: "";
     width: 100%;
     height: 100%;

     border-radius: 20px;
   }
*/

 .swiper-slide-active a:after {
   background: none;
 }


   .swiper-slide a {
     position: relative;
     background: #f2f2f2;
     display: block;
     border-radius: 7px;
     height: 100%;
     box-sizing: border-box;
   }



 .swiper-slide img {
   width: 100%;
   border-radius: 14px;
   display: block;
 }


   .swiper-slide img {
     border-radius: 7px;
   }


 .swiper-pagination {
   position: relative;
   margin-bottom: 30px;
 }

 .swiper-pagination-bullet {
   background: #00a0e9;
   margin-left: 4px;
   margin-right: 4px;
   width: 17px;
   height: 17px;
   opacity: 1;
   margin-bottom: 4px;
 }

 .swiper-pagination-bullet-active {
   width: 13px;
   height: 6px;
   background: #FFF;
   border: 6px solid #00a0e9;
   margin-bottom: 0;
 }


   .swiper-pagination-bullet {
     background: #00a0e9;
     margin-left: 2px;
     margin-right: 2px;
     width: 8px;
     height: 8px;
     margin-bottom: 2px;
   }

   .swiper-pagination-bullet-active {
     width: 6px;
     height: 6px;
     background: #FFF;
     border: 3px solid #00a0e9;
     margin-bottom: 0;
   }


 .button {
   width: 1000px;
   margin: 0 auto;
   bottom: 43px;
   position: relative;
 }


   .button {
     width: 70%;
     bottom: 22px;
   }


 .button div:hover {
   background-color: #2f4798;
 }

 .swiper-button-prev {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E") #00a0e9 center 50%/50% 50% no-repeat;
 }

 .swiper-button-next {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E") #00a0e9 center 50%/50% 50% no-repeat;
 }
 .button div {
     width: 28px;
     height: 28px;
}
.buildlist{
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  margin-top:20px;

}
.buildlist .zmBuild:nth-child(1){
  margin-left: 6.33px;
  margin-right: 6.33px;
}
.buildlist .zmBuild{
  width:150px;
  height:180px;
}
 .buildlist .zmBuild img{
   width: 100%;
   height: 100%;
   object-fit: cover;
 }
 .buildSite{
   padding-top: 40px;
 }
.buildSite .title{
    font-size: 20px;
    color:#122F46;
}
 .buildSite .descText{
   font-size: 12px;
   color: #718290;
   padding: 0 32px;
   line-height: 20px;
   margin-top: 20px;
 }

 .functionComponent{
   margin-top:60px;
 }
 .functionComponent .componentTitle{
   font-size: 20px;
   color:#122F46;
 }

 .functionComponent .componentdesc{
   font-size: 12px;
   color: #718290;
   margin-top: 20px;
 }
.componentList{
  margin-top:40px;
}
 .componentListitem{
   float: left;
 }
.componentListitem .iconTop{
  display: inline-block;
  width: 34px;
  height:34px;

}
 .componentListitem .iconTop1{
   background: url('/images/newIndex/component-1.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop2{
   background: url('/images/newIndex/component-2.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop3{
   background: url('/images/newIndex/component-3.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop4{
   background: url('/images/newIndex/component-4.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop5{
   background: url('/images/newIndex/component-5.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop6{
   background: url('/images/newIndex/component-6.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop7{
   background: url('/images/newIndex/component-7.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop8{
   background: url('/images/newIndex/component-8.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop9{
   background: url('/images/newIndex/component-9.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop10{
   background: url('/images/newIndex/component-10.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop11{
   background: url('/images/newIndex/component-11.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop12{
   background: url('/images/newIndex/component-12.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop13{
   background: url('/images/newIndex/component-13.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop14{
   background: url('/images/newIndex/component-14.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop15{
   background: url('/images/newIndex/component-15.png') no-repeat;
   background-size: contain;
 }
 .componentListitem .iconTop16{
   background: url('/images/newIndex/component-16.png') no-repeat;
   background-size: contain;
 }
 .clearfix{display: inline-block;} /* for IE/Mac */
 .clearfix:after{
   content: '';
   display: block;
   clear: both;
   height:0;
 }

.componentList ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 20px;
}
 .componentList ul .componentListitem{
   width: 60px;
   margin-bottom:35px;
 }
 .functionSwiper{
   height: 380px;
 }
 .beautyTemplate{
   height: 330px;
   background: #F2F2F2;
   padding-top: 20px;
   box-sizing: border-box;
 }
 .beautyTemplate .templateTitle{
   font-size: 20px;
   color:#122F46;
   margin-bottom: 15px;
 }
 .beautyTemplate .templateText{
   font-size: 12px;
   color:#718290;
   margin-bottom: 15px
 }

 .componentListitem .componentName{
   margin-top:15px;
   color:#122F46;
 }
.functionShow{
  padding-top: 35px;
  background: #F2F2F2;
}
.functionTitle{
  font-size: 20px;
  color:#122F46;
  margin-bottom: 15px;

}
.functionShow .functionText{
  font-size: 12px;
  color: #718290;
}

.linemall{
  padding-top: 35px;
}
.linemall .mallTitle{
  font-size: 20px;
  color:#122F46;
  margin-bottom:20px;
}
 .linemall .malltext{
   font-size: 12px;
   color:#718290;
   margin-bottom: 20px;
 }

.mallList ul .mallListitem{
   position: relative;
   height: 64px;
   width:290px;
   box-shadow: 0 0 5px rgba(88,125,255,0.2);
   margin-bottom:10px;
   display: flex;
   align-items: center;
   border-radius: 2px;
 }
.mallList ul .mallListitem .mallListitemRight{
  margin-left: 50px;
}
.mallList ul .mallListitem .mallListitemRight .listitemText{
  font-size: 16px;
  text-align: left;
  color:#122F46;
  margin-bottom: 5px
}
.mallList ul .mallListitem .mallListitemRight .funcDesc{
  font-size: 12px;
  text-align: left;
  color:#718290;
  line-height: 15px;
}
.mallList ul .mallListitem .iconTop{
    position: absolute;
    left:10px;
    width: 30px;
    height:30px;

}
 .mallList ul .mallListitem .iconTop1{
   background: url('/images/newIndex/linemall1.png') no-repeat;
   background-size: contain;
 }
 .mallList ul .mallListitem .iconTop2{
   background: url('/images/newIndex/linemall2.png') no-repeat;
   background-size: contain;
 }
 .mallList ul .mallListitem .iconTop3{
   background: url('/images/newIndex/linemall3.png') no-repeat;
   background-size: contain;
 }
 .mallList ul .mallListitem .iconTop4{
   background: url('/images/newIndex/linemall4.png') no-repeat;
   background-size: contain;
 }
 .mallList ul .mallListitem .iconTop5{
   background: url('/images/newIndex/linemall5.png') no-repeat;
   background-size: contain;
 }
 .mallList ul .mallListitem .iconTop6{
   background: url('/images/newIndex/linemall6.png') no-repeat;
   background-size: contain;
 }
  .tradeSystem{
    padding-top: 25px;
    padding-bottom: 50px;
  }
 .tradeSystem .systemTitle{
   font-size: 20px;
   color:#122F46;
   margin-bottom: 10px;
 }
 .tradeSystem .systemText{
   font-size: 12px;
   color:#718290;
 }
 .tradeSystem .systemImg{
   height: 290px;
 }
 .tradeSystem .systemImg img{
   width: 100%;
   height:100%;
   object-fit: cover;
 }
.copyrightText{
   color:#A1A1A1;
  font-size: 10px;
}
  .copyright{
    margin-bottom: 5px;
  }
.contactBottom{
  height: 44px;
  border-top:1px solid #f2f2f2;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
  z-index: 10;
}
 .contactBottom footer{
   background: #fff;
   height: 24px;
   line-height: 24px;
 }
 .contactBottom div{
   position: relative;
   float:left;
   left: 0px;
   width: 50%;
   color:#2A80FF;
 }

 .contactBottom div .message{
   position: absolute;
   width: 15px;
   height:15px;
   background: url('/images/newIndex/u368.png') no-repeat;
   background-size: contain;
   left: 40px;
   top:5px;
 }
 .contactBottom div .phone{
   position: absolute;
   width: 15px;
   height:15px;
   background: url('/images/newIndex/u370.png') no-repeat;
   background-size: contain;
   left: 40px;
   top: 3px;
 }
 .contactBottom div.contactL:after{
   content:"";
   position: absolute;
   right: 0px;
   top:5px;
   width: 1px;
   height:14px;
   border-color: #2A80FF;
   background: #2A80FF;

 }
 .contactBottom div .bottomP{
   display: inline-block;
   margin-left: 18px;
   color: #2A80FF;
 }
.templateName{
  position: absolute;
  bottom: -30px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: #122F46;
}
 .bannerTwo .templateInnerSlide{
   position: relative;
   border-radius:0 !important;
 }
 .temlatePc{

   width: 150px;
   height: 100%;
 }
 .temlatePc .templatePCtop{
   height: 10px;
   width: 100%;
   background:#ccc;
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
   text-align: left;
 }
 .temlatePc .templatePcbody{
   height: 110px;
   background: #fff;
 }
 .temlatePc .templatePcbody img{
   height: 100%;
   border-radius: 0;
   object-fit: cover;
 }
 .temlatePc .templatePCtop span{
   display: inline-block;
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background:#fff;
   margin-bottom: 3px;
   margin-left: 5px
 }
 .templatePhone{
   position: absolute;
   right: 0;
   width: 50px;
   height: 95px;
   top: 25px;
   border-top: 6px solid #ccc;
   border-bottom: 6px solid #ccc;
   box-sizing: border-box;
   border-radius: 5px;
 }
 .templatePhone .templateBody{
   height: 100%;
   background: #fff;
 }
 .templatePhone .templateBody img{

   height: 100%;
   border-radius: 0;
   object-fit: cover;
 }
.bannerSlide{
  position: absolute;
  top: 0;
  width: 320px;
  color: #fff;
  text-align: left;
  height: 100%;
  padding: 0 20px;

  box-sizing: border-box;
}
.bannerSlide .bannerTitle{
  margin-top: 45px;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
}
.bannerContent{
  margin-top:20px;
  height: 36px;
}
.bannerContent ul li{
  float: left;
  margin-right: 10px;

}
.bannerContent ul li i{
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background: url('/images/newIndex/canting-1f-icon.png') no-repeat;
  background-size: cover;
}
.bannerBtn{
  margin-top:30px;
}
.bannerBtn span{
  display: inline-block;
  border:1px solid #fff;
  padding: 5px 13px;
  border-radius: 2px;
  letter-spacing: 1px;

}
.bannerContentone ul{
  width: 60%;
}
.bannerContentone ul li{
  margin-bottom: 10px;
}
.bannerContentone ul li:nth-child(4),.bannerContentone ul li:nth-child(5){
  margin-bottom: 0;
}
.bannerContentSecond ul li{
  margin-top:10px;
}
.bannerContentSecond ul li:nth-child(1){
  margin-top:0px;
}
.bannerSlide.bannerSlideThree .bannerTitle{
  /*font-size: 18px;*/
  text-align: left;
}
.bannerSlide.bannerSlideThree .bannerContent ul li{
  width: 100%;
  margin-right: 0;
  margin-bottom: 10px;
  text-align: left;
}
.bannerSlide.bannerSlideThree .bannerBtn{
  text-align: left;
}
.slideItemone{
  background: url('/images/newIndex/banner1.png') no-repeat;
  background-size: cover;
}
.slideItemSec{
  background: url('/images/newIndex/banner2.png') no-repeat;
  background-size: cover;
}
.slideItemThree{
  background: url('/images/newIndex/banner3.png') no-repeat;
  background-size: cover;
}
.zmBuildOne{
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  background: url('/images/newIndex/zmsite.png') no-repeat;
  background-size: cover;
}
.zmBuildOne .zmBuildBtm{
  position: absolute;
  bottom:23px;
}

.zmBuildSec{
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('/images/newIndex/zmshangcheng.png') no-repeat;
    background-size: cover;
  }

  .zmBuildSec .zmBuildBtm{
    position: absolute;
    bottom:23px;
  }
  .zmBuildBtm .textOne{
    color:#fff;
    padding: 0 20px;
    line-height: 18px;
    text-align: center;
    margin-bottom: 15px;
  }
  .zmBuildBtm .btn{
    display: inline-block;
    color:#fff;
    font-size: 12px;
    padding: 5px 15px;
    border:1px solid #fff;
    border-radius: 2px;

  }
  .swiper-slide .productSlider{
    background: url('/images/newIndex/productSlider.png') no-repeat;
    background-size: cover;
  }
  .swiper-slide .zixunSlider{
    background: url('/images/newIndex/zixunSlider.png') no-repeat;
    background-size: cover;
  }
  .swiper-slide .videoSlider{
    background: url('/images/newIndex/videoSlider.png') no-repeat;
    background-size: cover;
  }
  .swiper-slide .musicSlider{
    background: url('/images/newIndex/musicSlider.png') no-repeat;
    background-size: cover;
  }
  .swiper-slide .questionSlider{
    background: url('/images/newIndex/questionSlider.png') no-repeat;
    background-size: cover;
  }
  .swiper-slide .sliderText{
    margin-top: 15px;
  }

  .zmlogo{
    position: absolute;
    left: 20px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: url('/images/newIndex/bannerZMlogo.png') no-repeat;
    background-size: contain;
  }
.checkMoreBtn .moreText{
  display: inline-block;
  background: #2A80FF;
  color:#fff;
  font-size: 13px;
  padding: 9px 49px;
}

</style>
<style>
  .cube-slide-item{
    position: relative;
  }
  .cube-slide-dots>span{
    display: inline-block;
    vertical-align: bottom;
    margin: 0 0.03125rem;
    width: 12px;
    height: 2px;
    margin-right: 4px;
    background: rgba(255,255,255,0.4);
  }
  .cube-slide-dots>span.active {
    background: #fff;
  }
  .cube-slide-dots{
    bottom: 10px;
  }

</style>
