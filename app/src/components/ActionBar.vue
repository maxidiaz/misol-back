<template>
<nav class="navbar navbar-inverse navbar-misol">
  <div class="container-fluid">
    <div class="navbar-header">
      <button v-if="showHamburguer" type="button" class="navbar-toggle" v-on:click="toggleSideMenu">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <transition name="slide">
        <a v-if="noHome" class="back-btn-container" v-on:click="goBack"><img src="assets/back-icon.png" class="back-btn"/></a>
        <a v-if="!noHome" class="back-btn-container" v-on:click="logout"><span class="glyphicon glyphicon-log-out logout-btn"></span></a>
      </transition>
    </div>
    <div class="side-menu-container" :class="{'visibleContainer': sideMenuVisible}" v-on:click="toggleSideMenu">
      <div class="side-menu" :class="{'visible': sideMenuVisible}">
        <ul class="nav navbar-nav">
          <li class="user-row">
            <img :src="currentUser.photoURL" class="profile-avatar" alt="">
            <span>{{currentUser.displayName}}</span>
          </li>
          <li v-if="noHome" class="side-menu-option" v-on:touchstart="onOptionTouchStart($event)" v-on:touchend="onOptionTouchEnd($event)">
            <router-link to="/" v-on:click="toggleSideMenu">Home</router-link>
          </li>
          <template v-for="item in menuItems">
              <li class="side-menu-option" v-on:touchstart="onOptionTouchStart($event)" v-on:touchend="onOptionTouchEnd($event)">
                <router-link :to="item.path" v-on:click="toggleSideMenu">{{item.name}}</router-link>
              </li>
          </template>
        </ul>
        <div class="logout-side-menu-btn" v-on:click="logout">
          <span>Cerrar sesión</span>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import config from '../config'
import Auth from '../utils/Authentication'
import BlockUI from '../utils/BlockUI'
import {actionBarBus} from './ActionBarUtils'

let goBackAction

export default {
  name: 'action-bar',
  data () {
    return {
      currentUser: {},
      menuItems: config.homeMenu,
      sideMenuVisible: false
    }
  },
  computed: {
    noHome: function () {
      return (this.$route.path != '/')
    },
    showHamburguer () {
      return this.$route.path !== '/signup'
    }
  },
  mounted () {
    const self = this
    actionBarBus.$on('loggedUser', user => {
      self.currentUser = user
    })
    actionBarBus.$on('backAction', action => {
      goBackAction = action
    })
  },
  methods: {
    goBack () {
      if (goBackAction) {
        console.log('goBackAction');
        goBackAction()
      } else {
        this.$router.back()
      }
    },
    logout () {
      const self = this
      this.$displayDialog('¿Estás seguro?', 'Confirma que desea cerrar sesión.', () => {
        Auth.logOut(() => {
          self.$router.push('/login')
        })
      }, () => {})
    },
    toggleSideMenu () {
      this.sideMenuVisible = !this.sideMenuVisible
    },
    onOptionTouchStart (e) {
      let optionEl = e.target
      if (e.target.nodeName.toUpperCase() == 'A') {
        optionEl = e.target.parentNode
      }
      optionEl.style.background = '#CCC'
    },
    onOptionTouchEnd (e) {
      let optionEl = e.target
      if (e.target.nodeName.toUpperCase() == 'A') {
        optionEl = e.target.parentNode
      }
      optionEl.style.background = 'none'
    },
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

.logout-btn {
  font-size: 23px;
  color: white;
}

.navbar-nav {
  margin: 0;
  height: calc(100% - 70px);
  overflow: scroll;
}

.user-row {
  padding: 25px;
  padding-left: 40px;
  text-align: left;
  background: #F8F8F8;
  box-shadow: 0px 6px 8px 0px #CCC;
  margin-bottom: 14px;
  font-size: 20px;
  font-weight: bold;
}

.user-row .profile-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 30px;
}

.logout-side-menu-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 0;
  background: #CCC;
  border-top: 2px solid #AAA;
  font-size: 18px;
  font-weight: bold;
}

.side-menu-option {
  font-size: 18px;
  padding: 8px 0;
}

.side-menu {
  transition: right .2s ease;
  position: fixed;
  width: 75%;
  background: #EEEEEE;
  right: -75%;
  height: 100%;
  z-index: 9999999;
}

.side-menu.visible {
  right: 0%;
}

.side-menu-container {
  position: fixed;
  opacity: 0;
  transition: opacity .5s ease;
  top: 0;
  bottom: 0;
  left: 100vw;
  right: 0;
  background: rgba(0,0,0,0.8);
  z-index: 9999999;
}

.side-menu-container.visibleContainer {
  display: block;
  left: 0;
  opacity: 1;
}
</style>
