<template>
  <div id="music" class="scroll-list-wrap templateMusic" ref="music" :style="conheight">
    <span class="posC">
      <!-- tab切换不在滚动区域的 -->
      <section class="headContent" v-show="!noBanner">
        <h3>{{isSearch? "搜索":'最新音频'}}</h3>
        <ul>
          <li v-for="(tab,i) in tabs" :key="i" @click="changeTab(i)">
            <a v-if="!isSearch" :href="'/music?type='+(i+1)" :class="{'active':i==0}">{{tab}}</a>
            <a
              v-else-if="isSearch"
              :href="'/searchResult2?tabIndex=3&type='+(i+1)+'&word='+$route.query.word"
              :class="{'active':i==0}"
            >{{tab}}</a>
          </li>
        </ul>
      </section>
      <!-- 此处为展示筛选数量的盒子 仅在搜索结果页显示不在滚动区域  -->
      <section class="filtrateBox" v-show="!noBanner&&isSearch==true">
        <filterCount :keyword="keyword" :counts="counts" :typeIndex="0"></filterCount>
      </section>
    </span>
    <!-- 创作人的筛选条件页面 -->
    <section>
      <filterTem :typeIndex="0"></filterTem>
    </section>
    <span class="ICanScroll">
      <cube-scroll
        ref="scroll"
        id="pokCreator"
        :data="items"
        :options="options"
        @pulling-up="onPullingUp"
        @scroll="showTop"
        :scroll-events="['scroll']"
      >
        <!-- banner盒子 仅在列表页展示 -->
        <div v-if="!isSearch">
          <banners :items="imgs"></banners>
        </div>
        <!-- tab切换 -->
        <section class="headContent">
          <h3>{{isSearch? "搜索":'最新音频'}}</h3>
          <ul>
            <li v-for="(tab,i) in tabs" :key="i" @click="changeTab(i)">
              <a v-if="!isSearch" :href="'/music?type='+(i+1)" :class="{'active':i==0}">{{tab}}</a>
              <a
                v-else-if="isSearch"
                :href="'/searchResult2?tabIndex=3&type='+(i+1)+'&word='+$route.query.word"
                :class="{'active':i==0}"
              >{{tab}}</a>
            </li>
          </ul>
        </section>
        <!-- 此处为筛选的盒子 仅在搜索结果页的时候显示-->
        <section class="filtrateBox" v-if="isSearch">
          <filterCount :keyword="keyword" :counts="counts" :typeIndex="0"></filterCount>
        </section>

        <ul class="music-wrapper" v-show="items.length>0">
          <li
            v-for="(music,index) in items"
            :data-id="music.audioId"
            :key="index"
            class="music-item border-1px"
            @click="checkedItem(index,music.audioId)"
          >
            <div class="icon">
              <img :src="music.fCoverUrl" alt="音乐封面" @load="imgAutoAdapt" />
            </div>
            <div class="music-content" style="overflow:hidden">
              <h2
                class="item-name"
                v-html="music.fAudioSuffix!=''?`${music.audioName} (${music.fAudioSuffix})`:`${music.audioName}`"
                style="width:100%"
              ></h2>
              <div class="item-extra">
                <span class="item-category">{{ music.categoryName }}</span>
                <span
                  style="color:#718290"
                >· {{ music.creatorStr!=null ?ceshis(music.creatorStr):music.fCreateTime.split(' ')[0]}}</span>
              </div>
            </div>
          </li>
          <span v-show="theEnd" style="width:100%;display:block" class="the-end wa">已经到底啦!</span>
        </ul>
        <template slot="pullup" slot-scope="propsa">
          <div class="pull-wrapper" v-show="propsa.pullUpLoad&&!theEnd">
            <template>
              <span v-if="!bottomStatus">
                <Loading></Loading>
              </span>
              <span v-else>{{propsa.txt}}</span>
              <span v-show="bottomStatus" class="the-end" style="width:100%;display:block">已经到底啦!</span>
            </template>
          </div>
        </template>
      </cube-scroll>
    </span>
    <!-- 没有数据 -->
    <div v-show="items.length<=0" style class="nodataBox" :class="{searchNodata:isSearch}">
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
    <!-- 置顶按钮-->
    <section class="gotoTop" @click="scrollTop" v-show="backTopicon">
      <img src="/images/gotoTop.png" alt="上" />
    </section>
  </div>
</template>

<script>
import { Scroll } from "cube-ui";
import Loading from "../public/loading.vue";
import axios from "axios";
import filterTem from "./filterTemplate"; //筛选的条件组件
import filterCount from "./filterResultCount"; //筛选的结果条数
import eventBus from "@/assets/js/eventBus";
import MethodsUtil from "@/assets/js/MethodsUtil";
import banners from "../public/Rotation"; //引入轮播组建
import { setTimeout } from "timers";
export default {
  name: "audioMusic",
  props: {
    isSearch: {
      //是否为搜索页
      type: Boolean,
      default: false
    },
    keyword: {
      type: String,
      default: ""
    },
    tabs: {
      type: Array
    },
    pageData: {
      type: Object
    }
    // filterValue: {
    //   //筛选条件值
    //   type: Object
    // }
  },

  data() {
    return {
      items: [],
      conheight: {
        height: ""
      },
      isActive: -1,
      backTopicon: false,
      pageNow: 1,
      list_param: { pageNow: 1, pageSize: 24 },
      bottomStatus: false, //底部上拉加载状态
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "更新成功",
      pullUpLoadNoMoreTxt: "已经到底啦！",
      keywordValue: this.keyword,
      initLoadingShow: true,
      topOrdown: null,
      counts: null,
      noBanner: true,
      filterValueM: {
        firstCategory: null,
        secondCategory: null
      },
      imgs: [
        { image: "/images/audio1.jpg", url: "/M_audio" },
        { image: "/images/audio2.jpg", url: "/M_audio" }
      ],
      theEnd: false
    };
  },

  created() {
    var _this = this;
    if (this.pageData.list&&this.pageData.list.count > 0) {
      this.items = this.pageData.list.content;
      this.counts = this.pageData.list.count;
    } else {
      setTimeout(() => {
        if (this.items.length == 0) {
          //如果没有数据控制loading隐藏以及文字提示的显示
          this.initLoadingShow = false;
        }
      }, 500);
    }

    // console.log(this.items.length,'llllllllllllllllll')
  },
  // activated(){
  //    this.noBanner = true;//隐藏来回切换时假的头部
  //   this.theEnd ? this.$refs.scroll.disable() : this.$refs.scroll.enable();//通过数据的多少限制可否滚动
  //   eventBus.$emit("scrollResultTop", false);//将搜索结果页头部放下来
  // },
  mounted() {
    //console.log('musicMounted')
    let _this = this;
    if (_this.counts > 0) {
      //当筛选的结果页面的条数比较小的时候出现（已经到底了）并且禁止滚动条 通过shouldH(为可视ul列表的高度)和CreatorListH(正常ul列表的高度)比较差值
      setTimeout(() => {
        let CreatorListH = document.querySelector(".music-wrapper")
          .offsetHeight; //正常ul的高度
        let pokCreatorH = document.querySelectorAll("#pokCreator")[0]
          .offsetHeight;
        let headContentH = document.querySelectorAll(".headContent")[1]
          .offsetHeight;
        let filtrateBoxH =_this.isSearch ? document.querySelectorAll(".filtrateBox")[1].offsetHeight : 0;
        let bannerH = _this.isSearch ? 0 :110;
        let shouldH = pokCreatorH - headContentH - filtrateBoxH - bannerH; //可视ul列表的高度
        let dengcha = 40 + CreatorListH - shouldH;
        dengcha > 0 ? (this.theEnd = false) : (this.theEnd = true);
        dengcha > 0 ? this.$refs.scroll.enable() : this.$refs.scroll.disable();
      },500);
    }
    _this.getBrotherData();
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true,
        bounce: false //禁止回弹与下拉
      };
    },
    pullUpLoadObj() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false;
    }
  },

  methods: {
    changeTab(i) {
      this.$emit("changeTabCom", i);
      //localStorage.setItem('saveIndex',i)
    },
    ceshis(v) {
      //去除冒号增加斜杠
      if (v) {
        let s1 = v.split(",", v.split(",").length - 1);
        let s2 = s1.map(str => {
          return str.split(":")[1];
        });
        return s2.join("/");
      }
    },
    getBrotherData() {
      eventBus.$on("music-confirm", (typeValue, guojiValue) => {
        this.filterValueM.firstCategory = typeValue;
        this.filterValueM.secondCategory = guojiValue;
      });
    },
    imgAutoAdapt: function(e) {
      MethodsUtil.imgAutoAdapt(e.target, true);
    },
    getData(pageNow, pageSize, keyword, filterValueM) {
      let _this = this;
      _this.HttpCli.get("audio_web/search-api/searchAudio", {
        pageNow: pageNow ? pageNow : 1,
        pageSize: pageSize ? pageSize : 12,
        keyword: keyword ? keyword : null,
        firstCategory: filterValueM ? filterValueM.firstCategory : null,
        secondCategory: filterValueM ? filterValueM.secondCategory : null
      }).then(res => {
        if (res.data.status == 0) {
          _this.items = res.data.data.content;
          _this.counts = res.data.data.count;
          this.bottomStatus = false;
          this.initLoadingShow = true;
          setTimeout(() => {
            if (this.items.length == 0) {
              this.isSearch
                ? (this.initLoadingShow = false)
                : (this.initLoadingShow = true);
            }
          }, 500);
          if (this.isSearch && _this.counts > 0) {
            //当筛选的结果页面的条数比较小的时候出现（已经到底了）并且禁止滚动条 通过shouldH(为可视ul列表的高度)和CreatorListH(正常ul列表的高度)比较差值
            setTimeout(() => {
              let CreatorListH = document.querySelector(".music-wrapper")
                .offsetHeight; //正常ul的高度
              let pokCreatorH = document.querySelectorAll("#pokCreator")[0]
                .offsetHeight;
              let headContentH = document.querySelectorAll(".headContent")[1]
                .offsetHeight;
              let filtrateBoxH = document.querySelectorAll(".filtrateBox")[1]
                .offsetHeight;
              let shouldH = pokCreatorH - headContentH - filtrateBoxH; //可视ul列表的高度
              let dengcha = 40 + CreatorListH - shouldH;
              dengcha > 0 ? (this.theEnd = false) : (this.theEnd = true);
              dengcha > 0
                ? this.$refs.scroll.enable()
                : this.$refs.scroll.disable();
            }, 1);
          }
        }
      });
    },
    onPullingUp() {
      let _this = this;
      // 更新数据
      setTimeout(() => {
        _this.pageNow += 1;
        _this.HttpCli.get("audio_web/search-api/searchAudio", {
          pageNow: _this.pageNow,
          pageSize: 60,
          keyword: _this.keyword,
          firstCategory: _this.filterValueM
            ? _this.filterValueM.firstCategory
            : null,
          secondCategory: _this.filterValueM
            ? _this.filterValueM.secondCategory
            : null
        }).then(res => {
          if (res.data.data.content.length > 0) {
            //有新数据
            _this.items = [..._this.items, ...res.data.data.content];
            _this.$refs.scroll.forceUpdate();
            _this.$refs.scroll.refresh();
            _this.bottomStatus = false;
          } else {
            // 如果没有新数据
            _this.$refs.scroll.forceUpdate();
            _this.$refs.scroll.refresh();
            _this.bottomStatus = true;
          }
        });
      }, 1000);
    },
    checkedItem(index, musicId) {
      this.isActive = index;
      console.log(this.items[index]);
      window.location.href=this.items[index].wapAudioUrl;
      /**
      let music_id = 
      this.items[index].fEntrepId == 71 ? "1-" + musicId : "2-" + musicId; // 设置播放音频ID
      console.log(music_id);
      window.location.href = `audio_wap/mobileAudioPlayer/mobilePlayer?playerPage=play${encodeURIComponent(
        String("/1/" + music_id + "/0/1/")
      )}`;*/
    },
    showTop(pos) {
      this.topOrdown = -pos.y;
      let topDistance = 0;
      this.isSearch == true ? (topDistance = 13) : (topDistance = 113);
      if (-pos.y < topDistance) {
        this.noBanner = true;
      } else {
        this.noBanner = false;
      }
      if (pos.y < -1000) {
        this.backTopicon = true;
      } else {
        this.backTopicon = false;
      }
    },
    scrollTop() {
      this.$refs.scroll.scrollTo(0, 0, 2000);
    }
  },
  components: {
    Loading,
    filterTem,
    banners,
    filterCount
  },
  watch: {
    filterValueM: {
      //筛选的条件值
      deep: true,
      handler: function(newv, oldv) {
        console.log("筛选之门");
        this.pageNow = 1;
        this.theEnd = false;
        this.items = [];
        this.$refs.scroll.scrollTo(0, 0, 10);
        setTimeout(() => {
          this.getData(1, 30, this.keyword, newv);
        }, 500);
      }
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
.the-end {
  height: 40px;
  line-height: 40px;
  color: #b1c9d3;
  padding: 0;
}

.posC {
  position: absolute;
  top: -3px;
  left: 0;
  z-index: 3;
  width: 100%;
  background: #fff;
  display: block;
}

.active {
  color: #fff !important;
  background-color: #2fb7ec;
}

.headContent {
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;

  h3 {
    color: #122F46;
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

#music {
  height: 100%;
}

.scroll-list-wrap {
  // height:408px
  position: relative;
}

.music-wrapper {
  background: #fff;

  .music-item {
    display: flex;
    padding: 10px 10px;
    border: 1px solid #fff;
    border-bottom: 1px solid #f2f2f2;

    &:last-child {
      border-none();
    }

    &.active {
      // border: 1px solid #FF9933;
      // background: rgba(255, 153, 51, 0.1);
    }

    .icon {
      flex: 0 0 40px;
      height: 40px;
      overflow: hidden;
      margin-right: 12px;
    }

    .music-content {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;

      .item-name {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        color: #122F46;
        width: 100%;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        overflow: hidden;
        text-align: left;
        word-break: break-all;
      }

      .item-extra {
        font-size: 11px;

        .item-category {
          color: #3D9BE9;
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
  height: @width;
  background: #fff;
  position: fixed;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;

  > img {
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
