<template>
<div id="app">
  <action-bar></action-bar>
  <transition name="slide-fade" mode="out-in">
  <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  </transition>
  <transition name="slide-fade" mode="out-in">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
import ActionBar from './components/ActionBar.vue'

export default {
  name: 'app',
  sockets: {
    newOrder (newOrder) {
      const self = this
      const Notification = window.Notification
      /* eslint-disable no-new */
      const notification = new Notification('Nuevo pedido', {
        data: newOrder
      })
      notification.onclick = event => {
        self.$router.push('/orders')
        notification.close()
      }
    }
  },
  components: {
    ActionBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.card{
  border: 1px solid #CCC;
  padding: 20px;
  box-shadow: 0px 3px 3px #CCC;
  border-radius: 5px;
  margin: 20px auto;
  background-color: white;
  position: relative;
}

.add-btn{
  position: fixed;
  bottom: 30px;
  right: 30px;
}

.form-control {
  border: none;
  box-shadow: none;
  border-bottom: 3px solid #CCC;
  font-size: 22px;
}

.form-control:focus {
  border: none;
  box-shadow: none;
  border-bottom: 3px solid #337ab7;
}

.padding16 {
  padding: 0 16px !important ;
}

.margin16 {
  margin: 0 16px !important ;
}

.no-margin {
  margin: 0 !important;
}

a:hover {
  text-decoration: none;
}

.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-enter{
  transform: translateX(100px);
  opacity: 0;
}
</style>
