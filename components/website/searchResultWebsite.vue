<template>
   <div>
        <div class='webSiteScreen' v-show="isNodata==true||isDataShow==true">
            <p>搜到"{{curKeyWord}}"相关结果{{listCount}}个</p>
            <p @click="screenFilter"><span>筛选</span><i class='filterIcon'></i></p>
        </div>
        <div v-show="filterShow" class='shadow' @click="onClose" @touchmove.prevent></div>
        <FilterWebsite v-show="filterShow" v-on:postScreen='getScreen' :filterShow=filterShow  v-on:postFilterShow='getFilterShow'></FilterWebsite>
        <div class="templateList on " ref='viewBox' v-if="isDataShow">
            <cube-scroll ref="contentScroll" :scroll-events="['scroll']" @scroll="scroll"    :data='items' :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <ul>
                    <li class='templateCon' v-for='item in items' :key="item.id">
                        <!-- +item.fVersion -->
                        <a class='imgBox' href="JavaScript:;"  @click="toMallInfo(item.fTemplateId)">
                            <div class="imgBoxPC">
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
                        <div class='iconBottom'><img src="../../static/images/iconBottom.png" alt=""></div>
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
        <Loading v-show="isNodata==false&&isDataShow==false"></Loading>
        <div class="noneData" v-show="isNodata">
            <img src="/images/noData.png" alt="">
        </div>
        <div class='backTop' v-show='isTop' @click='onBackTop'></div>
        <!-- <a  v-show="isUrl" href="https://www.zuma.com/wap/service_wap/zmNoteWapService/toMailServiceDetail?fId=2035&dbSource=1&zmFrom=3&zmType=2" class='siteOnline'></a> -->
        <!-- <Classify v-show="classifyState.isClassify"></Classify> -->
   </div>
</template>
<script>
    import Loading from "../public/loading";
    import MethodsUtil from "~/assets/js/MethodsUtil";
    // import communication from './communication';
    import FilterWebsite from './searchFilterWebsite.vue';
    import eventBus from "~/assets/js/eventBus";
    import {mapState, mapGetters, mapMutations} from 'vuex'
import { setTimeout } from 'timers';
    export default {
        components:{
            Loading,
            FilterWebsite,
        },
         data(){
            return{
                curKeyWord:this.keyword.length>8?this.keyword.substring(0,8):this.keyword,
                isNodata:false,
                items:[], //模板列表.
                isShowNone:true,
                options: {
                    bounce:false,
                    pullDownRefresh:false,
                    pullUpLoad:{threshold: 0}},
                pageNow:1,
                pageSize:10,
                scrollTopVal:0,
                isTop:false,//是否显示回到顶部
                dataNone:false,//是否显示已经到底
                isDataShow:false,//是否有数据
                // keyWord:this.$route.query.keyWord,//路由取搜索关键字 
                isPullUp:true,//下拉是否添加数据
                filterShow:false,//展示筛选
                screenName:{
                    largeName:'',
                    smallName:'',
                    priceNum:''
                },
                listCount:0,
                isUrl:false
                
            }
        },
        props:['keyword','resultdata'],
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
                        this.getData(this.pageNow,this.pageSize,true,this.keyword,this.screenName.largeName,this.screenName.smallName,this.screenName.priceNum);
                    }, 500)
                    this.$refs.contentScroll.refresh();
                }else{
                    this.pageNow=1;
                    this.$refs.contentScroll.forceUpdate();
                }
            },
            onPullingDown() {
                this.pageNow=1;
                this.$refs.contentScroll.refresh();
                setTimeout(() => {
                    this.getData(this.pageNow,this.pageSize,false,this.keyword,this.screenName.largeName,this.screenName.smallName,this.screenName.priceNum);
                }, 500)
            },
            getData:function(pageNow,pageSize,isPullUpFlag,keyword,largeName,smallName,priceNum){
                this.HttpCli.get(
                    // "/WebsiteCon/manage-api/template/queryTemplateByAnyConditionsToES?pageNow="+pageNow+"&pageSize="+pageSize+'&keyWord='+keyword+'&fLargeCategoryName='+largeName+'&fSmallCategoryName='+smallName,
                    "/manage-api/template/queryTemplateByAnyConditionsToES?pageNow="+pageNow+"&pageSize="+pageSize+'&keyWord='+keyword+'&fLargeCategoryName='+largeName+'&fSmallCategoryName='+smallName+'&fAmount='+priceNum,
                ).then((res)=>{
                    let listCount=res.data.data.count
                    this.listCount=listCount;
                    let listData=res.data.data.content;
                    this.isDataShow=listCount>0?true:false;
                    this.isNodata=listCount==0?true:false;
                    if(listData.length<pageSize){
                        this.dataNone=true;
                        this.isPullUp=false;
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
                    // this.$nextTick(()=>{
                    //     let afterTrigger=document.getElementsByClassName('after-trigger')[0]
                    //     if(listCount<pageSize&&listCount>0){
                    //         afterTrigger.setAttribute("style","bottom:-88px;position:absolute;width:100%");
                    //     }else if(listCount==0){
                    //     }else{
                    //         afterTrigger.setAttribute("style","bottom:-88px;position:static;width:100%");
                    //     }
                    // })
                    
                }).catch((err)=>{
                      console.log(err)
                })
            },
             getFirstData:function(){
                    let res=this.resultdata.list
                    if(res){
                        let pageSize=this.resultdata.obj.pageSize;
                        let listCount=res.count
                        this.listCount=listCount;
                        let listData=res.content;
                        this.isDataShow=listCount>0?true:false;
                        this.isNodata=listCount==0?true:false;
                        if(listData.length<pageSize){
                            this.dataNone=true;
                            this.isPullUp=false;
                        }else{
                            this.dataNone=false;
                            this.isPullUp=true;
                        }
                        this.items=listData;
                    }else{
                        this.isNodata=true;
                    }
            },
            imgAutoAdapt:function(e){
                MethodsUtil.imgAutoAdapt(e.target,true)
            }
        },
        mounted(){
            let nowUrl=window.location.href;
            if(nowUrl.indexOf('www.zuma.com')==-1){
                this.isUrl=false;
            }else{
                this.isUrl=true;
            }
        },
        created(){
            setTimeout(()=>{
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
                    if(newVal-oldVal>0 && this.scrollTopVal >0){//上划
                        eventBus.$emit("scrollResultTop",true);
                        this.up=true;
                    }else{
                        eventBus.$emit("scrollResultTop",false);
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
                    if(this.$refs.contentScroll){
                        this.$refs.contentScroll.scrollTo(0, 0, 1);
                    }
                    setTimeout(()=>{
                        this.getData(this.pageNow,this.pageSize,false,this.keyword,this.screenName.largeName,this.screenName.smallName,this.screenName.priceNum);
                    },500)
                    eventBus.$emit("scrollResultTop",false);
                    this.isTop=false;

                },
                deep:true,
            }
        }
    }
</script>

<style lang="scss" scoped>
.commonSearch {
    height: 100%;
}
.templateList.on{
    top:38px;
}

*{
        padding: 0;
        margin: 0;

        cursor: pointer;
        box-sizing:border-box;
        -webkit-tap-highlight-color:transparent;
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
    .shadow{
        overflow: hidden;
        position: fixed;
        top: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        z-index:100;
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
        height: 100px;
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
        .templateCon:last-child{
            margin-bottom: 0px;
        }
        .templateCon{
            margin-bottom: 30px;
            .iconBottom{
                width: 100%;
                img{
                    width: 100%;
                }
                // width: 100%;
                // width: 289px;
                // height: 9px;
                // background:url('../../../public/img/iconBottom.png')  0% 0% no-repeat;
                // margin-top: -2px;
                // margin-left: 3px;
                // background-size: 100%;
            }
            .imgBox{
                display: block;
                width: 300px;
                height: 175px;
                overflow: hidden;
                position: relative;
                .imgBoxPC{
                    // border-radius: 5px 5px 0 0;
                    // background: #000;
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
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
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
                    text-align: left;
                    height: 28px;
                    overflow: hidden;
                    color: #122F46;
                    font-family:"黑体";
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
