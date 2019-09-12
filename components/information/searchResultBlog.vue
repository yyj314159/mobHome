<template>
    <div class="blogseach" v-show="blogReasult">
         <h3 id="blogReasult">
              <p>搜到"<span>{{searchkeyword.slice(0,8)}}</span>"相关结果<span v-text="blogcount"></span>个</p>
              <h5 @click =" pickCondition">筛选 <i></i></h5>
          </h3>
        <div v-show="notFound" class="blognofound">
        </div>
     <div class="inforlist" v-show="!notFound"> 
        <cube-scroll
                ref="scroll"
                :data="BlogList"
                :options="options"
                @pulling-up="onPullingUp"
                @scroll="scroll"
                :scroll-events="['scroll']"      
        >
        <Loading v-if="showreadyLoading"></Loading>
    <ul id="alreadyshow">
     <a :href='item.wapZmBlogURL' v-for="(item) of BlogList" :key=item.fInfoId  style="float:left">
    <li>
      <!-- 博客无图 -->
    <div v-if="item.fBlogType == 1" class="BlogText">
    <div>
    <div class="BlogImageText_title" v-html="item.fBlogTitle"></div>
    <div class="Blog_status">
      <span>{{item.fUpdateTime|dataShowcasing}}</span>
      <b class="Punctuation_interval">·</b>
      <span>{{item.fName}}</span>
    </div>
    </div>
    </div>
    <!-- 博客有图 -->
    <div v-else-if="item.fBlogType == 6" class="BlogImageText">
    <div class="BlogImageText_pic">
      <img :src='item.fImageInfo' alt=""  @load="imgAutoAdapt"/>
    </div>
    <div class="BlogImageText_right">
    <div class="BlogImageText_title" v-html="item.fBlogTitle"></div>
    <div class="Blog_status">
      <span>{{item.fUpdateTime|dataShowcasing}}</span>
      <b class="Punctuation_interval">·</b>
      <span>{{item.fName}}</span>
    </div>
    </div>
    </div>
     <!-- 博客视频 -->
    <div v-else-if="item.fBlogType == 18" class="BlogVideo">
    <div class="BlogVideo_pic">
      <img :src='item.fBlogVideoImg.indexOf("video_") == -1 ? item.fBlogVideoImg : item.fBlogVideoImg.split("video_")[1]' alt=""  @load="imgAutoAdapt"/>
      <i class="BlogVideo_icon"></i>
    </div>
   <div class="BlogImageText_right">
    <div class="BlogVideo_title" v-html="item.fBlogTitle"></div>
    <div class="Blog_status">
      <span>{{item.fUpdateTime|dataShowcasing}}</span>
      <b class="Punctuation_interval">·</b>
      <span>{{item.fName}}</span>
    </div>
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
        </div>
        <!--回到顶部-->  
        <div class="gotoTop" @click="goToTop" v-if="showGoTop">
            <img src="/images/gotoTop.png" alt="">
        </div>
        <div class="shade" v-show="shadeshow" @click.self="shadeHide" @touchmove.prevent>
          <keep-alive>
           <transition name="right-slide">
            <searchFilterBlog v-show="showFilter" ref="count" @filterHide="filterHide" @selectblogType="selectblogType"></searchFilterBlog>
           </transition>
         </keep-alive>
       </div>
    </div>
</template>
<script>
import MethodsUtil from "~/assets/js/MethodsUtil";
import searchFilterBlog from "./searchFilterBlog";
import eventBus from "~/assets/js/eventBus";
import Loading from "../public/loading";
import { constants } from 'crypto';
export default{
    data(){
        return {
            blogReasult: false,
            shadeshow:false,
            showFilter:false,
            searchkeyword:this.keyword,
            BlogList:[],
            list:[],
            dataLength:null,         //下拉loading图
            showLoading:false,        //下拉loading图
            theEnd:false,            //是否到底
            showreadyLoading:true,  //加载时候的loading图
            showGoTop:false,         //是否显示“回到顶部”按钮
            scrollTop:0,             //滚动距离
            pageNow:1,               //从第几条数据开始拿
            pageNowSelect:1,         //从第几条数据开始拿
            keywordcontent:'',       //关键词内容
            alreadyShowProduct:0,
            blogcount:null,          //博客请求总数
            notFound:false,          //无数据样式
            params:{},               //请求参数
            origin:true,             //搜索结果来源，默认是从列表来，若从筛选条件后搜索，则是false
            params1:{},              //筛选条件
        }
    },
    props:['keyword','pageData'],
        components:{
            Loading,searchFilterBlog
    },
    created(){
       setTimeout(()=>{
          this.dataLength =  this.pageData.list.content.length;
          if(this.dataLength>0){
             this.notFound = false;
             this.BlogList = this.pageData.list.content;
             this.blogcount = this.pageData.list.count;
             }else{
             this.notFound = true;
             }   
          this.blogReasult = true;
          this.showreadyLoading = false;
       },500)
    },
    filters:{
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
            scroll:function(dis){
                this.scrollTop = -dis.y;
            },
            onPullingUp:function() {
               if (this.dataLength < this.blogcount) {
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
                   "/blog_api/blogInfoSearch/searchBlog",
                    params
                ).then((res)=>{
                    if(res.data.status==0){       
                        if(params.pageNow==1){
                           this.blogcount = res.data.data.count;
                            setTimeout(()=>{
                                if(res.data.data.content.length>0){
                                this.notFound = false;
                                this.BlogList = res.data.data.content;
                                this.showreadyLoading = false;
                                }else{
                                this.notFound = true;
                                } 
                                this.blogReasult = true;
                            },500) 
                          }else{
                                 if(res.data.data.content.length == 0){
                                      this.showLoading = false;
                                      this.theEnd = true;
                                    }else{
                                      this.list = res.data.data.content;
                                      this.showreadyLoading = false;
                                      
                                    } 
                              }
                         this.BlogList = [...this.BlogList, ...this.list]; 
                         this.dataLength = this.BlogList.length;
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
            selectblogType(val){
             this.origin = false;
             this.showreadyLoading = true;
             this.params1.fBlogType = val;
             this.params1.pageSize = 12 ;
             this.params1.pageNow = 1 ;
             this.params1.keyword = this.keyword;
            //  重新赋值
             this.showLoading = false;
             this.BlogList=[];
             this.list=[];
             this.dataLength = null;
             this.blogcount = null;
             this.pageNow = 1;
             this.pageNowSelect = 1;
             this.notFound = false;
             this.theEnd = false;
             this.getData(this.params1);
            }
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
.blognofound{
    width: 110px;
    height: 110px;
    margin:65px auto;
    background-image: url('/images/noData.png');
    background-size:contain;
    background-repeat: no-repeat;
}
// .blogseach{
//   width: 320px;
//   font-family: "微软雅黑";
//   text-align: left;
//   float: left;
//   height: 100%;
//   overflow: hidden;
//  h3{
//     width :300px;
//     height:25px;
//     line-height :20px;
//     text-align :left; 
//     padding-bottom: 5px;
//     display :flex;
//     margin:0 10px;
//     p{
//      height:100%;
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
.BlogImageText,.BlogText,.BlogVideo{
  width: 300px;
  height: auto;
  float: left;
  margin:0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
}
.BlogImageText_title,.BlogText_title,.BlogVideo_title{
  font-size: 14px;
  word-break: break-all;
  color:#122F46;
  flex: 1;
  line-height: 18px;
  overflow: hidden;
  white-space: normal;
  em{
    font-style: normal;
    color: #122F46;
    font-weight: bold;
  }
}
.BlogImageText_right .BlogImageText_title{
  font-size: 14px;
  word-break: break-all;
  color:#122F46;
  height: 40px;
  overflow: hidden;
  white-space: normal;
  line-height: 22px;
  em{
      font-style: normal;
      color: #122F46;
      font-weight: bold;
  }
}
.Blog_status{
  font-size: 12px;
  margin-top: 10px;
  color: #718290;
  height :18px;
  line-height :18px;
  overflow: hidden;
  
}
.BlogType{
  color:#3D9BE9;
}
.BlogImageText_pic{
  float: left;
  width:98px;
  height: 70px;
  overflow: hidden;
}
.BlogImageText_right{
  float: left;
  margin-left: 10px;
  width: 192px;
  height: 70px;
  display: flex;
  flex-direction: column;
}

.BlogVideo_pic{
  float: left;
  position: relative;
  width:98px;
  height: 70px;
  overflow: hidden;
}

.BlogVideo_icon{
  position: absolute;
  left: 50%;
  top:50%;
  margin-left: -12px;
  margin-top: -12px;
  background-image: url('/images/inforplay.png');
  width: 24px;
  height: 24px;
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
