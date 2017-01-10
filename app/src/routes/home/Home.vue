<template>
<div class="container">
  <router-menu :menuItems="menuItems"></router-menu>
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

<style>
</style>
