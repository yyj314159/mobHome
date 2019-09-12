import Vue from 'vue'
import 'cube-ui'

import ConstStr from '@/assets/js/ConstStr.js'
import HttpCli from '@/assets/js/HttpCli.js'
import videoPlayer from "vue-video-player"
Vue.use(videoPlayer)
Vue.prototype.ConstStr = ConstStr;
Vue.prototype.HttpCli = HttpCli;
Vue.config.productionTip = false;
/*<script type="text/javascript"  charset="utf-8" src="http://connect.qq.com/qc_jssdk.js" data-appid="APPID" data-redirecturi="REDIRECTURI"></script>*/

