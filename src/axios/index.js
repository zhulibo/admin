import router from '../router'
import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

var userInfo = JSON.parse(localStorage.getItem('userInfo'))

// http request 拦截器
axios.interceptors.request.use(
  config => {

    if (userInfo) {
      config.headers.Authorization = userInfo;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {

    switch (res.data.code) {

      case 802:
        Message({
          message: res.data.msg + `(${res.data.code})`,
          type: 'error',
          duration: 3000
        })
        router.push({path: '/logIn'})
        return Promise.reject(res); // 请求结果异常(code!=0)进入catch函数，避免报错

      case 0:
        return res.data;

      default:
        Message({
          message: res.data.msg + `(${res.data.code})`,
          type: 'error',
          duration: 3000
        })
        return Promise.reject(res); // 请求结果异常(code!=0)进入catch函数，避免报错
    }

  },
  err => {

    // 当响应异常时做一些处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 401:
          err.message = '未授权，请重新登录(401)';
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        case 404:
          err.message = '请求出错(404)';
          break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务器内部错误';
          break;
        case 502:
          err.message = '服务器内部错误';
          break;
        case 503:
          err.message = '服务器内部错误';
          break;
        case 504:
          err.message = '服务器内部错误';
          break;
        case 505:
          err.message = '服务器内部错误';
          break;
        // case 500:
        //   err.message = '服务器错误(500)';
        //   break;
        // case 501:
        //   err.message = '服务未实现(501)';
        //   break;
        // case 502:
        //   err.message = '网络错误(502)';
        //   break;
        // case 503:
        //   err.message = '服务不可用(503)';
        //   break;
        // case 504:
        //   err.message = '网络超时(504)';
        //   break;
        // case 505:
        //   err.message = 'HTTP版本不受支持(505)';
        //   break;
        case 802:
          err.message = '请重新登录(802)';
          break;
        default:
          err.message = `连接出错(${err.response.status})！`;
      }
    } else {
      err.message = '连接服务器失败！'
    }

    Message({
      message: err.message,
      type: 'error',
      duration: 3000
    })

    return Promise.reject(err);
  }
);

export default axios;