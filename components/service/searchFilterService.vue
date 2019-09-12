<template>

        <div class="sFilter">
            <div class="leftBar" @click="defineSearch"></div>
            <ul class="filterData">
                <li class="firstLevel" v-for="i in sItems" :key="i.id" :hasType="i.types">
                    <h1 class="">{{ i.tittle }}</h1>
                    <ul class="secLevelbox">
                        <li class="firstSecond" v-for="(k,index) in i.list" :key="index" :hasType="i.types" :thisKey="index" @click="selectData(i.id,index,$event)">{{k}}</li>
                    </ul>
                </li>
                <!-- <li class="firstLevel" v-for="i in sItems1" :key="i.id" :hasType="i.types">
                    <h1 class="">{{ i.tittle }}</h1>
                    <ul class="secLevelbox">
                        <li class="firstSecond addClasses"
                            v-for="(k,index) in i.list"
                            :key="index"
                            :hasType="i.types"
                            :thisKey="index"
                            @click="selectData(i.id,index,$event)"
                        >{{k}}</li>
                    </ul>
                </li> -->
                <li class="firstLevel" hasType="other">
                    <h1 class="">商家所在地</h1>
                    <ul class="secLevelbox">
                        <li class="firstSecond addClasses"
                            hasType="other"
                            thisKey="0"
                            @click="selectData(6,0,$event)"
                            v-show="selectCity"
                        >{{ selectCity }}</li>
                        <li class="firstSecond addClasses"
                            hasType="other"
                            thisKey="1"
                            @click="selectData(6,1,$event)"
                        >{{ location }}</li>
                        <li class="firstSecond addClasses locationBtn"
                            hasType="other"
                            thisKey="2"
                            @click.stop="getLocation(true);"
                        >定位<img src="/images/locationReload.png" alt=""></li><!-- @click="selectData(6,1,$event);" 被上面的方法替换了 -->
                        <li class="firstSecond addClasses"
                            hasType="other"
                            thisKey="3"
                            @click="selectData(6,3,$event)"
                        ></li>
                    </ul>
                </li>
                <transition-group name="movey" appear tag="li">
                    <li class="firstLevel" v-for="i in sItems2" :key="i.id" :hasType="i.types" v-show="flag">
                        <h1 class="">{{ i.tittle }}</h1>
                        <ul class="secLevelbox">
                            <li class="firstSecond pAc"
                                v-for="(k,index) in i.list"
                                :key="index"
                                :hasType="i.types"
                                :thisKey="index"
                                :province="k.province == undefined ? k : k.province"
                                @click="selectData(i.id,index,$event)"
                                ref="lookSame"
                            >{{k.province == undefined ? k : k.city}}</li>
                        </ul>
                    </li>
                </transition-group>
                <li class="firstLevel" v-for="i in sItems3" :key="i.id" :hasType="i.types">
                    <h1 class="">{{ i.tittle }}</h1>
                    <ul class="secLevelbox">
                        <li class="firstSecond" v-for="(k,index) in i.list" :key="index" :hasType="i.types" :thisKey="index" @click="selectData(i.id,index,$event)">{{k}}</li>
                    </ul>
                </li>
                <!-- <li class="location" @click="showChooseCity">
                    <span class="tit">所在地</span>
                    <span v-text="address" class="address"></span>
                    <img src="/images/rightjiantou.png">
                </li> -->
            </ul>
            <div class="divBtn">
                <div class="restBtn" @click="clearAll">重置</div>
                <div class="confirmBtn" @click="defineSearch">确认</div>
            </div>
        </div>

</template>

<script>
import eventBus from "../../assets/js/eventBus"
// import { mapGetters } from 'vuex';
const sFilterData = [
    {tittle:"价格",list:["从低到高","从高到底","定制价格"],id:1},
    {tittle:"议价选项",list:["一口价","接受议价"],id:2},
    {tittle:"付款方式",list:["一次性付","分阶段付","分时段付"],id:3},
];
// const sFilterData1 = [
//     {tittle:"商家所在地",list:["西安","上海","定位",""],id:6,types:"other"},
// ];
const sFilterData2 = [
     {tittle:"城市",list:
        [
            {province:"北京>北京",city:"北京"},
            {province:"上海>上海",city:"上海"},
            {province:"广东>广州",city:"广州"},
            {province:"广东>深圳",city:"深圳"},
            {province:"浙江>杭州",city:"杭州"},
            {province:"浙江>温州",city:"温州"},
            {province:"浙江>宁波",city:"宁波"},
            {province:"江苏>南京",city:"南京"},
            {province:"江苏>苏州",city:"苏州"},
            {province:"山东>济南",city:"济南"},
            {province:"山东>青岛",city:"青岛"},
            {province:"辽宁>大连",city:"大连"},
            {province:"江苏>无锡",city:"无锡"},
            {province:"安徽>合肥",city:"合肥"},
            {province:"天津>天津",city:"天津"},
            {province:"湖南>长沙",city:"长沙"},
            {province:"湖北>武汉",city:"武汉"},
            {province:"河南>郑州",city:"郑州"},
            {province:"河北>石家庄",city:"石家庄"},
            {province:"四川>成都",city:"成都"},
            {province:"重庆>重庆",city:"重庆"},
            {province:"陕西>西安",city:"西安"},
            {province:"云南>昆明",city:"昆明"},
            {province:"广西>南宁",city:"南宁"},
            {province:"福建>福州",city:"福州"},
            {province:"福建>厦门",city:"厦门"},
            {province:"江西>南昌",city:"南昌"},
            {province:"广东>东莞",city:"东莞"},
            {province:"辽宁>沈阳",city:"沈阳"},
            {province:"吉林>长春",city:"长春"},
            {province:"黑龙江>哈尔滨",city:"哈尔滨"},
        ],
        id:7,
        types:"hotCity"
    },
    {tittle:"省份",list:
        [
            "安徽",
            "福建",
            "甘肃",
            "广东",
            "广西",
            "贵州",
            "湖南",
            "河北",
            "河南",
            "湖北",
            "海南",
            "江苏",
            "黑龙江",
            "江西",
            "吉林",
            "辽宁",
            "内蒙古",
            "宁夏",
            "青海",
            "山东",
            "山西",
            "陕西",
            "四川",
            "西藏",
            "新疆",
            "云南",
            "浙江",
            "香港",
            "澳门",
            "台湾",
        ],
        id:8,
        types:"province"
    }

];
const sFilterData3 = [
    {tittle:"服务耗时",list:["分钟","小时","天","月"],id:4},
    {tittle:"服务方式",list:["上门服务","到店服务","线上服务","电话服务","代办服务"],id:5}
];
export default {
    props:['sKey'],
    data(){
        return {
            flag : false,
            sItems : sFilterData,
            // sItems1 : sFilterData1,
            sItems2 : sFilterData2,
            sItems3 : sFilterData3,
            sendServiceData : {
                // priceSort : null,
                // isOpenPrice : null,
                // payType : null,
                // takeType : null,
                // serviceType : null,
                // serviceShopAddress : null
            },
            selectCity : '',
            location : '北京',
        }
    },
    mounted() {
        this.getLocation();
        this.getSelecteCity();
    },
    methods: {
        selectData(k,v,event) {
            let Target = event.target ? event.target : event.srcElement;
            if(Target.getAttribute('hasType') == 'other'){
                let thisKey = Target.getAttribute('thisKey');
                if(thisKey == 0){
                    Target.classList.toggle("selected");
                    if(Target.classList.contains('selected')){
                        for (const iterator of this.$refs.lookSame) {
                            if(iterator.innerText == Target.innerText){
                                iterator.classList.add("selected");
                                this.sendServiceData.serviceShopAddress = iterator.getAttribute("province");
                            }else{
                                iterator.classList.remove("selected");
                            }
                        }
                    }else{
                        for (const iterator of this.$refs.lookSame) {
                            iterator.classList.remove("selected");
                        }
                        this.sendServiceData.serviceShopAddress = null;
                    }
                }else if(thisKey == 1){
                    Target.classList.toggle("selected");
                    Target.previousSibling.previousSibling.classList.remove("selected");
                    Target.previousSibling.previousSibling.style.display = "none";
                    if(Target.classList.contains('selected')){
                        for (const iterator of this.$refs.lookSame) {
                            if(iterator.innerText == Target.innerText){
                                iterator.classList.add("selected");
                                this.sendServiceData.serviceShopAddress = iterator.getAttribute("province");
                            }else{
                                iterator.classList.remove("selected");
                            }
                        }
                    }else{
                        for (const iterator of this.$refs.lookSame) {
                            iterator.classList.remove("selected");
                        }
                        this.sendServiceData.serviceShopAddress = null;
                    }
                }else if(thisKey == 2){
                    // this.getLocation(true);
                }else{
                    if(Target.classList.contains('show')){
                        this.flag = false;
                        Target.classList.remove("show");
                    }else{
                        this.flag = true;
                        Target.classList.add("show");
                    }
                }
            }else if(Target.getAttribute('hasType') == 'hotCity' || Target.getAttribute('hasType') == 'province'){
                let attrAdd = Target.getAttribute('province');
                // console.log(attrAdd);
                let one = document.querySelectorAll(".addClasses")[0];
                let two = document.querySelectorAll(".addClasses")[1];
                if(Target.classList.contains('selected')){
                    // console.log("xxxxxxxxxxxxxxxxxx");
                    Target.classList.remove("selected");
                    one.classList.remove("selected");
                    two.classList.remove("selected");
                    this.sendServiceData.serviceShopAddress = null
                }else{
                    // console.log("yyyyyyyyyyyyyyyy");
                    for (const iterator of this.$refs.lookSame) {
                        iterator.classList.remove("selected");
                    }
                    Target.classList.add("selected");
                    // console.log(Target.innerText)
                    if(Target.innerText ==  two.innerText){
                        // console.log("111111");
                        one.style.display = 'none';
                        one.classList.remove("selected");
                        two.classList.add("selected");
                    }else{
                        // console.log("2222");
                        one.style.display = 'block';
                        one.classList.add("selected");
                        two.classList.remove("selected");
                        one.innerText = Target.innerText;
                        this.getSelecteCity(Target.innerText);
                    }
                    this.sendServiceData.serviceShopAddress = Target.getAttribute("province");
                }
            }else{
                if(Target.classList.contains('selected')){
                    Target.classList.remove("selected");
                    this.hasServiceData(k)
                }else{
                    let lis = Target.parentNode.children;
                    for (const iterator of lis) {
                        iterator.classList.remove("selected");
                    }
                    Target.classList.add("selected");
                    this.hasServiceData(k,v)
                }
            }

        },
        getLocation(bl) {
            bl && (document.querySelector(".locationBtn > img").className = "active1");
            setTimeout(()=>{
                document.querySelector(".locationBtn > img").className = '';
            },600);
            let geolocation = new BMap.Geolocation();
            let _this = this;
            geolocation.getCurrentPosition(function(r){
                // console.log(r);
                if(r.address.city){
                    _this.location = r.address.city.slice(0,r.address.province.length-1);
                }else{
                    _this.location = "定位失败";
                }

            });
        },
        getSelecteCity(city) {
            city && sessionStorage.setItem("location",city);
            this.selectCity = sessionStorage.getItem("location");
        },
        // showChooseCity(){
        //     this.$store.dispatch('SHOW_CHOOSE_CITY',{chooseCity:true})
        // },
        clearAll() {
            let liArr = document.querySelectorAll(".firstSecond");
            for (const iterator of liArr) {
                iterator.classList.remove("selected");
            }
            this.sendServiceData.priceSort = null;
            this.sendServiceData.isOpenPrice = null;
            this.sendServiceData.payType = null;
            this.sendServiceData.takeType = null;
            this.sendServiceData.serviceType = null;
            this.sendServiceData.serviceShopAddress = null;
        },
        defineSearch() {
            // if(this.isClickClear == true){
            //     this.sendServiceData.priceSort = null;
            //     this.sendServiceData.isOpenPrice = null;
            //     this.sendServiceData.payType = null;
            //     this.sendServiceData.takeType = null;
            //     this.sendServiceData.serviceType = null;
            //     this.sendServiceData.serviceShopAddress = null;
            // }
            // console.log(this.sendServiceData,'/////');

            eventBus.$emit("sendServiceData",this.sendServiceData);
            eventBus.$emit("tOf",false);
            this.$emit("hideDiv",false);//给父组件传值
            this.$emit("hideMark",false);//给父组件传值
        },
        hasServiceData(m,n) {
            switch (m) {
                case 1:
                    this.sendServiceData.priceSort = (n == null||undefined||'' ? n = null : n+1);
                    break;
                case 2:
                    this.sendServiceData.isOpenPrice = (n == null||undefined||'' ? n = null : n);
                    break;
                case 3:
                    this.sendServiceData.payType = (n == null||undefined||'' ? n = null : n);
                    break;
                case 4:
                    this.sendServiceData.takeType = (n == null||undefined||'' ? n = null : n+1);
                    break;
                case 5:
                    this.sendServiceData.serviceType = (n == null||undefined||'' ? n = null : n+1);
                    break;
            }
        }
    },
    // computed: {
    //     ...mapGetters(["address"])
    // },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$mainColor = #122f46
$txtColor = #718290
.sFilter
    height 100%
    position fixed
    top 0
    z-index 2
    overflow hidden
    right 0
    .leftBar
        width 50px
        height 100%
        background transparent
        float left
    .filterData
        width 270px
        margin-left 50px
        height 100%
        overflow-y scroll
        background #fff
        padding-bottom 60px
        box-sizing border-box
        .firstLevel
            position relative
            z-index 2
            background #fff
            &[hastype="hotCity"],
            &[hastype="province"]
                z-index 1
            h1
                height 36px
                line-height @height
                text-indent 10px
                text-align left
                color $mainColor
                font-size 12px

            .secLevelbox
                display flex
                flex-wrap wrap
                .firstSecond
                    width 76px
                    height 36px
                    line-height @height
                    background rgba(47,183,236,.1)
                    margin 0 0 10px 10px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color $mainColor
                    font-size 10px
                    &.selected
                        background #2fb7ec
                        color #fff
                    &[hastype="other"][thiskey="2"]
                        text-align left
                        overflow hidden
                        background #fff
                        // background #fff url('/images/locationReload.png') center center no-repeat
                        // background-size 16%
                        img
                            display: block;
                            float: right;
                            height: 13px;
                            width: 13px;
                            margin-top: 11px;
                            margin-right: 30px;
                            &.active1{
                                animation: 0.6s rotatefresh 1;
                            }
                    &[hastype="other"][thiskey="3"]
                        position absolute
                        right 0
                        top 0
                        width 30px
                        height @width
                        margin 3px 10px 0 0
                        background #fff url('/images/jia.png') center center no-repeat
                        background-size 50% 50%
                        box-sizing content-box
                    &.show[hastype="other"][thiskey="3"]
                        background-image url('/images/jian.png')
        .location
            height 46px
            line-height @height
            padding 0 10px
            border-bottom: 6px solid #f2f2f2;
            text-align left
            overflow hidden
            .tit
                float left
            .address
                width 180px
                height 40px
                float left
                margin-left 20px
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            img
                width 7px
                height 11px
                float right
                margin-top 15px
.divBtn
    width 270px
    position absolute
    bottom 0
    right 0
    height 60px
    background #fff
    display flex
    align-items center
    justify-content flex-end
    z-index 3
    div
        outline none
        background #fff
        width 75px
        height 28px
        line-height @height
        text-align center
        border 1px dashed transparent
        &.restBtn
            border-color #a1a1a1
            color #aeaeae
            margin-right 10px
        &.confirmBtn
            color $mainColor
            border-color @color
            margin-right 20px

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
