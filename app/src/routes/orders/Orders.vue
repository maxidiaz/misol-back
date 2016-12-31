<template>
  <div id="orders" class="container">
    <p v-if="orders.length == 0">
      No se ha realizado ning&uacute;n pedido a&uacute;n
    </p>
    <template v-for="order in orders" v-if="orders.length != 0">
      <div class="card" v-on:click="seeDetails(order._id, $event)">
        <div class="status-color"
            :class="{
              pending: order.status === 'pending',
              'in-progress': order.status === 'inProgress',
              finished: order.status === 'finished'
            }"></div>
        <p class="title">{{order.name}}</p>
        <div v-if="!readOnly" v-on:click.stop="toggleDropdown($event)" class="order-options dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span v-on:click.stop="toggleDropdown($event)">°°°</span>
        </div>
        <ul class="dropdown-menu option-menu">
          <li v-on:click.stop="finishOrder(order)"><a>Finalizar</a></li>
        </ul>
      </div>
    </template>
    <router-link to="/orders/new" v-if="!readOnly">
      <add-button class="add-variety-btn"></add-button>
    </router-link>
  </div>
</template>

<script>
import AddButton from '../../components/AddButton.vue'
import Orders from '../../models/Orders'

export default {
  name: 'orders',
  props: ['readOnly','ordersProp'],
  sockets: {
    newOrder (newOrder) {
      window.alert('Nuevo pedido: ' + newOrder)
      this.orders.push(newOrder)
    }
  },
  data () {
    return {
      orders: []
    }
  },
  watch: {
    ordersProp: function (val) {
      this.orders = val
    }
  },
  beforeRouteEnter (to, from, next) {
    Orders.list({noDone: true}, response => {
        console.log(response)
        const orders = response.body.data
        next(vm => {
          vm.orders = orders
        })
      })
  },
  components: {
    AddButton
  },
  created () {
  },
  methods: {
    seeDetails (id, e) {
      this.$router.push('/orders/detail/' + id)
    },
    toggleDropdown (e) {
      /* eslint-disable */
      let $dropdownEl = $(e.target).closest('.dropdown-toggle')
      $dropdownEl.dropdown('toggle')
      /* eslint-enable */
    },
    finishOrder (order) {
      const self = this
      this.$displayDialog('¿Estás seguro?', 'Al marcar el pedido como Finalizado se eliminará de la lista', () => {
        order.status = 'done'
        Orders.update(order, response => {
          self.orders.splice(self.orders.indexOf(order), 1)
        })
      }, function () {})
    }
  }
}
</script>

<style scoped>
.card{
  border: 1px solid #CCC;
  padding: 20px;
  box-shadow: 0px 3px 3px #CCC;
  border-radius: 5px;
  margin: 20px auto;
  background-color: white;
}

.title{
  font-size: 20px;
  text-align: left;
  margin: 0;
}

.cardContent{
  text-align: left;
}

.cardContent span{
  margin-left: 15px;
}

.add-variety-btn{
  position: fixed;
  bottom: 30px;
  right: 30px;
}

.status-color {
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
}

.pending {
  background: red
}

.in-progress {
  background: yellow
}

.finished {
  background: green
}

.order-options {
  position: absolute;
  right: 0;
  top: 0;
  height: 50%;
  padding: 14px 14px 30px 16px;
  z-index: 20;
}

.option-menu {
  position: absolute;
  right: 16px;
  left: inherit;
  top: 30px;
  padding: 8px;
}
</style>
