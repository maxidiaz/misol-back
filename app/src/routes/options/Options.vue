<template lang="html">
  <div class="container">
    <search-bar :data="options" field="name" v-on:search="onSearch"></search-bar>
    <template v-for="option in options" v-if="option.length != 0">
      <div class="card" v-on:click="optionSelected(option)">
        <p class="title">{{option.name}}</p>
      </div>
    </template>
  </div>
</template>

<script>
import OptionsBus from './OptionsBus'
import SearchBar from '../../components/SearchBar.vue'

export default {
  name: 'options',
  data () {
    return {
      options: []
    }
  },
  computed: {},
  created () {
    this.options = this.$route.query.options
  },
  methods: {
    optionSelected (option) {
      OptionsBus.$emit('optionSelected', option)
      this.$router.back()
    },
    onSearch (options) {
      this.options = options
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style lang="css">
</style>
