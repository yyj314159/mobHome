import axios from 'axios';

let requestUtil = {
  validateData:(res)=>{
    if(res.status === 200){
      if(res.data.status === 0){
        return res.data.data;
      }else{
        return null;
      }
    }else{
      return null;
    }
  },
  getData(url,obj){
    return axios.get(url,{params:obj})
  },
  post(url,obj){
    return axios.post(url,obj)
  }
};
export default requestUtil;
