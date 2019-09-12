<template>
  <div id="audioCreator" class="templateMusic">
    <!-- 滚动展示的非真 -->
    <span class="posC" :class="{'zIndex':!noBanner}">
      <!-- tab切换不在滚动区域的 -->
      <section class="headContent">
        <h3>{{this.isSearch? "搜索":'最新创作人'}}</h3>
        <ul>
          <li v-for="(tab,i) in tabs" :key="i" @click="changeTab(i)">
            <a v-if="!isSearch" :href="'/music?type='+(i+1)" :class="{'active':i==2}">{{tab}}</a>
            <a
              v-else-if="isSearch"
              :href="'/searchResult2?tabIndex=3&type='+(i+1)+'&word='+$route.query.word"
              :class="{'active':i==2}"
            >{{tab}}</a>
          </li>
        </ul>
      </section>
      <!-- 此处为展示筛选数量的盒子 仅在搜索结果页显示不在滚动区域  -->
      <section class="filtrateBox" v-show="!noBanner&&isSearch==true">
        <filterCount :keyword="keyword" :counts="counts" :typeIndex="2"></filterCount>
      </section>
    </span>
    <!-- 创作人的筛选条件页面 -->
    <section>
      <filterTem :typeIndex="2"></filterTem>
    </section>
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
          <h3>{{this.isSearch? "搜索":'最新创作人'}}</h3>
          <ul>
            <li v-for="(tab,i) in tabs" :key="i" @click="changeTab(i)">
              <a v-if="!isSearch" :href="'/music?type='+(i+1)" :class="{'active':i==2}">{{tab}}</a>
              <a
                v-else-if="isSearch"
                :href="'/searchResult2?tabIndex=3&type='+(i+1)+'&word='+$route.query.word"
                :class="{'active':i==2}"
              >{{tab}}</a>
            </li>
          </ul>
        </section>
        <!-- 此处为展示筛选数量的盒子 仅在搜索结果页的时候显示-->
        <section class="filtrateBox" v-if="isSearch">
          <filterCount :keyword="keyword" :counts="counts" :typeIndex="2"></filterCount>
        </section>

        <!-- 创作人列表 -->
        <section>
          <ul v-if="dataItems.length>0" class="CreatorList clearfix">
            <li v-for="(creator,i) in dataItems" :key="i">
              <!--<a :href="`audio_wap/mobileAudioPlayer/mobilePlayer?playerPage=creator${encodeURIComponent(String('/2-'+creator.creatorId+'/1/'))}`">-->
              <a :href="creator.wapCreatorUrl">
                <section class="imgBox">
                  <img
                    :src="creator.creatorCoverUrl"
                    :alt="creator.creatorName+creator.creatorAliasA+creator.creatorAliasB"
                    @load="zishiying($event,i)"
                    ref="imgs"
                    class="zishiying"
                  />
                </section>

                <p v-html="creator.creatorName"></p>
              </a>
            </li>
          </ul>
          <span v-show="theEnd" style="width:100%;display:block" class="the-end wa">已经到底啦!</span>
          
        </section>
        <template slot="pullup" slot-scope="propsa">
            <div v-show="propsa.pullUpLoad">
              <template>
                <!-- <span v-if="propsa.isPullUpLoad &&!isBottom"> -->
                <span v-if="!isBottom">
                  <Loading class></Loading>
                </span>
                <span v-else>{{propsa.txt}}</span>
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
        <!-- <span v-show="!initLoadingShow" class="noData">
             
        </span>-->
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
import { Scroll } from "cube-ui";
import Loading from "../public/loading.vue";
import filterTem from "./filterTemplate"; //筛选的条件组件
import filterCount from "./filterResultCount"; //筛选的结果条数
import eventBus from "@/assets/js/eventBus";
import banners from "../public/Rotation"; //引入轮播组建
import { setTimeout } from "timers";
export default {
  name: "audioCreator",
  data() {
    return {
      dataItems: [],
      initLoadingShow: true,
      dataLen: null,
      page: 1,
      scrollTop: false,
      list: [],
      isBottom: false,
      touchMoveT: false,
      counts: 0,
      topOrdown: null,
      noBanner: true,
      filterValue: {
        typeValue: null,
        guojiValue: null
      },
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
          stop: 0,
          txt: "更新成功"
        },
        scrollbar: true,
        bounce: false //禁止回弹与下拉
      };
    }
  },
  created() {
    //console.log(this.pageData,'111111111111111111111111CreatedCreatorpaddddddddddddddddddddd')

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

    // setTimeout(() => {
    //   this.getData(1, 30, this.keyword, null, null);
    //   setTimeout(() => {
    //     if (this.dataItems.length == 0) {
    //       //如果没有数据控制loading隐藏以及文字提示的显示
    //       this.initLoadingShow = false;
    //     }
    //   }, 500);
    // }, 500);
  },
  mounted() {
    this.getBrotherData();
    if (this.dataItems.length >0) {
      this.$nextTick(() => {
        let CreatorListH = document.querySelector(".CreatorList").offsetHeight; //正常ul的高度
        let pokCreatorH = document.querySelector("#pokCreator").offsetHeight;
        let headContentH = document.querySelectorAll(".headContent")[1]
          .offsetHeight;
        let filtrateBoxH = this.isSearch ? document.querySelectorAll(".filtrateBox")[1].offsetHeight : 0;
        let bannerH = this.isSearch ? 0 :110;
        let shouldH = pokCreatorH - headContentH - filtrateBoxH - bannerH; //可视ul列表的高度
        let dengcha = 40 + CreatorListH - shouldH;
        dengcha > 0 ? (this.theEnd = false) : (this.theEnd = true);
        dengcha > 0 ? this.$refs.scroll.enable() : this.$refs.scroll.disable();
      });
    }
  },
  // activated() {
  //    this.noBanner = true;//隐藏来回切换时假的头部
  //   this.theEnd ? this.$refs.scroll.disable() : this.$refs.scroll.enable();//通过数据的多少限制可否滚动
  //   eventBus.$emit("scrollResultTop", false);//将搜索结果页头部放下来
  // },
  methods: {
    changeTab(i) {
      this.$emit("changeTabCom", i);
      //localStorage.setItem('saveIndex',i)
    },
    getBrotherData() {
      eventBus.$on("creator-confirm", (typeValue, guojiValue) => {
        this.filterValue.typeValue = typeValue;
        this.filterValue.guojiValue = guojiValue;
      });
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
      let topDistance = 0;
      this.isSearch == true ? (topDistance = 13) : (topDistance = 113);
      if (-pos.y < topDistance) {
        this.noBanner = true;
      } else {
        this.noBanner = false;
      }
      this.topOrdown = -pos.y;
      if (pos.y < -1000) {
        this.touchMoveT = true;
      } else {
        this.touchMoveT = false;
      }
    },
    getData(page, pageSize, keyword, filterValue) {
      let that = this;
      that.HttpCli.get("audio_web/search-api/searchCreator", {
        pageNow: page ? page : 1,
        pageSize: pageSize ? pageSize : 12,
        keyword: keyword ? keyword : null,
        creatorNationalityType: filterValue ? filterValue.guojiValue : null,
        creatorType: filterValue ? filterValue.typeValue : null
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
                let CreatorListH = document.querySelector(".CreatorList")
                  .offsetHeight; //正常ul的高度
                let pokCreatorH = document.querySelector("#pokCreator")
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
          } else {
            that.list = res.data.data.content;
          }
          that.dataLen = res.data.data.content.length;
          this.isBottom = false;
          this.initLoadingShow = true;
        }
      });
    },
    onPullingUp() {
      if (this.page == 1) {
        this.page = 2; //此做法的结果是第一次下拉刷新请求的是第二页和第三页的数据可致使最后一次请求数据为空即判断dataLen为0
      }
      setTimeout(() => {
        if (this.dataLen > 0) {
          //确保没有数据之后不在发送请求
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
    }
  },
  components: {
    Loading,
    filterTem,
    banners,
    filterCount
  },
  watch: {
    page(newV, oldV) {
      this.getData(newV, 60, this.keyword, this.filterValue);
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
    },
    filterValue: {
      //筛选的条件值
      deep: true,
      handler: function(newv, oldv) {
        this.page = 1; //初始页为1
        this.theEnd = false; //初始隐藏假的已经到底了
        this.dataItems = []; //初始渲染列表
        this.$refs.scroll.scrollTo(0, 0, 10); //初始滚动位置
        setTimeout(() => {
          this.getData(1, 30, this.keyword, newv);
        }, 500);
      }
    }
  }
};
</script>



<style lang="scss" scoped>
.zIndex {
  z-index: 5 !important;
}
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
  left: 0;
  z-index: -1;
  width: 100%;
  background: #fff;
  display: block;
}
.active {
  color: #fff !important;
  background-color: #2fb7ec;
}
#audioCreator {
  height: 100%;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  position: relative;
  .CreatorList {
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    // background: #fff;
    padding: 0 5px;

    li {
      width: 93px;
      text-align: center;
      float: left;
      margin-right: calc((100% - 279px) / 2);
      &:nth-of-type(3n) {
        margin-right: 0px;
      }
      //   margin-top: 10px;
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

      p {
        margin: 10px 0;
        width: 100%;
        //text-overflow: ellipsis;
        //white-space: nowrap;
        overflow: hidden;
        line-height: 19px;
        height: 19px;
        color: #122f46;
        word-break: break-all;
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
</style>


