<template>
  <div id="newsList">
     
    <div class="infortabchange" v-show ="onup" style="position:absolute; background:#FFFFFF; z-index:3;top:-1px;"> 
        <h2>最新资讯</h2>
        <h3></h3>
        <ul>
          <li>
            <a :href="'/information?type=2'" class="active">资讯</a>
          </li>
          <li>
            <a :href="'/information?type=1'">文章</a>
          </li>
        </ul> 
      </div>


    <cube-scroll
      ref="scroll"
      :data="NewsList"
      :options="options"
      @scroll="scroll"
      :scroll-events="['scroll']"
      @pulling-up="onPullingUp"
    >
     <div class="banner">
            <Banner :items = "item"/>
      </div>

      <div class="infortabchange">
        <h2>最新资讯</h2>
        <h3></h3>
        <ul>
          <li>
            <a :href="'/information?type=2'" class="active">资讯</a>
          </li>
          <li>
            <a :href="'/information?type=1'">文章</a>
          </li>
        </ul>
        
      </div>

      <div v-show="areadyshow">
      <Loading class="showLoading"></Loading>
      </div> 
     
  <ul id="alreadyshow">
    <a :href='item.newsWapDetailPageSrc'  v-for="(item,index) of NewsList" :key=index  style="float:left" >
    <li>
    <!-- 图文无图 -->
  <div v-if="item.fNewsType == 1 && item.fThumbnail== null" class="newsImageText">
  <div>
  <div class="newsImageText_title">{{item.fNewsTitle}}</div>
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
    <img :src='item.fThumbnail.indexOf("video_")==-1 ? item.fThumbnail : item.fThumbnail.split("video_")[1]' alt=""  @load="imgAutoAdapt"/>
    <i v-show="item.fThumbnail.indexOf('video_')!=-1" class="BlogVideo_icon"></i>
  </div>
  <div class="newsImageText_right">
  <div class="newsImageText_title">{{item.fNewsTitle}}</div>
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
  <div class="newsAtlas_title">{{item.fNewsTitle}}</div> 
  <div class="newsAtlas_showbox">
    <ul>
      <li v-for="(val,index) of item.fContent.split(',').slice(0,3) " :key=index ><img :src='val' alt=""  @load="imgAutoAdapt"/></li>
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
  <div class="newsVideo_title">{{item.fNewsTitle}}</div>  
  <div class="newsVideo_pic">
    <img :src='item.fThumbnail' alt=""  @load="imgAutoAdapt"/>
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
  import MethodsUtil from "~/assets/js/MethodsUtil";
  import eventBus from "~/assets/js/eventBus";
  import Interface from "~/assets/js/ConstStr";
  import Loading from "../public/loading";
 const item = [
     {
        image:'/images/infomation.jpg',url: "/M_news"
     },
     {
        image:'/images/audio2.jpg',url: "/M_news"
     }
];
  export default {
    name: 'News',
    props: ['curId','pageData'],
    data(){
       return{
              ifortype:['资讯','博客'],
              onup : false,
              upHeight:'',
              NewsList:[],
              dataLength:null,
              areadyshow:true,
              list:[],
              showGoTop:false,      //是否显示“回到顶部”按钮
              page:1,
              scrollTop:0,     
              loading: false,
              theEnd : false,
              item:item , 
       }
    },
    created () {
      setTimeout(()=>{
          this.NewsList = this.pageData.DataList.content;
          this.dataLength =  this.pageData.DataList.content.length;
          this.areadyshow = false;
          },100)
    }, 
    components: {
      Loading,
      Banner
    },
    filters:{
      typejudge:(n)=>{
        switch(n){
          case 1: return '图文'; break;
          case 2: return '图集'; break;
          default: 
          return '视频';
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
      scroll:function(dis){
                this.scrollTop = -dis.y;
            },
      onPullingUp(){
              if (this.dataLength>0) {
                console.log("you")
                // 如果有新数据
                this.loading = true;
                this.page++;
                setTimeout(() => {
                this.getNewsData(this.page);
                this.$refs.scroll.forceUpdate();
                },1000)
              } else {
                console.log(this.dataLength)
                 console.log("wu")
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
      getNewsData:function(page){
                  this.HttpCli.get(
                        Interface.newsSearchKeyWord, 
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
                         this.NewsList = [...this.NewsList, ...this.list];
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
        // console.log("数据3",this.NewsList)
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
                    if(newVal>=this.upHeight){
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

#newsList{
  width: 320px;
  font-family: "微软雅黑";
  text-align: left;
  float: left;
  height: 100%;
  overflow: hidden;
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
}
.newsImageText_right .newsImageText_title{
  font-size: 14px;
  word-break: break-all;
  color:#122F46;
  height: 40px;
  overflow: hidden;
  white-space: normal;
  line-height: 21px;
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
  overflow:hidden;
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
