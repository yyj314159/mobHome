import { type } from 'os';
<template>
  <div class="Rotation" slot="Rotation">
    <cube-slide ref="slide" :data="items" @change="changePage" :showDots="false">
      <cube-slide-item v-for="(item, index) in items" :key="index">
        <div @click="goUrl(item.url)">
          <img class="Rotation" :src="item.image">
        </div>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import eventBus from "../../assets/js/eventBus";
import MethodsUtil from "../../assets/js/MethodsUtil";
export default {
  name: "Rotation",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["token", "loginStatus"])
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: [
        {
          url: "http://www.didichuxing.com/",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"
        },
        {
          url: "http://www.didichuxing.com/",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png"
        },
        {
          url: "http://www.didichuxing.com/",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png"
        }
      ]
    }
  },
  mounted() {},
  methods: {
    changePage(current) {},
    clickHandler(item, index) {},

    goUrl(url) {
      window.location.href = url;
    /*  if (!this.$store.state.loginStatus) {
        window.location.href = '/mlogin?redirectUrl='+url;
      } else {
        window.location.href = url;
      }*/
    }
  }
};
</script>
<style lang="scss">
.Rotation {
  width: 100%;
  height: 110px;
}
</style>
