<template lang="html">
  <div class="daily-status-container container">
    <h3 v-if="dateSelected">{{dateSelected}}</h3>
    <h4 class="subtitle">Pedidos entregados:</h4>
    <order-list :readOnly="true" :orders="orders"></order-list>
    <h4 class="subtitle">Total vendido:</h4>
    <div class="card">
      <p class="no-margin"><strong style="font-size: 24px">${{total}}</strong></p>
    </div>
  </div>
</template>

<script>
import OrderList from '../orders/orderList/OrderList.vue'
import Orders from '../../models/Orders'
import moment from 'moment'
import BlockUI from '../../utils/BlockUI'

export default {
  name: 'daily-status',
  beforeRouteEnter (to, from, next) {
    if (to.params.date) {
      BlockUI.showSpinner()
      Orders.listByDate({
        date: moment.utc(to.params.date).format(),
        status: 'done'
      }, response => {
        console.log(response)
        BlockUI.hideSpinner()
        const orders = response.body
        next(vm => {
          vm.orders = orders
        })
      })
    }
  },
  data () {
    return {
      orders: []
    }
  },
  computed: {
    total: function () {
      return this.orders.reduce((prev, order) => {
        console.log(order)
        return prev + order.price
      }, 0)
    },
    dateSelected: function () {
      const today = moment.utc()
      const date = moment.utc(this.$route.params.date)
      if(today.date() == date.date() && today.month() == date.month() && today.year() == date.year()) {
        return false
      } else {
        return date.format('DD/MM/YYYY')
      }
    }
  },
  methods: {},
  components: {
    OrderList
  },
  onBackAction () {
    this.$router.push('/statistics')
  }
}
</script>

<style lang="css">
.subtitle {
  text-align: left;
  font-weight: bold;
  margin: 20px 0;
}

.daily-status-container {
  padding-bottom: 15px;
}
</style>
