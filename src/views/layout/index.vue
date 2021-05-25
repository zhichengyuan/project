<template>
  <Menu></Menu>
  <Header></Header>
  <LogInfo/>
  <router-view />
  <Footer></Footer>
</template>
<script>
import { provideI18n } from "../../i18nPlugin";
import Header from "../../views/home/components/header";
import Menu from "../../views/home/components/menu";

import Footer from "../../views/home/components/footer";
import LogInfo from "../../views/logQuery/index";

export default {
  components: { Header,  Footer, Menu,LogInfo },
};
</script>

<style lang="scss">
</style>
