<template>
    <div class="newsseach" v-show="newsReasult">
          <h3 class="newsReasult">
              <p>搜到"<span>{{searchkeyword.slice(0,8)}}</span>"相关结果<span v-text="newsCount"></span>个</p>
              <h5 @click =" pickCondition">筛选<i></i></h5>
          </h3>

        <div v-show="notFound" class="newsnofound">
        </div>
    <diV class="inforlist" v-show="!notFound">   
            <cube-scroll
                ref="scroll"
                :data="NewsList"
                :options="options"
                @pulling-up="onPullingUp"
                @scroll="scroll"
                :scroll-events="['scroll']"
        >
        <Loading v-if="showreadyLoading"></Loading>
  <ul id="alreadyshow">
  <a :href='item.newsWapDetailPageSrc'  v-for="(item,index) of NewsList" :key=index  style="float:left" >
  <li>
    <!-- 图文无图 -->
  <div v-if="item.fNewsType == 1 && item.fThumbnail== null" class="newsImageText">
  <div>
  <div class="newsImageText_title" v-html="item.fNewsTitle"></div>
  <div class="news_status">
    <span class="newsType">{{item.fNewsType|typejudge}}</span>
    <b class="Punctuation_interval_l"></b>
     <span>{{item.fUpdateTime|dataShowcasing}}</span> 
    <b class="Punctuation_interval_r">·</b>
    <span>{{item.fShopSiteName}}</span>
  </div>
  </div>
  </div>
    <!-- 图文有图 -->
  <div v-if="item.fNewsType == 1 && item.fThumbnail != null"  class="newsImageText">
  <div class="newsImageText_pic">
    <img :src='item.fThumbnail.indexOf("video_")==-1 ? item.fThumbnail : item.fThumbnail.split("video_")[1]' alt="" @load="imgAutoAdapt"/>
    <i v-show="item.fThumbnail.indexOf('video_')!=-1" class="BlogVideo_icon"></i>
  </div>
  <div class="newsImageText_right">
  <div class="newsImageText_title" v-html="item.fNewsTitle"></div>
  <div class="news_status">
    <span class="newsType">{{item.fNewsType|typejudge}}</span>
    <b class="Punctuation_interval_l"></b>
    <span>{{item.fUpdateTime|dataShowcasing}}</span>
    <b class="Punctuation_interval_r">·</b>
    <span>{{item.fShopSiteName}}</span>
  </div>
  </div>
  </div>
   <!-- 图集 -->
  <div v-else-if="item.fNewsType == 2" class="newsAtlas">
  <div class="newsAtlas_title" v-html="item.fNewsTitle"></div> 
  <div class="newsAtlas_showbox">
    <ul>
      <li v-for="(val,index) of item.fContent.split(',').slice(0,3) " :key=index><img :src='val' alt="" @load="imgAutoAdapt"/></li>
    </ul>
  </div>
  <div class="news_status">
    <span class="newsType">{{item.fNewsType|typejudge}}</span>
    <b class="Punctuation_interval_l"></b>
    <span>{{item.fUpdateTime|dataShowcasing}}</span>
    <b class="Punctuation_interval_r">·</b>
    <span>{{item.fShopSiteName}}</span>
  </div>
  </div>
 
  <!-- 视频 -->
  <div v-else-if="item.fNewsType == 4" class="newsVideo">
  <div class="newsVideo_title" v-html="item.fNewsTitle"></div>  
  <div class="newsVideo_pic">
    <img :src='item.fThumbnail' alt="" @load="imgAutoAdapt"/>
    <i class="newsVideo_icon"></i>
  </div>
  <div class="news_status">
    <span class="newsType">{{item.fNewsType|typejudge}}</span>
    <b class="Punctuation_interval_l"></b>
    <span>{{item.fUpdateTime|dataShowcasing}}</span>
    <b class="Punctuation_interval_r">·</b>
    <span>{{item.fShopSiteName}}</span>
  </div>
  </div>
  </li>
  </a>
  </ul>
  <template slot="pullup" slot-scope="propsa">
                 <div v-show="propsa.pullUpLoad">
                    <template>
                        <span v-show="showLoading">
                          <Loading class="showLoading"></Loading>
                        </span>
                        <div v-show="theEnd" class="the-end" >已经到底啦！</div>
                    </template>
                </div>
            </template>
        </cube-scroll>
        </diV> 
        <!--回到顶部-->
        <div class="gotoTop" @click="goToTop" v-if="showGoTop">
            <img src="/images/gotoTop.png" alt="">
        </div>
        <div class="shade" v-show="shadeshow" @click.self="shadeHide" @touchmove.prevent>
          <keep-alive>
           <transition name="right-slide">
            <searchFilterNews v-show="showFilter" ref="count" @filterHide="filterHide" @selectnewsType="selectnewsType"></searchFilterNews>
           </transition>
         </keep-alive>
       </div>
    </div>
</template>
<script>
import MethodsUtil from "~/assets/js/MethodsUtil";
import Loading from "../public/loading";
import searchFilterNews from "./searchFilterNews";
import eventBus from "~/assets/js/eventBus";
import { setTimeout } from 'timers';
import { constants } from 'crypto';
import { fail } from 'assert';
export default{
    data(){
        return {
            newsReasult:false,
            shadeshow:false,
            showFilter:false,
            searchkeyword:this.keyword,
            NewsList:[],
            list:[],
            params:{},                 //请求参数  
            dataLength:null,           //已请求数据长度
            showLoading:false,          //下拉loading图
            theEnd:false,              //是否到底
            showGoTop:false,           //是否显示“回到顶部”按钮
            scrollTop:0,               //滚动距离
            pageNow:1,                 //从第几条数据开始拿
            pageNowSelect:1,           //从第几条数据开始拿（筛选）
            showreadyLoading:true,    //加载时候的loading图
            newsCount:0,            //新闻请求总数
            notFound:false,            //无数据样式
            origin:true,               //搜索结果来源，默认是从列表来，若从筛选条件后搜索，则是false
            params1:null,              //筛选条件
        }
    },
    props:['keyword','pageData'],
    components:{
            Loading,searchFilterNews
    },
    created(){
       setTimeout(()=>{
          this.dataLength =  this.pageData.list.content.length;             
              if(this.dataLength>0){
                  this.notFound = false;
                  this.NewsList = this.pageData.list.content;
                  this.newsCount = this.pageData.list.count; 
                }else{
                  this.notFound = true;
                }   
               this.showreadyLoading = false;
                this.newsReasult = true;
       },500)
    },
    filters:{
      typejudge:(n)=>{
        switch(n){
          case 1: return '图文'; break;
          case 2: return '图集'; break;
          case 4: return '视频'; break;
          
        }
      },
      
       dataShowcasing(_date){
          let arr = _date.split(/[- : \/]/);
          _date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
          let _date1 =_date;
          let _dateHaoMiao=(new Date(_date1)).getTime();
          let _thisd = new Date() //当前时间的毫秒數
          let _thisdHaoMiao = (new Date(_thisd)).getTime();
          let num = _thisdHaoMiao - _dateHaoMiao  //時間差
          let dateStr = "";
          let ndate =_date;
          let thisDate = ndate
          if (num < 1000 * 60) {
              dateStr = "1分钟前";
          }else if(num<1000*60*60){
              num = Math.floor(num/(1000*60))
              dateStr =num +"分钟前";
          }else if(num<1000*60*60*24){
              num = Math.floor(num/(1000*60*60))
              dateStr =num +"小时前";
          }else if(num<1000*60*60*24*30){
              num = Math.floor(num/(1000*60*60*24))
              dateStr =num +"天前";
          }else if(num<1000*60*60*24*30*12){
              num = Math.floor(num/(1000*60*60*24*30))
              dateStr =num +"月前";
          }else{ 
              num = Math.floor(num/(1000*60*60*24*30*12))
              dateStr =num +"年前";
          }
          return dateStr;
      }
    },
    methods:{
            noscroll(event){
                event.preventDefault();
            },
            scroll:function(dis){
                this.scrollTop = -dis.y;
            },
            onPullingUp:function() {
              if (this.dataLength < this.newsCount) {
                 this.showLoading = true;
               setTimeout(()=>{
                // 如果有新数据
                  if(this.origin){
                          // 从列表里来 
                        this.pageNow++;
                        this.params.pageNow = this.pageNow;   
                        this.getData(this.params);
                      }else{
                          // 从筛选条件
                      this.pageNowSelect++; 
                      this.params1.pageNow = this.pageNowSelect; 
                      this.getData(this.params1);
                      }
                     this.$refs.scroll.forceUpdate();
                     
                    },1000)
                  } else {
                    // 如果没有新数据
                    this.showLoading = false;
                    this.theEnd = true;
                    this.$refs.scroll.forceUpdate();
                    this.$refs.scroll.refresh();
                  }
            },
            getData(params){
                this.HttpCli.get(
                   "/news_web/search-api/searchNews",
                     params
                ).then((res)=>{
                      if(res.data.status==0){
                        if(params.pageNow==1){
                           this.newsCount = res.data.data.count;  
                           setTimeout(()=>{
                              if(res.data.data.content.length>0){
                                  this.notFound = false;
                                  this.NewsList = res.data.data.content;
                                  this.showreadyLoading = false; 
                              }else{
                                  this.notFound = true;
                              }  
                                  this.newsReasult = true;
                           },500)
                          }else{
                                if(res.data.data.content.length == 0){
                                      this.showLoading = false;
                                      this.theEnd = true;
                                    }else{
                                      this.list = res.data.data.content;
                                    } 
                              }
                            this.NewsList = [...this.NewsList, ...this.list]; 
                            this.dataLength = this.NewsList.length;
                      }   
                }).catch((err)=>{

                })
            },
            imgAutoAdapt:function(e){
                MethodsUtil.imgAutoAdapt(e.target,true)
            },
            goToTop:function(){
                this.$refs.scroll.scrollTo(0, 0, 1500);
            },
            pickCondition(){
                this.shadeshow = true;
                this.showFilter = true;  
            },
            filterHide(filterHide){
              this.showFilter =  filterHide;
               setTimeout(()=>{
                 this.shadeshow = false
               },500)
            },
            shadeHide(){
              this.$refs.count.defineSearch();
            },
            selectnewsType(val){
             this.origin=false;
             this.showreadyLoading = true;
             this.params1 = val;
             this.params1.pageSize = 12 ;
             this.params1.pageNow = 1;
             this.params1.keyword = this.keyword;  
             //重新赋值
             this.showLoading = false;
             this.NewsList=[];
             this.list=[];
             this.dataLength = null;
             this.pageNow = 1;
             this.pageNowSelect = 1;
             this.newsCount = null;
             this.notFound = false;
             this.theEnd = false; 
             this.getData(this.params1);   
            },
        },
        computed: {
            options() {
                return {
                    pullUpLoad: {
                        threshold: 0, //上拉阈值
                        txt: "更新成功"
                    },
                    bounce:false,
                    scrollbar: {
                        fade:true
                    }
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
        },
}
</script>
<style lang="scss">
 *{
        margin:0;
        padding:0;
        list-style: none;
    }
.newsnofound{
    width: 110px;
    height:110px;
    margin:65px auto;
    background-image: url('/images/noData.png');
    background-size:contain;
    background-repeat: no-repeat;
}
// .newsseach{
//   width: 320px;
//   font-family: "微软雅黑";
//   text-align: left;
//   float: left;
//   height: 100%;
//   overflow: hidden;
//    .newsReasult{
//     width:300px;
//     height:25px;
//     line-height: 20px;
//     text-align :left; 
//     padding-bottom:5px;
//     display :flex;
//     margin : 0 10px;
//     p{
//      height: 100%;
//      float:left;
//      flex:1;
//     }
//     h5{
//         width :56px;
//         height :20px;
//         line-height :20px;
//         img{
//             width :15px;
//             height :14px;
//             padding-top :3px;
//             margin-right:7px;
//             float :right;
//         }
//     }
//   }
// }
.inforlist{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top:65px;
}
#alreadyshow{
  background-color: #FFFFFF;
  float:left;
  li{
    float: left;
  }
}
.newsImageText,.newsAtlas,.newsVideo{
  width: 300px;
  height: auto;
  float: left;
  margin:0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
  
}
.newsImageText_title,.newsAtlas_title,.newsVideo_title{
  font-size: 14px;
  word-break: break-all;
  color:#122F46;
  flex: 1;
  overflow: hidden;
  white-space: normal;
  line-height: 18px;
  em{
      font-style: normal;
      color: #122F46;
      font-weight: bold;
  }
}
.newsImageText_right .newsImageText_title{
  font-size: 14px;
  word-break: break-all;
  color:#122F46;
  height: 40px;
  overflow: hidden;
  white-space: normal;
  line-height: 21px;
  em{
      font-style: normal;
      color: #122F46;
      font-weight: bold;
   }
}

.Punctuation_interval_l{
  padding: 0 3px;
}
.Punctuation_interval_r{
  padding: 0 6px;
}
.news_status{
  font-size: 12px;
  margin-top: 10px;
  color: #718290;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
}
.newsType{
    color: #FFFFFF;
    width: 30px;
    height: 18px;
    display: inline-block;
    line-height: 18px;
    background: #122F46;
    text-align: center;
}
.newsImageText_pic{
  float: left;
  position: relative;
  width:98px;
  height: 70px;
  overflow: hidden;
}
.newsImageText_right{
  float: left;
  margin-left: 10px;
  width: 192px;
  height: 70px;
  display: flex;
  flex-direction: column;
}
.newsAtlas_showbox ul{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top:10px;
}
.newsAtlas_showbox ul li{
  width: 98px;
  height: 70px;
  overflow: hidden;
}
.newsVideo_pic{
  margin-top: 10px;
  position: relative;
  width: 300px;
  height: 169px;
  overflow :hidden;
}
.newsVideo_icon{
  position: absolute;
  left: 50%;
  top:50%;
  margin-left: -20px;
  margin-top: -20px;
  background-image: url('/images/inforplay.png');
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
}
.showLoading{
      padding-bottom: 20px;
    }
.the-end{
  text-align: center;
  padding: 20px 0;
  color: #A1A1A1;
    }
</style>
