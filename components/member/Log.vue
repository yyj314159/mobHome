<template>
    <div class="logBox" :class="{bottom:bottomTop}">

        <ul class="Log" v-show="visible" :style="{height:HeightW}">

            <li class="logIn" v-show="logIn" >
                <div class="error" v-if="errorShow">{{errorTxt}}</div>
                <p class="title">登录</p>
                <div class="DelBox" @click="Del">
                </div>
                <p class="sTit">手机号</p>
                    <input type="tel" class="inp inputLogin inputObjOne" v-model="userName"  name="logPhone"
                    >
                <p class="sTit">密码</p>
                    <input type="password" class="inp inputLogin inputObjTwo"  v-model="userPassword" name="logPassWord">
                <a @click="FP">忘记密码</a>
                <p id="logIn" @click="getlogIn">登录</p>
                <div class="ft">
                    <span>尚未注册？</span>
                    <span class="regs" @click="regs">现在注册</span>
                </div>
            </li>
            <li class="FP" v-if="forgetData">
                <p class="title">忘记密码？</p>
                <div class="errorpassword" v-if="true">{{passwordtext}}</div>
                <div class="goBBox">
                    <img src="/images/mem/goBB.png" class="goB" @click="goB">
                </div>
                <p class="sTit">手机号</p>
                    <input id="phone" type="tel" class="inp phoneNumber" name="pho" v-model="phone1" @blur="inputBlur">
                    <span id="getPhone" @click="getPhone1" v-if="firstSend" >{{firstTexT}}</span>
                    <span class="setTime" v-if="!firstSend">{{timeNum}}</span>
                <p class="sTit">验证码</p>
                    <input type="number" class="inp passwordphoneCode" name="code" v-model="password1" @blur="inputBlur">
                <p id="Subm" @click="Subm">提交</p>
            </li>
            <li class="FP" v-if="forgetData2">
                <p class="title">忘记密码？</p>
                <div class="compareerror" v-if="true">{{compareerror}}</div>
                <div class="goBBox">
                    <img src="/images/mem/goBB.png" class="goB" @click="goB2">
                </div>
                <p class="sTit">新密码</p>
                <div class="line1">
                    <input :type="newPassWord ? 'text' :'password' " class="inp newpassword" name="newpass" @blur="inputBlur">
                    <div data-v-6d95d4bf="" class="imgBox" @click="newPassWord=!newPassWord">
                        <img class="showPassword" src="/images/mem/u516.png" alt="" v-if="newPassWord">
                        <img class="showPassword" src="/images/mem/u656.png" alt="" v-else>
                    </div>
                </div>

                <p class="sTit">再次输入</p>
                <div class="line1">
                    <input :type="oldPassWord ? 'text' :'password' " class="inp oldpassword" name="oldpass" @blur="inputBlur">
                    <div data-v-6d95d4bf="" class="imgBox" @click="oldPassWord=!oldPassWord">
                        <img class="showPassword" src="/images/mem/u516.png" alt="" v-if="oldPassWord">
                        <img class="showPassword" src="/images/mem/u656.png" alt="" v-else>
                    </div>
                </div>
                <p id="Subm" @click="Subm2">确认并登录</p>
            </li>
            <li class="register" v-show="register">
                <p class="title">会员注册</p>
                <p v-text='regErrTex' v-show="regErrTex" class="regErrTex"></p>
                <div class="DelBox" @click="Del">
                </div>
                <p class="sTit">手机号</p>
                <input id="phone1" type="text" class="inp" v-model="phoneNum" @focus="focu" name="reg" autocomplete="new-password"><span id="getPhone" :class="{getPhone1:firstSend,getPhone2:!firstSend}" @click="senCode">{{firstSend ? firstTexT : timeNum+'秒'}}</span>
                <p class="sTit">验证码</p>
                <input type="number" id="code" class="inp" v-model="verificationCode" @focus="focu" name="regcode" autocomplete="new-password">
                <p class="sTit">密码</p>
                <div class="password">
                    <input type="password" id="password" class="inp" v-model="regPassword" @focus="focu" name="regpass" autocomplete="new-password">
                    <div class="imgBox" @click="showPassword">
                        <img class="showPassword" :src="src" alt="">
                    </div>
                </div>
                <p id="logRgs" @click="registerAndLog">注册并登录</p>
                <div class="ft">
                <span>已注册？</span>
                <span class="regs" @click="goLog">现在登录</span>
                </div>
                <p id="Agre">注册成为族蚂网会员，即代表您已阅读并同意<span style="color:#2FB7EC;" @click="showMerge = true;">《Zuma族蚂服务协议》</span></p>
            </li>
        </ul>
        <div class="zm-mark" v-if="showMark" :style="{height:HeightW}">
            <div class="loading">
                <div class="loader-border" v-show="showLoading">
                    <div class="wish-loader">
                        <div class="circle1 main-color-background"></div>
                        <div class="circle2 main-color-background"></div>
                        <div class="circle3 main-color-background"></div>
                    </div>
                </div>
                <div v-show="showText" class="showTxt">正在发送验证码...</div>
                <div v-show="regSuccess" class="showTxt2">注册成功</div>
                <div v-show="regFail" class="showTxt2">注册失败</div>
                <div v-show="getCode" class="showTxt2">验证码错误</div>
                <div v-show="logining" class="showTxt2">登录中</div>
            </div>
        </div>
        <!--遮罩-->
        <div class="logwrapper" v-if="visible">

        </div>
        <!--loading -->
        <div class="ui-loader ui-corner-all ui-body-a ui-loader-default" v-if="isLoding">

            <div class="loader-border">
                <div class="wish-loader">
                <div class="circle1 main-color-background"></div>
                <div class="circle2 main-color-background"></div>
                <div class="circle3 main-color-background"></div>
                </div>
            </div>
            </div>
        <Merge v-show="showMerge" class="merge" @merge="closeMerge"></Merge>
    </div>
</template>
<script>
import eventBus from "@/assets/js/eventBus";
import axios from "axios";
import Loading from '../public/loading'
import img1 from "@/assets/images/u516.png"
import img2 from "@/assets/images/u656.png"
import Merge from "./ZMagre"
let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;  //手机号
let regFour = /^\d{4}$/;        //四位数字验证码
export default {
    name:'Log',
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        callback:{
            type:Function,
            default: ()=>{

            },
            required:false
        }
    },
    components:{
      Loading,
      Merge
    },
    data(){
        return{
            HeightW:undefined,
            // 判断哪个页面显示参数
            logIn:true,
            forgetData:false,
            forgetData2:false,
            register:false,
            showMerge:false,
            // 登录参数
            userName : '',
            userPassword : '',
            // 忘记密码
            phone1:'',
            password1:'',
            ispass:false,
            errorShow:false,
            errorTxt:'',
            passwordtext:'',
            timeNum:29,
            firstTexT:'发验证码',
            firstSend:true,
            isLoding:false,//loading動畫
            compareerror:"",
            oldPassWord:false,
            newPassWord:false,
            hasEmpty:false,//是否有空值
            bottomTop:false,
            // 注册会员
            phoneNum:'',
            regPassword:'',
            verificationCode:'',
            regErrTex:'',
            canPhone:false,
            canCode:false,
            canPassWord:false,
            showMark:false,
            showText:false,
            showLoading:true,
            regSuccess:false,
            logining:false,
            regFail:false,
            getCode:false,
            src:img2
            // Login
        }
    },
    mounted(){

        //android
  /*      if(!this.whichdevice()){
            //键盘弹起后页面高度变小
            var _this = this;
            const originHeight = document.documentElement.clientHeight || document.body.clientHeight;
            window.addEventListener('resize', () => {
                const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if (resizeHeight < originHeight) {
                    // 键盘弹起所后所需的页面逻辑
                    _this .bottomTop = true;
                    document.querySelector(".logBox").scrollIntoView(true);
                } else {
                    // 键盘弹起所后所需的页面逻辑
                    _this .bottomTop = false;
                }
            }, false);
        }*/


        this.$nextTick(() => {
          this.bindscroll();
      //根据不同手机设置不同高度
            let phoneHeight = window.innerHeight;
            /*this.HeightW= phoneHeight +'px';*/
          //input 失去焦后页面滚动

        });
        this.logIn = true;
        this.forgetData = false;
        this.forgetData2 = false;
        this.register = false;
        this.userName = '';
        this.userPassword = '';
        this.phone1 = '';
        this.password1 = '';
        this.verificationCode = '';
        this.regPassword = '';
        this.compareerror = '';
        eventBus.$on("showReg",(arg)=>{
            eventBus.$emit("tosignIn",arg);
            this.logIn = false;
            this.register = true;
        });
    },
    methods:{

        bindscroll(){
          var inputs = document.getElementsByTagName("input");

          for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("blur",function(){
              window.scrollTo(0,0);

            })
          }
        },
        scrollInterview(event){
            if(this.whichdevice()){
                this.bottomTop = true;
            }

        },
        blurF(){
            if(this.whichdevice()){
                this.bottomTop = false;
            }

        },
      inputBlur(event){
        //inputphoneNumber.classList.add('isEmpty');
        event.target.classList.remove('isEmpty');
      },
        Del(){
            eventBus.$emit("Del",false);
            this.logIn = true;
            this.register = false;
            this.phoneNum = '';
            this.verificationCode = '';
            this.regPassword = '';
            this.errorTxt = '';
            this.regErrTex = ''
            this.bindscroll();

        },
        FP(){
            this.logIn = false;
            this.forgetData = true;
            this.forgetData2 = false;
            this.register = false;
            this.bindscroll();

        },
        goB(){
            this.logIn = true;
            this.forgetData = false;
            this.forgetData2 = false;
            this.register = false;
            this.passwordtext = "";
          this.compareerror = "";
            this.bindscroll();
        },
        goB2(){
            this.logIn = false;
            this.forgetData = true;
            this.forgetData2 = false;
            this.register = false;
            this.bindscroll();
        },
        goLog(){
            this.logIn = true;
            this.forgetData = false;
            this.forgetData2 = false;
            this.register = false;
            this.bindscroll();
        },
        regs(){
            this.logIn = false;
            this.forgetData = false;
            this.forgetData2 = false;
            this.register = true;
            this.bindscroll();
        },
        //判断是android还是iphone
        whichdevice(){
            const ua = window.navigator.userAgent.toLocaleLowerCase();
            const isIOS = /iphone|ipad|ipod/.test(ua);
            const isAndroid = /android/.test(ua);
            return isAndroid;
        },
        //忘记密码提交
        Subm(){
            var _this = this;
            var inputphoneNumber = document.querySelector(".phoneNumber");
            var passwordphoneCode = document.querySelector(".passwordphoneCode");
            //1.判断是否为空
            if (!inputphoneNumber.value) {
                inputphoneNumber.classList.add('isEmpty');
            } else {
                inputphoneNumber.classList.remove('isEmpty');
                //手机号
                //判断手机号是否有效
                if (inputphoneNumber.value && passwordphoneCode.value) {
                    var phoneNum = /^1[3456789]\d{9}$/;
                    if (phoneNum.test(inputphoneNumber.value)) {
                        //判断是否有效
                        _this.HttpCli.get('/register/checkNoEmailAndPhone', {key: inputphoneNumber.value})
                            .then(function (response) {
                                console.log(response.data.status)
                                if (response.data.status == 0) {
                                    _this.ispass = true;

                                }
                                if (response.data.status == 1) {

                                    _this.passwordtext = '该手机号码未注册!'
                                    _this.ispass = false;
                                }
                                return;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {//未通过
                        _this.passwordtext = '请输入有效手机号码'
                        _this.ispass = false;
                        return;
                    }
                }
            }
            //验证码
            if (!passwordphoneCode.value) {
                passwordphoneCode.classList.add('isEmpty');
            } else {
                passwordphoneCode.classList.remove('isEmpty');
                //验证码
                if (inputphoneNumber.value && passwordphoneCode.value) {
                    _this.HttpCli.get('/z-member/forget/getPhoneInfoPhone', {
                        zmUser: inputphoneNumber.value,
                        zmCode: passwordphoneCode.value
                    })
                        .then(function (response) {
                            console.log(response.data.status)
                            if (response.data.status == 0) {
                                //验证码提交成功
                              _this.compareerror = '';
                                _this.forgetData = false;
                                _this.forgetData2 = true;
                                _this.logIn = false;

                            }
                            if (response.data.status == 1) {
                                _this.passwordtext = '请输入有效手机验证码！'
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },
        closeMerge(){
            this.showMerge = false;
        },
        //登錄
        getlogIn(){

            //表单校验
            var _this = this;

            var inputObj = [];
            //var inputObj = document.querySelectorAll(".inputLogin");
            var inputObjOne = document.querySelector(".inputObjOne");
            var inputObjTwo = document.querySelector(".inputObjTwo");
            inputObj.push(inputObjOne);
            inputObj.push(inputObjTwo);
            inputObj.forEach(function(item,index){

                //1.判断是否为空
                if(!item.value){
                    item.classList.add('isEmpty');

                }else{
                    item.classList.remove('isEmpty');
                    //没有空值进行下面校验
                    if(inputObj[0].value && inputObj[1].value){
                        //手机号
                        if(index == 0){
                            //判断手机号是否有效
                            var phoneNum = /^1[3456789]\d{9}$/;
                            if(phoneNum.test(item.value)){
                                //判断是否有效
                                _this.HttpCli.get('/register/checkNoEmailAndPhone',{key:item.value})
                                    .then(function (response) {
                                        console.log(response.data.status)
                                        if(response.data.status === 0){
                                            _this.ispass = true;
                                            //判断密码是否正确
                                            _this.isLoding = true;
                                            let LogInParm = {userName:_this.userName,userPassword:_this.userPassword};
                                            _this.$store.dispatch("TOLOGIN",LogInParm).then(function(res){
                                                console.log(res)
                                                _this.isLoding = false;
                                                //登录成功
                                                if(res.data.status == 0){
                                                    //关闭弹窗
                                                  _this.ispass = true;

                                                  _this.Del();
                                                  eventBus.$emit("login",{bl:true});
                                                  if(_this.callback) _this.callback();        //执行登录回调
                                                }
                                                //密码错误
                                                if(res.data.status == '1' || res.data.message == '密码错误！'){
                                                    _this.ispass = false;
                                                    _this.errorShow = true;
                                                    _this.errorTxt = '密码不正确！'
                                                }
                                              //账户不存在
                                              if(res.data.status == 2){
                                                _this.ispass = false;
                                                _this.errorShow = true;
                                                _this.errorTxt = res.data.message;
                                              }
                                              //账号权限
                                              if(res.data.data.message && res.data.data.message.indexOf('该账户已被冻结') > -1){
                                                _this.ispass = false;
                                                _this.errorShow = true;
                                                _this.errorTxt = '您的账号已被冻结，无法登陆族蚂网!'
                                              }
                                            });
                                        }
                                        if(response.data.status === 1){
                                            _this.errorShow = true;
                                            _this.errorTxt = '该手机号码未注册!';
                                            _this.ispass = false;
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }else{//未通过
                                _this.errorTxt = '请输入有效手机号码';
                                _this.errorShow = true;
                                _this.ispass = false;

                            }
                        }
                    }else{
                        _this.errorTxt = '';
                    }
                }
            })
        },
        // 发送验证码
        getPhone1(){
          if(!this.firstSend)return;
            var _this = this;
            var inputphoneNumber = document.querySelector(".phoneNumber");
            var passwordphoneCode = document.querySelector(".passwordphoneCode");
            if(inputphoneNumber.value){
                var phoneNum = /^1[3456789]\d{9}$/;
                if(phoneNum.test(inputphoneNumber.value)){
                    //判断是否有效

                    _this.HttpCli.get('/register/checkNoEmailAndPhone',{key:inputphoneNumber.value})
                        .then(function (response) {
                            console.log(response.data.status)

                            //有效的手机号
                            if(response.data.status == 0){

                                _this.HttpCli.get('/wap/register/getRegisterCodePhone',{fUserPhone:inputphoneNumber.value})
                                    .then(function (response) {
                                        _this.passwordtext = '';//報錯信息清空
                                        console.log(response.data.status)
                                        _this.firstSend = false;

                                        var timer = setInterval(function(){
                                            _this.timeNum--;
                                            if(_this.timeNum <= 0){
                                                clearInterval(timer);
                                                _this.firstTexT = '重新发送';
                                                _this.firstSend = true;
                                                _this.timeNum = 29
                                            }
                                        },1000)
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }
                            if(response.data.status == 1){

                                _this.passwordtext = '该手机号码未注册!';
                                _this.ispass = false;
                            }
                            return;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else{//未通过
                    _this. passwordtext = '请输入有效手机号码';
                    _this.ispass = false;

                }

            }
        },
        //修改新密碼后登錄
        Subm2(){
            var _this = this;
            var inputObjpassword = [];
            var newpassword = document.querySelector(".newpassword");
            var oldpassword = document.querySelector(".oldpassword");
            inputObjpassword.push(newpassword);
            inputObjpassword.push(oldpassword);
            inputObjpassword.forEach(function(item,index){
                //是否输入密码
                if(!item.value){
                    item.classList.add('isEmpty');
                }else{
                    item.classList.remove('isEmpty');
                }

            })


      if(inputObjpassword[0].value&&inputObjpassword[1].value){
            //密码是否一致
            if(inputObjpassword[0].value != inputObjpassword[1].value){
                _this.compareerror = '密码不一致！'
            }else{
                //密码规则由字母加数字或符号至少两种以上字符组成的6-20位半角字符，区分大小写！
                if(this.validatePassword(inputObjpassword[0].value)){
                    //修改密码
                    _this.isLoding = true;
                    _this.HttpCli.get('/wap/forget/next4Phone',{userPassword:inputObjpassword[0].value})
                        .then(function (response) {
                            _this.userPassword = inputObjpassword[0].value
                            /*_this.statLogin();*/
                            console.log(response.data.status)
                            if(response.data.status == 0){
                                //密码修改成功 =>登录
                                let LogInParm = {userName:_this.phone1,userPassword:_this.userPassword};
                                _this.$store.dispatch("TOLOGIN",LogInParm).then(function(res){
                                    //重置密码并登录成功
                                    if(res.data.status == 0){
                                        //关闭弹窗
                                        _this.isLoding = false;
                                        _this.visible = false;
                                        _this.Del();
                                        eventBus.$emit("login",{bl:true});
                                    }
                                    if(res.data.status == 2 || res.data.status == 1){
                                        //关闭弹窗
                                        _this.isLoding = false;
                                        _this.compareerror = res.data.message;
                                    }


                                });



                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else{
                    _this.compareerror = '密码由字母加数字组成的6-20位字符'
                }
            }
          }

        },
        showPassword(eve){                                          //显示密码
            let ele = document.querySelector(".password>input");
            if(ele.type=='password'){
                ele.type = 'text';
                this.src = img1;
            }else{
                ele.type = 'password';
                this.src = img2;
            }
        },
        senCode(){                                              //发送验证码
            if(!this.firstSend)return;
            if(this.phoneNum==''){
                document.querySelector("#phone1").className = "inp errTip";
            }else{
                if(!reg.test(this.phoneNum)){
                    this.regErrTex = '请输入有效手机号码！';
                }else{
                    axios({                                     //验证手机号是否被注册
                        url:'/wap/register/checkNoEmailAndPhonePhone?key='+this.phoneNum,
                    }).then((res)=>{
                        if(res.data.status==0){
                            this.regErrTex = '该手机号已经存在！';
                        }else{
                            this.showMark = true;               //显示蒙层
                            this.firstSend = false;
                            let timer= setInterval(()=>{
                                this.timeNum--;
                                if(this.timeNum==0){
                                    clearInterval(timer);
                                    this.firstSend = true;
                                    this.firstTexT = '重新发送';
                                    this.timeNum=29;
                                }
                            },1000);
                            setTimeout(()=>{
                                this.showLoading = false;
                                this.showText = true;
                                axios({                         //获取验证码
                                    url:'/wap/register/getRegisterCodePhone?fUserPhone='+this.phoneNum
                                }).then((res)=>{
                                    if(res.data.status==0){
                                        this.showMark = false;
                                        this.showLoading = true;
                                        this.showText = false;
                                    }
                                })
                            },400)
                        }
                    })
                }
            }
        },
        registerAndLog(){
            let phoneNum = this.phoneNum;
            let code = this.verificationCode;
            let password = this.regPassword;
            let fResource;
          let sourcecode = localStorage.getItem("zmfrom");
            if(sourcecode){
                fResource = sourcecode+"-手机端";
            }else {
                fResource = "族蚂网-手机端";
            };
            if(phoneNum==''){                                       //验证手机号
                document.querySelector("#phone1").className = "inp errTip";
                this.canPhone = false;
            }else{
                if(!reg.test(phoneNum)){
                    this.canPhone = false;
                    this.regErrTex = '请输入有效手机号码！';
                }else{
                    this.canPhone = true;                           //手机号通过
                }
            }
            if(code==''){                                     //验证验证码
                document.querySelector("#code").className = "inp errTip";
                this.canCode = false;
            }else{
                if(!regFour.test(code)){
                    this.canCode = false;
                    if(!this.regErrTex)this.regErrTex = '请输入有效手机验证码！';
                }else{
                    this.canCode = true;                            //验证码通过
                }
            }
            if(password==''){                                       //验证密码（判断有无即可）
                document.querySelector("#password").className = "inp errTip";
                this.canPassWord = false;
                if(phoneNum && code){
                    if(!this.regErrTex)this.regErrTex = '请输入密码！';
                }
            }else if(password.length<6 || password.length>19){
                this.canPassWord = false;
                if(!this.regErrTex)this.regErrTex = '用户密码长度在6到20位之间！';
            }else{
                this.canPassWord = true;             //密码通过
            }
            if(this.canPhone && this.canCode && this.canPassWord){
                this.showMark = true;
                axios({
                    url:'/wap/register/submitRegisterPhone',
                    method:'get',
                    params:{
                        fUserPassword:password,
                        fUserPhone:phoneNum,
                        fPhoneCode:code,
                        fResource:fResource,
                    }
                    }).then((res)=>{
                        if(res.data.status==0){
                            console.log("注册成功")
                          try {
                            var bd_vid = localStorage.getItem("bd_vid");
                            let param = new URLSearchParams()
                            param.append('bdVid', bd_vid)
                            axios({
                              url:'/user/baiduApi',
                              method:'post',
                              data:param
                            }).then(function(res){
                              console.log(res);
                            })
                            meteor.track("zmform", {convert_id: "1636648426462215"})
                          }catch(err) {
                            console.log('meteor.track报错')
                          }
                            this.showLoading = false;
                            this.regSuccess = true;
                            let LogInParams = {
                                userName:this.phoneNum,
                                userPassword:this.regPassword
                            };
                            setTimeout(()=>{
                            this.$store.dispatch("TOLOGIN",LogInParams).then((res)=>{
                                    if(res.data.status == 0){
                                        console.log("登录成功")
                                        this.regSuccess = false;
                                        this.logining = true;
                                        setTimeout(()=>{
                                            this.showMark = false;
                                            eventBus.$emit("Del",false);
                                            eventBus.$emit("login",{bl:true});
                                            if(this.callback) this.callback();        //执行登录回调
                                        },300)
                                    }
                                });
                            },500)
                        }else{
                            console.log("注册失败")
                            this.showLoading = false;
                            if(res.data.message == '请获取验证码!'){
                                this.getCode = true;
                            }else{
                                this.regFail = true;
                            }
                            setTimeout(()=>{
                                this.showMark = false;
                                this.showLoading = true;
                                this.regFail=false;
                                this.getCode = false;
                            },500)
                        }
                }).catch((err)=>{
                    console.log(err)
                });
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
        focu(e){
            e.target.className = "inp";
            // if(e.target==document.getElementById("phone1")){
                this.regErrTex = ''
            // }

        },
    },

    directives:{
        scrollIntoView:{       //获焦
            inserted:function (el,binding) {
                el.focus();
                el.scrollIntoView();

            }
        }
    }
}
</script>
<style lang="scss" scoped>


.inp{
    width: 190px;
    height: 30px;
    padding: 3px 5px;
    background-color: #EBF8FD;
    margin-bottom: 10px;
    border: 1px solid #f2f2f2;
    border-radius:2px;
    padding-right: 26px;
}
input{
    box-sizing: border-box;
    border-radius: none;
}
input:focus {
    outline: none;
    border:1px solid #2FB7EC;
}
    .Log{
        width: 320px;
     /*   position: fixed;
        top: 0;
        left: 0;*/

        position: relative;
        z-index: 99998;
        .logIn{
            width: 250px;
            height: 310px;
            box-sizing: border-box;
            background-color: white;

            margin: auto;
            z-index: 99999;
            padding: 20px 30px;
            text-align: left;
            box-shadow: 0 0 3px #000;
            position: relative;

            .title{
                width: 100%; height: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
            }
            .DelBox{
                width: 40px;
                height: 40px;
                display: table-cell;
                text-align: center;
                vertical-align: table-cell;
                position: absolute;
                right: 14px;
                top: 20px;
                background: url("/images/mem/Del.png") no-repeat 13px 0;
                background-size: 14px 14px;
            }
            .sTit{
                font-size: 10px;
                margin: 5px 0;
            }
            a{display: block; width: 60px; height: 30px; text-align: center; line-height: 40px; float: right; font-size: 10px; color: #B5BFC1;}
            #logIn{width: 190px; height: 30px; overflow: hidden; line-height: 30px; text-align: center; background-color: #2FB7EC; color: white; font-size: 13px;}
            .ft{
                width: 100%;
                height: 60px;
                display: flex;
                justify-content: center;
                align-content: center;
                span{height: 60px; line-height: 60px;}
                .regs{color: #2FB7EC;}
            }
        }
        .FP{
            position: relative;
            width: 250px;
            height: 250px;
            box-sizing: border-box;
            background-color: white;
          /*  position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;*/
            margin: auto;
            z-index: 9999999;
            padding: 30px 30px 10px;
            text-align: left;
            box-shadow: 0 0 3px #000;
            .title{
                width: 100%; height: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
            }
            .goBBox{
                width: 40px; height: 40px; display: table-cell; text-align: center; vertical-align: table-cell;
                position: absolute; left: 20px; top: 18px;
                .goB{
                    width: 22px;
                    height: auto;
                }
            }
            .sTit{
                font-size: 10px; margin: 5px 0;
            }
            #phone{
                width: 134px;
            }
            #getPhone{
                display: block;
                float: right;
                width: 56px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: #2FB7EC;
                color: white;
                font-size: 10px!important;
            }
            #Subm{width: 190px; height: 30px; overflow: hidden; line-height: 30px; text-align: center; background-color: #2FB7EC; color: white; font-size: 13px; margin-top: 10px;}
            .setTime{display: block; float: right; width: 56px; height: 30px; line-height: 30px; text-align: center; background-color: #B1C9D3; color: #FFFFFF; font-size: 10px;border-radius: 2px;}
        }
        .register{
            width: 250px;
            height: 366px;
            position:relative;
            box-sizing: border-box;
            background-color: white;
       /*     position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;*/
            margin: auto;
            z-index: 999999;
            padding: 20px 30px;
            text-align: left;
            box-shadow: 0 0 3px #000;
            .regErrTex{
                color: #FF0000;
                text-align: center;
            }
            .title{
                width: 100%;
                height: 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
            }
            .DelBox{
                width: 40px;
                height: 40px;
                display: table-cell;
                text-align: center;
                vertical-align: table-cell;
                position: absolute;
                right: 14px;
                top: 20px;
                background: url("/images/mem/Del.png") no-repeat 13px 0;
                background-size: 14px 14px;
            }
            .password{
                position: relative;
                width: 190px;
                height: 30px;
                .imgBox{
                    height:30px;
                    width: 30px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    text-align: center;
                }
                .showPassword{
                    width: 18px;
                    height: 18px;
                    margin-top: 6px;

                }
            }
            .sTit{
                font-size: 10px;
                margin: 5px 0;
            }
            #phone1{
                width: 134px;
                &:focus{
                    border-right: none;
                }
            }
            #getPhone{
                display: block;
                float: right;
                width: 56px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: white;
                font-size: 10px;
                &.getPhone1{
                    background-color: #2FB7EC;
                }
                &.getPhone2{
                    background-color: #B1C9D3;
                }
            }
            #logRgs{
                width: 190px;
                height: 30px;
                overflow: hidden;
                line-height: 30px;
                text-align: center;
                background-color: #2FB7EC;
                color: white;
                font-size: 12px;
                margin-top: 10px;
            }
            .ft{
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: center;
                align-content: center;
                span{
                    height: 40px;
                    line-height: 40px;
                }
                .regs{
                    color: #2FB7EC;
                }
            }
            #Agre{
                width: 100%;
                font-size: 10px !important;
                text-align: center;
                line-height: 18px;
            }
        }
    }
    .isEmpty,.isEmptyphone{
      border:1px solid #FF6633;
    }
    .error{
        position: absolute;
        top: 45px;
        left: 0;
        z-index: 1000000;
        width: 250px;
        text-align: center;
        color: #FF0000;
    }
    .logBox{
        position: absolute;
        top: 50px;

        display: flex;
        align-items: center;
    }
    .bottom{
        bottom:0px;
    }
    .errTip{
        border: solid 1px #FF6633;
    }
    .zm-mark{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(18,47,70,.2);
        z-index: 99999;
        .loading{
            position: absolute;
            width: 75px;
            height: 75px;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: #fff;
            box-shadow: 0 5px 5px rgba(255,255,255,.35);
            .showTxt{
               font-size: 13px;
               padding: 23px 6px;
               line-height: 16px;
               color: #122F46;
            }
            .showTxt2{
                height: 75px;
                width: 75px;
                line-height: 75px;
                color: #122F46;
            }
        }
    }
.errorpassword{
    position: absolute;
    top: 52px;
    left: 0;
    z-index: 1000000;
    width: 250px;
    text-align: center;
    color: #FF0000;
}
/*loading*/
.loader-border {
    width: 75px;
    height: 75px;
    background: #fff;
    position: relative;
    border-radius: 3px;
}
.compareerror{
    position: absolute;
    top: 54px;
    width: 100%;
    left: 0;
    text-align: center;
    color: #ff0000;
}
.loader-border .wish-loader {
    top: 31px;
    position: absolute;
}
.wish-loader {
    margin: 0 auto;
    width: 75px;
    text-align: center;
}
.wish-loader>div {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1s infinite ease-in-out both;
    animation: sk-bouncedelay 1s infinite ease-in-out both;
}
@keyframes sk-bouncedelay{
    0%,90%,to{transform:scale(0)}
    50%{transform:scale(1)}}
.wish-loader .circle1 {
    -webkit-animation-delay: -.32s;
    animation-delay: -.32s;
}
.wish-loader .circle2 {
    -webkit-animation-delay: -.16s;
    animation-delay: -.16s;
}
.main-color-background {
    background: #2FB7EC !important;
}
.ui-loader-default{
    position: fixed;
    z-index: 99999;
    background: rgba(18,47,70,.2);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

}
.line1{
    position: relative;
}
.line1 .imgBox{
    position: absolute;
    width: 30px;
    height:30px;
    right: 0;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line1 .imgBox img{
    width: 19px;
    height:19px;

}
.logwrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(18, 47, 70, 0.6);
    width: 100%;
    height: 100%;
    z-index: 100;
}
    .merge{
        position: fixed;
        background: #fff;
        z-index: 99999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
