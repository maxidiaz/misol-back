<template lang="html">
  <div class="">
    <div v-if="orders.length == 0">
      <h3>No hay ning&uacute;n pedido por el momento</h3>
      <img src="/assets/sad.png" alt="" style="margin-top: 50px">
    </div>
    <transition-group name="list" tag="div">
      <div class="card" v-on:click="seeDetails(order._id, $event)" v-for="order in orders" v-if="orders.length != 0" :key="order._id">
        <div class="status-color"
            :class="{
              pending: order.status === 'pending',
              'in-progress': order.status === 'inProgress',
              finished: order.status === 'finished'
            }"></div>
        <p class="title">{{order.name}}</p>
        <div v-on:click.stop="toggleDropdown($event)" class="order-options dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span v-on:click.stop="toggleDropdown($event)">°°°</span>
        </div>
        <ul class="dropdown-menu option-menu">
          <li v-on:click.stop="removeOrder(order)"><a>Eliminar</a></li>
          <li v-on:click.stop="finishOrder(order)" v-if="!readOnly"><a>Finalizar</a></li>
        </ul>
        <div class="note-icon" v-if="order.note">
          <img src="assets/note_icon.png" alt="" class="img-responsive">
        </div>
      </div>
    </transition-group>
    <router-link to="/orders/new" v-if="!readOnly">
      <add-button class="add-variety-btn"></add-button>
    </router-link>
  </div>
</template>

<script>
import AddButton from '../../../components/AddButton.vue'
import Orders from '../../../models/Orders'
import Authentication from '../../../utils/Authentication'

export default {
  name:'order-list',
  props: ['readOnly','orders'],
  data () {
    return {
    }
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
    removeOrder (order) {
      const self = this
      this.$displayDialog('¿Estás seguro?', 'El pedido se borrará para siempre. Este proceso no se puede revertir', () => {
        self.$showSpinner()
        Orders.remove(order, response => {
          self.$hideSpinner()
          self.orders.splice(self.orders.indexOf(order), 1)
          self.$socket.emit('delete-order', order._id)
        })
      }, function () {})
    },
    finishOrder (order) {
      const self = this
      this.$displayDialog('¿Estás seguro?', 'Al marcar el pedido como Finalizado se eliminará de la lista. Luego se podrá encontrar en el resumen del día', () => {
        const currentUser = Authentication.getCurrentUser()
        order.status = 'done'
        order.deliveredBy = currentUser
        console.log(order)
        Orders.update(order, response => {
          self.orders.splice(self.orders.indexOf(order), 1)
          self.$socket.emit('delete-order', order._id)
        })
      }, function () {})
    }
  },
}
</script>

<style lang="css" scoped>
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
  transition: background .3s ease;
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

.note-icon {
  width: 25px;
  position: absolute;
  right: 12px;
  bottom: 7px;
}

.option-menu {
  position: absolute;
  right: 16px;
  left: inherit;
  top: 30px;
  padding: 8px;
}
</style>
