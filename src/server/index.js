let url = 'http://106.13.230.68:8888';
import axios from 'axios';

const postForm=(api,data)=>{
    return axios({
        url: `${url}${api}`,
        method:'post',
        withCredentials: true,
        data:data
    }).then(res=> res.data);
};
const getForm=(api,data)=>{
    return axios({
        url: `${api}`,
        method:'get',
        params:data
    }).then(res=> res.data)
};

export const carSave = (data)=> postForm('/api/car/save',data);
export const login = (data)=> postForm('/api/car/login',data);