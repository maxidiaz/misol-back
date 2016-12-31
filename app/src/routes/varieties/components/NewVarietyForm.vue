<template>
<pop-up-window :show="showWindow">
  <div class="container">
    <form class="new-variety-form" id="newVariety" v-on:submit="accept">
      <h3>Nueva variedad</h3>
      <div class="row" v-if="selectedCategory">
        <div class="col-xs-12 text-left">
          <label>Categor&iacute;a</label>
          <p>{{selectedCategory.name | upperCaseFirstLetter}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-left">
          <label>Nombre de nueva variedad</label>
          <input type="text" v-model="varietyName" name="name" placeholder="Ingrese nombre..." class="form-control"/>
        </div>
      </div>
      <div class="row bottom-buttons">
        <div class="col-xs-12">
          <button type="button" class="button btn-default" name="cancel" v-on:click="cancel">CANCELAR</button>
          <button type="button" class="button btn-primary" name="accept" v-on:click="accept">ACEPTAR</button>
        </div>
      </div>
    </form>
  </div>
</pop-up-window>

</template>

<script>
import PopUpWindow from '../../../components/PopUpWindow.vue'
import Variety from '../../../models/Variety'
import UpperCaseFilter from '../../../directives/UpperCaseFilter'
import Utils from '../../../utils/Utils'

export default {
  name: 'new-variety-form',
  props: ['selectedCategory'],
  data () {
    return {
      showWindow: true,
      varietyName: ''
    }
  },
  events: {
    'showForm': () => {}
  },
  methods: {
    cancel () {
      this.showWindow = false
      this.$emit('popupWindowClose')
    },
    accept (event) {
      event.preventDefault()
      const newVariety = {
        name: Utils.upperCaseFirstLetter(this.varietyName),
        category: this.selectedCategory
      }
      Variety.save(newVariety, (variety) => {
        this.showWindow = false
        this.$emit('popupWindowClose')
        this.$emit('varietySaved', variety)
      })
    }
  },
  components: {
    PopUpWindow
  },
  filters: {
    upperCaseFirstLetter: UpperCaseFilter
  }
}
</script>

<style>
.row {
  padding-top: 20px;
}
.new-variety-form {
  min-height: 100%;
}
.bottom-buttons {
  position: absolute;
  bottom: 20px;
  left:0;
  right:0;
}
.button {
  width: 45%;
  padding: 10px;
  border: none;
  color: #000;
  box-shadow: 0px 3px 3px #888;
}
.btn-primary {
  color: white;
}
.btn-default {
  color: #337ab7;
}
</style>
