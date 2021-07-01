<template>
      <div class="box">
        <div>2.获取在一个时间段内审核成功的包裹列表</div>
            <div class="block">
                <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format='YYYY-MM-DD'
                @change="onChange"
                >
                </el-date-picker>
                <el-button type="primary" @click="getList">搜索</el-button>
        </div>
       </div>
</template>

<script>


// import Main from './components/main'
import { getList,getListByTime } from "@/api/clearance";
import {ElMessage } from 'element-plus'


export default {
  name: 'clearance',
//   components:{Main},
  data() {
      return {
          value1: '',
          listData:[],
          

      }
  },
  created(){
    //   this.getList();
    //   this.getOrderStatusByNumber();  
    // this.getStatus();
  },
  methods:{

      //获取时间
      onChange(value) {
          console.log(value);
          
          if(value == null) {
              this.value1 = '';
              return
          }
          
        //   console.log(sTime,eTime);
      },
    
      //获取包裹列表
      getList() {
          if(this.value1 == '') {
              ElMessage.warning({
                    message: '请选择时间！！！！',
                    type: 'warning'
                });
              return
          }
          let sTime = this.dateFormat(this.value1[0]) + ' 00:00:00';
          let eTime = this.dateFormat(this.value1[1]) + ' 23:59:59';
            getListByTime(sTime,eTime).then(res => {
                if(res.code == 0) {
                  window.open(res.data,'_blank')
                }
            })
      },
      dateFormat(dateData) {
        var date = new Date(dateData)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        const time = y + '-' + m + '-' + d
        return time
      },
     
  }

}
</script>
<style lang="scss">
.el-date-editor .el-range-separator{
    width: 8%;
}
.clearance {
  
  position: relative;
  // overflow: hidden;  
  padding: 20px;
  .box{
      margin-bottom: 20px;
  }
}


</style>

