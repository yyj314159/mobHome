<template>
  <div id="searchResultAudios">
    <audios :isSearch="search" :keyword="keyword" :pageData='resultdata'></audios>
  </div>
</template>

<script>
import audios from "./audio";
import eventBus from "@/assets/js/eventBus";
export default {
  props:{
    resultdata:Object
  },
  data() {
    return {
      search: true,
      keyword:''
    };
  },
  components: {
    audios
  },
  methods: {},
  mounted() {
   this.keyword = this.$route.query.word
  },
  created(){
    // console.log(this.$route.query.word,'kkkkkkkkkkkkkkkk')
  }
};
</script>
<style lang="scss" scoped>
#searchResultAudios {
  height: 100%;
}
</style>

