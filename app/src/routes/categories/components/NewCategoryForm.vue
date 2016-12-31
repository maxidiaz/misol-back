<template>
<pop-up-window :show="showWindow">
    <div class="container">
        <form class="new-variety-form" id="newCategory" v-on:submit="accept">
            <h3>Nueva Categor&iacute;a</h3>
            <div class="row">
                <div class="col-xs-12 text-left">
                    <label>Nombre</label>
                    <input type="text" v-model="categoryName" name="name" placeholder="Ingrese nombre..." class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 text-left">
                    <label>Precio por docena</label>
                    <input type="number" v-model="categoryPrice" name="name" placeholder="$" class="form-control"/>
                </div>
            </div>
            <div class="row bottom-buttons">
                <div class="col-xs-12">
                    <button type="button" class="button btn-default" name="cancel" v-on:click="cancel">CANCELAR</button>
                    <button type="button" class="button btn-primary" name="accept" v-on:click="accept">ACEPTAR</button>
                </div>
            </div>
    </div>
    </form>
</pop-up-window>
</template>

<script>
import PopUpWindow from '../../../components/PopUpWindow.vue'
import Category from '../../../models/Category'
import Utils from '../../../utils/Utils'

export default {
    name: 'new-category-form',
    props: ['categoryToUpdate'],
    data() {
        return {
            showWindow: true,
            categoryName: '',
            categoryPrice: 0
        }
    },
    created () {
      if (this.categoryToUpdate) {
        this.categoryName = this.categoryToUpdate.name
        this.categoryPrice = this.categoryToUpdate.price
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
        const self = this
        if (this.categoryPrice) {
          if (!this.categoryToUpdate) {
            const newCategory = {
                name: Utils.upperCaseFirstLetter(this.categoryName),
                price: this.categoryPrice
            }
            this.$displayDialog('¿Estás seguro?', 'Se guardará una nueva variedad ' + newCategory.name + '.', function () {
              Category.save(newCategory, (rps) => {
                  let categoryRps = rps.body.data
                  categoryRps.path = Utils.toKebabCase(categoryRps.name)
                  self.showWindow = false
                  self.$emit('popupWindowClose')
                  self.$emit('categorySaved', categoryRps)
              })
            }, true)
          } else {
            if (this.categoryToUpdate.name == Utils.upperCaseFirstLetter(this.categoryName) && this.categoryToUpdate.price == this.categoryPrice){
              this.showWindow = false
              this.$emit('popupWindowClose')
            }else {
              this.categoryToUpdate.name = Utils.upperCaseFirstLetter(this.categoryName)
              this.categoryToUpdate.price = this.categoryPrice
              this.$displayDialog('¿Estás seguro?','Se actualizarán los datos de la variedad ' +  this.categoryToUpdate.name, function() {
                Category.update(self.categoryToUpdate, (rps) => {
                    let categoryRps = rps.body.data
                    categoryRps.path = Utils.toKebabCase(categoryRps.name)
                    self.showWindow = false
                    self.$emit('popupWindowClose')
                    self.$emit('categoryUpdated', categoryRps)
                })
              },true)
            }
          }
        } else {
            this.$displayDialog('Ojo!', 'No creo que los sanguches sean gratis <br><img style="display: block; margin: 0 auto" src="/assets/awesome-face.png" />')
        }
      }
    },
    components: {
      PopUpWindow
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
    left: 0;
    right: 0;
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
