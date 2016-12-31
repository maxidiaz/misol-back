<template lang="html">
  <div class="input-group">
      <input type="text" class="form-control search-bar-input" v-model="searchInput" placeholder="Buscar ..." v-on:input="search">
      <span class="input-group-btn">
        <button class="btn btn-default search-btn" type="button">
          <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
      </span>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  props: ['data', 'field'],
  data () {
    return {
      searchInput: '',
      originalData: []
    }
  },
  created () {
    this.originalData = this.data
  },
  methods: {
    search (event) {
      const self = this
      const filtered = this.originalData.filter(x => (x[self.field].toLowerCase()).indexOf(self.searchInput.toLowerCase()) !== -1)
      console.log(filtered)
      this.$emit('search', filtered)
    }
  },
  components: {}
}
</script>

<style lang="css">
.search-bar-input {
  height: 40px;
}

.search-btn {
  border: none;
  background: white;
  height: 40px;
}
</style>
