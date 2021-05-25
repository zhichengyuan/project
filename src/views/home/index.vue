<template>
  <div class="home">
     
      <Main></Main>
      
  </div>
</template>

<script>


import Main from './components/main'



export default {
  name: 'Home',
  components:{Main},
  

}
</script>
<style lang="scss">
.home {
  min-height: 544px;
  min-width: 200px;
  position: relative;
  overflow: hidden;
}


</style>

