<template>
<!-- 接收展示搜索到的结果数量 以及控制音频和创作人筛选条件的显隐 -->
  <div id="resultCounts">
    <div class="counts">搜到"{{keyword | keepEightLen}}"相关结果{{counts}}条</div>
    <div @click="filterBox" v-show="typeIndex!=1" style="color:#5E5E5E;">
      筛选
      <i></i>
    </div>
  </div>
</template>

<script>
import eventBus from "@/assets/js/eventBus";
export default {
    props: {
    keyword: {
      type: String
    },
    counts: {
      type: Number
    },
    typeIndex:{
      type:Number
    },
  },
  data(){
      return {
      }
  },
  mounted(){
  },
  methods:{
      filterBox(){
          eventBus.$emit('filterBox',true)
          document.querySelector('.searhInput input').blur();
      }
  },
  computed:{
      
  },
  filters:{
    keepEightLen(v){
      if(v&&v.length>8){
        return v.substr(0,8)
      }else{
        return v
      }
    }
  }
}
</script>
<style lang="scss" scoped>

#resultCounts {
  height: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  div {
    i {
      height: 12px;
      width: 12px;
      display: inline-block;
      background-image: url("/images/filterIcon.png");
      background-size: 100%;
      vertical-align: middle;
    }
  }
  .counts{
    padding-left: 5px;
    font-family: "SimHei";
    color: #122F46;
  }
}
</style>

