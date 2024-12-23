import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_ENDPOINT
})

axios.defaults.withCredentials = true

api.interceptors.request.use(
  function (config) {
    const tokenCookie = Cookies.get('token')

    if (tokenCookie) config.headers.Authorization = tokenCookie

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 && !window.location.pathname.includes('session')) {
      Cookies.remove('token')
      // window.location.href = window.location.origin + '/session'
    }
    return Promise.reject(error)
  }
)

export default api

// import axios from "axios";
// import Vue from 'vue'

// const devInstance = createInstance("http://localhost:3000");
// const productionInstance = createInstance("http://localhost:3000"); // will change later

// function createInstance(baseURL){
//     return axios.create({
//         baseURL,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.token}`
//         }
//     });
// }

// export default {
//     install () {
//         Vue.prototype.$http = devInstance
//     }
// }; // Check debug/build mode
