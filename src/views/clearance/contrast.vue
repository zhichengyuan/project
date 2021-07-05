<template>
      <div class="box">
            <div class="block">
              
            </div>
            <el-form  ref="ruleForm" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="转好的华磊表">
                    <!-- <input type="file" name="file" @change="ceshi($event)"> -->
                    <el-upload
                        class="upload-demo"
                        action="1111"
                        accept=".xls,.xlsx" 
                        
                        :limit="1"
                        :on-change="beforeUpload"
                        :on-success='uploadSuccess'
                        :auto-upload="false">
                            <el-button size="small" type="primary">选取文件</el-button>
                        <template #tip>
                        <div class="el-upload__tip">
                            只能上传 excel 文件
                        </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="查询回来的数据">
                    <el-upload
                        class="upload-demo"
                        action="1111"
                        accept=".xls,.xlsx" 
                        :limit="1"
                        name='resfile'
                        ref="uploadExcel"
                        :on-change="beforeUpload1"
                        :on-success='uploadSuccess'
                        :auto-upload="false">
                            <el-button size="small" type="primary">选取文件</el-button>
                        <template #tip>
                        <div class="el-upload__tip">
                            只能上传 excel 文件
                        </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="查询回来的数据">
                    <el-upload
                        class="upload-demo"
                        action="1111"
                        :before-upload="beforeUpload"
                        :file-list="fileList"
                        accept=".xls,.xlsx" 
                        :limit="1"
                        name='resfile'
                        :on-success='uploadSuccess'
                        :auto-upload="false">
                        <template #trigger>
                        <el-button size="small" type="primary">选取文件</el-button>
                        </template>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">生成华磊预报表文件</el-button>
                        <template #tip>
                        <div class="el-upload__tip">
                            只能上传 excel 文件
                        </div>
                        </template>
                    </el-upload>
                </el-form-item> -->
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                </el-form-item>
            </el-form>
       </div>
    
</template>

<script>
import { contrast } from "@/api/clearance";
export default {
  name: 'clearance',
//   components:{Main},
  data() {
      return {
          formInline:{},
          fromdata:{}
      }
  },
  created(){
  },
  methods:{
      ceshi(e) {
          console.log(e);
          console.log(e.target.files[0]);
      },

      submitForm(formName) {
          console.log(this.$refs[formName]);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
            
            contrast(this.fromdata).then(res => {
                console.log(res);
                if(res.code == 0) {
                    window.open(res.data,'_blank')
                }else {
                    this.$confirm(`请确定上传文件是否正确？`); 
                }
            })
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      beforeUpload(file, fileList){
          console.log('dssd',file)
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xlsx'
            var bool = false;
            if(extension){
                let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fromdata = fd
                console.log(fd);
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
          console.log('dssd',file)
          if(!this.fromdata.append){
                    this.$refs.uploadExcel.clearFiles();
                    this.$confirm(`请先选择第一个文件!`); 
                    
                    return false
            }
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xlsx'
            var bool = false;
            if(extension){
                this.fromdata.append('resfile',file.raw);//传文件
                bool = true;
            } else{
              bool = false;
            }
            if(!extension) {
              this.$confirm(`上传文件只能是xlsx格式!`); 
            }
            return bool;
      },
     
      submitUpload() {
        this.$refs.uploadExcel.submit();
      },
      
      uploadSuccess(response, file, fileList){
        // console.log(response);
        if(response.code == 0) {
          this.$message.success(`生成成功！！！`);
          window.open(response.data,'_blank')
        }
        this.$refs.uploadExcel.clearFiles()
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

