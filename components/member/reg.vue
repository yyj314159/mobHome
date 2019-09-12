<template>
    <div class="reg">
        <div class="reg-head">
            <div class="back-icon" @click="$router.go(-1)"></div>
            <div class="user-reg">用户注册</div>
        </div>
        <div class="err-msg" :style="{height:errH,opacity:opt}">{{errMsg}}</div>
        <div class="reg-body">
            <div class="pho-num flex">
                <span class="left">手机号</span>
                <input type="text" name="phoneNum" autocomplete="off" id="phone" @focus="ipt=true,index=0,errH='0px',errMsg=''" @blur="ipt = false" v-model="phoneNum">
                <span :class="[{'focus-line':ipt && index==0,'blur-line':'true'}]"></span>
                <span :class="{'send-code1':firstSend,'send-code2':!firstSend}" @click="senCode">{{firstSend ? firstTexT : timeNum+'S后重试'}}</span>
            </div>
            <div class="code flex">
                <span class="left">验证码</span>
                <input type="text" name="codeNum" autocomplete="off" @focus="ipt=true,index=1,errH='0px',errMsg=''" @blur="ipt = false" v-model="verificationCode">
                <span :class="[{'focus-line':ipt && index==1,'blur-line':'true'}]"></span>
            </div>
            <div class="code flex password">
                <span class="left">密码</span>
                <input type="password" name="codeNum" autocomplete="off" @focus="ipt=true,index=2,errH='0px',errMsg=''" @blur="ipt = false" v-model="password1">
                <span class="img" @click="showPassword(0,$event)">
                    <img :src="src2" alt="">
                </span>
                <span :class="[{'focus-line':ipt && index==2,'blur-line':'true'}]"></span>
            </div>
            <div class="code flex pass-again">
                <span class="left">确认密码</span>
                <input type="password" name="codeNum" autocomplete="off" @focus="ipt=true,index=3,errH='0px',errMsg=''" @blur="ipt = false" v-model="password2">
                 <span class="img" @click="showPassword(1,$event)">
                    <img :src="src2" alt="">
                </span>
                <span :class="[{'focus-line':ipt && index==3,'blur-line':'true'}]"></span>
            </div>
        </div>
        <div class="agree">
            <span @click="voucher=!voucher" :class="[{onVoucher:voucher},{offVoucher:!voucher}]">
            </span>
            <span class="txt">我已阅读并同意<i @click="showMerge = true">《Zuma族蚂服务协议》</i></span>
        </div>
        <div class="reg-btn">
            <div :class="[{allowed:voucher},{disallowed:!voucher}]" @click="reg" v-if="reging">注册并登录</div>
            <div class='reging' v-else></div>
        </div>
        <div class="reged">
            <span class="hasReg">已注册？</span>
            <span class="go-login"><nuxt-link to="/mlogin">现在登录</nuxt-link></span>
        </div>
        <Merge v-show="showMerge" class="merge" @merge="closeMerge"></Merge>
    </div>
</template>
<script>
import showImg from "@/assets/images/u126.png";
import hideImg from "@/assets/images/u124.png";
import axios from "axios";
import Merge from "./ZMagre";
import { setTimeout } from 'timers';
import MethodsUtil from "@/assets/js/MethodsUtil"
let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;  //手机号
let regFour = /^\d{4}$/;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
    data(){
        return {
            HeightW:null,
            errMsg:'',
            error:false,
            ipt:false,
            index:0,
            src:showImg,
            src2:hideImg,
            showMerge:false,
            voucher:true,
            timeNum:29,
            firstTexT:'发验证码',
            firstSend:true,
            phoneNum:'',
            password1:'',
            password2:'',
            verificationCode:'',
            regErrTex:'',
            canPhone:false,
            canCode:false,
            canPassWord:false,
            canAgainPassWord:false,
            reging:true,
            errH:'0px',
            opt:0
        }
    },
     components:{
      Merge
    },
    methods:{
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
       showPassword(n,eve){                                          //显示密码
            let ele;
            if(n==0){
               ele = document.querySelector(".password>input");
               let img = ele.nextElementSibling.children[0]
               if(ele.type=='password'){
                    ele.type = 'text';
                    img.src = this.src
                    ele.nextSibling.childNodes.src = this.src;
                }else{
                    ele.type = 'password';
                    img.src = this.src2;
                }
            }else{
                ele = document.querySelector(".pass-again>input");
                let img = ele.nextElementSibling.children[0]
                if(ele.type=='password'){
                    ele.type = 'text';
                     img.src = this.src
                }else{
                    ele.type = 'password';
                    img.src = this.src2;
                }
            }
        },
       closeMerge(){
           this.showMerge = false;
       },
       senCode(){                                              //发送验证码
            if(!this.firstSend)return;
            if(this.phoneNum==''){
                this.errH = '25px';
                this.opt = 1;
                this.errMsg = '请输入手机号'
            }else{
                if(!reg.test(this.phoneNum)){
                    this.errH = '25px';
                    this.opt = 1;
                    this.errMsg = '请输入正确的手机号';
                }else{
                    this.HttpCli.get(                                   //验证手机号是否被注册
                        '/z-member/register/checkNoEmailAndPhonePhone?key='+this.phoneNum,
                    ).then((res)=>{
                        if(res.data.status==0){
                            this.errH = '25px';
                            this.opt = 1;
                            this.errMsg = '该手机号已注册';
                        }else{
                            this.showMark = true;               //显示蒙层
                            this.firstSend = false;
                            let timer= setInterval(()=>{
                                this.timeNum--;
                                if(this.timeNum==0){
                                    clearInterval(timer);
                                    this.firstSend = true;
                                    this.firstTexT = '重发验证码';
                                    this.timeNum=29;
                                }
                            },1000);
                            setTimeout(()=>{
                                this.showLoading = false;
                                this.showText = true;
                                axios({                         //获取验证码
                                    url:'/z-member/register/getRegisterCodePhone1?fUserPhone='+this.phoneNum
                                }).then((res)=>{
                                    MethodsUtil.setcookie('token',res.data.data)
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
       reg(){
           var _this = this;
           if(!this.voucher){
               return;
           }
            let phoneNum = this.phoneNum;
            let code = this.verificationCode;
            let password1 = this.password1;
            let password2 = this.password2;
            let fResource;
            let sourcecode = localStorage.getItem("zmfrom");
            if(sourcecode){
                fResource = sourcecode+"-手机端";
            }else {
                fResource = "族蚂网-手机端";
            };

            if(phoneNum==''){                                       //验证手机号
                this.errMsg = '请输入手机号'
                this.errH = '25px';
                this.opt = 1;
                this.canPhone = false;
                return;
            }else{
                if(!reg.test(phoneNum)){
                    console.log("手机号未通过")
                    this.canPhone = false;
                    this.errMsg = '请输入有效手机号码';
                    this.errH = '25px';
                    this.opt = 1;
                    return;
                }else{
                    this.canPhone = true;                           //手机号通过
                }
            }

             if(code==''){                                     //验证验证码
                this.errMsg = '请输入验证码'
               this.errH = '25px';
               this.opt = 1;
                this.canCode = false;
                return;
            }else{
                console.log(code,!regFour.test(code))
                if(!regFour.test(code)){
                    this.canCode = false;
                    this.errH = '25px';
                    this.opt = 1;
                    this.errMsg = '验证码错误';
                    return;
                }else{
                    this.canCode = true;                            //验证码通过
                }
            }
            // console.log(this.validatePassword(password1))
            if(password1==''){                                       //验证密码
                this.errMsg = '请输入密码';
                this.errH = '25px';
                this.opt = 1;
                this.canPassWord = false;
                return;
            }else if(this.validatePassword(password1)){
                this.canPassWord = true;             //密码通过
            }else{
                this.canPassWord = false;
                this.errMsg = '密码由字母加数字组成的6-20位字符';
                this.errH = '25px';
                 this.opt = 1;
                return;
            }

            if(password2==''){                                       //再次输入密码
                this.errMsg = '请确认密码';
                this.errH = '25px';
                 this.opt = 1;
                this.canAgainPassWord = false;
                return;
            }else if(password1!=password2){
                this.canAgainPassWord = false;
                this.errMsg = '两次输入密码不一致';
                this.errH = '25px';
                 this.opt = 1;
            }else{
                this.canAgainPassWord = true;             //通过
            }
             if(this.canPhone && this.canCode && this.canPassWord && this.canAgainPassWord){
                 let token = MethodsUtil.getcookie('token')
                 console.log(token,"^^^^^^^^^^^^^^^^^^^^")
                 if(!token){            //说明没有发生验证码
                    this.canCode = false;
                    this.errH = '25px';
                    this.opt = 1;
                    this.errMsg = '验证码错误';
                    return;
                 }
                this.reging = false;
                this.HttpCli.get(
                    '/z-member/register/submitRegisterPhone1',
                    {
                        fUserPassword:password1,
                        fUserPhone:phoneNum,
                        fPhoneCode:code,
                        fResource:fResource,
                    }
                    ).then((res)=>{
                        if(res.data.status==0){
                            // console.log("注册成功")
                          try {
                            var bd_vid = localStorage.getItem("bd_vid");
                            var objData = {};
                                objData.bdVid = bd_vid;
/*                            var bd_vid = localStorage.getItem("bd_vid");
                            let param = new URLSearchParams()
                            param.append('bdVid', bd_vid)
                            axios({
                              url:'/user/baiduApi',
                              method:'post',
                              data:param
                            }).then(function(res){
                              console.log(res);
                            })*/
                            _this.HttpCli.get('/user/baiduApi',objData)
                              .then(function (response) {

                                console.log(response);
                              })
                              .catch(function (error) {
                                console.log(error);

                              });
                            meteor.track("zmfrom", {convert_id: "1636648426462215"})
                          }catch(err) {
                            console.log('meteor.track报错')
                          }
                            let LogInParams = {
                                userName:this.phoneNum,
                                userPassword:password1
                            };
                            this.$store.dispatch("TOLOGIN",LogInParams).then((res)=>{
                                    if(res.data.status == 0){
                                        // console.log("登录成功")
                                        setTimeout(()=>{
                                            this.showMark = false;
                                            this.callback();
                                        },300)
                                    }
                                });
                        }else{
                            // console.log("注册失败")
                            if(res.data.message == '请获取验证码!' || res.data.data.showError == 'input_4' || res.data.message=='验证码有误!'){
                                this.errMsg = '验证码错误';
                                this.errH = '25px';
                                this.opt = 1;
                            }else{
                                this.errMsg = '注册失败';
                                this.errH = '25px';
                                this.opt = 1;
                            }
                            setTimeout(()=>{
                                this.reging = true;
                            },500)
                        }
                }).catch((err)=>{
                    // console.log(err)
                });
            }
       },
       callback(){
        /*var redirectUrl = MethodsUtil.getQueryString('redirectUrl');*/
         var redirectUrl = MethodsUtil.getredirectUrl('redirectUrl');
        var type = MethodsUtil.getQueryString('linkType');
        if(redirectUrl){
          if(type == 'center'){
            var logonUrl = '/z-member/member/getUserLoginStatusPhone1';
            this.HttpCli.get(logonUrl)
              .then(function (res) {
                if(res.data.message == "未登录"){
                }else{
                  var fId = res.data.data.fId;
                  var fUserType = res.data.data.fUserType;
                  //location.href = '/wap/member/memberCenterIndexPhone1?fId='+fId+'&fUserType='+fUserType;
                  location.href = '/mobMemberCenter/';
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }else{
            location.href = redirectUrl;
          }
        }else{
          location.href = '/site';
          console.log("执行回调")
        }

      },

    }
}

</script>
<style lang='scss' scoped>
   $back:#2FB7EC;
   $font:#122F46;
   .merge{
        position: fixed;
        background: #fff;
        z-index: 99999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
.reg{
    top: 0;
    background: #fff;
    .err-msg{
        height: 0px;
        color: #FF0000;
        text-align: center;
        transition: all .5s ease;
    }
    .reg-head{
        height: 46px;
        background: $back;
        padding: 0 14px;
        font-size: 13px;
        color: #fff;
        display: flex;
        margin-bottom: 10px;
        .back-icon{
            width:16px;
            height: 16px;
            background:url(../../assets/images/tongyong-pic2.png) no-repeat;
            background-size: cover;
            margin: 15px 0;
            margin-right: 10px;
        }
        .user-reg{
            line-height: 47px
        }
    }
    .reg-body{
        padding: 0 14px;
        .flex{
            height: 50px;
            display: flex;
            position: relative;
            align-items: center;
            .left{
                width: 58px;
                height: 50px;
                line-height: 50px;
                color: $font;
                text-align: left;
            }
            .blur-line{
               position: absolute;
               left: 58px;
               bottom: 5px;
               border-bottom: solid 1px #C0E9F9;
           }
           .focus-line{
               position: absolute;
               left: 58px;
               bottom: 5px;
               border-bottom: solid 1px $back;
               box-shadow: 0px -1px 5px $back;
           }
        }
        .pho-num{
            input[name='phoneNum']{
                height: 45px;
                outline: none;
                width: 154px;
            }
           span:nth-of-type(3){
               width: 80px;
               height: 36px;
               color: #fff;
               line-height: 36px;
               border-radius: 2px;
               &.send-code1{
                   background: $back;
               }
               &.send-code2{
                    background-color: #B1C9D3;
               }
           }
           .blur-line{
               width: 154px;
           }
           .focus-line{
               width: 154px;
           }
        }
        .code{
            input[name='codeNum']{
                width: 234px;
                outline: none;
                height: 45px;
                flex: 1;
            }
            .blur-line{
               width: 234px;
           }
           .focus-line{
               width: 234px;
           }
        }
        .code{
            .img{
                height: 36px;
                width: 36px;
                position: relative;
                background: #fff;
                img{
                    width: 21px;
                    height: 20px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%)
                }
            }
        }
    }
    .agree{
        padding: 0 14px;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 10px;
        margin-bottom: 8px;
        .onVoucher{
            width: 30px;
            height: 30px;
            background: url('../../assets/images/u100.png') no-repeat center;
            background-size: 14px 14px;
        }
        .offVoucher{
             width: 30px;
            height: 30px;
            background: url("../../assets/images/u150.png") no-repeat center;
            background-size: 14px 14px;
        }
        .txt{
            i{
                font-style: normal;
                color:$back;
            }
        }
    }
    .reg-btn{
        padding: 0 14px;
        height: 36px;
        div{
            height: 100%;
            line-height: 36px;
            border-radius: 2px;
            color: #fff;
            &.allowed{
                background: $back;
            }
            &.disallowed{
                background:#EAF1F5;
            }
            &.reging{
                background: $back url("../../assets/images/reging.gif") no-repeat center;
                background-size: 22px 22px;
            }
        }
    }
    .reged{
        height: 30px;
        padding: 0 14px;
        line-height: 30px;
        text-align: left;
        .hasReg{
            color: #6292A6
        }
        .go-login{
            a{
                color: $back;
            }

        }
    }
    .zm-mark{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(18,47,70,.2);
        z-index: 9;
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
}
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
</style>


