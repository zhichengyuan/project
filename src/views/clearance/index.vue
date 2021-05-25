<template>
  <div class="clearance">
      <!-- <Main></Main> -->
      <div class="box">
        <div>1.上传文件</div>
            <!-- <div class="block">
                <el-upload
                    class="upload-demo"
                    action="https://trans.eytonex.com/api/trans/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :before-upload="beforeUpload"
                    accept=".xls,.xlsx" 
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <template #tip>
                      <div class="el-upload__tip">只能上传 ex
                         文件，且不超过 500kb</div>
                    </template>
                </el-upload>
            </div> -->
            <div class="block">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://trans.eytonex.com/api/trans/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :file-list="fileList"
                accept=".xls,.xlsx" 
                :limit="1"
                :on-success='uploadSuccess'
                :auto-upload="false">
                <template #trigger>
                  <el-button size="small" type="primary">选取文件</el-button>
                </template>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    只能上传 excel 文件
                  </div>
                </template>
              </el-upload>
            </div>
       </div>
      <div class="box">
        <div>2.获取在一个时间段内已收集护照的包裹列表</div>
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
      <div class="box">
          <div>3.通过一个包裹号码筛选一定时间内包裹的状态</div>
          <div class="block">
              <el-input type="textarea"
              :rows="4" v-model="value" placeholder="请输入包裹号，多个包裹号用逗号隔开"></el-input>
              <el-date-picker
              v-model="value2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format='YYYY-MM-DD'
              @change="onChange1"
              >
              </el-date-picker>
              <el-button type="primary" @click="getStatus">搜索</el-button>
          </div>
          <div>
            
            
              <el-table
                :data="listData"
                style="width: 100%">
                <el-table-column
                  prop="0"
                  label="包裹号"
                  width="180">
                  <template #default="scope">
                    <span>
                      {{scope.row[0]}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="日期"
                  width="180">
                  <template #default="scope">
                    <span>
                      {{scope.row[1]}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="状态码">
                  <template #default="scope">
                    <span>
                      {{scope.row[2]}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="状态">
                  <template #default="scope">
                    <span>
                      {{scope.row[3]}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="状态1">
                  <template #default="scope">
                    <span>
                      {{scope.row[5]}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地点">
                  <template #default="scope">
                    <span>
                      {{scope.row[6]}}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
          
          </div>
       </div>
  </div>
</template>

<script>


// import Main from './components/main'
import { getList,getToken,getOrderStatusByNumber,getStatus } from "@/api/clearance";
import {ElMessage } from 'element-plus'


export default {
  name: 'clearance',
//   components:{Main},
  data() {
      return {
          value:'',
          value1: '',
          value2:'',
          listData:[],
          fileList:[],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]

      }
  },
  created(){
    //   this.getList();
    //   this.getOrderStatusByNumber();  
    // this.getStatus();
  },
  methods:{
      beforeUpload(file, fileList){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xlsx'
          
            var bool = false;
            if(extension){
              bool = true;
            } else{
              bool = false;
            }

            if(!extension) {
              this.$confirm(`上传文件只能是zip格式!`); 
            }
            
            return bool;
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      uploadSuccess(response, file, fileList){
        // console.log(response);
        if(response.code == 0) {
          this.$message.success(`上传成功！！！`);
        }
        this.$refs.upload.clearFiles()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //获取时间
      onChange(value) {
          console.log(value);
          
          if(value == null) {
              this.value1 = '';
              return
          }
          
        //   console.log(sTime,eTime);
      },
      //获取时间
      onChange1(value) {
          console.log(value);
          
          if(value == null) {
              this.value2 = '';
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
          let sTime = this.dateFormat(this.value1[0]) + ' 2000:00:00';
          let eTime = this.dateFormat(this.value1[1]) + ' 2023:59:59';
            getList(sTime,eTime).then(res => {
                console.log(res);
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
      //获取token
      async getToken(){
          await getToken().then(res => {
              localStorage.setItem("access_token",res.access_token); 
              localStorage.setItem("username",res.username); 
          })
      },
      // 3.跟踪清关状态（GET）
      async getOrderStatusByNumber(){
          await this.getToken();
          await getOrderStatusByNumber().then(res => {
              console.log('sdsdsds',res)
          })
      },
      async getStatus() {
          //     parcel_numbers:[ "LP00422260081969" , "LP00434328308353"  ],
        //     time_begin:'2021-03-27',
        //     time_end:'2021-03-28',
        //     per_page_limit:100,  
        //     next_page_token:'2',
          if(this.value == '' && this.value2 == '') {
            ElMessage.warning({
                    message: '请添加包裹号或者请选择时间！！！！',
                    type: 'warning'
                });
            return
          }
          let data = {
            per_page_limit:100,  
            next_page_token:'2',
          }
          if(this.value !== '') {
            data.parcel_numbers = this.value.split(',');
          }
          if(this.value2 !== ''){
            data.time_begin = this.dateFormat(this.value2[0]);
            data.time_end = this.dateFormat(this.value2[1]);
          }
          console.log(data);

          await this.getToken();
          await getStatus(data).then(res => {
             if(res.error_code === 0) {
               this.listData  = res.events

             }
              console.log('包裹状态',res)
          })
      }
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

