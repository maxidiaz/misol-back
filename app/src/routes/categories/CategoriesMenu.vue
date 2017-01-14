<template>
<div id="categories-menu" class="container">
  <div v-if="!categories.length">
    <p>
      Todav&iacute;a no existe ninguna categor&iacute;a.
    </p>
    <p>
      Puede agregar categor&iacute;as con el bot&oacute;n (+) en la parte inferior derecha de la pantalla.
    </p>
  </div>
  <router-menu :menuItems="categories" v-if="categories.length"></router-menu>
  <add-button @click="showNewCategoryForm" class="add-btn"></add-button>
  <new-category-form
      :categoryToUpdate="categoryToUpdate"
       v-if="showNewCategory"
       v-on:popupWindowClose="onPopupWindowClose"
       v-on:categoryUpdated="categoryUpdated"
       v-on:categorySaved="categorySaved">
  </new-category-form>
</div>
</template>

<script>
import Category from '../../models/Category'
import RouterMenu from '../../components/RouterMenu.vue'
import AddButton from '../../components/AddButton.vue'
import NewCategoryForm from './components/NewCategoryForm.vue'
import Utils from '../../utils/Utils'
import BlockUI from '../../utils/BlockUI'
import ActionBarUtils from '../../components/ActionBarUtils'

export default {
  name: 'categories-menu',
  data () {
    return {
      showNewCategory: false,
      categoryToUpdate: false,
      categories: []
    }
  },
  sockets: {
    newCategory (category) {
      this.categories.push(category)
    },
    updatedCategory (category) {
      console.log(category)
      const self = this
      this.categories.forEach((c,i) => {
        if (c._id == category._id) {
          normalizeCategory(category, self)
          self.categories.splice(i, 1, category)
        }
      })
    },
    deleteCategory (categoryId) {
      const self = this
      this.categories.forEach((c,i) => {
        if (c._id == categoryId) {
          self.categories.splice(i, 1)
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    BlockUI.showSpinner()
    Category.list(response => {
      const categories = response.body.data
      next(vm => {
        BlockUI.hideSpinner()
        categories.map(category => {
          normalizeCategory (category, vm)
        })
        vm.categories = categories
      })
    })
  },
  mounted () {
  },
  components: {
    RouterMenu,
    AddButton,
    NewCategoryForm
  },
  methods: {
    showNewCategoryForm () {
      this.categoryToUpdate = false
      this.showNewCategory = true
    },
    onPopupWindowClose () {
      this.showNewCategory = false
    },
    categorySaved (category) {
      normalizeCategory (category, this)
      this.categories.push(category)
      this.$showToast('Categoría guardada con éxito')
    },
    categoryUpdated (category) {
      this.$showToast('Categoría actualizada correctamente')
    },
    updateCategory (category) {
      this.categoryToUpdate = category
      this.showNewCategory = true
    },
    deleteCategory (category) {
      const self = this
      this.$displayDialog('¿Estás seguro?', 'La categoría ' + category.name + ' será eliminada. Esta acción no se puede revertir.', () => {
        self.$showSpinner()
        Category.remove(category._id, response => {
          self.$hideSpinner()
          self.categories.splice(self.categories.indexOf(category), 1)
          self.$socket.emit('delete-category', category._id)
          self.$showToast('Categoría ' + category.name + ' eliminada.')
        })
      }, true)
    }
  },
  onBackAction () {
    this.$router.push('/')
  }
}

function normalizeCategory (category, vm) {
  category.options = [{
    text: 'Editar',
    callback: () => {
      vm.updateCategory(category)
    }
  },{
    text: 'Eliminar',
    callback: () => {
      vm.deleteCategory(category)
    }
  }]
  category.path = '/varieties/' + category._id
}
</script>

<style>
#categories-menu p {
  font-size: 22px;
  padding: 16px;
}
.card {
  border: 1px solid #CCC;
  padding: 20px;
  box-shadow: 0px 3px 3px #CCC;
  border-radius: 5px;
  margin: 20px auto;
  background-color: white;
}

.title {
  font-size: 20px;
  text-align: left;
  margin: 0;
}

.cardContent {
  text-align: left;
}

.cardContent span {
  margin-left: 15px;
}
</style>
