

export default {
  mountedF(isMounted){
if(isMounted){
  //头条，记录注册转化
  (function (r, d, s, l) {
    var meteor = r.meteor = r.meteor || [];
    meteor.methods = ["track", "off", "on"];
    meteor.factory = function (method) {
      return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        meteor.push(args);
        return meteor
      }
    };
    for (var i = 0; i < meteor.methods.length; i++) {
      var key = meteor.methods[i];
      meteor[key] = meteor.factory(key)
    }
    meteor.load = function () {
      var js, fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s);
      js.src = "https://analytics.snssdk.com/meteor.js/v1/" + l + "/sdk";
      fjs.parentNode.insertBefore(js, fjs)
    };
    meteor.load();
    if (meteor.invoked) {
      return
    }
    meteor.invoked = true;
    meteor.track("pageview")
  })(window, document, "script", "1632967804098691");


  try {

    if (window.location.href.indexOf("www.zuma.com") !== -1) {
      var _hmt = _hmt || [];
      (function () {
        let hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?21c7b81ba7dddfcb3217825ea35d6b13";
        document.getElementsByTagName("head")[0].appendChild(hm);
      })();
    }



    if (window.location.href.indexOf("www.zuma.com") !== -1) {
      (function (b, a, e, h, f, c, g, s) {
        b[h] = b[h] || function () {
            (b[h].c = b[h].c || []).push(arguments)
          };
        b[h].s = !!c;
        g = a.getElementsByTagName(e)[0];
        s = a.createElement(e);
        s.src = "//s.union.360.cn/" + f + ".js";
        s.defer = !0;
        s.async = !0;
        g.parentNode.insertBefore(s, g)
      })(window, document, "script", "_qha", 312595, false);
    }
    /*        if(window.location.href.indexOf("www.zuma.com") !== -1){
     let _atrk_opts = { atrk_acct:"5M72t1z2js20lS", domain:"zuma.com",dynamic: true};
     (function() {
     let as = document.createElement('script');
     as.type = 'text/javascript';
     as.async = true;
     as.src = "https://certify-js.alexametrics.com/atrk.js";
     let s = document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(as, s);
     })();
     }*/

  } catch (err) {
    console.log('报错')
  }
}

  }




}
