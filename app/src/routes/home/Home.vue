<template>
<div class="container">
  <router-menu :menuItems="menuItems"></router-menu>
</div>
</template>

<script>
import RouterMenu from '../../components/RouterMenu.vue'
import config from '../../config.js'

export default {
  name: 'home',
  data () {
    return {
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
