<template>
  <div id="audioZhuanji" class="templateMusic">
    <span class="posC">
      <!-- tab切换不在滚动区域的 -->
      <section class="headContent" v-show="!noBanner">
        <h3>{{this.isSearch? "搜索":'最新专辑'}}</h3>
        <ul>
          <li v-for="(tab,i) in tabs" :key="i" @click="changeTab(i)">
            <a v-if="!isSearch" :href="'/music?type='+(i+1)" :class="{'active':i==1}">{{tab}}</a>
            <a
              v-else-if="isSearch"
              :href="'/searchResult2?tabIndex=3&type='+(i+1)+'&word='+$route.query.word"
              :class="{'active':i==1}"
            >{{tab}}</a>
          </li>
        </ul>
      </section>
      <!-- 此处为展示筛选数量的盒子 仅在搜索结果页显示不在滚动区域  -->
      <section class="filtrateBox" v-show="!noBanner&&isSearch==true">
        <filterCount :keyword="keyword" :counts="counts" :typeIndex="1"></filterCount>
      </section>
    </span>
    <!-- 创作人的筛选条件页面 -->
    <!-- 滚动区域 banner+tab切换、筛选的结果、列表 -->
    <span class="ICanScroll">
      <cube-scroll
        ref="scroll"
        :options="options"
        :data="dataItems"
        @pulling-up="onPullingUp"
        id="pokCreator"
        @scroll="handelScrol"
        :scroll-events="['scroll']"
      >
        <!-- banner盒子 仅在列表页展示 -->
        <div v-if="!isSearch">
          <banners :items="imgs"></banners>
        </div>
        <!-- tab切换 -->
        <section class="headContent">
          <h3>{{this.isSearch? "搜索":'最新专辑'}}</h3>
          <ul>
            <li v-for="(tab,i) in tabs" :key="i" @click="changeTab(i)">
              <a v-if="!isSearch" :href="'/music?type='+(i+1)" :class="{'active':i==1}">{{tab}}</a>
              <a
                v-else-if="isSearch"
                :href="'/searchResult2?tabIndex=3&type='+(i+1)+'&word='+$route.query.word"
                :class="{'active':i==1}"
              >{{tab}}</a>
            </li>
          </ul>
        </section>
        <!-- 此处为筛选的盒子 仅在搜索结果页的时候显示-->
        <section class="filtrateBox" v-if="isSearch">
          <filterCount :keyword="keyword" :counts="counts" :typeIndex="1"></filterCount>
        </section>

        <!-- 专辑列表 -->
        <section>
          <ul v-if="dataItems.length>0" class="ZhuanjiList clearfix">
            <li v-for="(zhuanji,i) in dataItems" :key="i">
              <!--<a :href="`audio_wap/mobileAudioPlayer/mobilePlayer?playerPage=album${encodeURIComponent(String('/2-'+zhuanji.albumId+'/1/'))}`">-->
              <a :href="zhuanji.wapAlbumUrl"> 
                <div class="zhuanji-cont">
                  <section class="imgBox">
                    <img
                      :src="zhuanji.albumCoverUrl"
                      :alt="zhuanji.albumName+zhuanji.fAlias"
                      ref="imgs"
                      @load="zishiying($event,i)"
                      class="zishiying"
                    />
                    <!-- <div class="positionBox">
                  <img src="@/common/images/inforplay.png" alt="播放">
                    </div>-->
                  </section>

                  <section class="about">
                    <h3 v-html="zhuanji.albumName" style="color:#122F46"></h3>
                    <p
                      style="color:#718290"
                    >{{ zhuanji.creatorStr!=null ? ceshis(zhuanji.creatorStr):zhuanji.fCreateTime.split(' ')[0]}}</p>
                  </section>
                </div>
              </a>
            </li>
          </ul>
          <span v-show="theEnd" style="width:100%;display:block" class="the-end">已经到底啦!</span>
        </section>

        <template slot="pullup" slot-scope="propsa">
          <div v-show="propsa.pullUpLoad">
            <template>
              <!-- <span v-if="propsa.isPullUpLoad &&!isBottom"> -->
              <span v-show="!isBottom">
                <Loading class></Loading>
              </span>
              <!-- <span v-else>{{propsa.txt}}</span> -->
              <span v-show="isBottom" style="width:100%;display:block" class="the-end">已经到底啦!</span>
            </template>
          </div>
        </template>
      </cube-scroll>
    </span>
    <!-- 没有数据 -->
    <div v-show="dataItems.length<=0" style class="nodataBox" :class="{searchNodata:isSearch}">
      <span>
        <Loading v-show="initLoadingShow"></Loading>
        <!-- <span v-show="!initLoadingShow" class="noData"></span> -->
        <img
          v-show="!initLoadingShow"
          style="margin-top:30px;width:109px;"
          src="/images/noData.png"
          alt
        />
      </span>
    </div>
    <!-- 返回按钮-->
    <section class="gotoTop" @click="scrollTo" v-show="touchMoveT">
      <img src="/images/gotoTop.png" alt="上" />
    </section>
  </div>
</template>

<script>
import { Scroll, Slide } from "cube-ui";
import Loading from "../public/loading.vue";
import filterCount from "./filterResultCount"; //筛选的结果条数
import eventBus from "@/assets/js/eventBus";
import banners from "../public/Rotation"; //引入轮播组建
import { setTimeout } from "timers";
export default {
  name: "audioZhuanji",
  data() {
    return {
      dataItems: [],
      initLoadingShow: true,
      dataLen: null,
      page: 1,
      list: [],
      isBottom: false,
      touchMoveT: false,
      topOrbottom: null,
      topOrdown: null,

      upOrdown: true, //判断是上拉还是下滑
      counts: 0,
      noBanner: true,
      imgs: [
        { image: "/images/audio1.jpg", url: "/M_audio" },
        { image: "/images/audio2.jpg", url: "/M_audio" }
      ],
      theEnd: false
    };
  },
  props: {
    isSearch: {
      //是否为搜索页 默认不是
      type: Boolean,
      default: false
    },
    keyword: {
      type: String
    },
    tabs: {
      type: Array
    },
    pageData: {
      type: Object
    }
  },

  computed: {
    options() {
      return {
        pullUpLoad: {
          threshold: 30,
          stop: 90,
          txt: "更新成功"
        },
        scrollbar: true,
        bounce: false //禁止回弹与下拉
      };
    }
  },
  created() {
    //console.log(this.pageData,'CreatedZhuanjipaddddddddddddddddddddd')
    if (this.pageData.list&&this.pageData.list.count > 0) {
      this.dataItems = this.pageData.list.content;
      this.counts = this.pageData.list.count;
    } 
    else {
      setTimeout(() => {
        if (this.dataItems.length == 0) {
          //如果没有数据控制loading隐藏以及文字提示的显示
          this.initLoadingShow = false;
        }
      }, 500);
    }
  },
  // activated() {
  //   //页面进入的时候
  //   this.noBanner = true; //隐藏来回切换是假的头部
  //   eventBus.$emit("scrollResultTop", false); //将搜索结果页头部放下来
  //   this.theEnd ? this.$refs.scroll.disable() : this.$refs.scroll.enable(); //通过数据的多少限制可否滚动
  // },
  mounted() {
    if (this.counts > 0) {
      //当数据条数比较小的时候出现（已经到底了）并且禁止滚动条 通过shouldH(为可视ul列表的高度)和CreatorListH(正常ul列表的高度)比较差值
      this.$nextTick(() => {
        let CreatorListH = document.querySelector(".ZhuanjiList").offsetHeight; //正常ul的高度
        let pokCreatorH = document.querySelector("#pokCreator").offsetHeight;
        let headContentH = document.querySelectorAll(".headContent")[1]
          .offsetHeight;
        let filtrateBoxH =this.isSearch ? document.querySelectorAll(".filtrateBox")[1].offsetHeight : 0;
        let bannerH = this.isSearch ? 0 :110;
        let shouldH = pokCreatorH - headContentH - filtrateBoxH -bannerH; //可视ul列表的高度
        let dengcha = 40+CreatorListH - shouldH;
        dengcha > 0 ? (this.theEnd = false) : (this.theEnd = true);
        dengcha > 0 ? this.$refs.scroll.enable() : this.$refs.scroll.disable();
      });
    }
  },
  methods: {
    changeTab(i) {
      this.$emit("changeTabCom", i);
      //localStorage.setItem('saveIndex',i)
    },
    zishiying(event, i) {
      let that = this;
      let imgSize = that.$refs["imgs"];
      that.$nextTick(() => {
        //图片自然宽高
        let naturalHeight = imgSize[i].naturalHeight;
        let naturalWidth = imgSize[i].naturalWidth;
        if (naturalHeight >= naturalWidth) {
          event.target.style.width = "100%";
        } else {
          event.target.style.height = "100%";
        }
      });
    },
    handelScrol(pos) {
      //实时监听滚动位置控制返回顶部的显隐
      this.topOrdown = -pos.y;
      //this.$emit("ceshi", -pos.y);
      let topDistance = 0;
      this.isSearch == true ? (topDistance = 13) : (topDistance = 113);
      if (-pos.y < topDistance) {
        this.noBanner = true;
      } else {
        this.noBanner = false;
      }
      if (pos.y < -1000) {
        this.touchMoveT = true;
      } else {
        this.touchMoveT = false;
      }
    },
    getData(page, pageSize, keyword, filterValue) {
      let that = this;
      that.theEnd = false;
      that.HttpCli.get("audio_web/search-api/searchAlbum", {
        pageNow: page ? page : 1,
        pageSize: pageSize ? pageSize : 12,
        keyword: keyword ? keyword : null
      }).then(res => {
        if (res.data.status == 0) {
          if (page == 1) {
            that.dataItems = res.data.data.content;
            that.counts = res.data.data.count;
            setTimeout(() => {
              if (this.dataItems.length == 0) {
                //
                this.isSearch
                  ? (this.initLoadingShow = false)
                  : (this.initLoadingShow = true);
              }
            }, 500);
            if (this.isSearch && that.counts > 0) {
              //当筛选的结果页面的条数比较小的时候出现（已经到底了）并且禁止滚动条 通过shouldH(为可视ul列表的高度)和CreatorListH(正常ul列表的高度)比较差值
              setTimeout(() => {
                let CreatorListH = document.querySelector(".ZhuanjiList")
                  .offsetHeight; //正常ul的高度
                let pokCreatorH = document.querySelector("#pokCreator")
                  .offsetHeight;
                let headContentH = document.querySelectorAll(".headContent")[1]
                  .offsetHeight;
                let filtrateBoxH = document.querySelectorAll(".filtrateBox")[1]
                  .offsetHeight;
                let shouldH = pokCreatorH - headContentH - filtrateBoxH; //可视ul列表的高度
                let dengcha = 40+CreatorListH - shouldH;
                dengcha > 0 ? (this.theEnd = false) : (this.theEnd = true);
                dengcha > 0
                  ? this.$refs.scroll.enable()
                  : this.$refs.scroll.disable();
              }, 1);
            }
          } else {
            that.list = res.data.data.content;
          }
          this.isBottom = false;
          that.dataLen = res.data.data.content.length;
        }
      });
    },
    onPullingUp() {
      if (this.page == 1) {
        this.page = 2; //此做法的结果是第一次下拉刷新请求的是第二页和第三页的数据可致使最后一次请求数据为空即判断dataLen为0
      }
      setTimeout(() => {
        if (this.dataLen > 0) {
          //有数据
          this.page += 1;
          this.dataItems = [...this.dataItems, ...this.list];
          this.$refs.scroll.forceUpdate();
          this.$refs.scroll.refresh();
          this.isBottom = false;
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
          this.$refs.scroll.refresh();
          this.isBottom = true;
        }
      }, 1000);
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 2000);
    },
    ceshis(v) {
      //去除数字后的冒号，作者之间增加斜杠
      if (v) {
        let s1 = v.split(",", v.split(",").length - 1);
        let s2 = s1.map(str => {
          return str.split(":")[1];
        });
        return s2.join("/");
      }
    }
  },
  // filters:{
  //   ceshis(v){
  //     let s1 = v.split(',',2)
  //     let s2 = s1.map(str=>{
  //       return str.split(':')
  //     })
  //     return s2.join('/')
  //   }
  // },
  components: {
    Loading,
    filterCount,
    banners
  },
  watch: {
    page(newV, oldV) {
      this.getData(newV, 60, this.keyword);
    },
    topOrdown(newV, oldV) {
      if (newV - oldV > 0 && this.topOrdown > 0) {
        //上划
        this.isSearch == false
          ? eventBus.$emit("scrollTop", true)
          : eventBus.$emit("scrollResultTop", true);
      } else {
        this.isSearch == false
          ? eventBus.$emit("scrollTop", false)
          : eventBus.$emit("scrollResultTop", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.the-end {
  height: 40px;
  line-height: 40px;
  color: #b1c9d3;
  padding: 0;
}
.clearfix {
  zoom: 1;
}
.clearfix:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
}
.posC {
  position: absolute;
  top: -3px;
  z-index: 3;
  width: 100%;
  background: #fff;
  display: block;
}
.active {
  color: #fff !important;
  background-color: #2fb7ec;
}
.bannerBox {
  height: 100px;
  width: 100%;
}
#audioZhuanji {
  //position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  height: 100%;
  position: relative;
  .ZhuanjiList {
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    // background: #fff;
    padding: 0 5px;

    li {
      width: 93px;
      text-align: left;
      //   margin-top: 10px;
      float: left;
      margin-right: calc((100% - 279px) / 2);
      &:nth-of-type(3n) {
        margin-right: 0px;
      }
      .imgBox {
        position: relative;
        width: 93px;
        height: 93px;
        overflow: hidden;
        margin: 0 auto;
        .zishiying {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      h3,
      p {
        margin: 8px 0;
        width: 100%;
        //text-overflow: ellipsis;
        //white-space: nowrap;
        overflow: hidden;
        word-break: break-all;
      }
      .about {
        h3 {
          line-height: 16px;
          height: 16px;
        }
        p {
          line-height: 14px;
          height: 14px;
          font-style: 12px;
        }
      }
    }
  }
  .headContent {
    display: flex;
    justify-content: space-between;

    padding: 0px 5px;
    h3 {
      //width: 70px;
      color: #122f46;
      line-height: 20px;
      margin: 10px 0;
      font-size: 14px;
      padding-left: 5px;
    }
    ul {
      margin: 10px 0;
      li {
        display: inline-block;
        a {
          display: inline-block;
          padding: 0 10px;
          width: auto;
          border-left: 1px solid #f2f2f2;
          line-height: 20px;
          color: #122f46;
          &:first-child {
            border-left: none;
          }
        }
      }
    }
  }
}
.toTop {
  position: absolute;
  right: 10px;
  bottom: 40px;
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  z-index: 99;
  padding-top: 10px;
  box-sizing: border-box;
  img {
    width: 20px;
    height: 20px;
  }
}
// .noData {
//   margin-top: 20px;
//   width: 100%;
//   height: 150px;
//   display: block;
//   background: url("../../common/images/noData.png") no-repeat center;
//   background-size: auto;
// }
.filtrateBox {
  height: 30px;
}
.nodataBox {
  height: calc(100% - 150px);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 5;
  text-align: center;
}
.searchNodata {
  height: calc(100% - 70px) !important;
}
.gotoTop {
  width: 40px;
  height: 40px;
  background: #fff;
  position: fixed;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  img {
    width: 16px;
    height: 18px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>


