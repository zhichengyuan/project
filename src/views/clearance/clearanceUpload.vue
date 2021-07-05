<template>
      <!-- <Main></Main> -->
      <div class="box">
            <div class="block">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://trans.eytonex.com/api/trans/getzip"
                :before-upload="beforeUpload"
                :file-list="fileList"
                accept=".xls,.xlsx" 
                :limit="1"
                :on-success='uploadSuccess'
                :auto-upload="false">
                <template #trigger>
                  <el-button size="small" type="primary">选取文件</el-button>
                </template>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到海关</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    只能上传 excel 文件
                  </div>
                </template>
              </el-upload>
            </div>
       </div>
</template>

<script>


export default {
  name: 'clearance',
  data() {
      return {
      }
  },
  created(){
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
              this.$confirm(`上传文件只能是xlsx格式!`); 
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
        }else{
          this.$message.warning(`上传失败！！！`);
        }
        this.$refs.upload.clearFiles()
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

