<template lang="html">
  <div class="">
    <datepicker v-on:dateSelected="goToDate"></datepicker>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from '../../components/Datepicker.vue';

export default {
  data () {
    return {
      date: ''
    }
  },
  computed: {},
  methods: {
    goToDate (dateSelected) {
      this.$router.push('/statistics/daily/' + moment.utc(dateSelected).format())
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style lang="css">
</style>
