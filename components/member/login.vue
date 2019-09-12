<template>
<div class="logon">
    <div class="logonHead">
      <div class="leftArrow"><i class="backIcon" @click="backF"></i>用户登录</div>
    </div>
    <div class="logonContent">
      <div class="uerInfo" v-show="uerInfo">
        <div class="avatar"><img :src="headImgurl" alt=""></div>
        <div class="nickname">{{nickName}}</div>
        <p class="infoTip">{{infoTiptext}}</p>

      </div>
          <div class="ui-loader ui-corner-all ui-body-a ui-loader-default" v-if="bindingshow">
            <div class="loader-border">
              <div class="wish-loader">
                <div class="circle1 main-color-background"></div>
                <div class="circle2 main-color-background"></div>
                <div class="circle3 main-color-background"></div>
              </div>
              <p>{{bindText}}</p>
            </div>
          </div>


      <div class="bindInfoInput">
        <p class="errorText" :class="{errorTextshow:errorTextshow}" >{{errorText}}</p>
        <div class="first" v-show="true">
          <!--第三方登录绑定手机号-->
          <div class="phoneNum" v-show="phoneNumshow">
            <label class="label"> 手机号</label>
            <div class="inputPhone inputFbox ">
              <input type="num" class="inputF" v-on:input="inputChange" v-model="inputFavl" @focus="ipt=true,index=0" @blur="ipt = false">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==0}]"></span>
            </div>
            <div class="sendCode" v-if="ifsendCode" @click="bindIdsendCodeF">
              <span class="defaultText" >{{firstTexT}}</span>
            </div>
            <div class="sendCode disabled" v-else>
              <span class="defaultText">{{timeNum}}S后重试</span>
            </div>
          </div>
          <!--短信登录-->
          <div class="phoneNum" v-show="phoneNumdxshow">
            <label class="label"> 手机号</label>
            <div class="inputPhone inputFbox ">
              <input type="num" class="inputSixavl" v-on:input="inputChange" v-model="inputSixavl" @focus="ipt=true,index=0" @blur="ipt = false">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==0}]"></span>
            </div>
            <div class="sendCode" v-if="ifsendCode" @click="sendCodeF">
              <span class="defaultText" >{{firstTexT}}</span>
            </div>
            <div class="sendCode disabled" v-else>
              <span class="defaultText">{{timeNum}}S后重试</span>
            </div>
          </div>
          <div class="editCode" v-show="editCodeshow">
            <label>验证码</label>
            <div class="codeInput">
              <input type="num" class="inputSec" v-on:input="inputChange" v-model="inputSecval" @focus="ipt=true,index=2" @blur="ipt = false">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==2}]"></span>
            </div>
          </div>
          <div class="passWord inputBox" v-show="loginphonenum">
            <label class="inputLAbel">手机号</label>
            <div class="inputLeft inputThirdbox">
              <input type="text" class="inputThird" name="oldpass" v-on:input="inputChange" @focus="ipt=true,index=3" @blur="ipt = false">
              <span  class="blur-line" :class="[{'focus-line':ipt && index == 3}]"></span>
              <!--<input :type="inputTypeFlag ? 'text' :'password' " class="inputThird" name="oldpass">-->
            </div>

          </div>
          <div class="passWord inputBox" v-show="passWordshow">
            <label class="inputLAbel">密码</label>
            <div class="inputLeft inputFivebox">
              <input :type="inputTypeFlag ? 'text' :'password' " class="inputFive" v-on:input="inputChange" v-model="inputFiveval" @focus="ipt=true,index=5" @blur="ipt = false">
              <span  class="blur-line" :class="[{'focus-line':ipt && index == 5}]"></span>
            </div>
            <div class="hidePassword" @click="inputTypeFlag=!inputTypeFlag"><i class="show" v-if="inputTypeFlag"></i><i class="hide" v-else></i></div>

            <div class="forgetPassword" v-show="forgetPasswordshow">
              <p><nuxt-link :to="'/mforgetPassword?redirectUrl='+redictpasswordUrl">忘记密码？</nuxt-link></p>
            </div>
          </div>
          <div class="identificationPassWord inputBox" v-show="identificationPassWord">
            <label class="inputLAbel">确认密码</label>
            <div class="inputLeft inputFourvalBox">
              <input :type="inputTypeFlagnew ? 'text' :'password' " class="inputFour" v-on:input="inputChange" name="newpass" v-model="inputFourval" @focus="ipt=true,index=6" @blur="ipt = false">
              <span  class="blur-line" :class="[{'focus-line':ipt && index == 6}]"></span>
            </div>
            <div class="hidePassword" @click="inputTypeFlagnew=!inputTypeFlagnew"><i class="show" v-if="inputTypeFlagnew"></i><i class="hide" v-else></i></div>
          </div>

          <div class="bindNumButon buton1" v-show="button1" >
            <button type="button" v-if="!isLoading" @click="bindPhonef">绑定手机号</button>
            <span class="loadingIcon" v-else><i></i></span>
          </div>
        <!--  <div class="bindNumButon buton2" v-show="button2">
            <button type="button" v-if="!isLoading" @click="regandsingIn">注册并登录</button>
            <span class="loadingIcon" v-else><i></i></span>
        </div>-->
          <div class="bindNumButon buton3" v-show="button3">
            <button type="button" v-if="!isLoading"  @click="getlogIn" >登录</button>
            <span class="loadingIcon" v-else><i></i></span>
          </div>
          <div class="bindNumButon buton4" v-show="button4" >
            <button type="button" v-if="!isLoading" @click="getlogIntwo">登录</button>
            <span class="loadingIcon" v-else><i></i></span>
          </div>
      <!--    <div class="bindNumButon buton4 qq"  @click="qqdenglu">
            <button type="button">qq登录</button>
          </div>
          <div class="bindNumButon buton4 qq"  @click="denglucewx">
            <button type="button">微信登录</button>
          </div>-->
        <div class="uerloginBtm" v-show="uerloginBtmshow">
          <div class="loginTipText">
            <p>尚未注册 ? </p> <p class="nowreg"><nuxt-link to="/mregister">现在注册</nuxt-link></p>
          </div>
          <div class="loginType">
            <p class="loginTypeOne" v-show="loginTypeOne" @click="switchLoginTypeF">通过短信验证码登录</p>
            <p class="loginTypeTwo" v-show="loginTypeTwo" @click="switchLoginTypeF">通过用户名密码登录</p>
          </div>
        </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
  import eventBus from "@/assets/js/eventBus";
  import MethodsUtil from "@/assets/js/MethodsUtil"
  import axios from "axios";
  import {loginstatus,getTemplateData,getTemplateSinginNum,ifSingin,sendwxcode,sendqqcode,ifwxAuthorization} from '~/static/http'

  export default {
    data(){
      return {
           inputTypeFlag:false,
           inputTypeFlagnew:false,
           ipt:false,
           index:0,
           phoneNumshow:false,//手机号绑定f
           loginphonenum:false,//手机号登录
           phoneNumdxshow:false,//短信登录
           editCodeshow:false,//验证码
           passWordshow:false,//密码
           identificationPassWord:false, //新密码
           forgetPasswordshow:false, //忘记密码
           bindingshow:false,//绑定遮罩
           button1:false,
           button2:false,
           button3:false,
           button4:false,
           uerInfo:false,
        uerloginBtmshow:false,
           loginTypeOne:false,
           loginTypeTwo:false,//登录方式用户名密码登录
           switchLoginType:'default',
           errorText:"",//报错信息
        errorTextshow:false,//报错是否展示
           ifPassinputThird:true,//是否允许通过
           ifsendCode:true, //是否发送验证码
           firstSend:true, //防止发送验证码请求重复提交
           isLoading:false,//提交状态
           timeNum:30,   //倒计时30秒
           firstTexT:'发验证码',
         infoTiptext:'绑定手机号，便于下次快捷登录',
        bindText:'您已绑定族蚂正在验证登录',
           nickName:'',
           headImgurl:'',
           wxopenid:'',
           wxunionid:'',
           qqopenid:'',
            isqq:false,
           inputFavl:"",//手机号
           inputSecval:"",//验证码
          inputFiveval:"",//密码
        inputFourval:"",//忘记密码
        inputSixavl:"",
        redictpasswordUrl:"",
        loginStatus:false
      }
    },
    mounted(){
      var _this = this;
      this.redictpasswordUrl = MethodsUtil.getQueryString('redirectUrl');
      eventBus.$on("login",(arg)=>{
        _this.loginStatus = arg.bl;
        console.log("登录状态",_this.loginStatus)
      })
       //判断是否是微信
      var UA = navigator.appVersion;
      var ua = UA.toLowerCase();
      var code = MethodsUtil.getQueryString('code');
      var access_token = MethodsUtil.gethashQueryString('access_token');

      if(ua.match(/MicroMessenger/i) == "micromessenger"){
       if(code){
         sendwxcode(code).then(function(res){
           _this.nickName = res.data.data.nickname;
           _this.headImgurl = res.data.data.headimgurl;
           _this.wxopenid = res.data.data.openid;
           _this.wxunionid = res.data.data.unionid;
           //保存用户信息
          //判断是否绑定过手机号 1.绑定过直接登录2.没有绑定过=> 绑定手机号（是否注册过 ）
           if(!_this.loginStatus) {
             _this.HttpCli.get('/z-member/member/login', {
               //userPassword:_this.wxunionid,
               userName: _this.wxopenid,
               userPassword:_this.wxunionid,
               type: 3
             })
               .then(function (response) {
                 if (response.data.status == 0) {
                   _this.defaultinput()
                   //验证码提交成功替换token
                   MethodsUtil.remove('token');
                   MethodsUtil.setcookie('token', response.data.data.token)
                   _this.bindingshow = true;
                   _this.callback()

                 } else if (response.data.status == 4) {
                   _this.ifWxone()//绑定手机号
                   _this.errorTextshow = true;
                   _this.errorText = response.data.message;
                 } else {
                   _this.ifWxone()//绑定手机号
                 }
               })
               .catch(function (error) {
                 _this.ifWxone()//绑定手机号
                 console.log(error);
               });
           }

         })
       }else{

           _this.denglucewx();
       }

      }else if(ua.match(/QQ/i)=='qq'){//是否是qq浏览器access_token
        var _this = this;
        var host = location.host;
        if(host.indexOf('pre-zuma') > -1){
          var callBackurl = encodeURIComponent('https://m.pre-zuma.com/mlogin');
        }else{
          var callBackurl = encodeURIComponent('https://m.zuma.com/mlogin');
        }
        _this.isqq = true;
        //_this.defaultinput()
        if(access_token){
          sendqqcode(access_token,callBackurl)
            .then(function (res) {
              console.log(res.data)
              _this.nickName = res.data.data.nickname;
              _this.headImgurl = res.data.data.figureurl_qq_2;
              _this.qqopenid = res.data.message;

              _this.HttpCli.get('/z-member/member/login', {
                userName:_this.qqopenid,
                type: 4
              })
                .then(function (response) {
                  if (response.data.status == 0) {
                    _this.defaultinput()
                    //验证码提交成功替换token
                    MethodsUtil.remove('token');
                    MethodsUtil.setcookie('token', response.data.data.token)
                    _this.bindingshow = true;

                    _this.callback();

                  }else if(response.data.status == 4){
                    _this.ifWxone()//绑定手机号
                    _this.errorTextshow = true;
                    _this.errorText = response.data.message;
                  }else{
                    _this.ifWxone()//绑定手机号
                  }

                })
                .catch(function (error) {
                  _this.ifWxone()//绑定手机号
                  console.log(error);
                });

            })
            .catch(function (error) {
              console.log(error);
            });
        }else{
          _this.qqdenglu();
        }
      }else{
      this.defaultinput()
      }
      //android
      if(this.whichdevice()){
        /*键盘弹起后页面高度变小*/
        var _this = this;
        const originHeight = document.documentElement.clientHeight || document.body.clientHeight;
        window.addEventListener('resize', () => {
          const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
          if (resizeHeight < originHeight) {
            // 键盘弹起所后所需的页面逻辑，滚动条滚到顶部
            window.scrollTo(0,0);
          } else {
            // 键盘弹起所后所需的页面逻辑

          }
        }, false);
      }
    },
    methods:{
      ifWxone(){
        this.phoneNumshow = true;
        this.phoneNumdxshow = false;
        this.uerloginBtmshow = false;
        this.editCodeshow = true;
        this.button1 = true;
        this.uerInfo = true;
        this.loginphonenum = false;
        this.passWordshow = false;
        this.button4 = false;
        this.button3 = false;
      },
      ifWxsec(){
        this.phoneNumshow = false;
        this.phoneNumdxshow = false;
        this.editCodeshow = false;
        this.passWordshow = true;
        this.infoTiptext = '为了您的安全，请设置登录密码！';
        this.forgetPasswordshow = false;
        this.identificationPassWord = true;
        this.button1 = false;
        this.button2 = true;
        this.button3 = false;
        this.uerInfo = true;
      },
      defaultinput(){
        this.phoneNumshow = false;
        this.phoneNumdxshow = false;
        this.editCodeshow = false;
        this.loginphonenum = true;
        this.passWordshow = true;
        this.forgetPasswordshow = true;
        this.uerloginBtmshow = true;
        this.identificationPassWord = false;
        this.button1 = false;
        this.button2 = false;
        this.button3 = true;
        this.button4 = false;
        this.uerInfo = false;
        this.loginTypeOne = true;
        this.loginTypeTwo = false;
      },
      infoinput(){
        this.phoneNumshow = false;
        this.phoneNumdxshow = true;
        this.editCodeshow = true;
        this.loginphonenum = false;
        this.passWordshow = false;
        this.identificationPassWord = false;
        this.button1 = false;
        this.button2 = false;
        this.button3 = false;
        this.button4 = true;
        this.uerInfo = false;
        this.loginTypeOne = false;
        this.loginTypeTwo = true;

      },
      //登录方式切换
      switchLoginTypeF(){
          if(this.switchLoginType=='default'){
            this.infoinput();
            this.switchLoginType='info'
          }else{
            this.defaultinput();
            this.switchLoginType='default'
          }
        this.errorTextshow = false;
        this.errorText = ''

      },
      //登录
      getlogIn(){
        //手机号登录
        var inputThird = document.querySelector(".inputThird");//手机号
        var inputFive = document.querySelector(".inputFive");//密码
        //判断是否为空
        var valueArray = [];//保存输入的值
        var _this = this;

        valueArray.push(inputThird.value.replace(/\s/g,""));
        valueArray.push(inputFive.value.replace(/\s/g,""));
        valueArray.forEach(function (value,index) {
        if(!value && index == 0){
            _this.errorTextshow = true;
            _this.errorText = '请输入手机号'
            _this.ifPassinputThird = false;
          }else if(value && index == 0){

          if(value && index == 0){
            var phoneNum = /^1[3456789]\d{9}$/;
            //判断手机号格式是否正确
            if(phoneNum.test(value)){
              //判断是否有效
              _this.HttpCli.get('/register/checkNoEmailAndPhone', {key: value})
                .then(function (response) {
                  console.log(response.data.status)
                  if (response.data.status == 0) {
                    //手机号通过
                    _this.ifPassinputThird = true;
                  }
                  if (response.data.status == 1) {
                    _this.ifPassinputThird = false;
                    _this.errorTextshow = true;
                    _this.errorText = '该手机号码未注册'

                  }
                })
                .catch(function (error) {
                  console.log(error);
                });

            }else{
              _this.errorTextshow = true;
              _this.errorText = '请填写正确的手机号码';
              _this.ifPassinputThird = false;

            }
          }
         }
      //校验密码
       if(!value && index == 1 && _this.ifPassinputThird){
           _this.errorTextshow = true;
           _this.errorText = '请填写密码'
           _this.ifPassinputThird = false;
           }else if(value && index == 1){
         if(value && index == 1 && _this.ifPassinputThird){
           //对密码长度进行判断
           if(value.length<6 || value.length>20){
             _this.errorTextshow = true;
             _this.errorText = '请输入6-20字符之间的密码'
             _this.ifPassinputThird = false;
           }else{

             let LogInParm = {userName:valueArray[0],userPassword:valueArray[1]};
             _this.isLoading = true;
             _this.$store.dispatch("TOLOGIN",LogInParm).then(function(res){
               _this.isLoading = false;
               //登录成功
               if(res.data.status == 0){
                 _this.ifPassinputThird = true;
                 var redictUrl = MethodsUtil.getQueryString('redirectUrl');
                 var type = MethodsUtil.getQueryString('type');
                 var logonUrl = '/z-member/member/getUserLoginStatusPhone1';
                 _this.callback()
               }
               //密码错误
               if(res.data.status == '1' || res.data.message == '密码错误！'){
                 _this.errorTextshow = true;
                 _this.errorText = res.data.message;
               }
               //账户不存在
               if(res.data.status == 2){
                 _this.errorText = res.data.message;
               }

               //账号权限
               if(res.data.status == 4){
                 _this.errorTextshow = true;
                 _this.errorText = res.data.message;
               }
             });
             _this.errorTextshow = false;
             _this.errorText = ''
           }
         }
      }

   })

 },
      inputChange(event){
        var inputValue = event.target.value;
        if(inputValue){
          this.errorTextshow = false;
          this.errorText = ''
        }
      },
      //短信登录
      getlogIntwo(){
        //手机号登录
        var inputF = document.querySelector(".inputSixavl");//手机号
        var inputSec = document.querySelector(".inputSec");//验证码
        //判断是否为空
        var valueArray = [];//保存输入的值
        var _this = this;

        valueArray.push(inputF.value.replace(/\s/g,""));
        valueArray.push(inputSec.value.replace(/\s/g,""));
        valueArray.forEach(function (value,index) {
          if(!value && index == 0){
            _this.errorTextshow = true;
            _this.errorText = '请填写手机号'
            _this.ifPassinputThird = false;

          }else if(value && index == 0){
            _this.ifPassinputThird = true;
          }
          if(!value && index == 1 && _this.ifPassinputThird){
            _this.errorTextshow = true;
            _this.errorText = '请输入正确的验证码'
            _this.ifPassinputThird = false;
          }else if(value && index == 1){
            _this.ifPassinputThird = true;
          }
        })

        if(valueArray[0] && valueArray[1]){
          _this.isLoading = true;

            _this.HttpCli.get('/z-member/member/login', {
              userName:valueArray[0],
              userPassword: valueArray[1],
              type: 2
            })
              .then(function (response) {
                console.log(response.data.status)
                _this.isLoading = false;
                if (response.data.status == 0) {
                  console.log("登录成功111",response.data)
                  //验证码提交成功替换token
                  MethodsUtil.remove('token');
                  MethodsUtil.setcookie('token', response.data.data.token)
                  console.log("登录成功")
                  _this.callback()
                }
                if (response.data.status == 1) {
                  _this.errorTextshow = true;
                  _this.errorText = '请输入正确的验证码';
                }
                if(response.data.status == 4){
                  _this.errorTextshow = true;
                  _this.errorText = response.data.message;
                }

              })
              .catch(function (error) {
                _this.isLoading = false;
                console.log(error);
              });

        }

      },
      //绑定手机发送验证码
      bindIdsendCodeF(){
        var _this = this;
        var inputF = document.querySelector(".inputF");//手机号
        var inputSec = document.querySelector(".inputSec");//验证码
        var inputFval = inputF.value.replace(/\s/g,"");
        var inputSec =  inputSec.value.replace(/\s/g,"");

        if(inputFval && _this.firstSend){
          var phoneNum = /^1[3456789]\d{9}$/;
          if(phoneNum.test(inputFval)){
            //判断是否有效
            if(_this.ifsendCode){
              _this.firstSend = false;
              _this.ifsendCode = false;
              _this.HttpCli.get('/z-member/register/getRegisterCodePhone1',{fUserPhone:inputFval})///wap/register/getRegisterCodePhone
                .then(function (response) {
                  _this.errorText = '';//報錯信息清空
                  if(response.data.status == 0){
                    MethodsUtil.setcookie('token', response.data.data)
                  }

                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            var timer = setInterval(function(){
              _this.timeNum--;
              if(_this.timeNum <= 0){
                clearInterval(timer);
                _this.firstTexT = '重发验证码';
                _this.ifsendCode = true;
                _this.firstSend = true;
                _this.timeNum = 30
              }
            },1000)

          }else{//未通过
            _this.errorTextshow = true;
            _this.errorText = '请填写正确的手机号码';

          }

        }
      },
      //登录发送手机验证码
      sendCodeF(){
        var _this = this;
        var inputF = document.querySelector(".inputSixavl");//手机号
        var inputSec = document.querySelector(".inputSec");//验证码
        var inputFval = inputF.value.replace(/\s/g,"");
        var inputSec =  inputSec.value.replace(/\s/g,"");

        if(inputFval && _this.firstSend){
          var phoneNum = /^1[3456789]\d{9}$/;
          if(phoneNum.test(inputFval)){
            //判断是否有效

            _this.HttpCli.get('/z-member/register/checkNoEmailAndPhonePhone',{key:inputFval})
              .then(function (response) {
                //有效的手机号
                if(response.data.status == 0){

                  if(_this.ifsendCode){
                    _this.firstSend = false;
                    _this.ifsendCode = false;
                    _this.HttpCli.get('/z-member/register/getRegisterCodePhone1',{fUserPhone:inputFval})///wap/register/getRegisterCodePhone
                      .then(function (response) {
                        _this.errorText = '';//報錯信息清空
                        if(response.data.status == 0 || response.data.status == 1){
                          console.log("token",response.data)
                          MethodsUtil.setcookie('token', response.data.data)

                        }

                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }

                  var timer = setInterval(function(){
                    _this.timeNum--;
                    if(_this.timeNum <= 0){
                      clearInterval(timer);
                      _this.firstTexT = '重发验证码';
                      _this.ifsendCode = true;
                      _this.firstSend = true;
                      _this.timeNum = 30
                    }
                  },1000)
                }
              if(response.data.status == 1){
                  _this.errorTextshow = true;
                  _this.errorText = '该手机号码未注册!';

                }

              })
              .catch(function (error) {
                console.log(error);
              });
          }else{//未通过
            _this.errorTextshow = true;
            _this.errorText = '请填写正确的手机号码';

          }

        }

      },
      //绑定手机号先判断手机是否注册
      bindPhonef(){
        var inputF = document.querySelector(".inputF");//手机号
        var inputSec = document.querySelector(".inputSec");//验证码

        //判断是否为空
        var valueArray = [];//保存输入的值
        var _this = this;
        valueArray.push(inputF.value.replace(/\s/g,""));
        valueArray.push(inputSec.value.replace(/\s/g,""));
        valueArray.forEach(function (value,index) {
          if(!value && index == 0){
            _this.errorTextshow = true;
            _this.errorText = '请输入手机号'
            _this.ifPassinputThird = false;
          }else if(value && index == 0){
            _this.ifPassinputThird = true;
          }

          if(!value && index == 1 && _this.ifPassinputThird){
            _this.errorTextshow = true;
            _this.errorText = '请输入正确的验证码'
            _this.ifPassinputThird = false;

          }
        })
        //验证码
        var phoneNum = /^1[3456789]\d{9}$/;
        if(phoneNum.test(valueArray[0]) && valueArray[0] && valueArray[1]){
              var objData = {};
              if(_this.isqq){
                objData.fUserPhone=_this.inputFavl,//手机号
                objData.messageCode=_this.inputSecval,
                objData.fQqOpenId=_this.qqopenid
              }else{
                objData.fUserPhone=_this.inputFavl,//手机号
                objData.messageCode=_this.inputSecval,
                objData.fWxOpenId=_this.wxopenid
                objData.fUserOpenid=_this.wxunionid
              }

          this.isPhonelogin(valueArray[0]).then(function(res){
              if(res){
                _this.HttpCli.get('/z-member/member/bingPhone',objData)
                  .then(function (response) {
                    console.log("绑定手机号",response.data)
                    if (response.data.status == 0) {
                      //手机号已经注册过直接登录
                      _this.nosendCodelogin(valueArray[0],valueArray[1]);

                    }
                    if (response.data.status == 1) {
                      _this.isLoading = false;
                      _this.errorTextshow = true;
                      _this.errorText = response.data.message;
                    }

                  })
                  .catch(function (error) {
                    console.log(error);
                    _this.isLoading = false;
                  });
              }else{
                _this.regandsingIn()
              }
          })


        }else if(valueArray[0] && valueArray[1]){
          _this.errorTextshow = true;
          _this.errorText = '请填写正确的手机号码';
        }

      },
      //注册并登录
      regandsingIn(){
        var _this = this;
        var inputObjpassword = [];
        var fResource;
        let sourcecode = localStorage.getItem("zmfrom");
        if(sourcecode){
          fResource = sourcecode+"-手机端";
        }else {
          fResource = "族蚂网-手机端";
        };
        //注册=》登录
              var objregData = {};
              if(_this.isqq){
                  /*objregData.fUserPassword = _this.inputFavl,//手机号*/
                  objregData.fUserPhone = _this.inputFavl,
                  objregData.fPhoneCode = _this.inputSecval,
                  objregData.fResource = fResource,
                  objregData.fQqOpenId = _this.qqopenid

              }else{
                  /*objregData.fUserPassword = _this.inputFavl,//手机号*/
                  objregData.fUserPhone = _this.inputFavl,
                  objregData.fPhoneCode = _this.inputSecval,
                  objregData.fResource = fResource,
                  objregData.fWxOpenId = _this.wxopenid,
                  objregData.fUserOpenid=_this.wxunionid
              }
              _this.HttpCli.get('/z-member/register/submitRegisterPhone1',objregData)
                .then(function (response) {
                  if (response.data.status == 0) {
                      console.log("注册成功")
                    try {
                      var bd_vid = localStorage.getItem("bd_vid");
                      var objData = {};
                      objData.bdVid = bd_vid;
                      _this.HttpCli.get('/user/baiduApi',objData)
                        .then(function (response) {
                          console.log(response);
                        })
                        .catch(function (error) {
                          console.log(error);

                        });
                      /*meteor.track("zmfrom", {convert_id: "1636648426462215"})*/
                    }catch(err) {
                      console.log('meteor.track报错')
                    }
                    _this.nosendCodelogin(_this.inputFavl,_this.inputSecval);

                  }
                  if (response.data.status == 1){
                    _this.isLoading = true;
                    _this.errorTextshow = true;
                    _this.errorText = response.data.message;
                  }
                })
                .catch(function (error) {
                  _this.isLoading = true;
                  console.log(error);
                });



      },
      //qq登录
      qqdenglu(){
        //======1.询问用户是否授权地址
        //**https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101712499&redirect_uri=https%3A%2F%2Fwww.zuma.com%2Fproduct&scope=get_user_info
        //location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101712499&redirect_uri=https%3A%2F%2Fwww.pre-zuma.com%2Fmlogin&scope=get_user_info'
        //=====2.同意授权后回调
        //https://www.zuma.com/?#access_token=3B81DEFF31F40B2FCB56343C7EE2E675&expires_in=7776000
        //=====3.获取opeanid  https://graph.qq.com/oauth2.0/me?access_token=3B81DEFF31F40B2FCB56343C7EE2E675
        //########client_id   101712499
        //########openid  DED3FE69A15E343806ED51DB0F957FB1
        //4.get_user_info
       // https://graph.qq.com/user/get_user_info?access_token=3B81DEFF31F40B2FCB56343C7EE2E675&oauth_consumer_key=101712499&openid=DED3FE69A15E343806ED51DB0F957FB1
        var host = location.host;
        var redirectUrl = MethodsUtil.getredirectUrl('redirectUrl');
        if(redirectUrl){
          if(host.indexOf('pre-zuma') > -1){
            var loginUrl = 'https://m.pre-zuma.com/mlogin?redirectUrl='
          }else{
            var loginUrl = 'https://m.zuma.com/mlogin?redirectUrl='
          }

          var redicturl = encodeURIComponent(loginUrl+this.callbackUrl());
        }else{
          if(host.indexOf('pre-zuma') > -1){
            var loginUrl = 'https://m.pre-zuma.com/mlogin'
          }else{
            var loginUrl = 'https://m.zuma.com/mlogin'
          }

          var redicturl = encodeURIComponent(loginUrl);
        }

          location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101712499&redirect_uri='+redicturl+'&scope=get_user_info'
      },
      validatePassword(val){
        //判断是否是半角
        if(!(/^[\x00-\xff]*$/.test(val))){
          //$("#input_2").html("<i class='login-warn'></i>由字母加数字或符号至少两种以上字符组成的6-20位半角字符，区分大小写");
          return false;
        }
        //判断密码是否符合规则 至少含有2种字符
        //是否包含数字
        var reg1 = /\d+/;
        //是否包含小写字母
        var reg2 = /[a-z]+/;
        //是否包含大写字母
        var reg3 = /[A-Z]+/;
        //剩下就是字符了
        var reg4 = /[^a-zA-Z\d]+/;
        var count = 0
        if(reg1.test(val)){
          count++;
        }
        if(reg2.test(val)){
          count++;
        }
        if(reg3.test(val)){
          count++;
        }
        if(reg4.test(val)){
          count++;
        }
        if(count < 2){
          //$("#input_2").html("<i class='login-warn'></i>由字母加数字或符号至少两种以上字符组成的6-20位半角字符，区分大小写");
          return false;
        }
        var len = val.length;
        if(len < 6 || len > 20){
          //$("#input_2").html("<i class='login-warn'></i>由字母加数字或符号至少两种以上字符组成的6-20位半角字符，区分大小写");
          return false;
        }
        return true;
      },
      callback(){
        var redirectUrl = MethodsUtil.getredirectUrl('redirectUrl');
        var type = MethodsUtil.getQueryString('linkType');
        var pageSource = MethodsUtil.getQueryString('pageSource');
        if(type == 'center'){
          this.callbackUrlpromise().then(function(data){
            //location.href = data;
            location.replace(decodeURIComponent(data))
          })
        }else if(pageSource == 'home'){
          //location.href = this.templateCallback()
          location.replace(decodeURIComponent(this.templateCallback()))
        }else{
          //location.href = this.callbackUrl();
          location.replace(decodeURIComponent(this.callbackUrl()))
        }
        },
      callbackUrl(){
        var redirectUrl = MethodsUtil.getredirectUrl('redirectUrl');
        var pageSource = MethodsUtil.getQueryString('pageSource');
        var type = MethodsUtil.getQueryString('linkType');
        var callbackUrlstring;
        if(redirectUrl){
        if(pageSource == 'home'){
            callbackUrlstring = this.templateCallback();
            return callbackUrlstring;
          }else{

          callbackUrlstring = redirectUrl;
          return callbackUrlstring;
        }
        }else{
          callbackUrlstring = '/';
          return callbackUrlstring;
        }
      },
      callbackUrlpromise(){
          var _this = this;
          var fun =  new Promise(function(resolve, reject){
            var logonUrl = '/z-member/member/getUserLoginStatusPhone1';
            var callbackUrlstring;
            _this.HttpCli.get(logonUrl)
              .then(function (res) {
                if(res.data.message == "未登录"){
                }else{
                  var fId = res.data.data.fId;
                  var fUserType = res.data.data.fUserType;
                  //callbackUrlstring = '/wap/member/memberCenterIndexPhone1?fId='+fId+'&fUserType='+fUserType;
                 callbackUrlstring = '/mobMemberCenter/';
                  resolve(callbackUrlstring);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          return fun;
      },
      templateCallback(){
        var redirectUrl = MethodsUtil.getredirectUrl('redirectUrl');
        var pageSource = MethodsUtil.getQueryString('pageSource');
        var version = MethodsUtil.getQueryString('version');
        var callbackUrlstring;
        if(pageSource == 'home'){
          callbackUrlstring = redirectUrl;
          return callbackUrlstring;
        }
      },
      //判断验证码是否有效
      isRightcode(val){
          var _this = this;
        _this.HttpCli.get('/z-member/register/checkNoEmailAndPhonePhone',{key:val})
          .then(function (response) {
            //有效的手机号
            if(response.data.status == 0){
               return true;
            }
            if(response.data.status == 1){
              _this.errorTextshow = true;
              _this.errorText = '该手机号码未注册!';
              return false;

            }

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      backF(){
        var UA = navigator.appVersion;
        var ua = UA.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger"){
            location.href = '/'
        }else{
          history.back();
        }

      },
      denglucewx(){
        //判断是否是微信
        var UA = navigator.appVersion;
        var ua = UA.toLowerCase();
        var code = MethodsUtil.getQueryString('code');
        var _this = this;
        if(ua.match(/MicroMessenger/i) == "micromessenger"){
            //授权
          //判断是pre还是线上
          var host = location.host;
          var redirectUrl = MethodsUtil.getredirectUrl('redirectUrl');


         if(redirectUrl){
           if(host.indexOf('pre-zuma') > -1){
             var loginUrl = 'https://m.pre-zuma.com/mlogin?redirectUrl='
           }else{
             var loginUrl = 'https://m.zuma.com/mlogin?redirectUrl='
           }
           var url = encodeURIComponent(loginUrl+this.callbackUrl());
         }else{
           if(host.indexOf('pre-zuma') > -1){
             var loginUrl = 'https://m.pre-zuma.com/mlogin'
           }else{
             var loginUrl = 'https://m.zuma.com/mlogin'
           }
           var url = encodeURIComponent(loginUrl);
         }

         console.log("微信url",url)
           // var redirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafa4f0cc76f516a&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
          var redirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafa4f0cc76f516a&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
          location.href = redirectUrl;
          // https://www.pre-zuma.com/authority-sitebackend/userPermission/getBackUrl?appid=wxaafa4f0cc76f516a&backUrl=https%3A%2F%2Fwww.pre-zuma.com%2Fmlogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect;
        }
      },
      //判断手机号是否注册
      isPhonelogin(numVal){
          var _this = this;
        var phoneNum = /^1[3456789]\d{9}$/;
        if(phoneNum.test(numVal)){
          //判断是否有效
          _this.isLoading = true;
          var funphone = new Promise(function(resolve, reject){
            _this.HttpCli.get('/z-member/register/checkNoEmailAndPhonePhone',{key:numVal})
              .then(function (response) {
                //有效的手机号
                if(response.data.status == 0){
                  resolve(true);
                }
                if(response.data.status == 1){//未注册
                   resolve(false);
                }

              })
              .catch(function (error) {
                console.log(error);
                _this.isLoading = false;
              });

          })
          return funphone;
        }
      },

      //验证码登录
      nosendCodelogin(phonenum,code){
          var _this = this;
        _this.HttpCli.get('/z-member/member/login', {
          userName:phonenum,
          userPassword:code,
          type: 2
        })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 0) {
              //验证码提交成功替换token
              MethodsUtil.remove('token');
              MethodsUtil.setcookie('token', response.data.data.token)
              _this.callback();
              _this.bindText = '跳转中...';
              _this.bindingshow = true;
            }
            if (response.data.status == 1) {
              _this.errorTextshow = true;
              _this.errorText = '请输入正确的验证码';
            }
            if (response.data.status == 4) {
              _this.errorTextshow = true;
              _this.errorText = response.data.message;
            }
            _this.isLoading = false;
          })
          .catch(function (error) {
            _this.isLoading = false;
            console.log(error);
          });
      },
      whichdevice(){//判断设备
        const ua = window.navigator.userAgent.toLocaleLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(ua);
        const isAndroid = /android/.test(ua);
        return isAndroid;
      }
    }


  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 .logon
    position: inherit;
    top:0 !important;
    z-index 99;
.logonHead
    height:46px
    background:#2FB7EC
    display: flex;
    align-items: center;
    color: #fff;
    font-size 13px;
    font-weight bold;
    margin-bottom: 20px;
    .leftArrow

      .backIcon
        width: 16px;
        height: 16px;
        background url(../../assets/images/tongyong-pic2.png) no-repeat;
        display: inline-block;
        background-size: contain;
        vertical-align: sub;

        margin-left: 14px;
        margin-right: 14px;
 .uerInfo
    height 96px;
    margin-bottom: 20px;
.logonContent
   padding 20px;
   padding-top: 0;
   padding-bottom 0px;
   .avatar
      display: inline-block;
      width 50px;
      height 50px;

      margin-bottom:10px;
      img
        width 100%;
        height 100%;
        object-fit cover;
        border-radius: 5px;
   .nickname
      margin-bottom:10px;
      color:#122F46;
   .infoTip
      color:#A0B1B1;
.bindInfoInput
   .second
     margin-top:15px;
   .first
     .phoneNum
       position relative;
       margin-bottom 20px;
       .label
          height 36px;
          line-height 36px;
          position: absolute;
          left: 0;
          width: 60px;
          background: #fff;
          text-align: left;
      .inputPhone
          width 100%;
          height: 36px;
          padding-right: 80px;
          padding-left: 60px;
          box-sizing: border-box;
          .inputF,.inputSixavl
            width: 100%;
            height 100%;

          .inputF:focus,.inputSixavl:focus
             outline:none;

      .sendCode
          width 80px;
          height 36px;
          line-height: 36px;
          color: #fff;
          border-radius 2px;
          background #2FB7EC;
          position: absolute;
          right: 0;
          top: 0;
       .disabled
         background #B1C9D3;
     .editCode
        position relative;
        width 100%;
        height 36px;
        margin-bottom 20px;
        label
         height 36px;
         line-height 36px;
         position: absolute;
         left: 0;
         width: 60px;
         background: #fff;
         text-align: left;
        .codeInput
          padding-left: 60px;
          box-sizing border-box;

          .inputSec
            width 100%;
            height 36px;
          .inputSec:focus
            outline:none;
     .bindNumButon
        height 36px;
        background #2FB7EC;
        border-radius: 2px;
        button
         border: none;
         outline: none;
         color: #fff;
         height: 100%;
         width: 100%;
         background #2FB7EC;
         border-radius: 2px;
       .loadingIcon
         display inline-block;
         height: 100%;
         width: 100%;
         background #2FB7EC;
         border-radius: 2px;
         i
            display inline-block;
            width 22px;
            height 22px;
            background:url("../../assets/images/reging.gif") no-repeat center;
            background-size: contain;
            margin-top: 7px;
.inputBox
   position relative;
   width: 100%;
   height 36px;
   margin-bottom 20px;
   .inputLAbel
      height: 38px;
      line-height: 38px;
      position: absolute;
      left: 0px;
      width: 60px;
      background: #fff;
      text-align: left;
   .inputLeft
     height:36px;
     padding-left: 1.875rem;
     box-sizing: border-box;

     input
        width: 100%;
        height 100%;

     .inputFive,.inputFour
        padding-right: 40px;
        width: 180px;
     input:focus
       outline:none;
       border-color:rgba(47,183,236,1);


.bindNumButon
   height 36px;
   background #2FB7EC;

   border-radius: 2px;
   button
     border: none;
     outline: none;
     color: #fff;
     height: 100%;
     width: 100%;
     background #2FB7EC;
     border-radius: 2px;

.hidePassword
  width 36px;
  height 36px;
  position: absolute;
  right: 10px;
  top: 0;
  .hide
     width 22px;
     height 22px;
     background url(../../assets/images/u124.png) no-repeat;
     display inline-block;
     background-size contain;
     margin 8px 0;
  .show
    width 22px;
    height 22px;
    background url(../../assets/images/u126.png) no-repeat;
    display inline-block;
    background-size contain;
    margin 8px 0;
.buton3,.buton4
    margin-top:30px;
.forgetPassword
    height 30px;
    line-height 30px;
    text-align: right;
    p a
      color:#122F46;
      opacity: 0.7;
      text-decoration underline;
.loginTipText
    text-align left;
    padding: 10px 0;
    p
      display inline-block;
    p.nowreg a
      color:#2FB7EC;
.loginType
    padding: 10px 0;
    color:#6292A6;
    p
      display inline-block;
.errorText
     height: 0px;
     opacity: 0
     color: #fff;
     transition: all 0.5s;
.errorTextshow
    opacity: 1
    color: #FF0000;
    height: 20px;
.blur-line
    width 100%;
.focus-line
    position: absolute;
    left: 58px;
    bottom: 0;
    border-bottom: solid 1px #2FB7EC !important;
    box-shadow: 0px -1px 5px #2FB7EC;
.inputThirdbox .blur-line,.inputFivebox .blur-line,.inputFourvalBox .blur-line
    width 220px;
    position: absolute;
    left: 60px;
    border-bottom: 1px solid #C0E9F9;
.inputFbox .blur-line
    width 140px;
    position: absolute;
    left: 60px;
    border-bottom: 1px solid #C0E9F9;
.codeInput .blur-line
    width 220px;
    position: absolute;
    left: 60px;
    border-bottom: 1px solid #C0E9F9;
#app
  position: unset !important;
 /*loading*/
 .loader-border
   width: 120px;
   height: 120px;
   background: #fff;
   position: relative;
   border-radius: 2px;

 .loader-border p
   padding: 15px;
   position: absolute;
   bottom: 0;
   line-height: 20px;
   font-size: 14px;
   color: #122F46;
   width: 100%;
   box-sizing: border-box;
 .loader-border .wish-loader
   top: 31px;
   position: absolute;

 .wish-loader
   margin: 0 auto;
   width: 100%;
   text-align: center;

 .wish-loader>div
   width: 8px;
   height: 8px;
   margin: 0 2px;
   border-radius: 100%;
   display: inline-block;
   -webkit-animation: sk-bouncedelay 1s infinite ease-in-out both;
   animation: sk-bouncedelay 1s infinite ease-in-out both;

 @keyframes sk-bouncedelay
   0%,90%,to{transform:scale(0)}
   50%{transform:scale(1)}
 .wish-loader .circle1
   -webkit-animation-delay: -.32s;
   animation-delay: -.32s;

 .wish-loader .circle2
   -webkit-animation-delay: -.16s;
   animation-delay: -.16s;

 .main-color-background
   background: #2FB7EC !important;

 .ui-loader-default
   position: fixed;
   z-index: 99999;
   background: rgba(18,47,70,.8);
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   justify-content: center;
   align-items: center;
</style>
<!--
input:focus
transition:border linear .2s,box-shadow linear .2s;
-moz-transition:border linear .2s,-moz-box-shadow linear .2s;
-webkit-transition:border linear .2s,-webkit-box-shadow linear .2s;
outline:none;
border-color:rgba(47,183,236,1);
box-shadow:0 2px 2px rgba(47,183,236,0.5);-->
