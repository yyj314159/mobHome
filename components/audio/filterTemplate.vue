
<template>
<!-- 音频与专辑的筛选条件组件统一管理 -->
  <div id="filterTem">
    <section class="marks" v-show="ishow" @click="fw(typeIndex)" @touchmove.prevent></section>

    <!-- <transition name="rightIn">
      <div class="fillterCom" v-show="ishow==true&&typeIndex==2">
        <creatorFilter @define="define"></creatorFilter>
      </div>
    </transition>

    <transition name="rightIn">
      <div class="fillterCom" v-if="ishow==true&&typeIndex==0">
        <musicFilter @define="define"></musicFilter>
      </div>
    </transition> -->

    <transition name="rightIn">
      <keep-alive>
        <component :is="currentView" @define="define"></component>
      </keep-alive>
      
    </transition>
  </div>
</template>
<script>
import creatorFilter from "./searchFilterCreator";
import musicFilter from "./searchFilterMusic";
import eventBus from "@/assets/js/eventBus";
export default {
  props: {
    typeIndex: {
      type: Number
    }
  },
  data() {
    return {
      ishow: false,
      creatorFilterObject:{
        typeValue:null,
        guojiValue:null
      },
      musicFilterObject:{
        first:null,
        second:null
      }
    };
  },
  components: {
    creatorFilter,
    musicFilter
  },
  computed: {
    currentView(){
      if(this.ishow){
        if(this.typeIndex==0){
          return 'musicFilter'
        }else{
          return 'creatorFilter'
        }
      }
    }
  },
  mounted() {
    eventBus.$on("filterBox", arg => {
      this.ishow = arg;
    });
    eventBus.$on('creator-marks',(typeV,guojiV)=>{
      this.creatorFilterObject.typeValue=typeV;
      this.creatorFilterObject.guojiValue=guojiV;
    });
    eventBus.$on('music-marks',(first,second)=>{
      this.musicFilterObject.first=first;
      this.musicFilterObject.second=second;
    });
  },

  methods: {
    // filterBox() {
    //   this.ishow = true;
    // },
    fw(typeIndex) {
      this.ishow = false;
      eventBus.$emit("filterBox", false);
      if(typeIndex==2){
        eventBus.$emit("creator-confirm", this.creatorFilterObject.typeValue, this.creatorFilterObject.guojiValue);
      }else if(typeIndex==0){
        eventBus.$emit("music-confirm", this.musicFilterObject.first, this.musicFilterObject.second);
      }
      
    },
    define() {
      this.ishow = false;
      eventBus.$emit("filterBox", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.rightIn-enter-active {
  animation: 0.5s rightIn ease;
}
.rightIn-leave-active {
  animation: 0.5s rightOut ease;
}
@keyframes rightIn {
  0% {
    right: -100%;
  }
  100% {
    right: 0;
  }
}
@keyframes rightOut {
  0% {
    right: 0;
  }
  100% {
    right: -100%;
  }
}
.marks {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
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
</style>



