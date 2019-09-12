<template>
  <div class="zmTrans" v-show="closeorShow">
    <!--简介页-->
    <div class="zmDescription" v-show="!haveLogin">
      <div class="close" @click="handelClose"></div>
      <div class="zmTranstop" v-if="fromTrans">
        <div class="avatar" v-show="ifWX"><img :src="headImgurl" alt=""></div>
        <p class="text" :class="{'marginL':!ifWX}"><span class="name" v-show="ifWX">{{nickName}}：</span>感谢为我签到！族蚂网真的是个不错的平台</p>
      </div>

      <div class="zmTransCont">
        <h1>建网站不求人，自助搭建在线交易网站！</h1>
        <p class="description">族蚂网（zuma.com）专注为华人电子商务人提供网站建站、公众号发布助手、小程序H5页面发布工具、微商城以及全面电子商务解决方案服务。</p>
        <p class="descriptionTitle">我们的服务包括：</p>
        <ul class="descriptionlist">
          <li>PC、iPad、手机版网站建设</li>
          <li>微商城解决方案</li>
          <li>自主域名接入及ICP备案服务</li>
          <li>一键获得电子商务支付对接</li>
          <li>会员管理系统</li>
          <li>电子商务营销工具</li>
          <li>网站及微商城引流服务</li>
          <li>族蚂网共享销售服务</li>
        </ul>

      </div>
      <div class="login" v-if="ifLogin">
        <button type="button" @click="loginBtn">登录注册</button>
      </div>
    </div>

    <!--转发-->
    <div class="zmTemplatetrans" v-show="haveLogin">
      <!--帮他转发-->
      <!-- <div class="helpTransTemplate" v-show="haveLogin"></div>-->
      <div class="close" @click="handelClose"></div>
      <div class="zmTemplatetranstop">
        <div class="avatar" v-show="ifWX"><img :src="headImgurl" alt=""></div>
        <p class="text" :class="{'marginL':!ifWX}"><span class="name" v-show="ifWX">{{nickName}}：</span>帮我签个到！我就能免费使用网站模板建站！</p>
      </div>
      <div class="templateDetail">
        <div class="templatePreview">
          <div class="template-pc">
            <div class="pc-top">
              <div class="circle">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>
            <img :src="templatePcimg" alt="" class="pcImg">

          </div>
          <div class="template-mobile"><img :src="templatePhoneimg" alt="" class="phoneImg"></div>
        </div>
        <div class="templateText">
          <p class="templateName">{{templateName}}</p>
          <div class="templatePrice">
            <span class="nowPrice"><span>￥</span>0</span>
            <span class="oldPrice">￥{{templatePrice}}</span>
          </div>
        </div>

      </div>

      <div class="signIn">
        <div class="haveSingin"><p class="yqd">已签到</p><div class="singinBox" :class="{'singined':singIn}"><span class="nowNum"> {{transNum}} </span><span class="increase"> {{transNum+1}} </span></div><p>人</p></div>
        <div class="progress" ref="progressW">
          <div class="progressLine" style="width: 0"></div>
        </div>
        <p class="signText">征集{{needTransNum}}个签到，即可免费使用</p>
        <p class="helpTransTip" v-if="helpTransTip" :class="{'helpTransTiptranstion':helpTransTip}">请使用微信内置分享功能帮他转发</p>
      </div>

      <div class="signinBtn" :class="{'siginSucess':singInBtn}">
        <button type="button" @click="bundelSign" class="helpsingInBtn">{{singText}}</button>
      </div>
      <div class="helpBtn">
        <button type="button" @click="helpBundelSign" class="helpTransTemplate">帮他转发</button>
      </div>
    </div>
  </div>

</template>
<script>
  import MethodsUtil from "@/assets/js/MethodsUtil"
  import {loginstatus,getTemplateData,getTemplateSinginNum,ifSingin,sendwxcode,ifwxAuthorization} from '~/static/http'
  import BrowserMatch from "@/assets/js/operationLog";
  import eventBus from "@/assets/js/eventBus";
  export default {

    data(){
      return{
        templateName:"",
        templatePcimg:"",
        templatePhoneimg:"",
        templatePrice:"",
        closeorShow:false,
        hasSin:false,
        helpTransTip:false,
        fromTrans:false,
        ifWX:false,//是否是微信转发
        ifLogin:true,//是否登录true 未登录，false登录
        transNum:0,//已经签到人数,
        needTransNum:0,//需要的模板转发数
        remainNum:"",
        csUrl:'https://image.pre-zuma.com/website/1148040871896636986.jpg',
        singIn:false,//是否签到过
        singInBtn:false,
        singText:'我来签个到',
        progressWidth:0,
        haveLogin:true,
        headImgurl:'',//头像
        nickName:'',//昵称
        shopId:"",
        templateId:"",
        userId:""
      }
    },
    mounted(){
      //监听页面关闭

      var _this = this;
      var host = location.host;
      if(location.host.indexOf('www.zuma.com') > -1){
        this.csUrl = 'https://image.zuma.com/website/1148040225140889536.jpg'
      }else{
        this.csUrl = 'https://image.pre-zuma.com/website/1148040871896636986.jpg'
      }
      //解决微信二次分享失效问题
      var wxShareHref = window.location.href;
      if (/\&from=/ig.test(wxShareHref)) {
        this.closeorShow = false;
        window.location.href = wxShareHref.split('&from=')[0];
        return;
      }

      //进入页面时，判断是否登录=======================================
      /* if(this.$store.state.loginStatus){
       _this.ifLogin = false;
       }else{
       _this.ifLogin = true;
       }*/
      eventBus.$on("login",(arg)=>{
        console.log("登录状态",arg)
        _this.ifLogin = !arg.bl;

      })

      //根据url判断拉来源,是否为模板转发
      var from = MethodsUtil.getQueryString('zmfrom');
      var code = MethodsUtil.getQueryString('code');
      var uerInfo = {};
      var data = {};//分享出去的标题和描述微信分享


      //模板转发
      if(from && from.indexOf('MBZF') > -1){
        var queryArray = from.split('_');
        if(queryArray.length > 0){
          var sourceFrom = queryArray[0];
          var shopId = queryArray[1];
          var templateId = queryArray[2];
          this.fromTrans = true;
          this.shopId = shopId;
          this.templateId = templateId;
          data.title = '帮我签个到！我就能免费使用网站模板建站了！';
          data.fDescription = '族蚂网提供海量模板，网站/公众号/小程序免费发布工具、微商城以及全面电子商务解决方案服务。';
          data.img = _this.csUrl;
          if(MethodsUtil.getcookie("firstEnter") == 1){
            this.closeorShow = false;
          }
          //获取userid=======================================
          this.$store.dispatch('LOGINSTATUS').then(function(res){
            if(res.data.message == '未登录'){

            }else{
              console.log("获取用户id==============")
              _this.userId = res.data.data.fId;

              ifSingin(_this.userId,_this.shopId,_this.templateId).then(function(res){
                //判断是否签到
                console.log("判断是否签到",res.data.status)
                if(res.data.status == 1){
                  _this.singInBtn = true;
                  _this.hasSin = true;
                  _this.singText = '已签到'
                }
              })
            }
          })


          this.$nextTick(() => {
            //获取模板信息
            getTemplateData(templateId).then(function(res){
              if(res.data.status == 0){
                console.log("111111111",res.data.data)
                var templateData = res.data.data.templateBean;
                _this.templateName = templateData.fName; //模板名程
                _this.templatePcimg = templateData.fUrl; //pc预览
                _this.templatePhoneimg = templateData.fUrl2; //手机
                _this.templatePrice = templateData.fAmount; //原价
                _this.needTransNum = Math.ceil(templateData.fAmount/2)

              }
            }).then(function(){
              //当前转发人数
              getTemplateSinginNum(shopId,templateId).then(function(res){
                _this.transNum = res.data.data;
                _this.computedProgress(_this.transNum);
                console.log("pv数量，，，，，，，，",_this.transNum)
              })
            })


          });

          //判断是否是微信
          var UA = navigator.appVersion;
          var ua = UA.toLowerCase();
          if(ua.match(/MicroMessenger/i) == "micromessenger"){
            _this.ifWX = true;
            console.log(" if(code)========")
            //确认授权后，如果url上有code

            if(code){
              console.log(" if(code)in========")
              sendwxcode(code).then(function(res){
                console.log(" sendwxcode(code)========",res.data.status)

                _this.nickName = res.data.data.nickname;
                _this.headImgurl = res.data.data.headimgurl;
                var saveStr = '授权@'+res.data.data.headimgurl+'@'+res.data.data.nickname+'@'+shopId+'@'+templateId;
                //保存用户信息
                BrowserMatch.init(saveStr);
                ifSingin(_this.userId,_this.shopId,_this.templateId).then(function(res){
                  //判断是否签到
                  if(res.data.status != 1){
                    BrowserMatch.init('签到');
                  }
                })
                _this.closeorShow = false;

              })
            }else{
              console.log(" ifwxAuthorization========")
              //询问用户是否同意授权
              ifwxAuthorization(shopId,templateId).then(function(res){
                console.log(res.data.status)
                if(res.data.status == 0){//没有授权
                  _this.closeorShow = false;
                  console.log(" fwxAuthorization里面========")
                  var url = encodeURIComponent(location.href);
                  var redirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafa4f0cc76f516a&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                  location.href = redirectUrl;

                }
                if(res.data.status == 1){//已经授权，获取授权的信息
                  console.log("ssssssss已经授权")
                  _this.closeorShow = true;
                  _this.nickName = res.data.data.split(",")[1];
                  _this.headImgurl = res.data.data.split(",")[0];
                }
              })
            }
          }else{
            _this.closeorShow = true;
          }

        }
      }else{
        var urlstr = location.href;
        if(urlstr.indexOf("homePage/previewTemplate")<0){
          data.title = '快速建站,企业建站,免费自助建站-族蚂建站zuma.com';
          data.fDescription = '族蚂网提供海量模板，网站/公众号/小程序免费发布工具、微商城以及全面电子商务解决方案服务。';
          data.img = _this.csUrl;

          if(location.pathname != '/site' || MethodsUtil.getcookie("firstEnter") == 1){//MethodsUtil.getcookie("firstEnter") == 1 && !this.$store.state.loginStatus ||
            _this.closeorShow = false;
            _this.haveLogin = true;
          }else{
            _this.closeorShow = true;
            _this.haveLogin = false;
          }
        }

      }
      MethodsUtil.templateWXshare(data);
    },
    methods:{
      helpBundelSign(){
        var _this = this;
        this.helpTransTip = true;
        setTimeout(function () {
          _this.helpTransTip = false;
        },1500)
        console.log('请使用微信内置分享帮他转发')
      },
      loginBtn(){
        var _this = this;

        window.location.href = '/mlogin';
        /*       eventBus.$emit("tosignIn",{bl:true,callBack:function () {
         _this.closeorShow = false;
         MethodsUtil.setcookie("firstEnter",1)
         }});*/
      },
      bundelSign(){
        var _this = this;
        if(!this.hasSin){
          this.$store.dispatch('LOGINSTATUS').then(function(res){
            if(res.data.message == '未登录'){
              //未登录
              /*              eventBus.$emit("tosignIn",{bl:true,callBack:function () {
               _this.$store.dispatch('LOGINSTATUS').then(function(res){
               if(res.data.message == '未登录'){
               }else{
               console.log("获取用户id==============")
               _this.userId = res.data.data.fId;
               //判断是否签到
               ifSingin(_this.userId,_this.shopId,_this.templateId).then(function(res){
               console.log("判断是否签到判断是否签到判断是否签到",res.data.data)
               //_this.transNum = res.data.data
               //没签到
               if(res.data.status == 0){
               _this.successToNext(false);
               }else{
               _this.singInBtn = true;
               _this.hasSin = true;
               _this.singText = '已签到'
               }
               //签到，按钮置灰
               })
               }
               })
               }});*/
              var callBackUrl = location.href;
              var origin = location.origin;
              location.href = '/mlogin?redirectUrl='+callBackUrl;
            }else{
              _this.successToNext(false);
            }
          })
        }
      },
      successToNext(flag){
        var _this = this;
        if(!flag){
          _this.singIn = true;
          //_this.singInBtn = true;
          _this.transNum = _this.transNum;
          _this.singText = '签到成功，正在跳转...';
          console.log("pv数量。。。。。。。。。。。。",_this.transNum)
          _this.computedProgress(_this.transNum+1)
          BrowserMatch.init('签到')
          setTimeout(function(){
            _this.ifLogin = flag;
            _this.haveLogin = false;
          },2000)
        }
      },
      handelClose(){
        MethodsUtil.setcookie("firstEnter",1)
        this.closeorShow = false;
      },

      computedProgress(num){
        var totalNUm = this.needTransNum;

        this.remainNum = Math.max(totalNUm-num,0);
        var percent = Math.min(num/totalNUm,1);
        if(this.$refs.progressW){
          var width = this.$refs.progressW.clientWidth;
          var nowWidth = width*percent;

          //重置长度
          document.getElementsByClassName("progressLine")[0].style.width = nowWidth+'px';
        }
      }
    }



  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .zmTrans
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(18, 47, 70, 0.6);
    z-index: 100;
    .zmDescription
      position: absolute;
      top: 50%;
      left: 15px;
      right: 15px;
      transform: translateY(-50%);
      padding: 20px 15px;
      border-radius: 6px;
      background: #fff;
      .close
        width:25px;
        height:25px;
        background:url(../../assets/images/zmtransClose.png) no-repeat;
        position: absolute;
        right: 10px;
        top: 10px;
        background-size: contain;
        z-index 101;
      .zmTranstop
        position relative;
        margin-top 20px;
        .avatar
          width 40px;
          height 40px
          position: absolute;
          top: 0;
          color: #122F46;
          img
            height: 100%;
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        .text

          text-align: left;
          line-height: 16px;
          padding: 5px 0;
          padding-left 50px;
      .zmTransCont
        text-align left;
        h1
          font-size: 14px;
          font-weight: bold;
          padding: 15px 0;
        .description
          line-height: 16px;
          color #122F46;
        .descriptionTitle
          padding 15px 0;
          font-weight bold;
          color:#718290;
          padding-bottom: 10px;
        .descriptionlist
          line-height 24px;
          li
            position relative;
            padding-left: 10px;
            color:#718290;
            &:before
              display inline-block;
              content:"";
              width 4px;
              height 4px;
              border-radius 50%;
              background:#718290;
              position: absolute;
              top: 10px;
              left: 0px;

    .zmTemplatetrans
      position absolute;
      top:50%;
      left: 50%;
      width: 270px;
      right 15px;
      background:#fff;
      transform:translate(-50%,-50%);
      padding:10px;
      border-radius: 6px;

      .close
        width:25px;
        height:25px;
        background:url(../../assets/images/zmtransClose.png) no-repeat;
        position: absolute;
        right: 10px;
        top: 10px;
        background-size: contain;
        z-index 101;
      .zmTemplatetranstop
        position:relative;
        padding-top:30px;
        height: 50px;
        .avatar
          width 50px;
          height 50px;
          position absolute;
          img
            height: 100%;
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        .text
          text-align: left;
          font-size: 16px;
          font-weight: bold;
          color: #122f46;
          line-height: 20px;
          margin: 5px 0;
          margin-left: 65px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          .name
            font-size: 16px;
            font-weight: bold;
            color: #122f46;
      .templateDetail
        height: 100px;
        background: #EAF6FA;
        margin-top: 15px;
        border-radius 2px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        .templatePreview
          width:130px;
          height:70px;
          /*background:#fff;*/
          position: relative;
          .template-pc
            height: 100%;
            border-radius: 5px;
            width: 98px;
            .pc-top
              height: 12px;
              background: #000;
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
              text-align: left;

              .circle
                text-align: left;
                padding-left: 10px;
              span
                display inline-block;
                width 5px;
                height 5px;
                border-radius 50%;
                background:#fff;
            .pcImg
              height: 58px;
              width: 100%;
              object-fit: fill;
              border: 1px solid #000;
              border-right 1px solid transparent;
          .template-mobile
            width: 36px;
            height: 54px;
            border-top: 6px solid #333;
            border-left: 1px solid #333;
            border-right: 1px solid #333;
            border-bottom: 6px solid #333;
            border-radius: 5px;
            position: absolute;
            top: 10px;
            right: 0;
            .phoneImg
              height 100%;
              width 100%;
              object-fit cover;
        .templateText
          padding: 5px 10px;
          .templateName
            width 100px;
            font-size: 14px;
            font-weight: bold;
            text-align: left
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 1.2;
          .templatePrice
            text-align left;
            margin-top: 16px;
            .nowPrice
              font-size:22px;
              font-weight bold;
              color:#FF0000;
              span
                font-size:14px;
            .oldPrice
              font-size 14px;
              font-weight bold;
              color:#122f46;
              text-decoration: line-through;
              margin-left: 5px;
      .signIn
        text-align left;
        margin-top: 15px;
        .haveSingin
          font-size 16px;
          font-weight bold;
          color:#122f46;
          overflow: hidden;
          p
            display inline-block;
          .singinBox
            display: inline-block;
            position: relative;
            width: 20px;
            text-align: center;
            height: 13px;
          .increase
            position: absolute;
            width: 100%;
            left: 0;
            top: 15px;
            transition: all 1s ease;
          .nowNum
            transition: all 1s ease;
            width 100%;
            top: 0;
            left: 0;
            position: absolute;
          .singined
            .nowNum
              top:-20px
            .increase
              top:0px
        .progress
          height: 6px;
          background: #718290;
          border-radius: 4px;
          position:relative;
          margin: 10px 0;
          .progressLine
            width: 232px;
            height: 8px;
            background: #2FB7EC;
            position: absolute;
            top: -1px;
            border-radius: 4px;
            transition: all .5s ease;
        .signText
          font-size 14px;
          color #718290;
      .signinBtn
        height 45px;
        background:url(../../assets/images/activebtn.png) no-repeat;
        margin-top: 24px;
        margin-bottom: 20px;
        background-size: cover;
      .helpsingInBtn
        border: none;
        background: transparent;
        height: 100%;
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        letter-spacing: 2px;
      .helpBtn
        height 45px;
        background:url(../../assets/images/helptransbtn.png) no-repeat;
        margin-top: 24px;
        margin-bottom: 20px;
        background-size: cover;
      .helpTransTemplate
        border: none;
        background: transparent;
        height: 100%;
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        letter-spacing: 2px;
      .helpTransTip
        position: fixed;
        bottom: 50%;
        left: 50%;
        width: 80%;
        transform: translate(-50%,-50%);
        text-align: center;
        padding: 6px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        border-radius: 20px;
        transition:all 0.5s;

      .siginSucess
        background:url(../../assets/images/grayBtn.png) no-repeat;
        background-size: cover;
  .login
    button
      outline none;
      border: none;
      height: 40px;
      background: #47BEEF;
      color: #fff;
      width: 240px;
      margin-top: 20px;
  .helpTransTemplate

  .marginL
    margin-left:0px !important;
    padding-left:0 !important;

</style>
