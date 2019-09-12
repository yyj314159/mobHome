<template>
   <div id="BlogList"> 

     <div class="infortabchange" v-show ="onup" style="position:absolute; background:#FFFFFF; z-index:3;top:-1px;"> 
        <h2>最新资讯</h2>
        <ul>
          <li>
            <a :href="'/information?type=2'" >资讯</a>
          </li>
          <li>
            <a :href="'/information?type=1'" class="active">文章</a>
          </li>
        </ul>
        <h3></h3>
      </div>
 
     <cube-scroll
      ref="scroll"
      :data="BlogList"
      :options="options"
       @pulling-up="onPullingUp"
       @scroll="scroll"
      :scroll-events="['scroll']"
    >
      <div class="banner" @click="routerTo">
            <Banner :items = "item"/>
      </div>
      <div class="infortabchange">
        <h2>最新资讯</h2>
        <ul>
           <li>
            <a :href="'/information?type=2'" >资讯</a>
          </li>
          <li>
            <a :href="'/information?type=1'" class="active">文章</a>
          </li>
        </ul>
        <h3></h3>
      </div>

      <div v-show="areadyshow">
      <Loading class="showLoading"></Loading>
      </div> 

    <ul id="alreadyshow">
      <a :href='item.wapZmBlogURL' v-for="(item,index) of BlogList" :key=item.fInfoId  style="float:left">
    <li >
      <!-- 博客无图 -->
    <div v-if="item.fBlogType == 1" class="BlogText">
    <div>
    <div class="BlogImageText_title">{{item.fBlogTitle}}</div>
    <div class="Blog_status">
      <span>{{item.fUpdateTime|dataShowcasing}}</span>
      <b class="Punctuation_interval">·</b>
      <span>{{item.fEntrepName}}</span>
    </div>
    </div>
    </div>
    <!-- 博客有图 -->
    <div v-else-if="item.fBlogType == 6" class="BlogImageText">
    <div class="BlogImageText_pic">
      <img :src='item.fImageInfo' alt=""  @load="imgAutoAdapt"/>
    </div>
    <div class="BlogImageText_right">
    <div class="BlogImageText_title">{{item.fBlogTitle}}</div>
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
      <img :src='item.fBlogVideoImg.indexOf("video_")==-1 ? item.fBlogVideoImg : item.fBlogVideoImg.split("video_")[1]'  alt=""  @load="imgAutoAdapt"/>
      <i class="BlogVideo_icon"></i>
    </div>
   <div class="BlogImageText_right">
    <div class="BlogVideo_title">{{item.fBlogTitle}}</div>
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
            <span v-show="loading">
            <Loading class="showLoading"></Loading>
            </span>
            <div v-show="theEnd" class="the-end" >已经到底啦！</div>
          </template> 
        </div>
    </template>
  </cube-scroll>
  <!--回到顶部-->
        <div class="gotoTop" @click="goToTop" v-if="showGoTop">
            <img src="/images/gotoTop.png" alt="">
        </div>
  </div>
</template>
<script>
 import Banner from "../public/Rotation"; //引入轮播组建
 import eventBus from "~/assets/js/eventBus";
 import MethodsUtil from "~/assets/js/MethodsUtil";
 import Interface from "~/assets/js/ConstStr";
 import Loading from "../public/loading";
import { setTimeout } from 'timers';
  const item = [
     {
        image:'/images/infomation.jpg'
     },
     {
        image:'/images/audio2.jpg'
     }
];
  export default {
    name: 'Blog',
    props: ['pageData'],
    data(){
      return{
        ifortype:['资讯','博客'],
        onup : false,
        upHeight:'',
        BlogList:[],
        dataLength:null,
        areadyshow:true,
        list:[],
        showGoTop:false,      //是否显示“回到顶部”按钮
        page:1,
        scrollTop:0,  
        loading:false,
        theEnd :false,
        item:item ,
      }
    },
     created () {
       setTimeout(()=>{
        this.BlogList = this.pageData.DataList.content;
        this.dataLength = this.pageData.DataList.content.length;
        this.areadyshow = false;
       },100) 
    },
    components: {
      Loading,
      Banner
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
      routerTo(){
        this.$router.push({path:'./M_news'})
      },
      scroll:function(dis){
          this.scrollTop = -dis.y;
         },
      onPullingUp(){
              if (this.dataLength>0) {
                // 如果有新数据
                 this.loading = true;
                  this.page++;
                 setTimeout(() => {
                 this.getBlogData(this.page);
                 this.$refs.scroll.forceUpdate();
                 },1000)
              } else {
                // 如果没有新数据
                this.theEnd = true;
                this.loading = false;
                this.$refs.scroll.forceUpdate();
                this.$refs.scroll.refresh();
                setTimeout(()=>{
                  this.$refs.scroll.refresh();
                  this.theEnd = false;
                },1000)
              }
          },
     getBlogData(page){
                  this.HttpCli.get(
                     Interface.blogSearchKeyWord,
                     {pageNow:page} 
                  ).then((res)=>{
                      if(res.data.status==0){
                        if(res.data.data.content == null){
                                      this.theEnd = true;
                                      this.dataLength = 0;
                                      return;
                                    }
                            this.list = res.data.data.content;
                         this.dataLength = res.data.data.content.length;
                         this.BlogList = [...this.BlogList, ...this.list]; 
                      }
                  }).catch((err)=>{
                      console.log(err)
                  })
            },
     goToTop:function(){
          this.$refs.scroll.scrollTo(0, 0, 1500);
            },
     imgAutoAdapt:function(e){
          MethodsUtil.imgAutoAdapt(e.target,true)
      },
    },
    computed: {
       options() {
            return {
                pullUpLoad: {
                    threshold:0,
                    txt: "更新成功"
                },
                bounce:false,
                scrollbar: true
            };
        }, 
    },
    mounted(){
      this.upHeight = document.querySelector(".banner").offsetHeight;
    },
    watch: {
        scrollTop:{
                handler:function(newVal,oldVal){
                    if(newVal>=800){
                        this.showGoTop = true;
                    }else{
                        this.showGoTop = false;
                    };
                    if(newVal>this.upHeight){
                        this.onup=true;
                    }else{
                        this.onup=false;
                    }
                    if(newVal-oldVal>0 && this.scrollTop >0){//上划
                        eventBus.$emit("scrollTop",true);
                    }else{
                        eventBus.$emit("scrollTop",false);
                   }
                },
                deep:true,
            },
    },

  }
</script>

<style lang="scss">
#BlogList{
  width: 320px;
  font-family: "微软雅黑";
  text-align: left;
  float: left;
  height: 100%;
  overflow: hidden;
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
  white-space: normal
}
.BlogImageText_right .BlogImageText_title{
  font-size: 14px;
  word-break: break-all;
  color:#122F46;
  height: 40px;
  overflow: hidden;
  white-space: normal;
  line-height: 22px;
}
.Blog_status{
  font-size: 12px;
  margin-top: 10px;
  color: #718290;
  height: 18px;
  line-height: 18px;
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
.the-end{
  text-align: center;
  padding: 20px 0;
  color: #A1A1A1;
}
</style>
