<template>
  <div class="M_audio">
    <div class="tit">
      <img src="/images/mem/goB.png" alt @click="goB">
      <span>{{tit}}</span>
    </div>

    <div class="con">
      <div class="one">
        <img :src="title.img">
        <div @click="onLine">
          <span>在线教学</span> >
        </div>
        <p>{{title.tit}}</p>
      </div>
      <ul>
        <li :key="n" v-for="(item,n) in content">
          <img :src="item.img">
          <p>{{item.tit}}</p>
          <span>{{item.con}}</span>
        </li>
      </ul>
      <p class="web">
        <span @click="regAndgoIn">注册入驻</span> >
      </p>
      <div class="wel">
        <p v-html="wel.tit"></p>
        <span>{{wel.con}}</span>
        <cube-button @click.self="addAudio" class="dialog">{{wel.btn}}</cube-button>
      </div>
      <div class="ft">{{ft}}</div>
    </div>

    <div>
      <more-mod :mcontent="mcontent" ref="more"></more-mod>
    </div>
  </div>
</template>
<script>
import moreMod from "../public/moreModal";
import eventBus from "@/assets/js/eventBus";
import { mapGetters } from "vuex";
export default {
  name: "M_audio",
  data() {
    return {
      HeightW: null,
      tit: "族蚂音频平台",
      title: {
        img: "/images/more/audio/01.jpg",
        tit: "音乐人的赚钱神器"
      },
      content: [
        {
          img: "/images/more/audio/02.jpg",
          tit: "支持创作人认领",
          con:
            "站点通过创作人认领，取得创作人音频作品发布权，并设置创作人收益比例。"
        },
        {
          img: "/images/more/audio/03.jpg",
          tit: "音频、歌词、MV及专辑上传",
          con: "实名认证会员可以为站点上传音频、歌词及MV和专辑"
        },
        {
          img: "/images/more/audio/04.jpg",
          tit: "支持创作人打赏，艺人轻松获益",
          con:
            "支持听众在线打赏，为创作人提供收益保障,获得认同感,激发创作热情。"
        },
        {
          img: "/images/more/audio/05.jpg",
          tit: "支持下载收费，维护创作人权益",
          con: "支持版权人设置收费单价，提供收费下载功能，让作品不再无价！"
        },
        {
          img: "/images/more/audio/06.jpg",
          tit: "创作人收益，免收交易佣金",
          con: "创作人通过族蚂网取得的合法收益，族蚂网不收取任何交易佣金。"
        }
      ],
      wel: {
        tit: "欢迎成为<br/>族蚂创作人",
        con:
          "族蚂网致力于为全天下音乐、曲艺、戏曲、戏剧艺术工作者提供全免费的音频发布平台，成为艺术家获得合法收益及维权的平台！",
        btn: "添加音频"
      },
      ft: "Copyright © 2017 -2018  上海族蚂信息科技有限公司    版权所有",
      mcontent: "请使用PC电脑浏览器登录族蚂网zuma.com认领创作人及添加音频!"
    };
  },
  mounted() {
    this.$nextTick(() => {
      //根据不同手机设置不同高度
      let phoneHeight = window.innerHeight;
      this.HeightW = phoneHeight + "px";
    });
  },
  methods: {
    goB() {
      var UA = navigator.appVersion;
      var ua = UA.toLowerCase();
      if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i)=='qq'){
        location.href = '/music'
      }else{
        this.$router.go(-1);
      }

    },

    diaoshow() {
      this.$refs.more.diaoshow();
    },
    onLine() {
      console.log("在线教学");
      this.$router.push({
        path: "/M_video",
        query:{
          to:1
        }
      });
    },
    regAndgoIn() {
      let _this = this;
      if (this.loginStatus) {
        this.$refs.more.diaoshow();
      } else {
/*        eventBus.$emit("showReg", {
          bl: true,
          callBack: () => {
            _this.$refs.more.diaoshow();
          }
        });*/
        window.location.href = '/mlogin?redirectUrl=/M_audio';
      }
    },
    addAudio() {
      let _this = this;
      this.loginStatus
        ? this.$refs.more.diaoshow()
        : window.location.href = '/mlogin?redirectUrl=/M_audio';

/*        eventBus.$emit("tosignIn", {
            bl: true,
            callBack: function() {
              _this.$refs.more.diaoshow();
            }
          });*/
    }
  },
  components: {
    "more-mod": moreMod
  },
  computed: {
    ...mapGetters(["token", "loginStatus"])
  }
};
</script>
<style lang="scss" scoped>
.M_audio {
  width: 100%;
  // height: 500px;
  height: 100%;
  top: 0;
  z-index: 10;
  .tit {
    width: 100%;
    height: 46px;
    background: #2fb7ec;
    font-weight: bold;
    font-size: 14px;
    color: white;
    display: flex;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }
  }
  .con {
    width: 100%;
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    background: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

    .one {
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      img {
        display: block;
        width: 280px;
        height: auto;
      }
      p {
        height: 40px;
        margin: 20px auto;
        font-size: 22px;
        text-align: center;
        line-height: 40px;
        font-weight: bolder;
        border-bottom: 2px solid #122f46;
        color: #122f46;
      }
      div {
        font-size: 18px;
        color: #122f46;
        font-weight: bold;
        width: 118px;
        align-self: flex-start;
        text-align: left;
        margin: 20px 0 0 20px;
        span {
          font-size: 18px;
          color: #122f46;
          font-weight: bold;
          border-bottom: 2px solid #122f46;
        }
      }
    }
    ul {
      width: 100%;
      li {
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          display: block;
          width: 280px;
          height: auto;
        }
        p {
          width: 240px;
          height: 40px;
          margin-top: 20px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          line-height: 40px;
        }
        span {
          width: 280px;
          color: #949494;
          text-align: center;
          line-height: 20px;
        }
      }
    }
    .web {
      font-size: 18px;
      color: #122f46;
      font-weight: bold;
      width: 118px;
      align-self: flex-start;
      text-align: left;
      margin: 20px 0 30px 20px;
      span {
        font-size: 18px;
        color: #122f46;
        font-weight: bold;
        border-bottom: 2px solid #122f46;
      }
    }
    .wel {
      height: 400px;
      background: rgb(47, 183, 236);
      padding: 0 40px;
      color: white;
      text-align: left;
      overflow: hidden;
      p {
        width: 180px;
        font-size: 32px;
        font-weight: bolder;
        line-height: 40px;
        margin: 36px 0;
      }
      span {
        width: 240px;
        font-size: 14px;
        line-height: 20px;
      }
      .dialog {
        width: 180px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        float: right;
        background: rgba(255, 255, 255, 0.4);
        margin: 20px 0;
        padding: 0;
      }
    }
    .ft {
      width: 240px;
      text-align: left;
      line-height: 20px;
      color: #949494;
      font-size: 10px;
      margin: 20px auto;
    }
  }
}
</style>
