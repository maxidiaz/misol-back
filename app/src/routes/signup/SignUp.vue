<template lang="html">
  <div class="container">
    <div class="card">
      <div class="row">
        <input type="email" v-model="user.email" class="form-control"/>
      </div>
      <div class="row">
        <input type="password" v-model="user.password" class="form-control"/>
      </div>
      <div class="row">
        <button type="button" v-on:click="signup" class="btn btn-primary">CREAR USUARIO</button>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../../utils/Authentication'

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {},
  mounted () {},
  methods: {
    signup () {
      Auth.signUp(this.user)
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
