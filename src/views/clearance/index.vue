<template>
  <div class="clearance">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="俄罗斯报关文件上传" name="clearanceUpload"></el-tab-pane>
        <el-tab-pane label="生成中国报关文件" name="generateChinaD"></el-tab-pane>
        <el-tab-pane label="生成物流文件" name="generateLogisticsfile"></el-tab-pane>
        <el-tab-pane label="生成华磊系统预报表" name="generateExcel"></el-tab-pane>
        <el-tab-pane label="俄罗斯审核结果查询" name="queryList"></el-tab-pane>
        <el-tab-pane label="清关状态查询" name="checkList"></el-tab-pane>
        <el-tab-pane label="比对" name="contrast"></el-tab-pane>
      </el-tabs>
      <router-view />
      <!-- <Main></Main> -->
      <div class="box" style="display:none">

            <div>步骤一。.生成指定格式的文件</div>
            
            <div class="block">
              <el-upload
                class="upload-demo"
                ref="uploadExcel1"
                action="https://trans.eytonex.com/api/trans/upload"
                :before-upload="beforeUpload1"
                :file-list="fileList"
                accept=".xls,.xlsx" 
                :limit="1"
                :on-success='uploadSuccess2'
                :auto-upload="false">
                <template #trigger>
                  <el-button size="small" type="primary">选取文件</el-button>
                </template>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">生成文件</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    只能上传 excel 文件
                  </div>
                </template>
              </el-upload>
            </div>
            <div>步骤二.上传文件</div>
            
            <div class="block">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://trans.eytonex.com/api/trans/upload"
                :before-upload="beforeUpload"
                :file-list="fileList"
                accept=".zip" 
                :limit="1"
                :on-success='uploadSuccess'
                :auto-upload="false">
                <template #trigger>
                  <el-button size="small" type="primary">选取文件</el-button>
                </template>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到海关</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    只能上传 zip 压缩包
                  </div>
                </template>
              </el-upload>
            </div>
       </div>
      <div class="box" style="display:none">
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
      <div class="box" style="display:none">
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
              <div>
                <el-upload
                  class="upload-demo"
                  ref="uploadExcel"
                  action="https://trans.eytonex.com/api/trans/status"
                  :before-upload="beforeUpload"
                  :file-list="fileList"
                  accept=".xls,.xlsx" 
                  :limit="1"
                  :on-success='uploadSuccess1'
                  :auto-upload="false">
                  <template #trigger>
                    <span>导入运单号查询</span>
                  </template>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadExcel">excel查询</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      只能上传 excel 文件
                    </div>
                  </template>
                </el-upload>
              </div>
              
              
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
          activeName: 'clearanceUpload',
          value:'',
          value1: '',
          value2:'',
          listData:[],
          fileList:[],
          

      }
  },
  created(){
    //   this.getList();
    //   this.getOrderStatusByNumber();  
    // this.getStatus();
  },
  methods:{
      handleClick(tab, event) {
          this.$router.push({name:tab.paneName})
      },
      beforeUpload(file, fileList){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'zip'
            var bool = false;
            if(extension){
              bool = true;
            } else{
              bool = false;
            }
            if(!extension) {
              this.$confirm(`上传文件只能是xlsx格式!`); 
            }
            return bool;
      },
      beforeUpload1(file, fileList){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'zip'
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
      submitUploadExcel() {
        console.log(this.value2)
        if(this.value2 !== '') {
              this.$refs.uploadExcel.data.time_begin=this.dateFormat(this.value2[0]);
              this.$refs.uploadExcel.data.time_end=this.dateFormat(this.value2[1]);
          }
          this.$refs.uploadExcel.data.per_page_limit=100;
          this.$refs.uploadExcel.data.next_page_token='2';
          console.log(this.$refs.uploadExcel);
        this.$refs.uploadExcel.submit();
      },
      uploadSuccess(response, file, fileList){
        // console.log(response);
        if(response.code == 0) {
          this.$message.success(`上传成功！！！`);
        }
        this.$refs.upload.clearFiles()
      },
      uploadSuccess1(response, file, fileList){
        // console.log(response);
        if(response.code == 0) {
          this.$message.success(`查询成功！！！`);
          this.listData  = response.data
        }
        this.$refs.uploadExcel.clearFiles()
      },
      uploadSuccess2(response, file, fileList){
        // console.log(response);
        if(response.code == 0) {
          this.$message.success(`生成成功！！！`);
        }
        this.$refs.uploadExcel1.clearFiles()
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

