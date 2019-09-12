<template>
  <div id="MusM" class="fillterCom">
    <div id="filterMus">
      <section id="pokCreatorM">
        <cube-scroll ref="scroll">
          <!-- <section>   -->
          <ul class="scrollUl">
            <li class="creatorType">
              <h1>音频大类</h1>
              <ul class="creatorType-list creatorList-ul">
                <li
                  v-for="(li,i) in firstClass"
                  :key="i"
                  :class="{activeF:firstIndex==i}"
                  @click="SelectCreator(li.id,null,i,0)"
                >{{li.name}}</li>
              </ul>
            </li>
            <li class="creatorCountry" style="margin-top:5px">
              <h1>音频小类</h1>
              <div v-show="isLoading" class="gifBox">
                <img src="/images/searchLoading.gif" alt="网上找的GIF">
              </div>
              <ul class="creatorCountry-list creatorList-ul">
                <li
                  v-for="(li,i) in secondClass"
                  :key="i"
                  :class="{activeF:secondIndex==i}"
                  @click="SelectCreator(li.id,li.parentId,i,1)"
                >{{li.name}}</li>
              </ul>
            </li>
          </ul>
          <!-- </section> -->
        </cube-scroll>
      </section>
      <div class="bottoms" @touchmove.prevent>
        <button @click="clearAll">重置</button>
        <button @click="defineSearch">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from "@/assets/js/eventBus";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      firstClass: [], //一级类目
      secondClass: [], //二级类目
      firstIndex: -1, //一级类目active索引
      secondIndex: -1, //二级类目active索引
      firstValue: null, //一级类目id
      secondValue: null, //二级类目id
      isLoading: false
    };
  },
  methods: {
    SelectCreator(id, parentId, index, type) {
      if (type == 0) {
        //点击一级类目
        this.firstIndex = index;
        this.firstValue = this.firstIndex == index ? id : null;
        this.isLoading = true;
        this.secondClass = [];
        setTimeout(() => {
          this.isLoading = false;
          this.secondClass = this.firstClass[index].childrenItem;
        }, 500);
        this.secondValue = null;
        this.secondIndex = -1;
        eventBus.$emit("music-marks", this.firstValue, this.secondValue);
      } else {
        //选择二级类目
        this.secondIndex = this.secondIndex == index ? -1 : index;
        this.firstValue = parentId;
        this.secondValue = this.secondIndex == index ? id : null;
        this.firstIndex = this.firstIndex;
        eventBus.$emit("music-marks", this.firstValue, this.secondValue);
      }
    },
    defineSearch() {
      eventBus.$emit("music-confirm", this.firstValue, this.secondValue);
      this.$emit("define", false);
    },
    clearAll() {
      this.firstValue = null;
      this.secondValue = null;
      this.firstIndex = -1;
      this.secondIndex = -1;
      //eventBus.$emit("music-confirm", this.firstValue, this.secondValue);
      eventBus.$emit("music-marks", this.firstValue, this.secondValue);
    }
  },
  created() {
    let that = this;
    that.HttpCli.get("audio_web/music/queryFirstCategory").then(res => {
      if (res.data.status == 0) {
        that.firstClass = res.data.data.categoryList;
      }
    });
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.content {
  width: 100%;
}
.activeF {
  background: #2fb7ec !important;
  color: #fff;
}
.fillterCom {
  height: 100%;
  width: 270px;
  background: #ffffff;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  overflow: hidden;
}
#filterMus {
  position: relative;
  height: 100%;
  #pokCreatorM {
    position: absolute;
    bottom: 58px;
    left: 0;
    top: 0;
    //height: calc(100% - 58px);
    //  height: 500px;
    overflow: hidden;
    .scrollUl {
      height: 100%;
      // overflow-y: scroll;
      // -webkit-overflow-scrolling: touch;
      // position: static;
    }
  }
  .bottoms {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
    background: #fff;
    z-index: 3;
    button {
      border: 1px dashed #aeaeae;
      background: #fff;
      //padding: 5px 20px;
      text-align: center;
      width: 75px;
      height: 28px;
      color: #aeaeae;
      margin: 10px 10px 20px 10px;
      outline: none;
      &:last-of-type {
        color: #122f46;
        border: 1px dashed #122f46;
      }
    }
  }
  h1 {
    padding: 10px;
    //border-bottom: 1px solid #f2f2f2;
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
  }
  .creatorList-ul {
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    padding: 0 10px;

    li {
      font-size: 10px;
      font-family: Arial;
      display: inline-block;
      width: 76px;
      background: rgba(47, 183, 236, 0.1);
      text-align: center;
      line-height: 36px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      float: left;
      margin-right: calc((100% - 228px) / 2);
      margin-bottom: 10px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }
}
.gifBox {
  text-align: center;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
