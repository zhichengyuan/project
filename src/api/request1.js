import axios from 'axios'
import { MessageBox, Message,ElMessage } from 'element-plus'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: '', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // str.indexOf("3") != -1
        if(config.url.indexOf('/plog/') || config.url == '/express/events'){
            console.log(localStorage.getItem("access_token"))
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("access_token")
        }
        // if (store.getters.token) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     config.headers['token'] = getToken()
        //     config.headers['sid'] = 'notneed'
        // }
        console.log(config);
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response;
        console.log(response);
        // console.log('res', res)
        // if the custom code is not 20000, it is judged as an error.
        if(res.config.url=='/token/') {
            if(res.data){
                return res.data
            }
        }
        if(res.config.url == '/express/events') {
            if(res.data.error_code === 0) {
                return res.data;    
            }else {
                return Promise.reject(new Error(res.data.error_message || 'Error'))
            }
        }
        if (res.data.success !== 'true') {
            // console.log('error', res)
            ElMessage({
                message: res.error || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            // console.log('我的啦',res)
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        
        ElMessage.warning({
            message: error.message,
            type: 'warning'
          });

        return Promise.reject(error)
    }
)

export default service