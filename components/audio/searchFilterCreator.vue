<template>
  <div id="MusC" class="fillterCom">
    <div id="creatorFillter" @touchmove.prevent>
      <ul>
        <li class="creatorType">
          <h1>类型</h1>
          <ul class="creatorType-list creatorList-ul">
            <li
              v-for="(li,i) in typeCreator"
              :key="i"
              @click="SelectCreator(li.value,$event,i,0)"
              :class="{activeF:typlLi==i}"
            >
              <!-- <span class="selectedWrap" v-show="typlLi==i">
              <div class="selectImgBoxC">
                <img src="@/common/images/selected.png" alt="select">
              </div>
              </span>-->
              {{li.label}}
            </li>
          </ul>
        </li>
        <li class="creatorCountry">
          <h1>国籍</h1>
          <ul class="creatorCountry-list creatorList-ul">
            <!-- 中国-_-中国台湾-_-中国香港-_- -->
            <li
              v-for="(li,i) in guojiCreator"
              :key="i"
              @click="SelectCreator(i+1,$event,i,1)"
              :class="{activeF:guojiLi==i}"
            >
              <!-- <span class="selectedWrap" v-show="guojiLi==i">
              <div class="selectImgBoxC">
                <img src="@/common/images/selected.png" alt="select">
              </div>
              </span>-->
              {{li}}
            </li>
          </ul>
        </li>
      </ul>
      <div class="bottoms">
        <button @click="clearAll">重置</button>
        <button @click="defineSearch">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from "@/assets/js/eventBus";
import { types } from "util";
export default {
  data() {
    return {
      typeCreator: [
        { label: "男", value: 11 },
        { label: "女", value: 10 },
        { label: "乐队/组合", value: 2 },
        { label: "企业/团体", value: 3 }
      ],
      guojiCreator: ["中国大陆", "中国台湾", "中国香港", "海外"],
      typlLi: -1,
      guojiLi: -1,
      typeValue: null,
      guojiValue: null
    };
  },
  created() {
    let that = this;
    //that.getCreatorSearchData("WRITERTYPE"); //加载类型筛选条件
    //that.getCreatorSearchData("COUNTRY"); //加载国籍筛选条件
  },
  methods: {
    //获取创作人国籍类型信息
    getCreatorSearchData(parms) {
      let that = this;
      that.HttpCli.get("music/dictionary/getDictionaryInfoByType", {
        type: parms
      }).then(res => {
        if (parms == "WRITERTYPE") {
          this.typeCreator = res.data.data;
        } else {
          this.guojiCreator = res.data.data;
        }
      });
    },
    //创作人 条件信息筛选
    SelectCreator(data, event, i, type) {
      console.log(data, i, type);
      if (type == 0) {
        this.typlLi = this.typlLi == i ? -1 : i;
        this.typeValue = this.typlLi == i ? data : null;
        eventBus.$emit("creator-marks", this.typeValue, this.guojiValue);
      } else {
        this.guojiLi = this.guojiLi == i ? -1 : i;
        this.guojiValue = this.guojiLi == i ? data : null;
        eventBus.$emit("creator-marks", this.typeValue, this.guojiValue);
      }
    },
    defineSearch() {
      eventBus.$emit("creator-confirm", this.typeValue, this.guojiValue);
      this.$emit("define", false);
    },
    clearAll() {
      this.typeValue = "";
      this.guojiValue = "";
      this.typlLi = -1;
      this.guojiLi = -1;
       eventBus.$emit("creator-marks", this.typeValue, this.guojiValue);
      //eventBus.$emit("creator-confirm", this.typeValue, this.guojiValue);
    }
  }
};
</script>

<style lang="scss">
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
#creatorFillter {
  position: relative;
  height: 100%;
  .bottoms {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
    li {
      font-size: 10px;
      font-family: Arial;
      display: inline-block;
      width: 76px;
      height: 36px;
      background: rgba(47, 183, 236, 0.1);
      text-align: center;
      line-height: 36px;
      margin-bottom: 10px;
      position: relative;
      .selectedWrap {
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        background: rgba(61, 155, 233, 0.1);
        right: 0;
        .selectImgBoxC {
          right: 0;
          bottom: 0;
          position: absolute;
          height: 0px;
          width: 0px;
          border-bottom: 20px solid rgba(61, 155, 233, 0.9);
          border-left: 20px solid transparent;
          box-sizing: border-box;
          text-align: center;
          img {
            display: inline-block;
            width: 10px;
            height: 10px;
            right: 1px;
            bottom: -20px;
            position: absolute;
          }
        }
      }
    }
  }
}
</style>