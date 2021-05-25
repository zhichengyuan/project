<template>
  <div>
    <div class="container" id="page">
      <div id="header">
        <div id="logo">
          <div class="title">{{ i18n.$t("物流查询") }}</div>
        </div>
      </div>
      <div id="content">
        <div class="rsform">
          <el-form
            :model="logNumForm"
           ref='log'
            label-width="150px"
            class="demo-ruleForm"
           
          >
            <el-form-item :label="i18n.$t('物流编号')"  >
              <el-input
                v-model="logNumForm.logNum"
              ></el-input>
              <el-button
                type="primary"
                @click="submitForm(logNumForm)"
                >{{ i18n.$t("确定") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 物流信息展示 -->
      <div class="logShow" v-if="logInfo.length > 0">
        <h2>{{ i18n.$t("物流节点") }}</h2>

        <el-steps
          direction="vertical"
          :active="active"
          finish-status="success"
          v-if="logInfo.length > 0"
          :space="80"
              style="padding-left: 125px;"
        >
          <el-step
            :title="item.track_location"
            :description='item.track_content+item.track_createdate'
            v-for="(item, index) in logInfo"
            :key="index"
          >
             <slot>
               <div>{{item.track_content}}</div>
             </slot>
          
          </el-step>
        </el-steps>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Logistics } from "@/api/log";
import { useI18n } from "../../i18nPlugin";
import { ref,reactive, } from 'vue';
import { ElMessage } from 'element-plus'
let moment = require("moment");
// 中文简体
moment.locale("zh");
export default {
  setup() {
    const i18n = useI18n();
    const logInfo = ref([])
    const active = ref(0)
    let logNumForm = reactive({
      logNum:''
    })
    const submitForm=(logNumForm, table) =>{
 
        if (logNumForm.logNum) {
          var req = { documentCode: logNumForm.logNum.toString()};
            Logistics(req).then((res) => {
             
              console.log(res[0],'数据')
                if(res[0].message){
                    ElMessage.error(res[0].message);
                }else{
                   logInfo.value = res[0].data[0].trackDetails.reverse()
                   active.value = logInfo.value.length-1
                   
                }
            });
        } else {
          ElMessage.error(i18n.$t('单号不能为空') )
        }
    }
    return {
      i18n,
      logInfo,
      submitForm,
      active,
      logNumForm,
     
    };
  },

  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" >
@import "@/assets/css/log/pc.scss";
@import "@/assets/css/log/pro.scss";
@import "@/assets/css/log/ipad.scss";
@import "@/assets/css/log/phone.scss";
@import "@/assets/css/log/mini.scss";
</style>
