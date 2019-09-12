<template>
    <transition name="rightIn">
        <div class="searchFilter">
            <ul class="productItemWrapper">
                <li v-for="item in items" class="firstLevel" :key="item.rowIndex">
                    <h1>{{item.title}}</h1>
                    <ul class="secLevelbox">
                        <li v-for="(type,index) in item.list" class="firstSecond" :type='item.type' @click="selectItem(item.rowIndex,index,$event)" :key="index">{{type}}</li>
                    </ul>
                </li>
                <li class="firstLevel">
                    <h1 style="float: left">商品所在地</h1>
                    <div class="showCity">
                        <div class="show-city-icon" @click="chooseLocation = !chooseLocation">
                            <img :src="chooseLocation==true ? '/images/jian.png' : '/images/jia.png'">
                        </div>
                    </div>
                    <ul class="secLevelbox">
                        <li class="selectCity" @click="selectItem(100,null,$event)" v-show="selectCity">{{selectCity}}</li>
                        <li class="location" @click="selectItem(100,null,$event)">{{location}}</li>
                        <li class="locationButt" @click.stop="getLocation('true')">定位
                            <img src="~static/images/locationReload.png" alt="">
                        </li>
                    </ul>
                </li>
                <transition name="draw">
                    <li class="firstLevel showLocation" v-show="chooseLocation">
                        <div class="hotCity">
                            <h1 class="hot-city-title">城市</h1>
                            <ul class="secLevelbox hot-city-list">
                                <li v-for="(val,index) in hotCity" style="margin-bottom: 10px" class="firstSecond" ref="city" :key="index" :location="val.province" @click="selectItem(88,null,$event)">{{val.city}}</li>
                            </ul>
                            <h1 class="province-title">省份</h1>
                            <ul class="secLevelbox province-list">
                                <li v-for="(val,index) in province" style="margin-bottom: 10px" class="firstSecond" ref="city" :key="index" @click="selectItem(99,null,$event)">{{val}}</li>
                            </ul>
                        </div>
                    </li>
                </transition>
                <li class="firstLevel">
                    <h1>付款方式</h1>
                    <ul class="secLevelbox">
                        <li class="firstSecond"  @click="selectItem(3,0,$event)" type="productPayMent">一次性付</li>
                        <li class="firstSecond"  @click="selectItem(3,1,$event)" type="productPayMent">分阶段付</li>
                    </ul>
                </li>
            </ul>
            <div class="filter-btn">
                <button class="filter-reset" @click="clearAll">重置</button>
                <button class="filter-define" @click="defineSearch">确定</button>
            </div>
        </div>
    </transition>
</template>
<script>
    import eventBus from "../../assets/js/eventBus";
    import {hotCity,province,productData} from "./js/cityData";
    export default {
        data(){
            return{
                items:productData,       //筛选条件
                selectConditions:{},         //选择的条件
                hotCity:hotCity,
                province:province,
                chooseLocation:false,
                location:'上海',
                selectCity:''
            }
        },
        props:{
            filterProduct:{
                type:Object,
                required:false
            }
        },
        methods:{
            selectItem(rowIndex,index,eve){
                let _this = eve.srcElement;
                if(rowIndex!=88 && rowIndex!=99 && rowIndex!=100){
                    if(_this.getAttribute("class").indexOf("selected")!=-1){
                        _this.className = 'firstSecond';
                        delete this.selectConditions[_this.getAttribute("type")]
                    }else{
                        Array.from( _this.parentNode.children).map((ele)=>{
                            ele.className = 'firstSecond';
                        });
                        _this.className='firstSecond selected';
                        switch(rowIndex){
                            case 1:this.selectConditions.priceType = index+1;
                                   break;
                            case 2:this.selectConditions.productType = index+1;
                                    break;
                            case 3:this.selectConditions.productPayMent = index+1;
                                    break;
                        }
                    }
                }else{
                    switch(rowIndex){
                        case 88:this.changeSelectItemHotCity(_this,_this.getAttribute("location"));
                                break;
                        case 99:this.changeSelectItemHotCity(_this,_this.innerText);
                                break;
                        case 100:
                                if(_this.classList.contains('selectCity')){     //点击的是选择的城市
                                    this.changeSelectItem(_this,"selectCity","location")
                                }else if(_this.classList.contains('location')){     //点击的是定位的城市
                                    this.changeSelectItem(_this,"location","selectCity")
                                }
                    }
                }
            },
            changeSelectItemHotCity(tar,location){
                if(tar.getAttribute("class").indexOf("selected")!=-1){
                    tar.className = 'firstSecond';
                    if(tar.innerText == this.location){       //当取消的城市为当前定位的城市（说明之前选中的为定位的城市）
                        document.querySelector(".location").className = "location"
                    }else{
                        document.querySelector(".selectCity").className = "selectCity";
                    }
                    delete this.selectConditions.placeOrigin;
                }else{
                    this.$refs.city.map((ele)=>{
                        ele.className = "firstSecond";
                    });
                    tar.className='firstSecond selected';
                    if(tar.innerText == this.location){       //当选择的城市为当前定位的城市
                        document.querySelector(".location").className = "location selected"
                        document.querySelector(".selectCity").className = "selectCity";
                    }else{
                        document.querySelector(".selectCity").className = "selectCity selected";
                        document.querySelector(".location").className = "location";
                        this.getSelecteCity(tar.innerText);
                    }
                    this.selectConditions.placeOrigin = location;
                };
            },
            changeSelectItem(tar,selfClass,siblingClass){
                if( tar.classList.contains("selected")){
                    this.$refs.city.map((ele)=>{
                        ele.className = "firstSecond";
                    });
                    tar.className = selfClass;
                    delete this.selectConditions.placeOrigin;
                }else{
                    this.$refs.city.map((ele)=>{
                        if(ele.innerText==tar.innerText){
                            ele.className = "firstSecond selected";
                            if(ele.getAttribute("location")){
                                this.selectConditions.placeOrigin = ele.getAttribute("location");
                            }else{
                                this.selectConditions.placeOrigin = ele.innerText;
                            }
                        }else{
                            ele.className = "firstSecond"
                        }
                    });
                    tar.className = selfClass + " selected";
                    if(selfClass == "selectCity"){
                        tar.nextElementSibling.className = siblingClass;
                    }else{
                        tar.previousElementSibling.className = siblingClass;
                    }
                }
            },
            clearAll(){         //清空筛选条件
                let liArr = document.querySelectorAll(".firstSecond");
                let liArr2 = Array.from(liArr);
                liArr2.map((val)=>{
                    val.className = "firstSecond";
                });
                document.querySelector(".selectCity").className = "selectCity";
                document.querySelector(".location").className = "location";
                this.selectConditions = {};
            },
            defineSearch() {
                delete this.selectConditions.pageSize;
                delete this.selectConditions.pageNow;
                delete this.selectConditions.keyWord;
                eventBus.$emit("selectProductConditions",this.selectConditions);
                let eleArr = document.querySelectorAll("iframe");
                if(eleArr){
                    Array.from(eleArr).map((ele)=>{
                        ele.parentNode.removeChild(ele);
                    })
                }
            },
            getLocation(bl){
                bl && (document.querySelector(".locationButt>img").className = "active1");
                setTimeout(()=>{
                    document.querySelector(".locationButt>img").className = ''
                },600);
               let geolocation = new BMap.Geolocation();
               let _this = this;
               geolocation.getCurrentPosition(function(r){
                   if(r.address.city){
                       _this.location = r.address.city.slice(0,r.address.province.length-1);
                   }else{
                       _this.location = "定位失败";
                   }
               });
            },
            getSelecteCity(city){
                city && sessionStorage.setItem("location",city);
                this.selectCity = sessionStorage.getItem("location");
            }
        },
        mounted(){
            this.getSelecteCity();
            let ios = navigator.userAgent.indexOf("iPhone");
            let scrollEl = document.querySelector(".productItemWrapper");
            if(ios!=-1){
                banScroll(scrollEl)
            }
        }
    }
    function banScroll(el) {
        el.addEventListener('touchmove',function(e){
            e.isScroll = true;
        });
        document.body.addEventListener("touchmove",function (e) {
            if(!e.isScroll){
                e.preventDefault();
            }else{

            }
        },{passive:false})
    }
</script>
<style lang="scss" scoped>
    .searchFilter{
        width: 270px;
        background: #fff;
        transition: all .5s ease;
        position: absolute;
        height: 100%;
        right: 0;
        overflow: hidden;
        color:#122F46;
        z-index: 99;
        .filter-btn{
            height: 70px;
            line-height: 70px;
            text-align: right;
            padding-right:14px ;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            button{
                height: 28px;
                width: 75px;
                background: #fff;
                &:focus{
                    outline: none;
                    box-shadow:none;
                }

            }
            .filter-reset{
                border:dashed 1px #A1A1A1;
                color: #AEAEAE;
            }
            .filter-define {
                border: dashed 1px #122F46;
                color: #122F46;
                margin-left: 10px;
            }
        }
    }
    .selected{
        background: #2FB7EC!important;
        color: #fff;
    }
        .productItemWrapper{
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            height: 100%;
            padding-bottom: 70px;
            box-sizing: border-box;
        .firstLevel{
            width: 100%;
            h1{
                text-align: left;
                height: 36px;
                line-height: 36px;
                padding-left: 14px;
            }
            .showCity{
                background: none;
                float: right;
                height:36px;
                width: 76px;
                .show-city-icon{
                    height: 36px;
                    width: 38px;
                    float: right;
                    line-height: 36px;
                    text-align: center;
                }
                img{
                    height:12px ;
                    width: 12px;
                }
            }
            .secLevelbox{
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                li{
                    height:36px;
                    width: 76px;
                    margin-left: 10px;
                    line-height: 36px;
                    background:rgba(47,183,236,.1) ;
                }
                .locationButt{
                    text-align: left;
                    background: none;
                    padding-left: 5px;
                    img{
                        display: block;
                        float: right;
                        height: 13px;
                        width: 13px;
                        margin-top: 11px;
                        margin-right: 25px;
                        &.active1{
                            animation: 0.6s rotatefresh 1;
                        }
                    }
                }
            }
        }
    }
    .showLocation{
        transition:  all 1s ease;
        height: 1038px;
        overflow: hidden;
    }
    .draw-enter{
        height:0px;
    }
    .draw-leave-active{
        height:0px;
    }
    .rightIn-enter,.rightIn-leave-active{
        right: -280px;
    }
    @keyframes rotatefresh {
        from {
            transform: rotate(115deg);
        }

        to {
            transform: rotate(475deg);
            transition-duration: 0.6s;
            transition: 0.6s;
        }
    }
</style>