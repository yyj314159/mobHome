<template>

    <div class='webSiteBox slideContent' >
        <div class='webSiteScreen on' v-show="onClass">
            <p>千余精美模板，任您选择</p>
            <p @click="screenFilter"><span>筛选</span><i class='filterIcon'></i></p>
        </div>
        <div v-show="filterShow" class='shadow' @click="onClose"  @touchmove.prevent></div>
        <FilterWebsite v-show="filterShow" v-on:postScreen='getScreen' :filterShow=filterShow :pageData=pageData v-on:postFilterShow='getFilterShow'></FilterWebsite>
        <div class="templateList" ref='viewBox'>
            <cube-scroll ref="contentScroll" :scroll-events="['scroll']" @scroll="scroll"    :data='items' :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="webSiteContent">
                    <div class="webBannerBox">
                        <Rotation :items="videoList" />
                    </div>
                </div>
                <div class='webSiteScreen'>
                    <p>千余精美模板，任您选择</p>
                    <p @click="screenFilter"><span>筛选</span><i class='filterIcon'></i></p>
                </div>
                <Loading v-show="isNodata==false&&isDataShow==false"></Loading>
                <div class="noneData" v-show="isNodata">
                    <img src="/images/noData.png" alt="">
                </div>
                <ul v-show="isDataShow">
                    <li class='templateCon' v-for='item in items' :key="item.id">
                        <!-- +item.fVersion -->
                        <a class='imgBox' href="JavaScript:;"  @click="toMallInfo(item.fTemplateId)">
                            <div class="imgBoxPC">
                                <!-- <div class="pc-top"><span><i></i><i></i><i></i></span></div> -->
                                <div class='pc-con'>
                                    <img v-bind:src="item.fUrl" alt="" >
                                </div>
                            </div>
                            <div class='imgBoxMob'>
                                <div class='mob-con'>
                                     <img v-bind:src="item.fUrl2" alt="" >
                                </div>
                            </div>
                        </a>
                        <div class='iconBottom'><img src="/images/iconBottom.png" alt=""></div>
                        <p class='abc'>
                            <a href="JavaScript:;" class='t-name'  @click="toMallInfo(item.fTemplateId)">{{item.fName}}</a>
                            <span>
                                <i class="t-price">{{item.fIsFree|templatePrice(item.fAmount)}}</i>
                                <a href="JavaScript:;" class="t-look"  @click="toMallInfo(item.fTemplateId)">预览</a>
                            </span>
                        </p>
                    </li>
                </ul>
                <template slot="pulldown" slot-scope="props">
                    <div v-if="props.pullDownRefresh"
                        class="cube-pulldown-wrapper"
                        :style="props.pullDownStyle">
                        <div v-if="props.beforePullDown"
                        class="before-trigger"
                        :style="{paddingTop: props.bubbleY + 'px'}">
                        <!-- <span :class="{rotate: props.bubbleY > 0}"></span> -->
                        </div>
                        <div class="after-trigger">
                        <div v-show="props.isPullingDown" class="">
                            <Loading></Loading>
                        </div>
                        </div>
                    </div>
                </template>
                <template slot="pullup" slot-scope="props">
                    <div v-if="props.pullUpLoad"
                    class="before-trigger"
                    :style="{paddingTop: props.bubbleY + 'px'}">
                    <!-- <span :class="{rotate: props.bubbleY > 0}"></span> -->
                    </div>
                    <div class="after-trigger">
                        <div v-show="props.pullUpLoad" class="">
                            <template>
                                <div v-if='dataNone' class="isDataNone">已经到底啦！</div>
                                <div v-else>
                                    <Loading></Loading>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </cube-scroll>
        </div>
        <div class='backTop' v-show='isTop' @click='onBackTop'></div>
        <!--<a  v-show="isUrl" href="https://www.zuma.com/wap/service_wap/zmNoteWapService/toMailServiceDetail?fId=2035&dbSource=1&zmFrom=3&zmType=2" class='siteOnline'></a>-->
    </div>

</template>
<script>
    import SearchInput from '../public/commonsearch.vue';
    import Loading from "../public/loading";
    import { clearInterval, setTimeout } from 'timers';
    import { type } from 'os';
    import MethodsUtil from "~/assets/js/MethodsUtil";
    import Rotation from "../public/Rotation.vue";
    import FilterWebsite from './searchFilterWebsite.vue';
    import eventBus from "~/assets/js/eventBus";
    export default {
        name: 'website',
        components:{
            SearchInput,
            Rotation,
            FilterWebsite,
            Loading
        },
        data(){
            return{
                videoList:[
                    {
                        url:'/M_webSite',
                        image:require("../../static/images/template1.jpg")
                    },
                    {
                        url:'/M_webSite',
                        image:require("../../static/images/template2.jpg")
                    },
                    {
                        url:'/M_webSite',
                        image:require("../../static/images/template3.jpg")
                    },
                    {
                        url:'/M_webSite',
                        image:require("../../static/images/template4.jpg")
                    }
                ],
                items:[], //模板列表.
                isShowNone:true,
                isNodata:false,
                isDataShow:false,
                options: {
                    // pullDownRefresh: {threshold: 0},
                    pullDownRefresh:false,
                    bounce:false,
                    pullUpLoad: false},
                pageNow:1,
                pageSize:10,
                scrollTopVal:0,
                isTop:false,//是否显示回到顶部
                dataNone:false,//是否显示已经到底
                isPullUp:true, //下拉是否添加数据
                navList:[{iconSrc:'/img/shopCar.png',navTitle:'购物车'}],
                filterShow:false,//展示筛选
                screenName:{
                    largeName:'',
                    smallName:'',
                    priceNum:''
                },
                onClass:false,
                isUrl:false,
                upHeight:''
            }
        },
        props:[
            'pageData'
        ],
        methods:{
            toMallInfo: function(fTemplateId){
                console.log(fTemplateId)
                var newFTemplateIdId=fTemplateId.toLowerCase();
                var url='/pre/'+newFTemplateIdId;
                window.location.href=url;
            },
            onClose:function(){ //关闭
                this.filterShow=false;
            },
            getScreen:function(largeName,smallName,priceNum){
                this.screenName.largeName=largeName;
                this.screenName.smallName=smallName;
                this.screenName.priceNum=priceNum;
            },
            getFilterShow:function(filterShow){
                this.filterShow=filterShow;
            },
            screenFilter:function(){
                this.filterShow=true;
            },
            scroll:function(dis){
                this.scrollTopVal = -dis.y;
            },
            onBackTop:function(){
                this.$refs.contentScroll.scrollTo(0, 0, 1000);
            },
            onPullingUp() {
                if(this.isPullUp){
                    this.pageNow++;
                    setTimeout(() => {
                        this.getData(this.pageNow,this.pageSize,true,this.screenName.largeName,this.screenName.smallName,this.screenName.priceNum);
                    }, 500)
                    this.$refs.contentScroll.refresh();
                }else{
                    this.pageNow=1;
                    this.$refs.contentScroll.forceUpdate();
                }
            },
            onPullingDown() {
                // this.pageNow=1;
                // this.$refs.contentScroll.refresh();
                // setTimeout(() => {
                //     this.items=this.getData(this.pageNow,this.pageSize,false,this.screenName.largeName,this.screenName.smallName);
                // }, 1000)
            },
            imgAutoAdapt:function(e){
                MethodsUtil.imgAutoAdapt(e.target,true)
            },
            getData:function(pageNow,pageSize,isPullUpFlag,largeName,smallName,priceNum){
                this.HttpCli.get(
                    // "/WebsiteCon/manage-api/template/queryTemplateByAnyConditionsToES?pageNow="+pageNow+"&pageSize="+pageSize+'&fLargeCategoryName='+largeName+'&fSmallCategoryName='+smallName,
                    "/manage-api/template/queryTemplateByAnyConditionsToES?pageNow="+pageNow+"&pageSize="+pageSize+'&fLargeCategoryName='+largeName+'&fSmallCategoryName='+smallName+'&fAmount='+priceNum,
                ).then((res)=>{
                    this.$refs.contentScroll.enable();
                    let listCount=res.data.data.count
                    let listData=res.data.data.content;
                    this.isDataShow=listCount>0?true:false;
                    this.isNodata=listCount==0?true:false;
                    if(listCount==0){
                            this.options.pullUpLoad=false;
                        }else{
                            this.options.pullUpLoad=true;
                        }
                    if(listData.length<pageSize){
                        this.dataNone=true;
                        this.isPullUp=false
                    }else{
                        this.dataNone=false;
                        this.isPullUp=true;
                    }
                    if(res.data.status==0){
                        if(isPullUpFlag==true){
                            this.items=this.items.concat(listData);
                        }else{
                            this.items=listData;
                        }
                    }
                    this.$nextTick(() => {
                        if(this.upHeight=document.getElementsByClassName('webSiteContent')[0]){
                            this.upHeight=document.getElementsByClassName('webSiteContent')[0].clientHeight;
                        }
                    })

                }).catch((err)=>{
                      console.log(err)
                })
            },
            getFirstData:function(){
                let res=this.pageData.templateList;
                if(res){
                    let pageSize=this.pageData.obj.pageSize;
                    let listCount=res.count;
                    let listData=res.content;
                    this.isDataShow=listCount>0?true:false;
                    this.isNodata=listCount==0?true:false;
                    if(listCount==0){
                        this.options.pullUpLoad=false;
                    }else{
                        this.options.pullUpLoad=true;
                    }
                    if(listData.length<pageSize){
                        this.dataNone=true;
                        this.isPullUp=false
                    }else{
                        this.dataNone=false;
                        this.isPullUp=true;
                    }
                    this.items=listData;
                }else{
                    this.isNodata=true;
                }

            }
        },
        mounted(){
            let nowUrl=window.location.href;
            if(nowUrl.indexOf('www.zuma.com')==-1){
                this.isUrl=false;
            }else{
                this.isUrl=true;
            }
            this.$nextTick(() => {
                    if(this.upHeight=document.getElementsByClassName('webSiteContent')[0]){
                        this.upHeight=document.getElementsByClassName('webSiteContent')[0].clientHeight;
                    }
                })
        },
        created(){
            setTimeout(()=>{
                // this.getData(this.pageNow,this.pageSize,false,this.screenName.largeName,this.screenName.smallName);
                this.getFirstData();
            },500)
        },
        filters:{
            templatePrice:function(value,fAmount){
                if(value==0){
                    return '免费'
                }else if(value!=0){
                   return '¥'+fAmount
                }
            }
        },
        watch:{
            scrollTopVal:{
                handler:function(newVal,oldVal){
                    if(newVal>=800){
                        this.isTop = true;
                    }else{
                        this.isTop = false;
                    };
                    if(newVal>this.upHeight){
                        this.onClass=true;
                    }else{
                        this.onClass=false;
                    }
                    if(newVal-oldVal>0 && this.scrollTopVal >0){//上划
                        eventBus.$emit("scrollTop",true);
                    }else{
                        eventBus.$emit("scrollTop",false);
                    }
                },
                deep:true,
                // immediate:true,
            },
            screenName:{
                handler:function(newVal,oldVal){
                    this.isNodata=false;
                    this.isDataShow=false;
                    this.pageNow=1;
                    this.$refs.contentScroll.disable();
                    setTimeout(()=>{
                        this.getData(this.pageNow,this.pageSize,false,this.screenName.largeName,this.screenName.smallName,this.screenName.priceNum);
                    },500)
                    this.$refs.contentScroll.scrollTo(0, 0, 1);
                },
                deep:true,
            },
        }
};
</script>

<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0;
        cursor: pointer;
        box-sizing:border-box;
        -webkit-tap-highlight-color:transparent;
        -webkit-overflow-scrolling:touch;
    }
    .templateList.on{
        top:38px;
    }
    .templateList .spinner{
        -webkit-tap-highlight-color:transparent;
        margin: 0 auto;
        height: 54px;
        line-height: 54px;
    }
    input,textarea{
        -webkit-appearance: none;
    }
    .shadow{
        overflow: hidden;
        position: fixed;
        top: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        z-index: 5;
    }
    // .webSiteScreen.onHidden{
    //     visibility: hidden;
    // }
    .webSiteScreen.on{
        position: absolute;
        width: 100%;
        background: #fff;
        z-index: 4;
    }
    .webSiteScreen{
        height: 38px;
        padding: 0 10px;
        line-height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
            font-size: 12px;
            color: #122F46;
        }
        span{
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
        }
        .filterIcon{
            display: inline-block;
            vertical-align: middle;
            width: 14px;
            margin-left: 6px;
            height: 14px;
            background:url('/images/filterIcon.png')  50% 50% no-repeat;
            background-size: 100%;
        }
    }
    #app{
        position: relative;
        background: #fff;
    }
    .btn-group-vertical{
        height: 40px;
    }
    .btn-group-vertical .commonSearch{
        height: 40px;
    }
    .btnOk-icon{
        width: 200px;
        height: 120px;
        background-color:rgba(0,0,0,0.6);
        p{
            margin: 0 auto;
            width: 43px;
            height: 43px;
            background:url('/images/gotoTop.png')  50% 50% no-repeat;
            background-size:43px 43px;
        }
        span{
            text-align: center;
            width: 100%;
            display: inline-block;
            padding: 0 10px;
            font-size: 12px;
        }
    }
    .siteOnline{
        width: 40px;
        height: 40px;
        position: fixed;
        right: 10px;
        bottom:60px;
        font-size: 10px;
        color: #122f46;
        border-radius: 50%;
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.2);
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        z-index: 1;
        background:#fff url('/images/pT.png') 50% 50% no-repeat;
        background-size: 100%;

    }
    .backTop{
        width: 40px;
        height: 40px;
        position: fixed;
        right: 10px;
        bottom:10px;
        border-radius: 50%;
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.2);
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        z-index: 1;
        background:#fff url('/images/gotoTop.png')  50% 50% no-repeat;
        background-size: 16px 18px;
    }
    .isDataNone{
        display: inline-block;
        width: 100%;
        height:45px;
        line-height: 45px;
        text-align: center;
        color: #b1c9d3;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .abc{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    body{
        background: #f7f7f7;
    }
    body,html{
        overflow: hidden;
        position: relative;
        height: 100%;
    }
    #app{
        height: 100%;
    }
    .webBannerBox{
        overflow: hidden;
        width: 100%;
        height: 110px;
        .cube-slide-item{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .templateList{
        overflow-y: auto;
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        top:0px;
        ul{
            padding: 0 10px;
            margin-top: 10px;
            background: #fff;
        }
        .templateCon{
            margin-bottom: 30px;
            .iconBottom{
                width: 100%;
                img{
                    width: 100%;
                }
            }
            .imgBox{
                display: block;
                width: 300px;
                height: 175px;
                overflow: hidden;
                position: relative;
                .imgBoxPC{
                    background:url('../../static/images/webSiteBoxPC.png') 50% 50% no-repeat;
                    background-size: 100%;
                    overflow: hidden;
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    width: 238px;
                    height: 175px;
                    padding: 16px 3px 3px 3px;
                    span{
                        float: left;
                        margin-left: 10px;
                    }
                    .pc-con{
                        // width: 232px;
                        // height: 156px;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        // margin: 16px auto 0 auto;
                        background: #fff;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .imgBoxMob{
                    position: absolute;
                    overflow: hidden;
                    right: 0px;
                    bottom: 0px;
                    width: 78px;
                    height: 149px;
                    padding: 11px 2px 11px 2px;
                    background:url('../../static/images/webSiteBoxMob.png') 50% 50% no-repeat;
                    background-size:100%;
                    .mob-con{
                        // width: 74px;
                        // height: 127px;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background: #fff;
                        margin: auto;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
            }
            p{
                width: 100%;
                height:28px;
                line-height: 28px;
                margin-top: -10px;
                .t-name{
                    font-size: 14px;
                    width: 168px;
                    height: 28px;
                    overflow: hidden;
                    color: #122F46;
                    font-family:"黑体";
                    text-align: left;
                }
                .t-price{
                    font-size:12px;
                    color: #718290;
                    font-style: initial;
                }
                .t-look{
                    width: 75px;
                    height: 28px;
                    display: inline-block;
                    font-size: 12px;
                    border: 1px dotted #122F46;
                    line-height: 28px;
                    text-align: center;
                    color: #122F46;
                    font-family: 'Arial';
                    margin-left: 15px;
                }
            }
        }
    }
    .noneData{
        margin-top: 35px;
        img{
            width: 109px;
            height: 73px;
        }
    }
</style>
