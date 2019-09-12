import Vue from 'vue'
import Vuex from 'vuex'
// 用用到状态管理的注意格式保持一致，写清注释
Vue.use(Vuex)
import MethodsUtil from "@/assets/js/MethodsUtil";
import {login,loginstatus} from '~/static/http'
const store = () => new Vuex.Store({
    state: {
        choose_audio: false,//是否显示选择音频组件
        musicClass: '音频分类',
        inforNum : 1 ,   // 资讯类搜索所得总数
        // token:MethodsUtil.getcookie("token"),           //存储Token
        token:null,
        userInfo:null,      //用户信息
        // loginStatus:MethodsUtil.getcookie("token") ? true : false,      //未登录
        loginStatus:false,
        loginData:'',//登录返回数据,
        showLog:{},
        userId:null
    },
    mutations: {
        SHOW_CHOOSE_AUDIO: (state, payload) => {
            state.choose_audio = payload.chooseAudio
            state.musicClass = payload.musicClass
        },
        LOGIN:(state,token)=>{      //登录
            state.token = token
        },
        USERINFO:(state,info)=>{       //用户信息
            state.userInfo = info
        },
        LOGINSTATUS:(state,bool)=>{     // 登录状态
            state.loginStatus = bool
        },
        USERID:(state,bool)=>{     // 登录状态
        state.userId = bool
      },
        LOGINDATA:(state,info)=>{     // 登录返回数据
            state.loginData = info
        }


    },
    actions: {
        SHOW_CHOOSE_AUDIO: ({ commit, state }, payload) => {
            commit('SHOW_CHOOSE_AUDIO', payload)
        },
        TOLOGIN ({ commit }, info) {
            return new Promise((resolve, reject) => {
                login(info).then(res => {
                    if (res.status === 200) {
                        if(res.data.status==0){             //登录成功
                            let token = res.data.data.token;
                            commit('LOGINDATA',res.data.data)
                            commit('LOGIN', token);          // 存储 token
                            commit('LOGINSTATUS', true);     // 改变登录状态为
                            MethodsUtil.setcookie("token",token);    // 存储进 cookie
                        }
                        resolve(res)
                    }
                }).catch((error) => {
                    console.log(error);
                    reject(error)
                })
            })
        },
        GETUSER:({commit})=>{       //获取用户信息
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    if (res.status === 200) {
                        commit('USERINFO', res.data.data) // 把 userInfo 存进 Vuex
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
        },
          LOGINSTATUS:({commit})=>{
            return new Promise((resolve, reject) => {
              loginstatus().then(res => {
                if (res.data.message == "未登录") {
                  commit('LOGINSTATUS', false)

                }else{

                  commit('LOGINSTATUS', true)
                  commit('USERID',res.data.data.fId)
                }
                resolve(res)
              }).catch((error) => {
                reject(error)
              })
            })
          },
        LOGINOUT ({ commit }) {             // 退出登录
            return new Promise((resolve, reject) => {
                commit('USERINFO', null);       // 清除 userInfo
                commit('LOGINSTATUS', false);  // 登录状态改为 false
                commit('LOGIN', '');          // 清除 token
                MethodsUtil.remove('token')
            })
        }
    },
    getters: {
        choose_audio: (state) => {
            return state.choose_audio
        },
        musicClass: (state) => {
            return state.musicClass
        },
        token:(state)=>{
            return state.token
        },
        loginStatus:(state)=>{
            return state.loginStatus
        }
    }
});
export default store;
