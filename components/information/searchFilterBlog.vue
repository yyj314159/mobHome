<template>
<div class="filterbody">
            <div class="filter_data">
            <ul>
            <li v-for="(val,index) in items" :key=index class="fistItem">
                <h1>{{val.title}}</h1>
                <ul>
                    <li v-for="(item,i) in val.list" :key=i class="secondItem" @click="itemSelect(i,$event)">
                        {{item}}
                    </li>
                </ul>
            </li>
            </ul>   
          </div> 
            <div class="filter_btn">
                    <button @click="clearAll">重置</button>
                    <button @click="defineSearch">确定</button>
            </div> 
       </div>
</template>
<script>
import {mapGetters} from "vuex";
import eventBus from "~/assets/js/eventBus";
import { constants } from 'crypto';
const BlogData = [{"title":"文章类型",list:["纯文本","图文文章","视频文章"]}];
export default{
    data(){
        return{
            items:BlogData,
            selectblogType:null,
        }
    },
    methods:{
      itemSelect(index,eve){
        if(eve.srcElement.getAttribute("class").indexOf("informationactive")!=-1){
                        eve.srcElement.classList.remove('informationactive');
                        this.selectblogType = null;
                        return;
                    }
                    let arr =eve.srcElement.parentNode.children;
                    for(let i=0; i<arr.length; i++){
                        arr[i].classList.remove('informationactive');
                    }
                    eve.srcElement.classList.add('informationactive');

                    switch(index){
                     case 0: this.selectblogType = 1; break;
                     case 1: this.selectblogType = 6; break;
                     case 2: this.selectblogType = 18; break;
                    }
                 }, 
       clearAll(){
                // "执行了清空"
                let arr = document.getElementsByClassName("secondItem");
                for(let i= 0; i<arr.length;i++){
                     arr[i].classList.remove('informationactive');
                 }
                 this.selectblogType = null;
                },
       defineSearch(){
                this.$emit('filterHide',false);
                this.$emit("selectblogType",this.selectblogType);
                console.log("触发了")
                }
            }
   
}
</script>

<style lang="scss">
.filterbody{
    width: 270px;
    height: 100%;
    position: fixed;
    transition: all .5s ease;
    top:0; 
    right:0;
    z-index: 6;
    overflow: hidden;  
}
.filter_left{
    float: left;
    width: 50px; 
    height: 100%;
}
.filter_data{
    position: absolute;
    right: 0;
    bottom: 59px;
    top: 0;
    width: 270px;
    background: #FFFFFF;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}  
.filter_btn{
    height: 60px;
    width: 270px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: #FFFFFF;
    button{
      width: 75px;
      height: 28px;
      border: none;
      background: #FFFFFF;
      margin-top: 16px;
        }
    button:nth-child(1){
      margin-left:64px;
      border:1px dashed #A1A1A1;
      color:#A1A1A1;  
    }   
    button:nth-child(2){
      margin-left:18px;
      border:1px dashed #122F46;
      color:#122F46;  
    }    
 }

.fistItem{
   h1{
       height: 30px;
       text-align: left;
       line-height: 40px;
       text-indent: 10px;
   }
   ul{
       display: flex;
       margin: 0 3.5px;
       flex-wrap: wrap;
       justify-content:flex-start;
   } 
}
.secondItem{
    width: 80px;
    height: 30px;
    font-size: 10px;
    line-height: 30px;
    background-color: rgba(47,183,236,0.1);
    margin:6px 3.5px 0 3.5px;
    overflow: hidden;
    }  
.informationactive{
    background-color:rgba(47,183,236,1);
    color: #FFFFFF;
}
</style>