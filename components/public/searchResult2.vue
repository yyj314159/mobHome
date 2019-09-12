<template>
  <div class="searchBox">
    <div class="searchScrolltop" :class="{searchScrolltopHide:scrollResultTop}">
      <div class="commonHead">
        <a class="commonLeft" @click="linkIndex">
          <div class="leftIcon" v-show="afterhide">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <!--登录前-->
          <div class="memberCenter" v-show="beforehide">
            <i class="logo"></i>
          </div>
        </a>
        <div class="searhInput">
          <input  type="search"
                 v-model.trim="keyWord"
                 :placeholder="placeholder"
                 v-on:keyup.enter="handleSearch"
                 v-on:input="inputChange()"

          >
          <div class="searchLogoBox" @click="handleSearch">
            <i></i>
          </div>

        </div>
        <div class="commonRight">
          <a class="searchLogo" @click="returnBack">
            <i></i>
          </a>
        </div>
      </div>
      <div class="slide">
        <ul ref="slideBox">
       <li class="slideTab slideTabR" :class={slideBtmClass:slideBtmShowClass} v-for="(route,n) in searchRoutes" @click="switchTab(route.route,n,1)">
            <span>{{route.name}}</span>
          </li>
        </ul>
        <div class="transtionLine">
          <span class="slideBtm" ref="slideBtmLine" v-show="slideBtmShow"></span>
        </div>
      </div>
    </div>
    <div
            class="searchResultContent"
            :class="{'haveData':isActive,searchResultContenthide:scrollResultTop}"
    >
      <!--动态组件-->
      <component v-bind:is="componentFile" :keyword="keyWord"  :resultdata="pageData"></component>
    </div>
    <div class="dropWrap" @touchstart="dropHide" v-if="suggestArray.length > 0"></div>
    <!--模糊匹配-->
    <ul class="searchSelectDrop" v-if="suggestArray.length > 0">
      <li v-for="(item,index) in  suggestArray" @click="startSearch(index)">{{item}}</li>


    </ul>
  </div>

</template>
<script>
    import eventBus from "@/assets/js/eventBus";
    import MethodsUtil from "@/assets/js/MethodsUtil"
    export default {
        name: "searchResult2",
      props:{
        pageData: Object
      },
        data() {
            return {
                componentFile: '',
                componentPath: '',
                currentNum: 0,
                isActive: false,
                placeholder: "搜产品",
                show: false,
                login:false,
                beforehide:false,
                afterhide:false,
                searchreasultNum: 0, //搜索到的数据总数
                keyWord: "",
                timeout:"",
               slideBtmShow:false,
              slideBtmShowClass:true,
                autoFocus:true,//是否自动聚焦
                suggestArray:[],//输入词提示
                suggestUrl:['/manage-api/template/templateSuggest','/product_gateway/productSearch/productSuggest','/service/webbuilder-api/search/suggest','/audio_web/search-api/getSuggestWord',['/news_web/search-api/getSuggestWord','/blog_api/blogInfoSuggestWord/suggestBlog']],
                scrollResultTop: false,//向上滑动类名

                searchRoutes: [
                  { route: "site", name: "模板" },
                    { route: "product", name: "购物" },
                    { route: "server", name: "服务" },
                    { route: "music", name: "音频" },
                    { route: "information", name: "资讯" }

                ]
            };
        },
        created(){
          this.computedPath();
          this.render();



        },
        mounted() {
          console.log("sssss",this.$route)
          // localStorage.setItem("myKeyword", this.keyWord);
          if(MethodsUtil.getcookie("token")){
            this.afterhide= true;
          }else{
            this.beforehide = true;
          }
          eventBus.$on("login",(arg)=>{
            this.afterhide = arg.bl;
            this.beforehide = !arg.bl;

          })

            //console.log("搜索头传过来的",this.pageData)
            if(this.$route.query.word){
              this.keyWord = this.$route.query.word;
            }
            var _this = this;
            const tabIndex = this.$route.query.tabIndex;
            var TabObj = document.getElementsByClassName('slideTabR');

            TabObj[tabIndex].classList.add('active')
            setTimeout(function () {
              _this.slideBtmShow=true
              },500)
            var slideLeft = (this.$refs.slideBox.offsetWidth / 5) * tabIndex +8 ;
            var slideBtmObj = this.$refs.slideBtmLine;
            slideBtmObj.style.left = slideLeft + "px";
            this.computedPath();
            this.render();
            this.placeholderF(tabIndex);
            //上划收起
            eventBus.$on("scrollResultTop", arg => {
                this.scrollResultTop = arg;
            });

        },
        methods: {
            render() {

                  if(!this.$route.query.word) return;

                  //  localStorage.setItem("myKeyword", this.keyWord);
                  this.componentFile = resolve => ({
                    component: import(`@/components/${this.componentPath}`),
                    loading: {
                      template:
                        '<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载错误</div></div></div>'
                    },
                    error: {
                      template:
                        '<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载错误</div></div></div>'
                    },
                    delay: 1000,
                    timeout: 10000
                  });




            },
            //模糊匹配
            getListData(val){
                var _this = this;
                var tabIndex = this.$route.query.tabIndex;

                if(tabIndex == 3){//音频
                    var url = this.suggestUrl[tabIndex];//不同的tab切换不同的接口
                    var typeArray = ['audio','album','creator'];
                    var typeIndex = localStorage.getItem("saveIndex")?localStorage.getItem("saveIndex"):0 ;
                    var params = {
                        word:this.keyWord,
                        // type:typeArray[typeIndex]
                    }
                }else if(tabIndex == 4){//资讯
                    if(document.querySelector(".active")){
                        var activeTab = document.querySelector(".active");
                        if(activeTab.innerText == "资讯"){
                            var url = this.suggestUrl[tabIndex][0];
                            var params = {
                                word:this.keyWord

                            }
                        }
                        if(activeTab.innerText == "博客"){
                            var url = this.suggestUrl[tabIndex][1];
                            var params = {
                                word:this.keyWord

                            }
                        }
                    }else{
                        //默认是资讯的联想词
                        var url = this.suggestUrl[tabIndex][0];
                        var params = {
                            word:this.keyWord

                        }
                    }

                }else{
                    var url = this.suggestUrl[tabIndex];//不同的tab切换不同的接口
                    var params = {
                        word:this.keyWord

                    }
                }
                if(url){
                    this.HttpCli.get(url,params)
                        .then(function (response) {

                            if(response.data.data.length>7){
                                _this.suggestArray =  response.data.data.slice(0,6);
                            }else{
                                _this.suggestArray =  response.data.data
                            }
                            console.log(response.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            },
            //判断登录
            linkIndex(event){
                console.log(event.target.tagName)
                var logonUrl = '/z-member/member/getUserLoginStatusPhone1';
                this.HttpCli.get(logonUrl)
                    .then(function (res) {
                        if(res.data.message == "未登录"){
                            //eventBus.$emit("tosignIn",{bl:true});
                          location.href = '/mlogin?redirectUrl=/mobMemberCenter/'
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

            },
            handleSearch() {
                //如果输入的是空格，直接跳转对应列表页.replace(/(^s*)|(s*$)/g, "")
                if (this.keyWord) {

                    console.log(this.keyWord)
                    this.show = true;
                    location.href='/searchResult2?tabIndex='+this.$route.query.tabIndex+'&word='+this.keyWord;
                }else{
                    var type = Number(this.$route.query.tabIndex);
                    switch (type) {
                        case 1:
                            type = "product";

                            break;
                        case 2:
                            type = "server";

                            break;
                        case 3:
                            type = "music";

                            break;
                        case 4:
                            type = "information";

                            break;
                        case 0:
                            type = "site";

                            break;
                    }
                    this.$router.push({
                        path: type

                    });
                }

           /*    this.computedPath();
               this.render();*/


            },
            placeholderF(index) {
                var type = Number(index);
                switch (type) {
                    case 1:
                        type = "搜产品";
                        this.placeholder = type;
                        break;
                    case 2:
                        type = "搜服务";
                        this.placeholder = type;
                        break;
                    case 3:
                        type = "搜音频";
                        this.placeholder = type;
                        break;
                    case 4:
                        type = "搜资讯";
                        this.placeholder = type;
                        break;
                    case 0:
                        type = "搜模板";
                        this.placeholder = type;
                        break;
                }
            },
            switchTab(route, index,type) {
                var _this = this;
                //关键词为空时
                  /* if(this.keyWord == "") return;*/
                    var slideLeft = (this.$refs.slideBox.offsetWidth / 5) * index + 8;
                    var slideBtmObj = this.$refs.slideBtmLine;
                    this.currentNum = index;
//
//                    if(type==1){//初始进入不重置缓存为0 点击五个模块的tab分类设置音频,资讯的分类为初始0
//                        localStorage.setItem('saveIndex',0)
//                        sessionStorage.setItem("infortabchange",0);
//                    }
             /*       this.$router.push({
                        path: "/searchResult2",
                        query: {
                            tabIndex: this.currentNum,
                        }
                    });*/
                   this.slideBtmShowClass = false;
                    slideBtmObj.style.left = slideLeft + "px";
                    this.computedPath();
                    this.render();
                    this.placeholderF(index);
                    //当前tab不跳转

                   if(index == Number(this.$route.query.tabIndex) || !this.$route.query.word) {
                     this.$router.push({
                        path: "/searchResult2",
                        query: {
                             tabIndex: this.currentNum,
                             word:this.keyWord
                        }
                      });

                   }else{
                     setTimeout(function(){
                       location.href='/searchResult2?tabIndex='+_this.currentNum+'&word='+_this.keyWord;
                     },500)
                   }

            },
            //隐藏下拉
            dropHide(){
                this.suggestArray = [];
            },
            returnBack() {
                //点击关闭回到原来的页面位置
                var queryIndex = this.$route.query.tabIndex;
               var detailtype = this.$route.query.type;

                var routePath = [
                    "/site",
                    "/product",
                    "/server",
                    "/music",
                    "/information"

                ];
                if(detailtype == 1){
                    history.back()
                }else{
                location.href = `${routePath[queryIndex]}`;
                }
              //location.href = `${routePath[queryIndex]}`;

                // this.$router.push({
                //     path: routePath[queryIndex]
                // });
                // eventBus.$emit("toSearch",true);
            },
            computedPath() {
                var componentType = this.$route.query.tabIndex;

                switch (Number(componentType)) {
                    case 1:
                        this.componentPath = "product/searchResultProduct.vue";
                        break;
                    case 2:
                        this.componentPath = "service/searchResultService.vue";
                        break;
                    case 3:
                        this.componentPath = "audio/searchResultAudio.vue";
                        break;
                    case 4:
                        this.componentPath = "information/informationResult.vue";
                        break;
                    case 0:
                        this.componentPath = "website/searchResultWebsite.vue";
                        break;
                }

            },
            //选中下拉直接搜索
            startSearch(index){
                this.keyWord = this.suggestArray[index];
              location.href='/searchResult2?tabIndex='+Number(this.$route.query.tabIndex)+'&word='+this.keyWord;
                this.suggestArray = [];
                this.computedPath();
                this.render();
            },
            //输入词联想
            inputChange(){
                if(this.timeout){
                    clearTimeout(this.timeout)
                }
                this.timeout = setTimeout(() => {
                    if(this.keyWord){
                        this.getListData(this.keyWord);
                        this.timer = undefined;
                    }else{
                        this.suggestArray = [];
                    }
                }, 500);
            }
        },

        watch: {

        },
        directives:{
            focus:{       //获焦
                inserted:function (el,binding) {
                    el.focus()


                }
            }
        },
        components: {},
        destroyed() {

          /*localStorage.removeItem('myKeyword');*/
        }
    };
</script>

<style lang="scss"  scoped>
  .searchScrolltop {
    height: 79px;
    position: absolute;
    top: 0;
    width:100%;
    transition: all 0.5s;
  }

  .searchScrolltopHide {
    top: -90px;
  }

  .searchResultContent {
    position: absolute;
    top: 88px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    transition: all 0.5s;
  }

  .searchResultContenthide {
    top: 0px;
  }

  .haveData {
    top: 120px;
  }

  .searchBox {
    position: absolute;
    width: 100%;
    top: 0 !important;
    bottom: 0;
    background: #fff;
    z-index: 99;
  }

  .commonHead {
    height: 46px;
    width: 100%;
    background-color: rgb(47, 183, 236);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    transform: translateY(0px);
    transition: transform 0.25s ease 0s;

    .commonLeft {
      width:46px;
      .leftIcon {
        width: 30px;
        font-size: 0;
        margin: 10px 10px;

        span {
          display: inline-block;
          width: 20px;
          height: 3px;
          background: #fff;
          margin: 2px 0;
          border-radius: 2px;
        }
      }
      .memberCenter{
        width: 46px;
        padding: 10px 0;
        .logo{
          display:inline-block;
          width:20px;
          height:20px;

          background:url(../../assets/images/memberCenter.png) no-repeat;
          background-size: cover;
        }
      }
    }

    .searhInput {
      width: 220px;
      font-size: 16px;
      color: #fff;
      position: relative;
      height: 34px;
      line-height: 34px;
      background: #fff;
      border-radius: 2px;

      input {
        width: 100%;
        border-radius: 4px;
        outline: none;
        font-size:14px;
        color:#122F46;
        -webkit-appearance:none;
        padding-right: 30px;
        padding-left: 10px;

      }
      input:focus{
        color:#122F46;
      }
    }

    .commonRight {
      position: absolute;
      right: 10px;
      top:0;

      .searchLogo {
        display: inline-block;

        i {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: url('/images/returnPRE.png') no-repeat;
          background-size: cover;
          margin: 15px 10px;
        }
      }
    }
  }

  .slide {
    ul {
      display: flex;
      justify-content: space-around;
      background: #fff;

      .slideTab {
        height: 33px;
        line-height: 33px;
        width: 20%;
        font-size: 14px;
        color:#122F46;
        position: relative;
      }
    }
  }

  .transtionLine {
    position: absolute;
    width: 100%;
    z-index:-1;
    span {
      display: inline-block;
      height: 4px;
      width: 50px;
      background: #2FB7EC;
      position: absolute;
      left: 10px;
      transition: all 0.5s;
    }
  }

  .tab-slide-container {
    position: absolute;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .cube-tab-bar {
    height: 42px;
    background: #fff;

    .cube-tab-bar-slider {
      height: 4px;
    }
  }

  .searchLogoBox {
    position: absolute;
    width: 34px;
    height: 34px;
    right: 0px;
    top: 0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 99;

    i {
      width: 20px;
      height: 20px;
      display: inline-block;
      background: url('/images/searchLog.png') no-repeat;
      background-size: cover;
    }
  }

  .searchTitle {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;

    .left {
      float: left;
    }

    .right {
      float: right;

      i {
        display: inline-block;
        height: 10px;
        width: 10px;
        background: url('/images/filterIcon.png') no-repeat;
        background-size: cover;
      }
    }
  }
  .searchSelectDrop{
    position: absolute;
    text-align: left;
    background: #fff;
    color: #000;
    box-shadow: 0 0 5px rgba(0,0,0,0.35);
    left: 46px;
    width: 220px;
    top: 42px;
    z-index: 100;
  }
  .searchSelectDrop li{
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
  .searchSelectDrop li:active{
    background:rgba(41,106,206,0.1);
  }
  input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-size: 12px;
    color: #77B9F0;
  }
  .searhInput input:focus{
    color: #122f46;
  }
  .dropWrap{
    position: absolute;
    top: 2.96875rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background:rgba(0,0,0,0);
    z-index: 99;
  }
  .slideTabR.active:after{
    content: "";
    width: 50px;
    height: 4px;
    background: #2FB7EC;
    position: absolute;
    bottom: -4px;
    left: 7px;

  }
</style>
