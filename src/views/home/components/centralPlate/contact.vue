<template>
  <div class='contect'>
    <div class="content-block">
      <div class="left-info">
        <div class="title">{{i18n.$t('联系我们')}}</div>
        <div class="desc">{{i18n.$t('您有任何问题，请与我们联系')}}service@benelife.ru</div>
      </div>
      <div class="right-info">
        <div class="input">
          <div class="title">{{i18n.$t('邮箱')}}</div>
          <input type="text" placeholder="Your email address" />
        </div>
        <div class="input">
          <div class="title">{{i18n.$t('信息')}}</div>
          <textarea type="text" placeholder="Type here" />
        </div>
        <div class="btn">
          <div class="btn-submit">{{i18n.$t('提交')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "../../../../i18nPlugin";
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
@import '@/assets/css/contact/pc.scss';
@import '@/assets/css/contact/pro.scss';
@import '@/assets/css/contact/ipad.scss';
@import '@/assets/css/contact/phone.scss';
@import '@/assets/css/contact/mini.scss';
</style>