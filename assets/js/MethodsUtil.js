// 用于存放公共方法
import axios from 'axios';
export default {
    // 时间戳转换（举例）
    formatDate(timeStamp){
        let now = new Date(timeStamp)
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let date=now.getDate();
        let hour=now.getHours();
        let minute=now.getMinutes();
        let second=now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    },
    //图片自适应填充
    imgAutoAdapt(imgd, countflag) {     //imgd图片对象 contflag是否自适应填充
        var image = new Image()
        var iwidth = imgd.parentNode.offsetWidth;
        var iheight = imgd.parentNode.offsetHeight;

        //如果本地无效就删除.src,服务器上必须要
        image.src = imgd.src;
        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height == iwidth / iheight) {
                // 方图
                imgd.width = iwidth;
                imgd.height = iheight;
                if (countflag) {
                    imgd.style.marginTop = 0;
                    imgd.style.marginLeft = 0;
                }
            } else {
                if (image.width / image.height > iwidth / iheight) {
                    // 横图
                    imgd.width = (image.width * iwidth) / image.height;
                    imgd.height = iheight;
                    if (countflag) {
                        imgd.style.marginTop = 0;
                        imgd.style.marginLeft = "-" + Math.ceil((imgd.width - iwidth) / 2) + "px";
                    }
                } else {
                    // 竖图
                    imgd.width = iwidth;
                    imgd.height = (image.height * iwidth) / image.width;
                    if (countflag) {
                        imgd.style.marginTop ="-" + Math.ceil((imgd.height - iheight) / 2) + "px";
                        imgd.style.marginLeft = 0;
                    }
                }
            }
        }
    },
    getcookie(key){
        let str=document.cookie.replace(/;\s*/,';');
        let cookieArr=str.split(';');
        let cookieObj={};
        let len=cookieArr.length;
        for(let i=0; i<len; i++){
            let item=cookieArr[i];
            let k=item.split('=')[0].replace(/(^\s*)|(\s*$)/g,"");
            let v=item.split('=')[1];
            cookieObj[k]=v;
        }
        if(cookieObj[key]){
            return decodeURIComponent(cookieObj[key]);
        }else{
            return false;
        }
    },
    setcookie(key, value, t){
        let oDate=new Date();
        oDate.setDate(oDate.getDate()+t);
        document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toUTCString();

        console.log("setcookie失败",this.getcookie(key),this)
        if(this.getcookie(key)){
            console.log('设置成功');
        }else{
            console.log('设置失败');
        }
    },
    remove(key){
        document.cookie=key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if(!this.getcookie(key)){
            console.log('删除成功');
        }else{
            console.log('删除失败');
        }

    },
  //获取url上的指定key的值
    getQueryString(name){
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
  //获取redirectUrl 的值
  getredirectUrl(){
      //去掉快捷登录拼上的code
     var callBackUrl;
    var redirectUrl;
     var urlCode =  this.getQueryString('code');
     if(urlCode){
        redirectUrl = location.search.substr(1).split("&code")[0];
     }else{
        redirectUrl = location.search.substr(1);
     }
     if(redirectUrl.indexOf("redirectUrl=") > -1){
       callBackUrl = redirectUrl.split("redirectUrl=")[1];
     }else{
       callBackUrl = null;
     }
     return callBackUrl;
  },
  gethashQueryString(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.hash.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  },
  //微信分享
  templateWXshare(data){
    var templateShareData = {};
    var UA = navigator.appVersion;
    var ua = UA.toLowerCase();
    Object.assign(templateShareData,data);
    if(ua.match(/MicroMessenger/i) == "micromessenger"){
      //获取分享模板的数据
      // 提供微信分享接口所需的参数
      var wxdata = {
        wx_account : new Array(4),
        wx_share : new Array(4),
        get_wxshare_data : function(){
          var url = "/authority-sitebackend/userPermission/getWxShareData";
          var topUrl = location.href.split('#')[0].split("&from")[0];
          axios({
            url:url,
            method:'get',
            params:{
              shareurl:encodeURIComponent(topUrl)
            }
          })
            .then(function (res) {
              console.log('分享dsd',res.data)
              console.log('分享内容',templateShareData)
              if(res.data.errcode == 0){
                wxdata.wx_account[0] = res.data.wxuser;  // appid
                wxdata.wx_account[1] = res.data.timestamp;   // timestamp
                wxdata.wx_account[2] = res.data.noncestr; // noncestr
                wxdata.wx_account[3] = res.data.signature;  // signature
                var configMsg = {
                  url:topUrl,
                  title:templateShareData.title,
                  desc:templateShareData.fDescription,
                  img:templateShareData.img,
                  img_title:' ',
                  from:' '
                };

                wx.config({
                  // debug: true, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息//会通过log打出，仅在pc端时才会打印。
                  appId:  wxdata.wx_account[0], // 必填，公众号的唯一标识
                  timestamp: wxdata.wx_account[1], // 必填，生成签名的时间戳
                  nonceStr: wxdata.wx_account[2], // 必填，生成签名的随机串
                  signature: wxdata.wx_account[3],// 必填，签名
                  jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'

                  ] // 必填，需要使用的JS接口列表
                });

                wx.ready (function () {
                  // 微信分享的数据
                  var shareData = {
                    "imgUrl": configMsg.img,
                    "link": configMsg.url,
                    "desc": configMsg.desc,
                    "title": configMsg.title,
                    success: function () {
                      //alert("分享成功")
                      // 分享成功可以做相应的数据处理
                    }
                  }
                  wx.onMenuShareTimeline(shareData);//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                  wx.onMenuShareAppMessage(shareData);//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                  wx.onMenuShareQQ(shareData);
                  wx.onMenuShareWeibo(shareData);
                  wx.onMenuShareQZone(shareData);
                })
              }

            })
            .catch(function (error) {
              console.log(error);
            });

        }

      }
      wxdata.get_wxshare_data();

    }else{

    }
  }
}
