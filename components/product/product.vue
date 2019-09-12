<template>
    <div>

        <div  class="list" >
        <cube-scroll
                ref="scroll"
                :data="goodList"
                :options="options"
                @pulling-up="onPullingUp"
                @scroll="scroll"
                :scroll-events="['scroll']"
        >
            <Banner :items = "item"/>
            <loading v-if="!goodList.length"></loading>
            <ul>
                <a  style="display: block" v-for="(item,index) of goodList" :key="item.productId+index" :href="item.wapUrl">
                    <li>
                        <div class="imgBox">
                            <img :src="item.productMainUrl" alt="">
                            <i class="attrLeftTop" v-if="item.productPayMent!=0">{{item.productPayMent|payMent}}</i>
                            <i class="attrRightTop" v-if="item.hasFormula!=2 || item.productWholesale!=1">{{item.hasFormula|hasFormulaOrWholesale(item.productWholesale)}}</i>
                            <i class="attrLeftBottom" v-if="(item.productType!='0' && item.productType!='1') || (item.productType=='0' && item.childType!='1')">{{item.productType|productType(item.childType)}}</i>
                            <i class="attrRightBottom" v-if="item.tranType==2">同城交易</i>
                        </div>
                        <div class="goodInfo">
                            <p>￥{{item.productPrice|twoDecimal}}</p>
                            <p>{{item.productName}}</p>
                        </div>
                    </li>
                </a>
            </ul>
            <template slot="pullup" slot-scope="propsa">
                <div v-show="propsa.pullUpLoad">
                    <template>
                        <span v-show="showLoading">
                          <Loading class="showLoading"></Loading>
                        </span>
                        <span v-show="afterAll" class="after-all">已经到底啦！</span>
                    </template>
                </div>
            </template>
        </cube-scroll>
        </div>
        <!--回到顶部-->
        <div class="gotoTop" @click="goToTop" v-if="showGoTop">
            <img src="~/static/images/gotoTop.png" alt="">
        </div>
    </div>
</template>
<script>
import SearchInput from '~/components/public/commonsearch.vue';
import MethodsUtil from "~/assets/js/MethodsUtil";
import Loading from "~/components/public/loading";
import Interface from "~/assets/js/ConstStr";
import Banner from "~/components/public/Rotation"
import eventBus from "~/assets/js/eventBus";
import {item} from "./js/cityData"
export default {
    name: 'Product',
    data(){
          return {
              goodList:[],
              showLoading:true,
              showGoTop:false,      //是否显示“回到顶部”按钮
              scrollTop:0,          //滚动距离
              isGetData:true,   //是否获取数据
              productCont:0,    //商品总数;
              alreadyShowProduct:null,  //当前已展示的商品数量;
              afterAll:false,           //数据是否加载完
              pageNow:2,
              alreadyGetData:true,
              productAttr:true,
              item:item,
              firstGetData:true,
          }
     },
     props:[
         "pageData"
     ],
    components: {
      SearchInput,
      Loading,
      Banner
    },
    filters:{  //过滤器
        twoDecimal:(n)=>{       //保留两位小数
            n = n.toString()
            if(n.indexOf(".")==-1){     //没有小数
                return n+".00";
            }else if(n.indexOf(".")==n.length-2){    //一位小数
                return n+"0";
            }else{
                return parseFloat(n).toFixed(2);
            }
        },
        payMent:(type)=>{
            switch (parseInt(type)) {
                case 1:return "诚意金";break;
                case 3:return "保证金";break;
                case 4:return "定金";
            }
        },
        hasFormulaOrWholesale:(formula,wholesale)=>{
            if(formula=="1" && wholesale=="1"){     //定制非批发
                return "在线计价";
            }else if(formula=="1" && wholesale=="2"){       //定制批发
                return "定制批发";
            }else if(formula=="2" && wholesale=="2"){       //非定制批发
                return "批发";
            }
        },
        productType:(productType,childType)=>{
            if(productType=="0"){        //组合产品母体
                if(childType.indexOf("2")!=-1 && childType.indexOf("3")==-1){   //有二手无翻新
                    return "二手";
                }else if(childType.indexOf("2")==-1 && childType.indexOf("3")!=-1){     //有翻新无二手
                    return "翻新";
                }else if(childType.indexOf("2")!=-1 && childType.indexOf("3")!=-1){     //有二手有翻新
                    return "二手/翻新";
                }
            }else{                      //单一产品
                switch (parseInt(productType)) {
                    case 2:return "二手";break;
                    case 3:return "翻新";break;
                }
            }
        }
    },
    methods: {
      scroll(dis){
          this.scrollTop = -dis.y;
      },
      onPullingUp() {
          if(!this.alreadyGetData){
              return;
          }
          if(this.alreadyShowProduct==this.productCont){
              this.showLoading = false;
              this.afterAll = true;
              this.$refs.scroll.refresh();
              return false;
          }else{
              this.getData({pageSize: 30,pageNow:this.pageNow});
              this.$refs.scroll.refresh();
              this.$refs.scroll.forceUpdate();
          }
      },
      goToTop(){
          this.$refs.scroll.scrollTo(0, 0, 1500);
      },
      getData(params){
          this.alreadyGetData = false;
              this.HttpCli.get(
                  Interface.productSearchKeyWord,
                  params
              ).then((res)=>{
                  if(res.data.status==0){
                      let data = res.data.data.content;
                      this.productCont = res.data.data.count;   //商品总量
                      data && (this.alreadyShowProduct+=data.length);
                      this.pageNow++;
                      setTimeout(()=>{
                          this.goodList.push(...data);
                          this.firstGetData = false;
                          this.alreadyGetData = true;
                      },500)
                  }
              }).catch((err)=>{

              })
      },
      imgAutoAdapt(e){
          MethodsUtil.imgAutoAdapt(e.target,true)
      }
    },
    computed: {
      options() {
          return {
              pullUpLoad: {
                  threshold: 0, //上拉阈值
                  stop:90,
                  txt: "更新成功"
              },
              scrollbar: {
                  fade:true
              },
              bounce:false
          };
      }
    },
    watch:{
        scrollTop:{
                 handler:function(newVal,oldVal){
                     if(newVal>=800){
                         this.showGoTop = true;
                     }else{
                         this.showGoTop = false;
                     };

                     if(newVal-oldVal>0 && this.scrollTop >0){//上划
                         eventBus.$emit("scrollTop",true);
                     }else{
                         eventBus.$emit("scrollTop",false);
                     }

                },
                deep:true,
                // immediate:true,
        }
    },
    created(){
            this.goodList = this.pageData.productList.content;
            this.alreadyShowProduct = this.pageData.productList.content.length;    
    },
    beforeMount(){
        console.log(Window)
    },
  }
</script>

<style lang="scss" scoped>
    *{
        margin:0;
        padding:0;
        list-style: none;
    }
.list{
    background:#fff;
    text-align: left;
    width: 100%;
    height: 100%;
    ul{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        li{
            height:210px;
            width:145px;
            background:#fff;
            margin-left: 10px;
            margin-top: 10px;
            .imgBox{
                width: 145px;
                height: 145px;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit:cover ;
                }
                i{
                    font-style: normal;
                    padding: 0px 8px;
                    height: 20px;
                    line-height: 21px;
                    text-align: center;
                    background: #122F46;
                    color: #fff;
                    display: block;
                    position: absolute;
                    font-size: 10px;
                    &.attrLeftTop{
                        top: 0;
                        left: 0;
                    }
                    &.attrLeftBottom{
                        bottom: 0;
                        left: 0;
                    }
                    &.attrRightTop{
                        top: 0;
                        right: 0;
                    }
                    &.attrRightBottom{
                        right: 0;
                        bottom: 0;
                    }
                }
            }
            .goodInfo{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-top: 5px;
                p:nth-of-type(2){
                    font-size: 12px;
                    width: 100%;
                    height: 28px;
                    line-height: 15px;
                    word-break: break-all;
                    overflow: hidden;
                    color: #718290;
                }
                p:nth-of-type(1){
                    font-size: 12px;
                    margin: 5px 0;
                    color: #122F46;
                }
            }
        }
    }
}
.gotoTop{
    width: 40px;
    height:40px;
    position: fixed;
    right:10px;
    bottom:10px;
    border-radius: 50%;
    background:#fff;
    z-index: 999;
    box-shadow:0 0 5px rgba(0,0,0,.2);
    img{
        height: 16px;
        width: 18px;
        position: absolute;
        left: 0;
        right: 0;
        bottom:0;
        top:0;
        margin:auto;
    }
}
.showLoading{
    padding-bottom: 20px;
}
.after-all{
    display: inline-block;
    width: 100%;
    height:45px;
    line-height: 45px;
    text-align: center;
    color: #b1c9d3;
}

</style>


