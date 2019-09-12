<template>
  <div id="musicTemplate">
    <section class="conts">
      <!-- <keep-alive> -->
        <component
          :is="componentNameList[ces]"
          :isSearch="isSearch"
          :keyword="keyword"
          :tabs="tabs"
          @changeTabCom="changeTab"
          ref="childs"
          :pageData='pageData'
        ></component>
      <!-- </keep-alive> -->
    </section>
  </div>
</template>

<script>
import music from "./music"; //引入音频组件
import zhuanji from "./zhuanji"; //引入音频组件
import creator from "./creator"; //引入创作人组件
import eventBus from "@/assets/js/eventBus";
import MethodsUtil from "~/assets/js/MethodsUtil";
import { types } from "util";
export default {
  name: "musicTemplate",
  data() {
    return {
      tabs: ["音频", "专辑", "创作人"],
      currentIndex: 0,
      componentNameList: ["music", "zhuanji", "creator"],
    };
  },
  props: {
    pageData: Object,
    isSearch: {
      // 因为此组件既是列表展示的页面也是搜索结果的界面所以通过此字段判断页面
      //判断是否为搜索页还是展示页 默认展示页
      type: Boolean,
      default: false
    },
    keyword: {
      type: String
    }
  },
  created() {
    //console.log(this.pageData, "createdAudiodatas");
  },
  mounted() {
    //上划收起
    eventBus.$on("scrollTop", arg => {
      this.scrollTop = arg;
    });
    if (this.isSearch == true) {
      document.querySelector("#musicTemplate").style.height = "100%";
    }

  },
  methods: {
    changeTab(i) {
      localStorage.setItem("saveIndex", i);
      this.currentIndex = i;
    }
  },
  computed: {
    ces() {
      return this.$route.query.type ? this.$route.query.type - 1:0;
    }
  },
  components: {
    music,
    zhuanji,
    creator
  }
};
</script>


<style lang="scss" scoped>
.bannerBox,
.Rotation {
  transition: height 0.5s;
}
.templateTop {
  //top: -54px !important;
}
.templateTop .Rotation {
}
.conts {
  height: 100%;
}
.contsSearch {
  height: calc(100% - 40px) !important;
}
.liHeight {
  height: 100%;
}
#musicTemplate {
  background: #fff;
  font-size: 12px;
  //height: 100%;
  .active {
    color: #fff !important;
    background-color: #2fb7ec;
  }
  .bannerBox {
    // .bannerImg {
    //   width: 100%;
    //   height: 100px;
    // }
    // img {
    //   width: 100%;
    //   height: 100%;
    // }
  }
}
.searchResultContent .head {
  display: none;
}
</style>

<style>
em {
  color: #3d9be9;
  font-style: normal;
}
</style>




