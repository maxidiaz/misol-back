<template lang="html">
  <div class="container">
    <div class="row padding16 relative" style="padding-top: 0">
      <p class="paid-indicator" v-if="order.paid">Pago</p>
      <h2 class="title-detail">{{order.name}}</h2>
      <div v-if="order.status != 'done'" class="status-color dropdown-toggle" id="order-status" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown"
          :class="{
            pending: order.status === 'pending',
            'in-progress': order.status === 'inProgress',
            finished: order.status === 'finished'
          }"></div>
          <ul class="dropdown-menu option-menu" aria-labelledby="order-status">
            <li v-if="order.status !== 'pending'"><a v-on:click="changeOrderStatus('pending')">Pendiente<div class="status-color pending"></div></a></li>
            <li v-if="order.status !== 'inProgress'"><a v-on:click="changeOrderStatus('inProgress')">En proceso<div class="status-color in-progress"></div></a></li>
            <li v-if="order.status !== 'finished'"><a v-on:click="changeOrderStatus('finished')">Terminado<div class="status-color finished"></div></a></li>
          </ul>
    </div>
    <div class="row padding16">
      <h4 class="subtitle-order-detail">Sandwiches</h4>
      <template v-for="variety in order.varieties" v-if="order.varieties.length">
        <div class="sandwich-list-item">
          <span>{{variety.name}}</span>
          <span class="badge">{{getQuantity(variety)}}</span>
        </div>
      </template>
    </div>
    <div>
      <h4 class="subtitle-order-detail">Direcci&oacute;n</h4>
      <div class="card no-margin">
        <span>{{order.address}}</span>
      </div>
    </div>
    <div>
      <h4 class="subtitle-order-detail">Fecha y hora de entrega</h4>
      <div class="card no-margin">
        <div class="text-left">
          <strong>Fecha: </strong><span>{{date}}</span>
        </div>
        <div class="text-left" style="margin-top:8px">
          <strong>Hora: </strong><span>{{time}} hs.</span>
        </div>
      </div>
    </div>
    <div v-if="order.note != ''">
      <h4 class="subtitle-order-detail">Nota</h4>
      <div class="card no-margin">
          <span>{{order.note}}</span>
      </div>
    </div>
    <div>
      <h4 class="subtitle-order-detail">Total</h4>
      <div class="card no-margin">
        <p><strong style="font-size: 24px">${{order.price}}</strong></p>
        <hr>
        <p class="text-left"><strong>Abona: </strong><span>${{order.pay}}</span></p>
        <p class="text-left"><strong>Vuelto: </strong><span>${{order.pay - order.price}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import Orders from '../../../models/Orders'
import moment from 'moment'

export default {
  name: 'order-detail',
  data () {
    return {
      order: '',
      date: '',
      time: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    Orders.find(to.params.id, response => {
      const order = response.body[0]
      next(vm => {
        const datetime = moment(order.datetime)
        vm.order = order
        vm.date = datetime.format('DD/MM/YYYY')
        vm.time = datetime.format('HH:mm')
      })
    })
  },
  methods: {
    changeOrderStatus (status) {
      const self = this
      this.order.status = status
      Orders.update(this.order, response => {
        self.order.status = response.body.data.status
      })
    },
    getQuantity (variety) {
      let quantity = ''
      if (variety.count >= 12) {
        if (variety.count % 12 !== 0) {
          quantity = Math.floor(variety.count / 12) + ' doc. ' + variety.count % 12 + ' uni.'
        } else {
          quantity = variety.count / 12 + ' docenas'
        }
      } else {
        quantity = variety.count + ' unidades'
      }
      return quantity
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  padding-bottom: 16px;
}

.sandwich-list-item {
  background-color: #FFF;
  padding: 18px;
  border-bottom: 1px solid #CCC;
  text-align: left;
  font-size: 18px;
}

.sandwich-list-item .badge {
  background-color: #337ab7;
  font-size: 18px;
}

.title-detail {
  margin: 0 auto;
}

.dropdown-menu li{
  padding: 4px 15px 4px 0;
}

.sandwich-list-item .badge {
  float: right;
}

.subtitle-order-detail {
  text-align: left;
  font-weight: bold;
  margin: 20px 0 8px 0;
}

.status-color {
  width: 60px;
  height: 30px;
  position: absolute;
  right: 16px;
  top: 0;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 2px #CCC;
}

ul .status-color {
  width: 10px;
  height: 10px;
  display: inline-block;
  position: static;
  margin-left: 10px;
  border-radius: 50%;
}

.option-menu {
  left: inherit;
  right: 16px;
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

.relative {
  position: relative;
}

.card span, .card strong {
  font-size: 18px;
}

.paid-indicator {
  position: absolute;
  left: 20px;
  font-size: 18px;
  margin: 0;
  font-weight: bolder;
  padding: 4px 15px;
  background: white;
  border: 1px solid #CCC;
  border-radius: 11px;
  box-shadow: 0 3px 3px #CCC;
}
</style>
