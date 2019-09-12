<template>
    <div class="bigDiv">
        <div class="wrapCont" v-if="searchErr">
            <div class="contList" id="contListH">
                <cube-scroll
                    ref="scroll"
                    :data="serviceList"
                    :options="options"
                    :scroll-events="['scroll']"
                    @scroll="onScrollHandle"
                    @pulling-up="onPullingUp"
                >
                    <banners :items="imgs" v-if="hasBanner"></banners>
                    <Loading class="loadings" v-show="enterShow"></Loading>
                    <div class="sList">
                        <a v-for="(i,index) in serviceList" :key="index" :href="i.fServiceWapUrl">
                            <div class="imgBox">
                                <div class="mainImg">
                                    <img :src="i.fMainImage" alt="">
                                </div>
                                <div class="sType tLeft" v-if="checkShowSome(i) != ''">
                                    <!-- <span class="">{{i|checkShowSome}}</span> -->
                                    <span class="">{{checkShowSome(i)}}</span>
                                </div>
                                <div class="sType tRight" v-if="checkHasFormula(i) != ''">
                                    <!-- <span class="">{{i|checkHasFormula}}</span> -->
                                    <span class="">{{checkHasFormula(i)}}</span>
                                </div>
                                <div class="sType tBottom">
                                    <!-- <span class="">{{i.fServiceType|checkServiceType}}</span> -->
                                    <span class="">{{checkServiceType(i.fServiceType)}}</span>
                                </div>
                            </div>
                            
                            <div class="mainTxt">
                                <div class="">
                                    <div class="">
                                        <span class="RMBicon">￥</span>
                                        <span class="sPrice">{{i.fServicePriceStr}}</span>
                                    </div>
                                    <p class="" v-html="i.fServiceName"></p>
                                </div>
                            </div>
                        </a>
                        <div style="width:100%;" class="the-end" v-if="theEnd1">已经到底啦！</div>
                    </div>
                    <template slot="pullup" slot-scope="propsa">
                        <div v-show="propsa.pullUpLoad">
                            <template>
                               <div v-show="showLoading">
                                    <Loading class="loadings"></Loading>
                                </div>
                                <!-- <span v-else>{{propsa.txt}}</span> -->
                                <div class="the-end" v-show="theEnd">已经到底啦！</div>
                            </template>
                        </div>
                    </template>
                </cube-scroll>
            </div>
        </div>
        <!--回到顶部-->
        <div class="gotoTop" @click="scrollToTop" v-if="showGoTop">
            <img src="images/gotoTop.png" alt="">
        </div>
        <!-- <searchFilterService></searchFilterService> -->
    </div>
</template>

<script>
import { Scroll } from "cube-ui";
import Loading from "../public/loading";
import eventBus from "../../assets/js/eventBus"
import banners from "../public/Rotation"; //引入轮播组建
import Interface from "../../assets/js/ConstStr";
// import https from "../../assets/js/HttpCli";
// import searchFilterService from "./searchFilterService"
export default {
    props:{
       sKey : String,
       hideBanner : Boolean,
       pageData : Object,
       resultdata : Object
    },
    // ['sKey','hideBanner','pageData'],
    data() {
        return{
            hasBanner : true, //是否展示 banner
            enterShow : true, //是否加载进场动画  //nuxt,
            serviceList : [],
            page: 1,
            showGoTop : false,      
            showLoading : false,
            // serviceapiType:process.env.NODE_ENV,
            // servicedefaultUrl:process.env.VUE_APP_BASE_API,
            theEnd : false,
            theEnd1 : false,
            pullDownY : 0,
            serviceCont : 0,
            serviceDataLenth : null,
            newObj : {}, //新传入的对象
            origin : true, //默认列表页加载
            filterPage : 1, //筛选条件翻页   
            imgs: [  //轮播数据  
                { image: '/images/service1.jpg', url: "/M_service" },
                { image: '/images/service2.jpg', url: "/M_service" },
                { image: '/images/service3.jpg', url: "/M_service" }
            ] ,
            searchErr : false,
            isChoose : null,
        }
    },
    components: {
        banners,
        Loading,
        // searchFilterService
    },
    methods: {
        checkShowSome(l) { 
            if(l.fPayType == 0){
                if(l.fTakeType == null){
                    return ""; 
                }else{
                    if(l.fHasVariant == 1){
                        return ""; 
                    }else{
                        if(l.fTakeType == 1){
                            return l.fTake+"分钟";     
                        }else if(l.fTakeType == 2){
                            return l.fTake+"小时";   
                        }else{
                            return "";
                        }
                    }
                    
                }
            }else if(l.fPayType == 1){
                if(JSON.parse(l.fPayList).payTypeselect == 1){
                    return "诚意金";
                }else if(JSON.parse(l.fPayList).payTypeselect == 2){
                    return "定金";   
                }
            }else if(l.fPayType == 2){
                if(l.fTakeType == 3){
                    return "按天付";     
                }else if(l.fTakeType == 4){
                    return "按月付";   
                }
            }
        },
        checkHasFormula(m) { 
            if(m.fHasFormula == 0){
                if(m.fHasVariant == 1 && m.fHasFormulaNum > 0){
                    return "在线计价"; 
                }else if(m.fHasVariant == null || m.fHasVariant == 0){
                    return ""; 
                }else{
                    return ""; 
                }
            }else if(m.fHasFormula == 1){
                return "在线计价"; 
            }else if(m.fHasFormula == null){
                return ""; 
            }
           
        },
        checkServiceType(n) { 
            switch (n){
                case 1: return "上门"; break;
                case 2: return "到店"; break;
                case 3: return "线上"; break;
                case 4: return "电话"; break;
                case 5: return "代办"; break;
            };  
        },
        onScrollHandle(pos){
            this.pullDownY = -pos.y;
            // if(this.pullDownY < -1000){
            //     this.showGoTop = true;
            // }else{
            //     this.showGoTop = false; 
            // }
        },
        getData:function(obj){
            // console.log("进入请求");
            // let serviceApi = '';
            // if(this.serviceapiType == 'development') {
            //     serviceApi = '/services';
            // }else{
            //     serviceApi = '';
            // }
            this.HttpCli.get(
                // videoApi+"/service/webbuilder-api/search/searchService",
                // serviceApi+Interface.serviceSearchKeyWord,
                Interface.serviceSearchKeyWord,
                obj
            ).then((res)=>{
                if(res.data.status == 0){
                    // this.enterShow = false;
                    this.theEnd1 = false;
                    let data = res.data.data.content;
                    if(res.data.data.count <= 0){
                        this.$emit("showNum",res.data.data.count);
                        if(this.isChoose){
                            this.enterShow = false; //nuxt
                            this.$emit("hideTit",true);
                            this.$emit("hidePrev",true);//给父组件传值
                        }else{
                            
                            this.showLoading = false;
                            this.theEnd1 = true;
                        }
                       
                        // this.$refs.scroll.disable();
                        // this.$emit("showNum",res.data.data.count);
                        // this.$emit("hideTit",true);
                        this.$emit("noData",true);//给父组件传值
                       
                        return;
                    }else{
                        this.$refs.scroll.enable();
                        this.$emit("hidePrev",false);//给父组件传值
                    }
                   
                    this.serviceCont = res.data.data.count;
                    this.$emit("showNum",this.serviceCont);
                    // console.log(data.length,'<<<<<<<<<<');
                    data && (this.serviceDataLenth += data.length);
                    // console.log(this.serviceDataLenth,'$$$$$$$$$$');
                    // this.page++;
                    setTimeout(()=>{
                        this.serviceList.push(...data);
                        this.enterShow = false; //nuxt
                        this.showLoading = true;
                        // this.enterShow = false;
                        // this.$emit("showNum",this.serviceCont);
                        this.$emit("hideTit",true);
                    },500)
                    if(res.data.data.count <= 2){
                        this.showLoading = false;
                        setTimeout(()=>{
                            this.theEnd1 = true; 
                        },600)
                        this.$refs.scroll.disable();
                    }else{
                        this.$refs.scroll.enable();
                    }
                }else if(res.data.status == 1){
                    setTimeout(()=>{
                        this.showLoading = false;
                        this.enterShow = false; //nuxt
                        this.theEnd = false;
                        this.$refs.scroll.disable();
                        this.$emit("showNum",0);
                        this.$emit("hideTit",true);
                        this.$emit("noData",true);//给父组件传值
                        this.$emit("hidePrev",true);//给父组件传值
                        return;
                    },500)
                }
            }).catch((err)=>{
                console.log(err,"出错了!!!");
            });
        },
        onPullingUp:function() {
            if (this.serviceDataLenth ==  this.serviceCont) {
                // console.log('111###');
                this.showLoading = false;
                this.theEnd = true;
                this.$refs.scroll.forceUpdate();
                this.$refs.scroll.refresh();
            }else{
                // console.log('222###');
                if(this.origin){
                    this.page++;
                    this.getData({pageSize:30,pageNow:this.page});
                }else{
                    this.filterPage++;
                    this.newObj.pageSize = 30;
                    this.newObj.keyword = this.sKey;
                    this.newObj.pageNow = this.filterPage;
                    this.getData(this.newObj);
                }
                this.$refs.scroll.forceUpdate();
                this.$refs.scroll.refresh();
            }
        },
        scrollToTop:function() {
            this.$refs.scroll.scrollTo(0, 0, 2000);
        }
    },
    created(){
        // console.log(this.pageData,"kkkkkk%%%%%%%%%%%%%%%%%%%%%%");
        // console.log(this.resultdata,"kkkkkk%%%%%%%%%%%%%%%%%%%%%%");
        this.enterShow = false;
        if(this.pageData){
            this.searchErr = true;
            this.serviceList = this.pageData.serverList.content
        }else{
            // console.log(this.sKey,'hhh');
            // console.log(this.resultdata,'hhh');
            // document.getElementById("contListH").style.height = 'calc(100% - 38px)'; 
            this.origin = false;      
            this.$emit("showNum",this.resultdata.list.count);
            if(this.resultdata.list.count == 0){
                this.showLoading = false;
                this.enterShow = false; //nuxt
                this.theEnd = false;
                this.searchErr = false;
                // this.$refs.scroll.disable();
                this.$emit("hideTit",true);
                this.$emit("noData",true);//给父组件传值
                this.$emit("hidePrev",true);//给父组件传值
                return;
            }else{
                this.searchErr = true;
                this.serviceList = this.resultdata.list.content;
                this.serviceCont = this.resultdata.list.count;
                this.serviceDataLenth += this.resultdata.list.content.length;
            }
            
            // this.getData({pageSize:30,pageNow:this.page,keyword:this.skey});
        } 
    },
    mounted() {
        // console.log(this.hideBanner,"xxxxxxxxxx");
        // this.showLoading = !this.hideBanner;
        // this.enterShow = this.hideBanner;
        this.hasBanner = !this.hideBanner;
        this.$emit("showkeys",this.sKey);
        eventBus.$off("tOf");
        eventBus.$on("tOf",(bool)=>{
            // console.log(bool,"kkkkkkkkkkkkkkk");
            this.isChoose = !bool;
            this.theEnd1 = bool;
            this.enterShow = !bool; //nuxt
            this.showLoading = bool;
            this.$emit("hidePrev",bool);//给父组件传值
        }); 
        eventBus.$off("sendServiceData");
        eventBus.$on("sendServiceData",(res)=>{//搜索关键字以及条件
            // console.log(res);
            this.$emit("hideTit",false);
            this.filterPage = 1;
            this.theEnd = false;
            this.showLoading = true,
            this.origin = false;
            res.pageSize = 30;
            res.pageNow = 1;
            res.keyword = this.sKey;
            this.serviceList = [];
            this.serviceDataLenth = null;
            this.newObj = res;
            this.getData(this.newObj);
            this.$emit("showkeys",this.sKey);
        })
      
        if(this.sKey){//只搜索关键字
            this.$emit("hideTit",true);
         // this.$refs.scroll.disable();
        //     // let WinH = document.documentElement.clientHeight;
        //     // let h1 = document.querySelector(".commonHead").offsetHeight;
        //     // let h2 = document.querySelector(".slide").offsetHeight;
        //     // let h3 = document.querySelector(".searchTit").offsetHeight;
            // document.getElementById("contListH").style.height = 'calc(100% - 38px)'; 
        //     this.origin = false;      
        //     this.newObj.pageSize = 30;
        //     this.newObj.pageNow = this.filterPage;
        //     this.newObj.keyword = this.sKey;
        //     this.getData(this.newObj);
        }else{//默认进来列表页
        //     // let h1 = document.querySelector(".head").offsetHeight;    
        //     // document.getElementById("contListH").style.top = h1+"px";      
        //     // this.getData({pageSize:30,pageNow:this.page});
        }   
    },
   
    computed: {
        options() {
            return {
                pullUpLoad: {
                    threshold: 0,
                    stop:90,
                    // txt: "更新成功"
                },
                bounce:false,
                scrollbar: true,
            };
        },    
    },
    watch: {
        pullDownY : {
            handler: function(n,o){
                if(n >= 1000){
                    this.showGoTop = true;
                }else{
                    this.showGoTop = false;
                }
                if(n-o > 0 && this.pullDownY > 0){
                    eventBus.$emit("scrollResultTop",true);
                    eventBus.$emit("scrollTop",true);
                }else{
                    eventBus.$emit("scrollResultTop",false);
                    eventBus.$emit("scrollTop",false);
                }
            }
        }
    },

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$mainColor = #122f46
$txtColor = #718290
.bigDiv
    height 100%
    // position absolute
.wrapCont
    height 100%
    // position absolute
    .contList
        height 100%
        // position absolute
        // bottom 0
        // left 0
        // right 0
        // top 86px
        background #fff
        // .sBanner
        //     width 320px
        //     height 101px
        //     background url('common/images/product.jpg') 0 0 no-repeat
        //     background-size 100%
        //     margin-top 6px
        .sList
            display flex
            flex-wrap wrap
            a
                box-sizing border-box
                width 145px
                height 205px
                margin 8px 0 10px 10px
                background #fff
                overflow hidden
                display block
                &:last-child
                    // margin-bottom 0 
                .imgBox
                    width 145px
                    height @width
                    position relative
                    .mainImg
                        width 100%
                        height @width
                        img 
                            width 100%
                            height @width
                            object-fit cover
                    .sType
                        position absolute
                        height 20px
                        line-height @height
                        padding 0 8px
                        background $mainColor
                        &.tLeft
                            left 0
                            top 0
                        &.tRight
                            right 0
                            top 0
                        &.tBottom   
                            width 40px
                            padding 0
                            text-align center
                            right 0
                            bottom 0
                        span    
                            font-size 10px
                            color #fff   
                .mainTxt
                    > div
                        div
                            height 30px
                            line-height @height
                            color $mainColor
                            text-align left
                            span 
                                font-size 12px
                            .RMBicon
                                font-size 10px
                            .sPrice
                                // font-size 14px
                                // font-weight bold
                        
                    p
                        color $txtColor
                        text-align left 
                        font-size 12px
                        word-break break-all      
                        height 28px 
                        line-height 15px 
                        overflow hidden
.the-end
    height 40px       
    line-height @height 
    color #b1c9d3     
    padding 0               
.gotoTop
    width 40px
    height @width
    background #fff
    position fixed
    right 10px
    bottom @right
    border-radius 50%
    box-shadow 0 0 5px rgba(0,0,0,.2) 
    z-index 1
    > img 
        width 16px
        height 18px   
        position absolute
        left 0
        top 0
        right 0
        bottom 0  
        margin auto     
.loadings
    // position absolute
    // bottom 40px
    // box-sizing content-box
    padding-bottom 20px;

</style>

