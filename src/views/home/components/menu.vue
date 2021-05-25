<template>
  <div class="home-menu">
      <div class="logo" @click="$router.push('/')">
          <img src="../../../assets/img/logo.png" alt="">
      </div>
      <div class="menu">
          <!-- <span @click="$router.push('/logQuery')">{{i18n.$t('物流查询')}}</span> -->
          <!-- <span>{{i18n.$t('Pricing')}}  </span>
          <span>{{i18n.$t('Resources')}}  </span>
          <span>{{i18n.$t('About Us')}}  </span>  -->
          <span  @click="switchLanguage"> CH/RU  </span>
      </div>
      <!-- <div class="menu-icon" @click="drawer = true">
          <img class="icon" src="../../../assets/img/menu.png" alt="">
      </div> -->
      <!-- <div class="menubox" v-if="drawer"> -->
          <!-- <div class="chcel" @click="onClick">
              <img src="../../../assets/img/chcel.png" alt="">
          </div> -->
        <!-- <p> -->
                <!-- <span @click="$router.push('/logQuery')">{{i18n.$t('物流查询')}}</span> -->
          <!-- </p> -->
          <!-- <p>
          <span>{{i18n.$t('Pricing')}}  </span>
          </p>
          <p>
          <span>{{i18n.$t('Resources')}}  </span>
          </p>
          <p>
          <span>{{i18n.$t('About Us')}}   </span>
          </p>  -->
          <!-- <p>
          <span @click="switchLanguage"> CH/RU  </span>
          </p>
      </div> -->
  </div>
</template>

<script>
 import { useI18n } from "../../../i18nPlugin";
export default {
    setup() {
      const i18n = useI18n();

      const switchLanguage = () => {
          console.log('点击事件',i18n.locale.value)
        const locale = i18n.locale.value === "en" ? "zh" : "en";
        i18n.locale.value = locale;

      };

      return {
        i18n,
        switchLanguage,
       
      };
    },
    
    data(){
        return {
            drawer:false,
        }
    },
    methods:{
        onClick() {
            this.drawer = !this.drawer;
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/menu/pc.scss';
@import '@/assets/css/menu/pro.scss';
@import '@/assets/css/menu/ipad.scss';
@import '@/assets/css/menu/phone.scss';
@import '@/assets/css/menu/mini.scss';
</style>