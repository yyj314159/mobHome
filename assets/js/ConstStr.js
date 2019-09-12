// 本js用来存储全局静态常量包括后台接口的二次命名
export default{
// 后台地址
        InterfaceAds:'http://www.dev-zuma.com',
        // InterfaceAds:'/',
        picSrc:'https://www.dev-zuma.com/',

// 首页接口(14)
        // 首页一级类目数据
        Home:'/product_gateway/product-api/productCategory/queryAllFirstCategory',
        // 首页提示消息数量
        mesNum:'/wap/customService/queryMessageCount',
        // 首页购物车数量
        sCartNum:'/cart/getCartSum',              
        // 首页定位查询接口
        LocQuery:'/wap/member/queryByUserId',
        // 首页定位上传接口
        LocUpload:'/wap/member/save',
        // 建站演示视频
        website:'/admin/c_m/sysSiteDemoVideo/demonStration',
        //模板搜索
        webA:'/manage-api/template/queryTemplateByAnyConditionsToES',
        // 建站模板大类接口
        webB:'/manage-api/template/webCategory/queryCategoryDropList',
        // 建站模板小类接口
        webS:'/manage-api/template/webCategory/queryCategoryDropListExp',
        // 建站模板小类下生效的模板接口
        webT:'/manage-api/template/webTemplate/queryByPageExp',
        // 推荐10个模板接口
        webR:'/manage-api/template/webTemplate/queryByPageToMobile?fIsTrash=0&fStatus=5',
        // 预览模板详情页
        webCTP:'mobview.zuma.com/pre/模板ID?type=template&version=',

        // Footer跳转网址
        Login:'/wap/userLogin',
        mes:'/wap/customService/message_list',
        scart:'/product_wap/cart/toGetShopCart',
        mine:'/wap/member/memberCenterIndex',

// 登录注册模块
        // 登录
        LogIn1:"/wap/member/loginPhone",
        // 判断登录状态
        Logon:'/wap/member/getUserLoginStatusPhone',
        // 获取手机验证码
        authenCode:'/wap/register/getRegisterCode',
        // 注册会员
        register:'register/submitRegister',
        // 获取验证码（忘记密码）
                // 判断是否已经注册或者邮箱是否存在
                IsResg: "/wap/register/checkNoEmailAndPhone",
                // 判断收到的验证码是否正确
                IsVerification1: '/wap/forget/getPhoneInfo',
                // 提交新密码
                subNewPassword:"/wap/forget/next4",
        


// 购物模块接口
        //产品搜索接口
        productSearchKeyWord:'/product_gateway/productSearch/searchProductList',
        //选择城市接口1
        chooseCity:'/city/getAllData',
        //选择城市接口2
        getStreetByParent:'/city/getTownData',

// 服务模块接口
        serviceSearchKeyWord:'/service/webbuilder-api/search/searchService',

// 视频模块接口

// 声音模块接口
        getAudioList:'/audio_web/search-api/searchAudio',
        getAudioCategory:'/audio_web/music/queryFirstCategory',
        getAlbumList:'/audio_web/search-api/searchAlbum',
        getCreatorList:'/audio_web/search-api/searchCreator',
        getNationalityList:'/dictionary/getDictionaryInfoByType?type=COUNTRY',//返回国籍列表
        getCreatorCategory:'/dictionary/getDictionaryInfoByType?type=WRITERTYPE',//返回创作人类型
// 资讯模块接口
       newsSearchKeyWord :'/news_web/search-api/searchNews',
       newsFirstcategory :'/news_web/news/queryFristCategory',
       blogSearchKeyWord :'/blog_api/blogInfoSearch/searchBlog',
// 网站模块接口




}