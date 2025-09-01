import axios from "axios";
import {ElMessage} from "element-plus";

const request =axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 5000,
})

//request拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
}, error => {
    console.log(error)
    return Promise.reject(error);
});

//response拦截器
request.interceptors.response.use(
    response => {
        let res = response.data;
        if (typeof res==='string') {
            res = res?JSON.parse(res):res
        }
        return res;
    },
    error => {
        if (error.response.status === 404) {
            ElMessage.error('未找到请求接口')
        } else if (error.response.status === 500) {
            ElMessage.error('系统异常，请检查后端')
        }else{
            console.error(error);
        }
        return Promise.reject(error);
    }
)

export default request;
