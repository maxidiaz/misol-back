<template lang="html">
    <div class="container">
      <div class="row card">
          <h3 class="text-left title-sandwiches">Nombre:</h3>
          <input type="text" class="form-control" v-model="order.name"/>
      </div>
      <div class="row card">
          <h3 class="text-left title-sandwiches">Sandwiches:</h3>
          <template v-for="variety in order.varieties" v-if="order.varieties.length">
            <div class="sandwich-list-item">
              <span>{{variety.name}}</span>
              <span class="badge">{{getQuantity(variety)}}</span>
              <span class="remove-sandwich" v-on:click="removeVariety(variety)">&times;</span>
            </div>
          </template>
          <div class="card add-sandwich-button" v-on:click="selectVariety">
            <span>Agregar sandwich</span>
          </div>
      </div>
      <count-input-modal :current-variety="currentVariety" v-if="showQuantities" v-on:quantitySelected="onQuantitySelected"></count-input-modal>
      <div class="row card">
          <h3 class="text-left title-sandwiches">Dirección:</h3>
          <input type="text" class="form-control" v-model="order.address"/>
      </div>
      <div class="row card">
          <h3 class="text-left title-sandwiches">Entrega:</h3>
          <div class="form-group">
            <label for="date-entrega" style="float:left">Fecha</label>
            <input id="date-entrega" type="date" class="form-control" v-model="date"/>
          </div>
          <div class="form-group">
            <label for="time-entrega" style="float:left">Hora</label>
            <input id="time-entrega" type="time" class="form-control" style="margin-top:15px" v-model="time"/>
          </div>
      </div>
      <div class="row card">
        <h3 class="text-left title-sandwiches">Nota:</h3>
        <textarea class="form-control" v-autogrow style="height:40px;overflow:hidden;resize:none" v-model="order.note"></textarea>
      </div>
      <div class="row card">
        <h3 class="text-left title-sandwiches">Abona:</h3>
        <input type="text" class="form-control" v-model="order.pay">
      </div>
      <div class="row card">
          <p class="total-text">
            Total: ${{total}}
          </p>
          <p v-if="payBack && total > 0" class="payBack">
            Vuelto: ${{payBack}}
          </p>
      </div>
      <div class="card add-sandwich-button" v-on:click="saveOrder">
        <span>Guardar</span>
      </div>
    </div>
</template>

<script>
import Variety from '../../../models/Variety'
import OptionsBus from '../../options/OptionsBus'
import Orders from '../../../models/Orders'
import Autogrow from '../../../directives/Autogrow'
import CountInputModal from '../../../components/CountInputModal.vue'
import moment from 'moment'
import FCMHelper from '../../../utils/FCMHelper'
import config from '../../../config'

export default {
  name: 'new-order',
  data () {
    return {
      showQuantities: false,
      currentVariety: {},
      date: '',
      time: '',
      order: {
        name: '',
        varieties: [],
        address: '',
        datetime: '',
        price: '',
        note: '',
        pay: '',
        paid: false
      }
    }
  },
  computed: {
    total: function () {
      return this.order.varieties.reduce((prev, sandwich) => {
        return prev + sandwich.count * sandwich.category.price / 12
      }, 0)
    },
    payBack: function () {
      return this.order.pay !== 0 && this.order.pay >= this.total ? this.order.pay - this.total : ''
    }
  },
  created () {
    this.date = moment(moment.now()).format('YYYY-MM-DD')
    OptionsBus.$on('optionSelected', this.onVarietySelected)
  },
  methods: {
    selectVariety () {
      const self = this
      Variety.list(response => {
        self.$router.push({
          path: '/options',
          query: {
            options: response.body.data
          }
        })
      })
    },
    onVarietySelected (variety) {
      this.currentVariety = variety
      this.showQuantities = true
    },
    onQuantitySelected (variety) {
      let cVarietyIndex = -1
      const cVariety = this.order.varieties.find((v, index) => {
        if (v._id === variety._id) {
          cVarietyIndex = index
        }
        return v._id === variety._id
      })
      if (cVariety) {
        this.order.varieties[cVarietyIndex].count += variety.count
      } else {
        this.order.varieties.push(variety)
      }
      this.showQuantities = false
    },
    removeVariety (variety) {
      this.order.varieties.splice(this.order.varieties.indexOf(variety), 1)
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
    },
    saveOrder () {
      const self = this
      this.order.price = this.total
      this.order.datetime = moment(this.date + ' ' + this.time).toDate()
      this.order.status = 'pending'
      Orders.save(this.order, response => {
        //self.$socket.emit('new-order', response.body.data)
        self.$router.push('/orders')
        FCMHelper.sendNotification()
      })
    }
  },
  directives: {
    Autogrow
  },
  components: {
    CountInputModal
  }
}
</script>

<style lang="css" scoped>
.add-sandwich-button {
  background-color: #337ab7;
  color: white;
  font-size: 20px;
  padding: 10px;
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

.title-sandwiches {
  padding: 0;
  margin: 0;
  margin-bottom: 15px;
}

.total-text {
  margin: 0;
  font-size: 35px;
}

.payBack {
  font-size: 17px;
  margin-top: 5px;
}

.remove-sandwich {
  float: right;
  font-weight: bolder;
  font-size: 25px;
  line-height: 25px;
}
</style>
