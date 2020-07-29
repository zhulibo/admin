import router from '../router'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL

// var userInfo = JSON.parse(localStorage.getItem('userInfo'))

// http request 拦截器
axios.interceptors.request.use(
  config => {

    // if (userInfo.token) {
    //   config.headers.token = userInfo.token;
    // }

    // config.headers = {
    //   'Content-Type':'multipart/form-data'
    // };
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {

    // if (res.code === 401) {
    //   router.replace('/login');
    // }
    //
    // if (res.code === 403) {
    //   router.replace('/authority');
    // }

    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;