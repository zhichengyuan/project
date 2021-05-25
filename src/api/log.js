import request from './request'
// 更改后台
const Base = "";
const reqApi ='http://118.190.143.91:8082' 
// http://118.190.143.91:8082/selectTrack.htm?documentCode=8131274345135935
export const Logistics = (req) =>
request(reqApi + "/selectTrack.htm", req);