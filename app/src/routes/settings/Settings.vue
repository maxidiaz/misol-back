<template lang="html">
  <div class="container">
    <div class="row row-settings">
      <div class="col-xs-10 text-left settings-title-wrapper">
        <label for="showToast" class="settings-title">Mostrar Toast</label>
      </div>
      <div class="col-xs-2">
        <v-switch v-model="config.showToast"></v-switch>
      </div>
    </div>
  </div>
</template>

<script>
import VSwitch from '../../components/VSwitch.vue'

import Configuration from '../../config'
export default {
  name: 'settings',
  data () {
    return {
      config: Configuration
    }
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {
    VSwitch
  }
}
</script>

<style lang="css" scoped>
.row-settings {
  margin-left: 0;
  margin-right: 0;
  padding-bottom: 20px;
  border-bottom: 1.5px solid #AAA;
}

.settings-title {
  font-size: 20px;
}

.settings-title-wrapper {
  line-height: 20px;
}

.btn-save {
  width: 100%;
  background: #337ab7 ;
  font-size: 20px;
  color: #FFF;
}
</style>
