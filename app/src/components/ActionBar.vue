<template>
<nav class="navbar navbar-inverse navbar-misol">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <transition name="slide">
        <a v-if="noHome" class="back-btn-container" v-on:click="goBack"><img src="assets/back-icon.png" class="back-btn"/></a>
      </transition>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li v-on:click="hideCollapse" v-if="noHome">
          <router-link to="/">Home</router-link>
        </li>
        <template v-for="item in menuItems">
            <li v-on:click="hideCollapse">
              <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </template>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import config from '../config'

export default {
  name: 'action-bar',
  data () {
    return {
      menuItems: config.homeMenu,
      noHome: true
    }
  },
  computed: {
    noHome: function () {
      return (this.$route.path != '/')
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    hideCollapse () {
      $('#myNavbar').collapse('hide')
    }
  },
  created () {
  }
}
</script>



<style>
.back-btn-container {
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}

.back-btn {
  width: 30px;
  height: 30px;
}
</style>
