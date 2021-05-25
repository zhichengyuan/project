import request from './request1'

  //获取包裹列表
export function getList(startDate,endDate) {
    return request({
         url: "/api/v1/getlistsignedparcels/json",//https://unitrade.alta.ru
         method: "post",
         data:{
             "login":"betapronew",
             "password":"878hjkgyu6f",
             "startDate":startDate,
             "endDate":endDate
         }
     })
}
//跟踪清关状态的API,,,,,header包含 ：Authorization : token
export async function getOrderStatusByNumber() {
    return await request({
         url: "/express/plog/",//https://api.unitrade.su/express/plog/
         method: "get",
         params:{
            parcel_number:'121212121'
         }
     })
  }
//获取token
export async function getToken() {
    return await request({
         url: "/token/",//https://api.unitrade.su/token
         method: "get",
         params:{
             login:'support_1track_ru',
             password:'912$!E0b4t_eTcS1vBQ2593e7c43q',
         }
     })
  }
//4.通过一个包裹号码筛选一定时间内包裹的状态（POST）
export async function getStatus(data) {
    return await request({
         url: "/express/events",//https://api.unitrade.su/express/events
         method: "post",
         data:data
        //  data:{
        //     parcel_numbers:[ "LP00422260081969" , "LP00434328308353"  ],
        //     time_begin:'2021-03-27',
        //     time_end:'2021-03-28',
        //     per_page_limit:100,  
        //     next_page_token:'2',
        //  }
     })
  }