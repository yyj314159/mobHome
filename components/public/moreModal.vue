<template>
    <div class="more_shade" v-show="shadeshow" @click.self="moreClose">      
        <transition name="moremot-scale">
            <div class="more_body" v-show="more_bodyshow" >
              <div class="more_version"> 
              <div class="more_title" v-text="mtitle"></div>
              <div class="more_close" @click.self="moreClose"></div>
              <div class="more_concont" v-text="mcontent">
                  <!-- 请使用PC电脑浏览器登陆族蚂网认领创作人及添加资讯！ -->
              </div>
              </div> 
            </div>
           </transition>
        
        </div>
</template>
<script>
export default {
//   props:['mcontent'],  
    props:{
        "mtitle":{
            type:String,
            required:false,
            default:'感谢您的信任 ！'
        },
        "mcontent":{
            type:String,
            required:false,
            default:'请使用PC电脑浏览器登陆族蚂网认领创作人及添加资讯！'
        }
    },
  name: "moreModal",
  data() {
      return{
         shadeshow:false,
         more_bodyshow:false,
      }
   
  },
  methods:{
        diaoshow(){
            this.shadeshow = true;
            this.more_bodyshow = true;
        },
        moreClose(){
            this.shadeshow = false;
            this.more_bodyshow = false;
         },
  }
}
</script>
<style lang="scss" scoped>
.more_shade{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgba(18,47,70,.5);
}
.more_body{
    width: 250px;
    height: 104px;
    background: #FFFFFF;
    color:#122F46;
    font-family: '微软雅黑';
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    padding-top: 22px;
    text-align: left;
    // box-shadow: 5px 5px 5px #EAF1F5;
    overflow: hidden;
    
    .more_version{
        width: 190px;
        height: 80px;
        margin: auto;
    }
    .more_title{
        width: 180px;
        font-weight: bold;
        font-size: 12px;
    }
    .more_concont{
        width: 198px;
        height: 32px;
        font-size: 12px;
        margin-top: 14px;
        line-height: 16px;
        word-break: break-word;
    }
    .more_close{
        position: absolute;
        width: 14px;
        height: 14px;
        background:url("/images/model_close.png");
        background-size: contain;
        background-repeat: no-repeat;
        top:15px;
        right:15px;
    }
}
.moremot-scale-enter,.moremot-scale-leave-active {
     transform:scale(0.5,0.5);
} 
.moremot-scale-leave-active,.moremot-scale-enter-active {
     transition:all 0.5s;
}
</style>
