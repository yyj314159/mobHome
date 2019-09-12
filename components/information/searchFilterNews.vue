<template>
        <div class="filterbody">
            <div class="filter_data"> 
             <ul>
            <li v-for="(item) in items" :key=item.rowIndex class="fistItem">
                <h1>{{item.title}}</h1>
                <ul>
                    <li v-for="(val,index) in item.list" :key=index  class="secondItem" @click="itemSelect(item.rowIndex,index,$event)">
                       {{val}} 
                    </li>
                 </ul>
                </li>
               </ul>  
             </div>
            <div class="filter_btn">
                    <button  @click="clearAll">重置</button>
                    <button  @click="defineSearch">确定</button>
            
            </div> 
       </div>
</template>
<script>
import {mapGetters} from "vuex";
const NewsData = [
        {'title':"资讯类型",list:['图文','图集','视频'],rowIndex:1},
    ];
     export default {
        data(){
            return{
                items:NewsData,         //筛选条件
                selectnewsType:{'fNewsType':'','fFristZumaItemId':''},      //bus 传值
                firstcategory:[],       //一级类目名称
                firstcategoryId:[],     //一级类目名称id
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            getData(){
                NewsData.splice(1,1);
                this.HttpCli.get(
                   "/news_web/news/queryFristCategory", 
                ).then((res)=>{
                    if(res.status == 200){
                        this.firstcategory = this.firstcategory.concat(res.data);
                        let fcategoryArr = [];
                        this.firstcategory.forEach((item,index)=>{
                            if(item){
                                fcategoryArr.push(item.fName);
                                this.firstcategoryId.push(item.fId); 
                            }
                        })
                        let obj = {};
                        obj.title = "资讯分类";
                        obj.list = fcategoryArr;
                        obj.rowIndex = 2;
                         
                        NewsData.push(obj);
                    }
                }).catch((err)=>{

                })
            },
            itemSelect(rowIndex,index,eve){
                    if(eve.srcElement.getAttribute("class").indexOf("informationactive")!=-1){
                                eve.srcElement.classList.remove('informationactive');
                                switch(rowIndex){
                                    case 1 :  this.selectnewsType.fNewsType = ''; break;
                                    case 2 : this.selectnewsType.fFristZumaItemId = ''; break
                                }
                                return;
                             }
                            let arr =eve.srcElement.parentNode.children;
                            for(let i=0; i<arr.length; i++){
                                arr[i].classList.remove('informationactive');
                             }
                            eve.srcElement.classList.add('informationactive')
                    // 记录筛选值
                switch(rowIndex){
                    case 1 : this.selectnewsType.fNewsType = Math.pow(2,index) ; break;
                    case 2 : this.selectnewsType.fFristZumaItemId = this.firstcategoryId[index] ; break;
                }
               
            },
            clearAll(){
                // 清空
                let arr = document.getElementsByClassName("secondItem");
                for(let i=0;i<arr.length;i++){
                     arr[i].classList.remove('informationactive');
                }
                this.selectnewsType.fNewsType = '';
                this.selectnewsType.fFristZumaItemId = '';
            },
            defineSearch(){
                this.$emit('filterHide',false);
                this.$emit("selectnewsType",this.selectnewsType);
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
    z-index: 8;
    overflow: hidden;  
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
    text-align: center;
    overflow: hidden;
    }  
.informationactive{
    background-color:rgba(47,183,236,1);
    color: #FFFFFF;
}
</style>