<template>
<div class="loading">
  <div class="loader-inner">
    <div><div></div></div>
    <div><div></div></div>
    <div><div></div></div>
  </div>
</div>
</template>
<style lang='scss' scope>
.loading {
  display: flex;
  justify-content: center;
  .loader-inner {
    display: flex;
    height:60px;
    align-items: center;
    justify-content: space-around;
    width: 85px;
    &>div:nth-child(1){
        width:16px;
        height:16px;
        animation-fill-mode: both;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
          animation: line-scale1 1s infinite ease;
          background-color: #3d9be9;
          border-radius: 50%;
        }
    }
    &>div:nth-child(2){
        width: 16px;
        height:16px;
        animation-fill-mode: both;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
          animation: line-scale2 1s infinite ease;
          background-color: #3d9be9;
          border-radius: 50%;
        }
    }
    &>div:nth-child(3){
        width: 16px;
        height:16px;
        animation-fill-mode: both;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
          animation: line-scale3 1s infinite ease;
          background-color: #3d9be9;
          border-radius: 50%;
        }
    }
  }
}
@keyframes line-scale1 {
  0% {
    width: 16px;
    height:16px;
  }

  25% {
    width: 12px;
    height:12px;
  }

  50% {
    width: 8px;
    height:8px;
  }
  75%{
    width: 12px;
    height:12px;
  }
  100%{
    width: 16px;
    height:16px;
  }
}

@keyframes line-scale2 {
  0% {
    width: 12px;
    height:12px;
  }

  25% {
    width: 16px;
    height:16px;
  }

  50% {
    width: 12px;
    height:12px;
  }
  75%{
    width: 16px;
    height:16px;
  }
  100%{
    width: 12px;
    height:12px; 
  }
}
@keyframes line-scale3 {
  0% {
    width: 8px;
    height:8px;
  }

  25% {
    width: 12px;
    height:12px;
  }

  50% {
    width: 16px;
    height:16px;
  }
  75%{
    width: 12px;
    height:12px;
  }
  100%{
    width: 8px;
    height:8px;
  }
}
</style>
