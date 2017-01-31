<template lang="html">
  <div class="container">
    <div class="" v-if="!recents.length">
      <h3>Todavía no se usó la aplicación para nada.</h3>
      <h3>Mal ahí eh!</h3>
      <img src="/assets/sad.png" alt="" style="margin-top: 50px">
    </div>
    <div class="card" v-if="recents.length" v-for="recent in recents" v-on:click="handleClick(recent)">
      <img v-if="recent.user" :src="recent.user.photoURL" class="profile-avatar">
      <span class="from-now-text">{{fromNow(recent.date)}}</span>
      <div class="transaction-text-container">
        <p>{{recent.message}}</p>
      </div>
    </div>
    <div v-if="showMoreBtn" class="btn-show-more" v-on:click="showMore">
      <span>Ver más</span>
    </div>
  </div>
</template>

<script>
import Recent from '../../models/RecentTransactions'
import BlockUI from '../../utils/BlockUI'
import moment from 'moment'

export default {
  name: 'recent-transactions',
  beforeRouteEnter (from, to, next) {
    BlockUI.showSpinner()
    Recent.list({page: 0},recent => {
      BlockUI.hideSpinner()
      next(vm => {
        vm.recents = recent.data.data
      })
    })
  },
  data () {
    return {
      page: 0,
      recents: [],
      showMoreBtn: true
    }
  },
  computed: {},
  mounted () {},
  methods: {
    handleClick (transaction) {
      const actionParts = transaction.action.split('-')
      const action = actionParts[0]
      const actionTarget = actionParts[1]

      switch (actionTarget) {
        case 'CATEGORY':
          if (action != 'REMOVE') {
            this.$router.push('/categories')
          }
          break
        case 'ORDER':
          if (action != 'REMOVE') {
            this.$router.push('/orders/detail/' + transaction.actionId)
          }
          break
      }
    },
    fromNow (date) {
      return moment(date).fromNow()
    },
    showMore () {
      const self = this
      BlockUI.showSpinner()
      this.page++
      Recent.list({page: this.page},recent => {
        if (recent.data.data.length < 10) {
          self.showMoreBtn = false
        }
        BlockUI.hideSpinner()
        for (let i=0; i < recent.data.data.length; i++) {
          self.recents.push(recent.data.data[i])
        }
      })
    }
  },
  components: {},
  onBackAction () {
    this.$router.push('/statistics')
  }
}
</script>

<style lang="css" scoped>
.card {
  padding: 14px;
}

.profile-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
}

.transaction-text-container {
  display: inline-block;
  font-size: 16px;
  margin-top: 8px;
  width: 75%;
  text-align: left;
  line-height: 15px;
}

.from-now-text {
  display: block;
  position: absolute;
  right: 6px;
  bottom: 6px;
  font-size: 11px;
}

.btn-show-more {
  width:100%;
  background-color: #337ab7;
  padding: 10px;
  color: white;
  margin-bottom: 16px;
}
</style>
