import requestUtil from '~/assets/js/requestUtil';

var ipObj ={};

let BrowserMatch = {
  init (pageId) {
    var getBrowser = this.getBrowser();
    var getIp = {};
    var _this = this;
    this.getIp().then(function(res){
       getIp.ip = res.data.message // 获取IP
       getIp.location = res.data.data;
      _this.ip = getIp.ip || "未知IP地址"; //获取IP地址
      _this.pageId = pageId;
      _this.browser = getBrowser || "未知浏览器";  //获取浏览器名
      //this.version = getBrowser.version || "未知浏览器版本号";  //获取浏览器版本
      _this.OS = _this.getOS() + " " + _this.getDigits() || "未知操作系统"; //系统版本号
      _this.location = getIp.location || "未知位置"; //获取位置
      _this.addUserOperationLog(); //添加操作log
    })

  },
  getOS () {  //判断所处操作系统
    var userAgent = navigator.userAgent.toLowerCase();

    var name = 'Unknown';
    var version = "Unknown";
    if (userAgent.indexOf("win") > -1)
    {
      name = "Windows";
      if (userAgent.indexOf("windows nt 5.0") > -1)
      {
        version = "Windows 2000";
      } else if (userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("windows nt 5.2") > -1)
      {
        version = "Windows XP";
      } else if (userAgent.indexOf("windows nt 6.0") > -1)
      {
        version = "Windows Vista";
      } else if (userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1)
      {
        version = "Windows 7";
      } else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1)
      {
        version = "Windows 8";
      } else if (userAgent.indexOf("windows nt 6.3") > -1)
      {
        version = "Windows 8.1";
      } else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 10.0") > -1)
      {
        version = "Windows 10";
      } else
      {
        version = "Unknown";
      }
    } else if (userAgent.indexOf("iphone") > -1)
    {
      name = "Iphone";
    } else if (userAgent.indexOf("mac") > -1)
    {
      name = "Mac";
    } else if (userAgent.indexOf("x11") > -1 || userAgent.indexOf("unix") > -1 || userAgent.indexOf("sunname") > -1 || userAgent.indexOf("bsd") > -1)
    {
      name = "Unix";
    } else if (userAgent.indexOf("linux") > -1)
    {
      if (userAgent.indexOf("android") > -1)
      {
        name = "Android"
      } else
      {
        name = "Linux";
      }

    } else
    {
      name = "Unknown";
    }
    return name + " " + version;
  },
  getDigits () { //判断当前操作系统的版本号
    var sUserAgent = navigator.userAgent.toLowerCase();
    var is64 = sUserAgent.indexOf("win64") > -1 || sUserAgent.indexOf("wow64") > -1;
    if (is64)
    {
      return "64位";
    } else
    {
      return "32位";
    }
  },
  getBrowser () {  // 获取浏览器名
    var UserAgent = navigator.userAgent.toLowerCase();

    if (/ucweb/.test(UserAgent))
    {
      return "UC浏览器";
    } else if (/chrome/.test(UserAgent.substr(-33, 6)))
    {
      return "Chrome浏览器";
    } else if (/firefox/.test(UserAgent))
    {
      return "火狐浏览器";
    } else if (/opera/.test(UserAgent))
    {
      return "Opera浏览器";
    } else if (/safari/.test(UserAgent) && !/chrome/.test(UserAgent))
    {
      return "safire浏览器";
    } else if (/360se/.test(UserAgent))
    {
      return "360浏览器";
    } else if (/baidubrowser/.test(UserAgent))
    {
      return "百度浏览器";
    } else if (/metasr/.test(UserAgent))
    {
      return "搜狗浏览器";
    } else if (/msie 6.0/.test(UserAgent))
    {
      return "IE6";
    } else if (/msie 7.0/.test(UserAgent))
    {
      return "IE7";
    } else if (/msie 8.0/.test(UserAgent))
    {
      return "IE8";
    } else if (/msie 9.0/.test(UserAgent))
    {
      return "IE9";
    } else if (/msie 10.0/.test(UserAgent))
    {
      return "IE10";
    } else if (/msie 11.0/.test(UserAgent))
    {
      return "IE11";
    } else if (/lbbrowser/.test(UserAgent))
    {
      return "猎豹浏览器";
    } else if (/micromessenger/.test(UserAgent))
    {
      return "微信内置浏览器";
    } else if (/qqbrowser/.test(UserAgent))
    {
      return "QQ浏览器";
    }
    return "";
  },
  getIp () { //获取IP/位置
    return new Promise((resolve, reject) => {
      requestUtil.getData("/shop_web/userLocation/getData1", null)
      .then((res) => {
        resolve(res);
        })

    });



  },
  addUserOperationLog () { //添加用户操作log
    var getDetailParam = this.getDetailParam(); //获取详情页参数
    var params = new URLSearchParams();
        params.append('fPageId', BrowserMatch.pageId);
        params.append('fOperationBrowser', "浏览器为:" + BrowserMatch.browser);
        params.append('fOperationSystem', "操作系统为：" + BrowserMatch.OS);
        params.append('fIp', BrowserMatch.ip);
        params.append('fLocation', BrowserMatch.location);
        params.append('fType', /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "移动端" : "PC端");
        params.append('fShopId', getDetailParam.fShopId);
        params.append('fUrl', getDetailParam.fUrl);
        params.append('detailType', getDetailParam.type);
        params.append('detailfId', getDetailParam.fId);
        params.append('detailZmFrom', getDetailParam.zmFrom);
        params.append('from', localStorage.getItem("zmfrom") || "empty");
    requestUtil.post("/user/addUserOperationLog", params
    )
      .then((res)=>{

      if (res.data.status == 0)
        console.log("记录成功...");

        return res.status;
      })
  },
/*  getIp:function(){ //获取IP/位置
    var obj = new Object();

    $.ajax({
      url : "/shop_web/userLocation/getData1",
      type : "GET",
      async : false,
      success:function(res){
        obj.ip =  res.message;
        obj.location = res.data;
      }
    })
    return obj;
  },
  addUserOperationLog:function(){ //添加用户操作log
    var getDetailParam = this.getDetailParam(); //获取详情页参数

    $.ajax({
      url : "/user/addUserOperationLog",
      type : "POST",
      data : {
        fPageId : BrowserMatch.pageId,
        fOperationBrowser : "浏览器为:" + BrowserMatch.browser,
        fOperationSystem : "操作系统为：" + BrowserMatch.OS,
        fIp : BrowserMatch.ip,
        fLocation : BrowserMatch.location,
        fType : /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "移动端" : "PC端",
        fShopId : getDetailParam.fShopId,
        fUrl : getDetailParam.fUrl,
        detailType : getDetailParam.type,
        detailfId : getDetailParam.fId,
        detailZmFrom : getDetailParam.zmFrom,
        from : localStorage.getItem("zmfrom") || "empty",
      },
      success:function(data){
        if(data.status == 0)
          console.log("记录成功...");

        return data.status;
      }
    })
  },*/
  getUrlParam (url, paraName) { // 获取指定Url参数的方法
    // var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1)
    {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++)
      {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName)
        {
          return arr[1];
        }
      }
      return "";
    } else
    {
      return "";
    }
  },
  getDetailParam () { // 获取详情页参数
    var url = document.location.toString();
    var obj = {};
    obj.fUrl = url || "empty";

    if (url.indexOf("/productInfo/productInfo") != -1
      || url.indexOf("/productInfo/toProductInfo") != -1)
    { //产品详情页
      obj.type = "product";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/zmNoteService/toMailServiceDetail") != -1
      || url.indexOf("/zmNoteWapService/toMailServiceDetail") !== -1)
    { //服务详情页
      obj.type = "service";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = document.getElementById('fShopId').value || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/videoView/viewDetails") !== -1
      || url.indexOf("/videoViewMobile/index") !== -1)
    { //视频详情页
      obj.type = "video";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = document.getElementById('fShopId').value || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/audioDetails/toAudioDetails") !== -1
      || url.indexOf("/mobileAudioPlayer/mobilePlayer?playerPage=play") !== -1)
    { //音频详情页
      obj.type = "audio";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/albumDetails/toAlbumDetails") !== -1
      || url.indexOf("/mobileAudioPlayer/mobilePlayer?playerPage=album") !== -1)
    { //专辑详情页
      obj.type = "album";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/creatorsDetails/toCreatorDetails") !== -1
      || url.indexOf("/mobileAudioPlayer/mobilePlayer?playerPage=creator") !== -1)
    { //创作人详情页
      obj.type = "creators";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/blog_detail/detailsPage/lookView") !== -1
      || url.indexOf("/blog_wap/blogWap/index") !== -1)
    { //博客详情页
      obj.type = "blog";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else if (url.indexOf("/news_detail/newsDetailPage/index") !== -1
      || url.indexOf("/news_wap/newsWap/index") != -1)
    { //资讯详情页
      obj.type = "news";
      obj.fId = this.getUrlParam(url, "fId") || "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = this.getUrlParam(url, "zmFrom") || "empty";
    } else
    { //非详情页
      obj.type = "empty";
      obj.fId = "empty";
      obj.fShopId = this.getUrlParam(url, "fShopId") || "empty";
      obj.zmFrom = "empty";
    }
    return obj;
  }
};
export default BrowserMatch;
