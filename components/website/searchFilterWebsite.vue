<template>
    <transition name='slide'>
            <div class='screenBox'>
                <div class='nameBox'>
                    <div class="nameBoxBig">
                        <div class="priceBox">
                            <p>模板价格</p>
                            <ul class='largeNameUl'>
                                <li v-for="(prcieT,index) in priceList"  v-bind:class="{onActive:index==indexPrice}"  @click='checkPrice(index,prcieT.fAmount)'>{{prcieT.price}}</li>
                            </ul>
                        </div>
                        <div class='largeBox'>
                            <p>模板大类</p>
                            <ul class='largeNameUl'>
                                <li v-for="(large,index) in largeNameList"  v-bind:class="{onActive:index==indexActive}"  @click='checkActive(index,large.fId,$event)'>{{large.fCategoryName}}</li>
                            </ul>
                        </div>
                        <div class='smallBox'>
                            <p v-show='isSmallShow2'>模板小类</p>
                            <ul class='smallNameUl'  v-show="isSmallShow">
                                <li v-for="(small,indexS) in smallNameList" v-bind:class="{onActive:indexS==indexActiveS}"  @click='checkActiveS(indexS,$event)'>{{small.fCategoryName}}</li>
                            </ul>
                            <div class='smallLogin' v-show='islogin'></div>
                        </div>
                    </div>
                </div>
                <div class='screenBtn' @touchmove.prevent>
                    <button class='screenReset' @click="onReset">重置</button>
                    <button class='screenClose' @click="onSeach">确定</button>
                </div>
            </div>
        </transition>
    
</template>
<script>

    import {mapState, mapGetters, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                largeNameList:[],//大类名称
                smallNameList:[],//小类名称
                indexActive:null,//大类选中
                indexActiveS:null,//小类选中
                indexPrice:null,//选中价格
                isSmallShow:false,//小类是否显示
                islogin:false, //点击大类之后login
                largeName:'',
                smallName:'',
                priceNum:'',
                isSmallShow2:false,
                priceList:[
                    {'price':'免费',fAmount:0},
                    {'price':'<50元',fAmount:1},
                    {'price':'50~99元',fAmount:2},
                    {'price':'100~199元',fAmount:3},
                    {'price':'>200元',fAmount:4}
                ]
                // filterShow:false,
            }
        },
        props:['filterShow','pageData'],
        methods:{
            checkActive:function(index,fId,$event){
                // let el=event.currentTarget;
                // this.largeName=el.getAttribute('attrdata');
                this.largeName=this.largeNameList[index].fCategoryName;
                this.islogin=true;
                this.isSmallShow=false;
                this.indexActive=index;
                this.isSmallShow2=true;
                this.HttpCli.get(
                    // "/WebsiteCon/manage-api/template/webCategory/queryCategoryDropListExp?categoryId="+fId,
                    "/manage-api/template/webCategory/queryCategoryDropListExp?categoryId="+fId,
                ).then((res)=>{
                    if(res.data.status==0){
                        this.smallNameList = res.data.data;
                        this.isSmallShow=true;
                        this.indexActiveS=null;
                        this.islogin=false;
                    }
                }).catch((err)=>{
                      console.log(err)
                })
                this.smallName='';
                // this.$emit('postScreen',this.largeName,this.smallName);
            },
            checkActiveS:function(indexS,$event){
                this.indexActiveS=indexS;
                this.smallName=this.smallNameList[indexS].fCategoryName;
                // this.$emit('postScreen',this.largeName,this.smallName);
                
            },
            checkPrice:function(index,fAmount){ //选中价格
                this.indexPrice=index;
                this.priceNum=fAmount;
            },
            getFLargeCategoryName:function(){ //获取大分类
                // this.largeNameList=this.pageData.templateBigCategory;
                this.HttpCli.get(
                    // "/WebsiteCon/manage-api/template/webCategory/queryCategoryDropList",
                    "/manage-api/template/webCategory/queryCategoryDropList",
                ).then((res)=>{
                    if(res.data.status==0){
                        this.largeNameList = res.data.data;
                    }
                }).catch((err)=>{
                      console.log(err)
                })
            },
            onReset:function(){  //重置
                this.indexActive=null;
                this.indexActiveS=null;
                this.indexPrice=null;
                this.largeName='';
                this.smallName='';
                this.priceNum='';
                this.isSmallShow=false;
                this.isSmallShow2=false;

            },
            onSeach:function(){ //确定搜索
                this.$emit('postFilterShow',false);
            },
            //
            scrollBottom(){
                var ele=document.getElementsByClassName('nameBox')[0];
                ele.scrollTo(0,10);

            } 
        },
        mounted(){
             this.getFLargeCategoryName();
            // this.downApp();
        },
        watch:{
            filterShow:{
                handler:function(newVal,oldVal){
                    if(newVal==false){
                        this.$emit('postScreen',this.largeName,this.smallName,this.priceNum);
                    }
                    this.scrollBottom();
                },
                deep:true,
            }
        }
    }
</script>

<style lang="scss" scoped>
*{
    margin: 0px;
    bottom: 0px;
    cursor: pointer;
    box-sizing:border-box;
    -webkit-tap-highlight-color:transparent;
}
.content{
    width: 100%;
}
button:focus,
button:active:focus,
button.active:focus,
button.focus,
button:active.focus,
button.active.focus {
    outline: none;
    box-shadow:none;
}
.screenBtn{
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 20px;
    text-align: right;
    button{
        width: 75px;
        text-align: center;
        height: 28px;
        font-size: 12px;
        background: #fff;
    }
    .screenReset{
        border: 1px dotted #AEAEAE;
        color: #AEAEAE;
        margin-right: 10px;
    }
    .screenClose{
        border: 1px dotted #122F46;
        color: #122F46;
    }
}
.screenBox{
    top: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    width: 270px;
    position: fixed;
    background: #fff;
    z-index: 101;
}
.smallLogin{
    width: 50px;
    height: 50px;
    background:url('/images/searchLoading.gif')  50% 50% no-repeat;
    background-size: 100%;
    margin: 20px auto;

}
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
    }
.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
}
.slide-box{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 10;
}
.nameBox::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
}
.nameBox{
    overflow: auto;
    font-family: 'Arial';
    position: absolute;
    -webkit-overflow-scrolling: touch;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 68px;
    .nameBoxBig{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: -10px;
    }
    p{
        text-align: left;
        color: #122F46;
        font-size: 12px;
        margin-left: 10px;
        margin-top: 25px;
    }
    ul{
        overflow: hidden;
        li{
            margin-top: 15px;
            width: 76px;
            height: 36px;
            color: #122F46;
            text-align: center;
            line-height: 36px;
            float: left;
            font-size: 10px;
            padding: 0 5px;
            overflow: hidden;
            background: #EBF8FD;
            margin-left: 10px;
            &.onActive{
                background: #2FB7EC;
                color: #fff;
            }
        }
    }
}
</style>
