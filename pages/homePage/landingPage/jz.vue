<template>
  <zmadvance/>
</template>

<script>
  import zmadvance from '~/components/public/marketPage.vue'
  import BrowserMatch from '~/assets/js/operationLog.js';
  export default {
    components: {
      zmadvance
    },
    mounted(){
      if(this.$route.query && this.$route.query.zmfrom){
        localStorage.setItem("zmfrom",this.$route.query.zmfrom);
      }
      if(this.$route.query && this.$route.query.bd_vid){
        localStorage.setItem("bd_vid",this.$route.query.bd_vid);
      }
      BrowserMatch.init("落地页");
    }
  }
</script>
