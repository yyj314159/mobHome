<template>
    <div>
        <div class="searchInfo" v-if="searchResult">
            <p>搜到“<span>{{copyKeyword}}</span>”相关结果<span>{{productCont}}</span>个</p>
            <p @click="pickCondition">筛选<img src="/images/filterIcon.png"></p>
        </div>
        <div class="productlist" v-if="!noData">
            <cube-scroll
                ref="scroll"
                :data="productList"
                :options="options"
                @pulling-up="onPullingUp"
                @scroll="scroll"
                :scroll-events="['scroll']"
            >
                <Loading v-if="showLoading2"></Loading>
                <ul>
                    <a style="display: block" v-for="(item,index) of productList"  :href="item.wapUrl" :key="item.productId+index">
                        <li>
                            <div class="imgBox">
                                <img :src="item.productMainUrl" alt="" @load="imgAutoAdapt">
                                <i class="attrLeftTop" v-if="item.productPayMent!=0">{{item.productPayMent|payMent}}</i>
                                <i class="attrRightTop" v-if="item.hasFormula!=2 || item.productWholesale!=1">{{item.hasFormula|hasFormulaOrWholesale(item.productWholesale)}}</i>
                                <i class="attrLeftBottom" v-if="item.productType!='1'">{{item.productType|productType}}</i>
                                <i class="attrRightBottom" v-if="item.tranType==2">同城交易</i>
                            </div>
                            <div class="goodInfo">
                                <p>￥{{item.productPrice|twoDecimal}}</p>
                                <p v-html="item.productName"></p>
                            </div>
                        </li>
                    </a>
                </ul>
                <template slot="pullup" slot-scope="propsa">
                    <div v-show="propsa.pullUpLoad" class="bottom">
                        <template>
                            <span v-show="showLoading">
                                <Loading class="showLoading"></Loading>
                            </span>
                            <span v-show="allProduct" class="after-all">已经到底啦！</span>
                        </template>
                    </div>
                </template>
            </cube-scroll>
        </div>
        <div class="noProduct" v-if='noData'>
            <img src="/images/noData.png" alt="">
        </div>
        <div class="gotoTop" @click="goToTop" v-if="showGoTop">
            <img src="/images/gotoTop.png" alt="">
        </div>
        <div v-show="showFilter_mark" class="filter-mark" @click.self="closeFilter">
            <keep-alive>
                <search-filter v-show="showFilter" class="showFilter" ref="filter"></search-filter>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import MethodsUtil from "~/assets/js/MethodsUtil";
    import Loading from "../public/loading";
    import SearchFilter from "./searchFilterProduct"
    import eventBus from "~/assets/js/eventBus";
    import Interface from "~/assets/js/ConstStr";
    export default {
        data(){
          return {
              productList:[],
              showLoading:true,
              allProduct:false,
              showGoTop:false,      //是否显示“回到顶部”按钮
              scrollTop:0,          //滚动距离
              pageNow:1,            //当前页
              pageNow2:1,           //选定筛选条件后的当前页
              alreadyShowProduct:0,
              productCont:null,
              origin:true,      //搜索结果来源，默认是从列表来，若从筛选条件后搜索，则是false
              params1:null,      //筛选条件
              showLoading2:false,    //刚进页面时显示的loading图
              alreadyGetData:false,
              searchResult:false,
              copyKeyword:this.keyword.slice(0,8),
              showFilter:false,
              showFilter_mark:false,
              noData:false
          }
        },
        components:{
            Loading,
            SearchFilter
        },
        props:{
          keyword:String,
          resultdata:Object
        },
        filters:{  //过滤器
            twoDecimal:(n)=>{
                n = n.toString()
                if(n.indexOf(".")==-1){     //没有小数
                    return n+".00";
                }else if(n.charAt(".")==n.length-1){    //一位小数
                    return n+"0";
                }else{
                    return parseFloat(n).toFixed(2);
                }
            },
            payMent:(type)=>{
                switch (parseInt(type)) {
                    case 1:return "诚意金";break;
                    case 3:return "保证金";break;
                    case 4:return "定金";
                }
            },
            hasFormulaOrWholesale:(formula,wholesale)=>{
                if(formula=="1" && wholesale=="1"){     //定制非批发
                    return "在线计价";
                }else if(formula=="1" && wholesale=="2"){       //定制批发
                    return "定制批发";
                }else if(formula=="2" && wholesale=="2"){       //非定制批发
                    return "批发";
                }
            },
            productType:(productType)=>{
                switch (parseInt(productType)) {
                    case 2:return "二手";break;
                    case 3:return "翻新";break;
                }
            }
        },
        methods:{
            scroll(dis){
                this.scrollTop = -dis.y;
            },
            onPullingUp() {
                if(!this.alreadyGetData){
                    return false;
                }else{
                    console.log("上拉")
                    if(this.alreadyShowProduct==this.productCont){
                        this.showLoading = false;
                        this.allProduct = true;
                        this.$refs.scroll.refresh();
                        return false;
                    }else{
                        if(this.origin){        //从列表来
                            this.pageNow++;
                            this.getData({pageSize: 30,pageNow:this.pageNow, keyWord:this.keyword},Interface.productSearchKeyWord);
                        }else{                  //筛选条件来
                            this.params1.pageNow++;
                            this.getData(this.params1,Interface.productSearchKeyWord);
                        }
                        this.$refs.scroll.forceUpdate();
                        this.$refs.scroll.refresh();
                    }
                }
            },
            getData(params,url){
               this.alreadyGetData = false;
               this.HttpCli.get(
                   url,
                   params
               ).then((res)=>{
                    if(Object.keys(res.data.data).length!=0){
                        let data = res.data.data.content;
                        data && (this.alreadyShowProduct+=data.length);
                        setTimeout(()=>{
                            if(this.origin){
                                this.productList.push(...data);
                            }else{
                                this.productList.push(...data);
                            }
                            this.showLoading2 = false;
                            this.showLoading = true;
                            this.alreadyGetData = true;
                            this.searchResult = true;
                            this.productCont = res.data.data.count;   //搜索到商品总量
                        },300);
                    }else{
                        console.log("没有数据")
                        setTimeout(()=>{
                            this.searchResult = true;
                            this.showLoading2 = false;
                            this.productCont = 0;
                            this.noData = true;
                        },500)
                    }
                }).catch((err)=>{
                })
            },
            imgAutoAdapt(e){
                MethodsUtil.imgAutoAdapt(e.target,true)
            },
            goToTop(){
                this.$refs.scroll.scrollTo(0, 0, 1500);
            },
            pickCondition(){
                this.showFilter = true;
                this.showFilter_mark = true;
            },
            closeFilter(){
                this.showFilter = false;
                setTimeout(()=>{
                    this.showFilter_mark = false;
                    this.$refs.filter.defineSearch()
                },500)
            }
        },
        computed: {
            options() {
                return {
                    pullUpLoad: {
                        threshold: 0,           //上拉阈值
                        stop:70,
                        txt: "更新成功"
                    },
                    scrollbar: {
                        fade:true
                    },
                    bounce:false
                };
            }
        },
        watch:{
            scrollTop:{
                handler:function(newVal,oldVal){
                    if(newVal>=800){
                        this.showGoTop = true;
                    }else{
                        this.showGoTop = false;
                    };
                    if(newVal-oldVal>0 && this.scrollTop >0){//上划
                        eventBus.$emit("scrollResultTop",true);
                    }else{
                        eventBus.$emit("scrollResultTop",false);
                    }
                },
                deep:true,
            }
        },
        mounted(){
            this.showLoading = false;
            if(this.keyword!=""){
                this.showLoading2 = false;
                this.searchResult = true;
                if(this.resultdata.list.content.length!=0){
                     this.productList = this.resultdata.list.content
                }else{
                    this.noData = true;
                }
                this.productCont = this.resultdata.list.count;
                this.alreadyShowProduct = this.productList.length;
                this.alreadyGetData = true;
            }
            eventBus.$off("selectProductConditions");
            eventBus.$on("selectProductConditions",(arg)=>{
                this.origin  = false;
                this.params1 = arg;
                this.params1.pageSize = 30;
                this.params1.keyWord = this.keyword;
                this.params1.pageNow = this.pageNow2;
                this.showFilter = false;
                setTimeout(()=>{
                    this.showFilter_mark = false;
                },500);
                // 下面是将之前的数据清空，之后重新赋值
                this.productList = [];
                this.productCont = 0;
                this.alreadyShowProduct = 0;
                this.noData = false;
                this.showLoading2 = true;
                setTimeout(()=>{
                    this.getData(this.params1,Interface.productSearchKeyWord);
                },500);
                this.showGoTop = false;
            })
        }
    }
</script>
<style lang="scss" scoped>
    *{
        margin:0;
        padding:0;
        list-style: none;
    }
    .searchInfo{
        height: 38px;
        display: flex;
        justify-content: space-between;
        p{
            line-height: 38px;
            height: 38px;
        }
        p:nth-of-type(1){
            text-align: left;
            padding-left: 10px;
            color:#122F46;
            span{
                color:#122F46;
            }
        }
        p:nth-of-type(2){
            padding-right: 10px;
            color:#122F46;
            img{
                width: 13px;
                height: 13px;
                display: block;
                float: right;
                margin-top: 13px;
                margin-left: 3px;
            }
        }

    }
    .productlist{
        text-align: left;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 38px;
        height:auto!important;
        ul{
            display: flex;
            flex-wrap: wrap;
            height: 100%;
            li{
                height:210px;
                width:145px;
                background:#fff;
                margin-left: 10px;
                margin-top: 6px;
                .imgBox{
                    width: 145px;
                    height: 145px;
                    overflow: hidden;
                    position: relative;
                    img{
                        object-fit:cover ;
                    }
                    i{
                        font-style: normal;
                        padding: 0px 8px;
                        line-height: 20px;
                        text-align: center;
                        background: #122F46;
                        color: #fff;
                        display: block;
                        position: absolute;
                        font-size: 10px;
                        &.attrLeftTop{
                            top: 0;
                            left: 0;
                        }
                        &.attrLeftBottom{
                            bottom: 0;
                            left: 0;
                        }
                        &.attrRightTop{
                            top: 0;
                            right: 0;
                        }
                        &.attrRightBottom{
                            right: 0;
                            bottom: 0;
                        }
                    }
                }
                .goodInfo{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding-top: 5px;
                    p:nth-of-type(2){
                        font-size: 12px;
                        width: 100%;
                        height: 28px;
                        line-height: 15px;
                        word-break: break-all;
                        overflow: hidden;
                        color: #718290;
                    }
                    p:nth-of-type(1){
                        font-size: 12px;
                        margin: 5px 0;
                        color: #122F46;
                    }
                }
            }
        }
    }
    .noProduct{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 38px;
        height:auto!important;
        img{
            margin-top: 40px;
            width: 109px;
        }
    }
    .gotoTop{
        width: 40px;
        height:40px;
        position: fixed;
        right:10px;
        bottom:10px;
        border-radius: 50%;
        background:#fff;
        z-index: 999;
        box-shadow:0 0 5px rgba(0,0,0,.2);
        img{
            height: 16px;
            width: 18px;
            position: absolute;
            left: 0;
            right: 0;
            bottom:0;
            top:0;
            margin:auto;
        }
    }
    .showLoading{
        padding-bottom: 20px;
    }
    .after-all{
        display: inline-block;
        width: 100%;
        height:45px;
        line-height: 45px;
        text-align: center;
        color: #b1c9d3;
    }
    .filter-mark {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, .5);
        z-index: 99;
    }
.bottom{
    height:50px;
}
</style>
<style>
    .goodInfo>p:nth-of-type(2) > em{
        font-style: normal;
        color: #122F46;
    }
</style>
