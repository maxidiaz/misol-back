<template>
<div>
  <transition-group name="list" tag="a">
    <a v-on:click="goToRoute(item)" v-for="item in menuItems" :key="item.path">
      <div class="card">
        <div v-if="item.options && item.options.length" v-on:click.stop="toggleDropdown($event)" class="order-options dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span v-on:click.stop="toggleDropdown($event)">°°°</span>
        </div>
        <ul class="dropdown-menu option-menu">
          <li v-for="option in item.options" v-on:click.stop="onOptionClick(option)"><a>{{option.text}}</a></li>
        </ul>
        <h3><img v-if="item.icon" :src="item.icon" alt="">{{item.name}}</h3>
      </div>
    </a>
  </transition-group>
</div>
</template>

<script>
export default {
  name: 'router-menu',
  props: ['menuItems'],
  data () {
    return {}
  },
  methods: {
    goToRoute (item) {
      this.$router.push({
        path: item.path,
        query: item.params
      })
    },
    toggleDropdown (e) {
      /* eslint-disable */
      let $dropdownEl = $(e.target).closest('.dropdown-toggle')
      $dropdownEl.dropdown('toggle')
      /* eslint-enable */
    },
    onOptionClick (option) {
      option.callback()
    }
  }
}
</script>

<style>
.order-options {
  position: absolute;
  right: 0;
  top: 0;
  height: 50%;
  padding: 14px 14px 30px 16px;
  color: #000;
  z-index: 20;
}

.option-menu {
  position: absolute;
  right: 16px;
  left: inherit;
  top: 30px;
  padding: 8px;
}

.option-menu li {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
