<template>
  <div class="refund">
    <div class="content">
      <div class="part">
        <div>
          <h1>{{i18n.$t('网站注意事项：')}}</h1>
          <span
            >
           <div>{{i18n.$t('1.海方弘景提供的物流服务都是真实有效的，努力全力维护到全行业最公平合理的价格分享给广大支持者，海方弘景将跨境电商物流可视化，透明化进行到底！')}}</div>
            <div>{{i18n.$t('2.正常情况下货物计泡情况：计费重量=体积（cm³）/5000；具体请以海方弘景最新价格表为准；')}}</div>
           <div>{{i18n.$t('3.走货渠道的注意事项，以海方弘景官方说明为主；部分大件货物或者偏远地区将会产生额外费用；')}}</div>
           <div>{{i18n.$t('4.快件签收后由于收件人拒付目的地进口关税的情况，导致关税直接确认到发件人账单的，则由发件人全额承担；追诉期为发件日起6个月内；')}}</div>
           <div>{{i18n.$t('5.有关任何关税产生海方弘景不提供税单，但保证税金的真实性；特别是发件人付关税的，需要特别注意；')}}</div>
           <div>{{i18n.$t('6.海方弘景的价格表如需可联系客服提供；')}}</div>
           <div>{{i18n.$t('7.其他注意事项有需要咨询的请联系本公司工作人员，谢谢您的关注！')}}</div>
            </span
          >
        </div>
        <div style="margin:45px 0;" @click="$router.back(-1)"><i class="el-icon-back" style="font-size:50px"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "../../i18nPlugin";
export default {
 setup() {
      const i18n = useI18n();
      return {
        i18n,
      };
    }

}
</script>

<style lang="scss" scoped>
.refund {
  position: relative;
  background-color: #fff;
  .content {
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    max-width: 1500px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 30px;
    margin: 0 auto;
    .part {
      h1 {
        font-weight: 700;
        margin: 10px 0 10px;
      }
      div {
        font-size: 18px;
        text-align: left ;
      }
    }
  }
}
</style>
