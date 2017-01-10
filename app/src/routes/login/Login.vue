<template>
  <div class="container">
    <div class="img-container">
      <img src="/assets/appicon.png" alt="">
    </div>
    <div class="card">
      <div class="row inputs-row">
        <input type="email" v-model="user.email" class="form-control" placeholder="E-mail"/>
      </div>
      <div class="row inputs-row">
        <input type="password" v-model="user.password" class="form-control" placeholder="Password"/>
      </div>
      <div class="row inputs-row">
        <button type="button" v-on:click="login" class="btn btn-primary btn-signup">INGRESAR</button>
      </div>
      <div class="separator-row">
        <div class="col-xs-5 or-separator separator-col"></div>
        <div class="col-xs-2 separator-col">
          <span style="font-size: 16px">o</span>
        </div>
        <div class="col-xs-5 or-separator separator-col"></div>
      </div>
      <div class="row">
        <router-link :to="{path: '/signup'}" class="signup-link">Creá tu cuenta</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Authentication from '../../utils/Authentication'

export default {
  name: 'login',
  data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
  },
  computed: {},
  created() {},
  methods: {
    login () {
      const self = this
      this.$showSpinner()
      Authentication.logIn(this.user, loggedUser => {
        console.log(loggedUser)
        self.$hideSpinner()
        self.$router.push('/')
      }, (error) => {
        self.$hideSpinner()
        self.$displayDialog('No se pudo iniciar sesión', 'Verificá los datos ingresados.')
      })
    }
  },
  components: {}
}
</script>

<style lang="css" scoped>
.img-container {
  margin: 50px auto;
}

.img-container img {
  box-shadow: 4px 4px 4px #CCC, -4px 4px 4px #CCC;
  border-radius: 10px;
}

.inputs-row {
  margin: 12px 0px 0 0px;
}

.btn-signup {
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.separator-row {
  padding-top: 20px;
  padding-bottom: 20px;
}

.separator-col {
  height: 20px;
}

.or-separator {
  margin-top: 10px;
  height: 1px;
  line-height: 1px;
  background-color: #AAAAAA;
}

.signup-link, .signup-link:visited, .signup-link:hover {
  font-size: 16px;
  color: #000;
}
</style>
