<template>
  <div id="orders" class="container">
    <order-list :orders="orders"></order-list>
  </div>
</template>

<script>
import OrderList from './orderList/OrderList.vue'
import BlockUI from '../../utils/BlockUI'
import Orders from '../../models/Orders'

export default {
  name: 'orders',
  beforeRouteEnter (to, from, next) {
    BlockUI.showSpinner()
    Orders.list({noDone: true}, response => {
        console.log(response)
        BlockUI.hideSpinner()
        const orders = response.body.data
        next(vm => {
          vm.orders = orders
        })
      })
  },
  data () {
    return {
      orders: []
    }
  },
  sockets: {
    newOrder (order) {
      this.orders.push(order)
    },
    updateOrderStatus (data) {
      this.orders.forEach((o, i) => {
        if (data.order == o._id) {
          o.status = data.status
        }
      })
    },
    deleteOrder (orderId) {
      const self = this
      this.orders.forEach((o, i) => {
        if (orderId == o._id) {
          self.orders.splice(i, 1)
        }
      })
    }
  },
  components: {
    OrderList
  },
  onBackAction () {
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
