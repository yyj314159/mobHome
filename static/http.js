import axios from "axios"
// ===================================登入攔截// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
import MethodsUtil from "../assets/js/MethodsUtil"

/*if (process.client){
axios.interceptors.request.use(
    config => {
        let Authorization = MethodsUtil.getcookie('token')
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
}*/
export const login = ({userName,userPassword}) => {
    return axios({
        url:'/z-member/member/loginPhone',
        method:'get',
        params:{
            userName: userName,
            userPassword: userPassword
        }
    })
};

export const loginstatus = () => {
    return axios({
        url:'/z-member/member/getUserLoginStatusPhone1',
        method:'get'

    })
};
//获取模板信息
export const getTemplateData = (id) => {
  return axios({
    url:'/manage-api/template/webTemplate/findTemplateByfTemplateId',
    method:'get',
    params:{
      fTemplateId: id
    }
  })
}


//获取签到人数
export const getTemplateSinginNum = (shopId,temId) => {
  return axios({
    url:'/user/getPvByTemplateId',
    method:'get',
    params:{
      fShopId: shopId,
      templateId:temId
    }
  })
}
//是否签到
export const ifSingin = (userId,shopId,temId) => {
  return axios({
    url:'/user/queryIsSign',
    method:'get',
    params:{
      userId:userId,
      fShopId: shopId,
      templateId:temId
    }
  })
}

//发送code
export const sendwxcode = (code) => {
  return axios({
    url:'/authority-sitebackend/userPermission/getAuthCode',
    method:'get',
    params:{
      code:code
    }
  })
}
//发送code
export const sendqqcode = (code,url) => {
  return axios({
    url:'/authority-sitebackend/userPermission/getQQDemo',
    method:'get',
    params:{
      code:code,
      url:url
    }
  })
}
//判断用户是否需要授权
export const ifwxAuthorization = (shopId,templateId) => {
  return axios({
    url:'/user/queryWxIsAuthorization',
    method:'get',
    params:{
      fShopId:shopId,
      templateId:templateId
    }
  })
}
