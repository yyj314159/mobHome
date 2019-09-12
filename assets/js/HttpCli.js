// 对axios的二次封装，目前get和post两种请求方式
import axios from 'axios';
import MethodsUtil from "@/assets/js/MethodsUtil"
// ===================================登入攔截// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.request.use(
    config => {
        let Authorization =MethodsUtil.getcookie('token')
        if (Authorization) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Authorization = Authorization;
        }
        return config;
    },

    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // case 401:
                //     // 这里写清除token的代码
                //     router.replace({
                //         path: 'login',
                //         query: {
                //             redirect: router.currentRoute.fullPath
                //         } //登录成功后跳入浏览的当前页面
                //     })
            }
            return Promise.reject(error.response.data)
        } else {
            return Promise.reject(error)
        }
    }
);

export default {
    get(url,params){
        return axios({
            url:url,
            method:'get',
            params:params                        
        })
    },
    post(url,params){
        return axios({
            url:url,
            method:'post',
            data:params
        })
    }
}

