<template>
<div class="container">
  <router-menu :menuItems="menuItems"></router-menu>
  <div class="madeby">
    <p>Hecho por Maxi <img src="/assets/awesome-face.png" alt=""></p>
    <p style="margin-top: 20px">Versión 1.0.1</p>
  </div>
</div>
</template>

<script>
import RouterMenu from '../../components/RouterMenu.vue'
import config from '../../config.js'
import Authentication from '../../utils/Authentication'
import BlockUI from '../../utils/BlockUI'

export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    BlockUI.showSpinner()
    Authentication.isUserLoggedIn(user => {
      BlockUI.hideSpinner()
      next(vm => {
        vm.user = user
      })
    }, () => {
      BlockUI.hideSpinner()
      next({
        path: '/login'
      })
    })
  },
  data () {
    return {
      user: {},
      menuItems: config.homeMenu
    }
  },
  components: {
    RouterMenu
  },
  created () {}
}
</script>

<style scoped>
.madeby {
  margin-top: 500px;
  font-size: 16px;
}

.madeby img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
</style>
