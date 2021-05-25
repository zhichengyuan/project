<template>
  <Menu></Menu>
  <Header></Header>
  <LogInfo/>
  <router-view />
  <Footer></Footer>
</template>
<script>
import { provideI18n } from "./i18nPlugin";
import Layout from "./views/layout";

export default {
  components: { Layout },
  setup() {
    provideI18n({
      locale: "zh", //表示默认的语言 修改全局locale值可以导入message中不同的包
      messages: {
        zh: require("./lang/zh").messages, // 中文语言包
        en: require("./lang/en").messages, // 俄语语言包
      },
    });
  },
};
</script>

<style lang="scss">
@import "assets/initial/base.css";
#app {

}
</style>
