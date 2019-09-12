<template>
  <div class="logon">
    <div class="logonHead">
      <div class="leftArrow"><i class="backIcon" @click="backF"></i>找回密码</div>
    </div>

    <p class="errorText" :class="{errorTextshow:errorTextshow}" >{{errorText}}</p>
    <div class="logonContent">

      <div class="bindInfoInput">
        <div class="first findPwdVerifyMobileBox" v-show="nextStep">

          <div class="phoneNum">
            <label class="label"> 手机号</label>
            <div class="inputPhone inputFBox">
              <input type="num" class="inputF" v-model="phone1" @focus="ipt=true,index=4" @blur="ipt = false" v-on:input="inputChange">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==4}]"></span>
            </div>
            <div class="sendCode" @click="sendCode" v-if="ifsendCode">
              <span class="defaultText">{{firstTexT}}</span>
            </div>
            <div class="sendCode disabled" v-else>
              <span class="defaultText">{{timeNum}}S后重试</span>
            </div>
          </div>
          <div class="editCode" >
            <label>验证码</label>
            <div class="codeInput codeInputBox">
              <input type="num" class="inputSec" @focus="ipt=true,index=0" @blur="ipt = false" v-on:input="inputChange">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==0}]"></span>
            </div>
          </div>

          <div class="bindNumButon buton1">
            <button type="button" v-if="!isLoading" @click = 'nextFunc'>下一步</button>
            <span class="loadingIcon" v-else><i></i></span>
          </div>

          <div class="uerloginBtm">
            <div class="loginTipText">
              <p>尚未注册 ? </p> <p class="nowreg"><nuxt-link to="/mregister">现在注册</nuxt-link></p>
            </div>
          </div>

        </div>

        <!--新密码-->
        <div class="first findPwdValueVerifyBox" v-show="!nextStep">

          <div class="passWord inputBox" >
            <label class="inputLAbel">新密码</label>
            <div class="inputLeft inputThirdBox">
              <input :type="inputTypeFlag ? 'text' :'password' " class="inputThird" name="oldpass" @focus="ipt=true,index=3" @blur="ipt = false" v-on:input="inputChange">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==3}]"></span>
            </div>
            <div class="hidePassword" @click="inputTypeFlag=!inputTypeFlag"><i class="show" v-if="inputTypeFlag"></i><i class="hide" v-else></i></div>

          </div>
          <div class="identificationPassWord inputBox">
            <label class="inputLAbel">确认密码</label>
            <div class="inputLeft inputFourBox">
              <input :type="inputTypeFlagnew ? 'text' :'password' " class="inputFour" name="newpass" @focus="ipt=true,index=1" @blur="ipt = false" v-on:input="inputChange">
              <span  class="blur-line" :class="[{'focus-line':ipt && index==1}]"></span>
            </div>
            <div class="hidePassword" @click="inputTypeFlagnew=!inputTypeFlagnew"><i class="show" v-if="inputTypeFlagnew"></i><i class="hide" v-else></i></div>
          </div>


          <div class="bindNumButon buton2">
            <button type="button" @click="Subm2" v-if="!isLoading">提交并登录</button>
            <span class="loadingIcon" v-else><i></i></span>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>
<script>
  import eventBus from "@/assets/js/eventBus";
  import MethodsUtil from "@/assets/js/MethodsUtil"
  export default {
    data(){
      return {
        phone1:'',
        ipt:false,
        index:0,
        inputTypeFlagnew:false,
        inputTypeFlag:false,
        nextStep:true,
        isLoading:false,//提交状态
        ifsendCode:true, //是否发送验证码
        errorText:"",//报错信息
        errorTextshow:false,//报错是否展示
        firstSend:true, //防止发送验证码请求重复提交
        firstTexT:'发验证码',
        timeNum:30  //倒计时30秒
      }
    },
    mounted(){

    },
    methods:{
      nextFunc(){
        var inputF = document.querySelector(".inputF");//手机号
        var inputSec = document.querySelector(".inputSec");//验证码

        //判断是否为空
        var valueArray = [];//保存输入的值
        var _this = this;
        _this.isLoading = true;
        valueArray.push(inputF.value.replace(/\s/g,""));
        valueArray.push(inputSec.value.replace(/\s/g,""));
        valueArray.forEach(function (value,index) {
          if(!value && index == 0){
            _this.errorTextshow = true;
            _this.isLoading = false;
            _this.errorText = '请输入手机号'
            _this.ifPassinputThird = false;
          }else if(value && index == 0){
            _this.ifPassinputThird = true;
          }

          if(!value && index == 1 && _this.ifPassinputThird){
            _this.errorTextshow = true;
            _this.isLoading = false;
            _this.errorText = '请输入正确的验证码'
            _this.ifPassinputThird = false;

          }else if(value && index == 1){
            _this.ifPassinputThird = true;
          }
        })
        //验证码
        var phoneNum = /^1[3456789]\d{9}$/;
        if(phoneNum.test(valueArray[0])){

          if (valueArray[0] && valueArray[1]) {
            this.isRightcode(valueArray[0])
              .then(function(data){
                if(data){
                  _this.HttpCli.get('/z-member/forget/getPhoneInfoPhone1', {
                    zmUser: valueArray[0],
                    zmCode: valueArray[1]
                  })
                    .then(function (response) {
                      console.log(response.data)
                      if (response.data.status == 0) {
                        //验证码提交成功
                        _this.nextStep=false;
                        _this.isLoading = false;
                      }
                      if (response.data.status == 1) {
                        _this.isLoading = false;
                        _this.errorTextshow = true;
                        _this.errorText = '验证码错误'
                      }

                    })
                    .catch(function (error) {
                      _this.isLoading = false;
                      console.log(error);
                    });

                }else{
                  _this.isLoading = false;
                }
              })

          }
        }else if(valueArray[0] && valueArray[1]){
          _this.errorTextshow = true;
          _this.isLoading = false;
          _this.errorText = '请填写正确的手机号码'
        }


      },
      sendCode(){
        var _this = this;
        var inputF = document.querySelector(".inputF");//手机号
        var inputSec = document.querySelector(".inputSec");//验证码
        var inputFval = inputF.value.replace(/\s/g,"");
        var inputSec =  inputSec.value.replace(/\s/g,"");

        if(inputFval && _this.firstSend){
          var phoneNum = /^1[3456789]\d{9}$/;
          if(phoneNum.test(inputFval)){
            //判断是否有效
            _this.HttpCli.get('/register/checkNoEmailAndPhone',{key:inputFval})
              .then(function (response) {
                //有效的手机号
                if(response.data.status == 0) {
                  if (_this.ifsendCode) {

                    _this.firstSend = false;
                    _this.ifsendCode = false;
                    _this.HttpCli.get('/z-member/register/getRegisterCodePhone1', {fUserPhone: inputFval})///wap/register/getRegisterCodePhone
                      .then(function (response) {
                        _this.errorText = '';//報錯信息清空
                        if (response.data.status == 0) {
                          console.log("token", response.data)
                          MethodsUtil.setcookie('token', response.data.data)

                        }

                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }


                  var timer = setInterval(function () {
                    _this.timeNum--;
                    if (_this.timeNum <= 0) {
                      clearInterval(timer);
                      _this.firstTexT = '重发验证码';
                      _this.ifsendCode = true;
                      _this.firstSend = true;
                      _this.timeNum = 30
                    }
                  }, 1000)
                  }
                  if (response.data.status == 1) {
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
      //修改新密碼后登錄
      Subm2(){
        var _this = this;
        var inputObjpassword = [];
        var newpassword = document.querySelector(".inputThird");
        var oldpassword = document.querySelector(".inputFour");
        inputObjpassword.push(newpassword.value.replace(/\s/g,""));
        inputObjpassword.push(oldpassword.value.replace(/\s/g,""));
console.log('新旧密码',inputObjpassword)
        _this.isLoading = true;
        inputObjpassword.forEach(function(item,index){
          //是否输入密码
              if(!item && index == 0){

                _this.errorTextshow = true;
                _this.errorText = '请输入6-20字符之间的密码';
                _this.isLoading = false;
                _this.ifPassinputThird = false;
              }else if(item && index == 0){
                _this.ifPassinputThird = true;
              }
            if(!item && index == 1 && _this.ifPassinputThird){
              _this.errorTextshow = true;
              _this.errorText = '请确认密码';
              _this.isLoading = false;
            }else if(item && index == 1){
              _this.ifPassinputThird = true;
            }

        })
        if(inputObjpassword[0]&&inputObjpassword[1]){

          //密码是否一致
          if(inputObjpassword[0] != inputObjpassword[1]){
            _this.errorTextshow = true;
            _this.errorText = '两次密码输入不一致';
            _this.isLoading = false;
          }else{
            //密码规则由字母加数字或符号至少两种以上字符组成的6-20位半角字符，区分大小写！
            if(this.validatePassword(inputObjpassword[0])){
              //修改密码
              _this.isLoding = true;
              _this.HttpCli.get('/z-member/forget/next4Phone1',{userPassword:inputObjpassword[0]})
                .then(function (response) {
                  _this.userPassword = inputObjpassword[0]
                  /*_this.statLogin();*/
                  console.log(response.data.status)
                  _this.isLoading = false;
                  if(response.data.status == 0){
                    //密码修改成功 =>登录
                    let LogInParm = {userName:_this.phone1,userPassword:inputObjpassword[0]};
                    _this.$store.dispatch("TOLOGIN",LogInParm).then(function(res){
                      //重置密码并登录成功
                      console.log('重置密码并登录成功',res.data)
                      if(res.data.status == 0){
                        //关闭弹窗
                        _this.callback();
                      }
                      if(res.data.status == 2 || res.data.status == 1){
                        //关闭弹窗

                        _this.errorTextshow = true;
                        _this.errorText = res.data.message;
                      }
                    });
                  }
                  if(response.data.status == 2){
                    _this.errorTextshow = true;
                    _this.errorText = response.data.message;
                  }

                })
                .catch(function (error) {
                  _this.isLoading = false;
                  console.log(error);
                });
            }else{
              _this.isLoading = false;
              _this.errorTextshow = true;
              _this.errorText = '密码由字母加数字组成的6-20位字符';
            }
          }
        }

      },
      //密码校验规则
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
        if(redirectUrl){
          location.replace(decodeURIComponent(redirectUrl))
        }else{
          location.replace(decodeURIComponent('/site'))
        }
        console.log("执行回调")
      },
      backF(){

        history.back();
      },
      inputChange(event){
        var inputValue = event.target.value;
        if(inputValue){
          this.errorTextshow = false;
          this.errorText = ''
        }
      },
      //判断验证码是否有效
      isRightcode(val){
        var _this = this;
        var fun = new Promise(function(resolve, reject){
          _this.HttpCli.get('/z-member/register/checkNoEmailAndPhonePhone',{key:val})
            .then(function (response) {
              //有效的手机号
              if(response.data.status == 0){

                resolve(true);
              }
              if(response.data.status == 1){
                _this.errorTextshow = true;
                _this.errorText = '该手机号码未注册!';
                resolve(false);
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        });
        return fun;

      }
    }

  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .logon
    top:0 !important;
    z-index 99;
    position: static;
  .logonHead
    height:46px
    background:#2FB7EC
    display: flex;
    align-items: center;
    color: #fff;
    font-size 13px;
    font-weight bold;
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
  .logonContent
    padding 20px;
    padding-top: 0;
    .avatar
      display: inline-block;
      width 50px;
      height 50px;
      border:1px solid #ccc;
      margin-bottom:10px;
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
        .inputF
          width: 100%;
          height 100%;

        .inputF:focus
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
  .inputBox
    position relative;
    width: 100%;
    height 36px;
    margin-bottom 20px;
    .inputLAbel
      height 36px;
      line-height 36px;
      position: absolute;
      left: 0;
      width: 60px;
      background: #fff;
      text-align: left;
    .inputLeft
      height:36px;
      padding-left: 1.875rem;
      box-sizing: border-box;

      input
        width 100%;
        height 100%;
      input:focus
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
  .buton3
    margin-top:30px;
  .forgetPassword
    height 30px;
    line-height 30px;
    text-align: right;
    p
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
  .errorText
    height: 0px;
    opacity: 0
    color: #fff;
    margin-top: 20px;
    transition: all 0.5s;
  .errorTextshow
    opacity: 1
    color: #FF0000;
    height: 20px;
  .focus-line
    position: absolute;
    left: 58px;
    bottom: 0;
    border-bottom: solid 1px #2FB7EC !important;
    box-shadow: 0px -1px 5px #2FB7EC;
  .inputFBox .blur-line
    width 140px;
    position: absolute;
    left: 60px;
    border-bottom: 1px solid #C0E9F9;
  .codeInputBox .blur-line,.inputThirdBox .blur-line,.inputFourBox .blur-line
    width 220px;
    position: absolute;
    left: 60px;
    border-bottom: 1px solid #C0E9F9;
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
  .inputFourBox
      .inputFour
        padding-right: 44px;
        box-sizing: border-box;
  .inputThirdBox
      .inputThird
        padding-right: 44px;
        box-sizing: border-box;
</style>


