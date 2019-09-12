<template>
    <div>
       <!-- <SearchInput ></SearchInput>-->
        <publicServicePage :pageData="pageData" @noData='checkData'></publicServicePage>
        <div class="notFound" v-if="notFound">
            <img style="margin-top:30px;width:109px;" src="/images/noData.png" alt="">
            <!-- <span>抱歉！没有找到符合条件的服务！</span> -->
        </div>
    </div>
</template>

<script>
import publicServicePage from "./publicServicePage";
import MethodsUtil from "~/assets/js/MethodsUtil";
// import SearchInput from 'components/public/commonsearch.vue';
import eventBus from "../../assets/js/eventBus"
export default {
    name: "Service",
    props:['pageData'],
    data() {
        return {
            notFound : false,
        }
    },
    components: {
        publicServicePage,
        // SearchInput
    },
    methods: {
        checkData(bol) {//接收子组件传来的值
            this.notFound = bol;
        }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.notFound
    position absolute
    bottom 0
    left 0
    right 0
    top 110px
    // font-size 16px
    // color #a1a1a1
    z-index 1
    margin 0 auto
    // img
    //     width 100%
    //     height @width
    //     object-fit cover
    // span
    //     position absolute
    //     left 0
    //     right 0
    //     bottom 50px

</style>
