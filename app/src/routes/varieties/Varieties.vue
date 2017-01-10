<template>
  <div id="varieties" class="container">
    <div v-if="varieties.length == 0">
      <p>
        Todav&iacute;a no existe ninguna variedad para esta categor&iacute;a.
      </p>
      <p>
        Puede agregar nuevas variedades con el bot&oacute;n (+) en la parte inferior derecha de la pantalla.
      </p>
    </div>
    <transition-group name="list" tag="div">
        <div class="card" v-for="variety in varieties" v-if="varieties.length != 0" v-bind:key="variety._id">
          <p class="title">{{variety.name}}</p>
          <div class="item-options dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>°°°</span>
          </div>
          <ul class="dropdown-menu option-menu" aria-labelledby="dropdownMenu2">
            <li><a v-on:click="removeVariety(variety)">Borrar</a></li>
          </ul>
        </div>
    </transition-group>
    <add-button @click="showNewVarietyForm" class="add-btn"></add-button>
    <transition name="slide">
    <new-variety-form
     v-if="showNewVariety"
     :selectedCategory="selectedCategory"
     v-on:popupWindowClose="onPopupWindowClose"
     v-on:varietySaved="onVarietySaved">
     </new-variety-form>
  </transition>
  </div>
</template>

<script>
import Variety from '../../models/Variety'
import Category from '../../models/Category'
import AddButton from '../../components/AddButton.vue'
import NewVarietyForm from './components/NewVarietyForm.vue'
import Utils from '../../utils/Utils'
import BlockUI from '../../utils/BlockUI'

export default {
  name: 'varieties',
  data () {
    return {
      showNewVariety: false,
      varieties: [],
      selectedCategory: {}
    }
  },
  components: {
    AddButton,
    NewVarietyForm
  },
  beforeRouteEnter (to, from, next) {
    BlockUI.showSpinner()
    Category.findByName(Utils.upperCaseFirstLetter(to.params.variety), response => {
      const selectedCategory = response.body[0]
      Variety.listBy(selectedCategory._id, response => {
        BlockUI.hideSpinner()
        const varieties = response.body.data
        next(vm => {
          vm.selectedCategory = selectedCategory
          vm.varieties = varieties
        })
      })
    })
  },
  methods: {
    showNewVarietyForm () {
      this.showNewVariety = true
    },
    onVarietySaved (newVariety) {
      this.varieties.push(newVariety.body.data)
    },
    onPopupWindowClose () {
      this.showNewVariety = false
    },
    removeVariety (variety) {
      const self = this
      this.$displayDialog('¿Estás seguro?', 'Se eliminará la variedad ' + variety.name + ' para siempre. Este proceso no se puede revertir.', () => {
        self.$showSpinner()
        Variety.remove(variety._id, () => {
          self.$hideSpinner()
          self.varieties.splice(self.varieties.indexOf(variety), 1)
        })
      }, function(){})
    }
  },
  onBackAction () {
    this.$router.push('/categories')
  }
}
</script>

<style scoped>
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

.item-options {
  position: absolute;
  top: 15px;
  right: 15px;
}

.option-menu {
  top: 25px;
  right: 15px;
  left: auto;
  padding: 12px 0;
  float: none;
}
</style>
