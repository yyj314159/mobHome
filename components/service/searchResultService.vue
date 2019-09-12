<template>
    <div class="fullH">
        <div class="searchFilterService" v-show="markShow">
            <transition name='movex'>
                <searchFilterService
                    v-show='isHide'
                    :sKey='keyword'
                    @hideDiv='showHide'
                    @hideMark='hideMark'
                >
                </searchFilterService>
            </transition>
        </div>

        <div class="searchTit" v-show="tBool">
            <div class="">
                搜到“<span class="">{{keyWordA}}</span>”相关结果<span class="" >{{dataNum}}</span>个
            </div>
           <div class="searchBtn" @click="showSFS">筛选<i></i></div>
        </div>
        <div class="notFound" v-show="notFound">
            <img style="margin-top:30px; width:109px;" src="/images/noData.png" alt="">
            <!-- <span>抱歉！没有找到符合条件的服务！</span> -->
        </div>
        <!-- <servicePage :serviceData='newData' :sKey='keyword' @hidePrev='changeBoolen'></servicePage>        -->
        <publicServicePage
            :hideBanner = 'hideBool'
            :sKey='keyword'
            :resultdata='resultdata'
            @hidePrev='changeBoolen'
            @hideTit='titBool'
            @showkeys='keyWords'
            @showNum='numbers'
        >
        </publicServicePage>
    </div>
</template>
<script>
import publicServicePage from "./publicServicePage";
import searchFilterService from "./searchFilterService"
import eventBus from "../../assets/js/eventBus"
export default {
    props:{
      keyword : String,
      resultdata : Object
    },//传值给子组件
    data() {
        return {
            markShow : false,
            isHide : false,
            tBool : false,
            notFound : false,
            hideBool : true,//是否展示 banner
            keyWordA : null,
            dataNum : null,
        }
    },
    components: {
        publicServicePage,
        searchFilterService
    },
    // created() {
    //     console.log(this.resultdata,'pppppppppppppppp');
    // },
    methods: {
        showHide:function(bol) {
            this.isHide = bol;
        },
        hideMark:function(bol) {
            setTimeout(() => {
                this.markShow = bol;
            }, 500);    
        },
        showSFS:function() {
            this.isHide = true;
            this.markShow = true;
        },
        changeBoolen(bol) {//接收子组件传来的值
            this.notFound = bol;
        },
        titBool(bool) {
            this.tBool = bool;
        },
        keyWords:function(text) {
            this.keyWordA = text.substr(0,8);
        },
        numbers:function(val) {
            this.dataNum = val;
            // if(val == 0){
            //     document.querySelector(".searchBtn").style.color="#aeaeae"
            //     document.querySelector(".searchBtn").style.pointerEvents="none"
            // }
        },

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$mainColor = #122f46
$txtColor = #718290
.fullH
    height 100%
.searchFilterService
    width 100%
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    background rgba(0,0,0,.5)
    z-index 100
.searchTit
    display flex
    justify-content space-between
    padding 0 10px
    height 38px
    line-height @height
    box-sizing content-box
    color $mainColor
    .searchBtn
        padding 0 5px
        // height 20px
        i
            width 14px
            height @width
            display inline-block
            background url('/images/filterIcon.png') 0 0 no-repeat
            background-size 100% 100%
            vertical-align: middle
            margin-left 5px
// .notFound
//     position absolute
//     bottom 0
//     left 0
//     right 0
//     top 45px
//     font-size 16px
//     color #a1a1a1
//     z-index 1
//     img
//         width 100%
//         height @width
//         object-fit cover
//     span
//         position absolute
//         left 0
//         right 0
//         bottom 50px
.movex-enter-active,
.movex-leave-active,
.movey-enter-active,
.movey-leave-active
  transition all .5s linear

// .movex-enter-active,
// .movex-leave
//     transform translate3d(0, 0, 0)

.movex-enter,
.movex-leave-active
  transform translate3d(100%, 0, 0)
.movey-enter,
.movey-leave-active
  transform translate3d(0, -100%, 0)
@keyframes rotatefresh
  from
    transform rotate(115deg)
  to
    transform rotate(475deg)
    transition-duration .6s
    transition .6s

</style>
<style>
em {
    /* color: #3d9be9; */
    font-style: normal;
    }
</style>
