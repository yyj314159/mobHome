<template>
    <div>

    <div id="information">
     <div class="container">
        <component :is=tabLabels[ces] :pageData="pageData"></component>
     </div>
    </div>
    </div>
</template>
<script>
import {Slide, Scroll} from "cube-ui";
import eventBus from "~/assets/js/eventBus";
import SearchInput from '../public/commonsearch';//引入搜索组件
import news from "./news";                          //引入新闻组件
import blog from "./blog";
import MethodsUtil from "~/assets/js/MethodsUtil";
 export default {
    name: 'information',
    props:['pageData'],
    components:{SearchInput,news,blog},
    data(){
      return{
         scrollTop:false,
         componentName:'news',
         tabLabels:['news','blog'],
         curId: 0,
      }
    },
    methods:{
      beginSearch(searchWord){
         console.log("搜索",searchWord)
          let params={};
              params.keyWord = searchWord;
              params.pageSize = 30;
      },
      clearSelected(){

      },
      cancelF(){

      },
      confirmF(){

      }
    },
    computed: {
      ces() {
        let index = 0 ;
        if(this.$route.query.type){
            if(this.$route.query.type==1){
            index = 1
            }else{
            index = 0
            }
        }else{
          index = 0;
        }
      return index
     }
   },
    mounted(){
           eventBus.$on("scrollTop",(arg)=>{
           this.scrollTop  = arg;
        })
    }
  }

</script>

<style lang="scss">
*{
      margin:0;
      padding:0;
      list-style: none;
    }
#information{
  background-color: #FFFFFF;
  .inforseach{
    background: #FFFFFF;
    width: 100%;
  }
}
.infortabchange{
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
    h2{
    margin-left: 10px;
    width: 150px;
    float: left;
    font-size: 15px;
    font-weight: bold;
    }
    h3{
    border-left: 1px solid #2FB7EC;
    width: 1px;
    height: 16px;
    position: absolute;
    right: 59.5px;
    top:12px;
    }
    ul{
    width: 120px;
    height: 100%;
    float: right;
    display: flex;
    text-align: center;
      li{
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
         display:inline-block;
         width: 28px;
         height: 18px;
         line-height: 18px;
        }
      }
    }
    .active{
      background:  #2FB7EC;
      color: #FFFFFF;
    }
 }
.gotoTop{
    width :40px;
    height :40px;
    background: #fff;
    position: fixed;
    right :10px;
    bottom :10px;
    border-radius: 50%;
    box-shadow :0 0 5px rgba(0,0,0,.2);
    z-index: 1;
    img {
        width: 16px;
        height: 18px ;
        position :absolute;
        left: 0;
        top: 0;
        right :0;
        bottom: 0;
        margin :auto;
      }
}
.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top:0;
 }

</style>
