<template lang="html">
  <div class="container">
    <router-menu :menuItems="menuItems"></router-menu>
  </div>
</template>

<script>
import RouterMenu from '../../components/RouterMenu.vue'
import moment from 'moment'

export default {
  name: 'statistics-menu',
  data () {
    return {
      menuItems: [{
        name: 'Resumen del día',
        path: '/statistics/daily/' + moment.utc().format()
      },{
        name: 'Resumen en fecha',
        path: '/statistics/stats-on-date'
      }]
    }
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {
    RouterMenu
  }
}
</script>

<style lang="css">
</style>
