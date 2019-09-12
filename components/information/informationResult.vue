<template>
<div id='#information'>
       <div class="inforreasultchange">
        <h2>搜索</h2>
        <h3></h3>
        <ul>
          <li v-for="(item,i) in ifortype" :key="i">
             <a :href="'/searchResult2?tabIndex=4&type='+(i==0?2:1)+'&word='+$route.query.word" :class="{'active':i===curId}" @click="changetype(i)">{{item}}</a>
         </li>
        </ul>  
      </div>
    <div class="contain">
        <keep-alive>
        <component :is=tabLabels[ces] :keyword="keyword" :pageData="resultdata"></component>
        </keep-alive>
     </div>
    </div>  
</template>
</div>
</template>
<script>
import { mapGetters } from 'vuex'; 
import searchResultBlog from "./searchResultBlog";                          //引入新闻组件
import searchResultNews from "./searchResultNews";                          //引入博客组件
import { setTimeout } from 'timers';
export default { 
    name: 'informationResult',
    components:{searchResultNews,searchResultBlog},
    props:['keyword','resultdata'],
    data(){
      return{
         keyWord:this.keyword, 
         curId:0, 
         ifortype:['资讯','文章'],
         tabLabels:['searchResultNews','searchResultBlog'],
      }
    },
    created(){
      console.log("00000000000",this.resultdata);
    },
    mounted(){

    },
    computed: {
        ces() {
          let index = 0 ; 
          if(this.$route.query.type){
              if(this.$route.query.type==1){
               index = 1
               this.curId =index;
              }else{
               index = 0 
               this.curId =index;
              }
          }else{
            index = 0;
          }
        return index
      }
   },
    methods:{
            changetype(index){
                   this.curId = index;
                },
          },
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
  height: 100%;
}
.inforreasultchange{
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
    h2{
    margin-left: 10px;  
    width: 150px;
    float: left;  
    font-size: 15px;
    text-align: left;
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
         width: 28px;
         height: 18px;
         line-height: 18px;
        }
      }
    }
    .active{
      background:#2FB7EC;
      color: #FFFFFF;
    }
 }
.contain {  
      .bannerImg {
        margin: 6px 0;
        width: 100%;
        img {
          width: 100%;
        }
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
.shade{
  position:fixed;
  top:0;
  left:0;
  right :0;
  bottom :0;
  width :100%;
  height:100%;
  z-index:99;
  background:rgba(0,0,0,.5);
}
.right-slide-enter,.right-slide-leave-active {
     transform: translateX(270px);
} 
.right-slide-leave-active,.right-slide-enter-active {
     transition: all 0.5s;
}
.blogseach,.newsseach{
  width: 320px;
  font-family: "微软雅黑";
  text-align: left;
  float: left;
  height: 100%;
  overflow: hidden;
 h3{
    width :300px;
    height:25px;
    line-height :20px;
    text-align :left; 
    padding-bottom: 5px;
    display :flex;
    margin:0 10px;
    p{
     height:100%;
     float:left;
     flex:1;
    }
    h5{
        width :56px;
        height :20px;
        line-height :20px;
        i{
          float :right;
          width :15px;
          height :14px;
          margin-top :4px;
          margin-right:7px;
          background-image: url(/images/filterIcon.png);
          background-size:contain;
          background-repeat: no-repeat;
        }
    }
  }
}
</style>