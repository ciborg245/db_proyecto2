<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Productos Fresh
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px" v-show="!isLoading">
      <div class="container">
        <div class="box">
          <div class="field">
            <label class="label">Filtrar por categoría</label>
            <div class="control">
              <div class="select">
                <select v-model="category" place-holder="Todos">
                  <option>Todos</option>
                  <option>dulce</option>
                  <option>salado</option>
                  <option>especial</option>
                  <option>agridulce</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field is-grouped is-grouped-left">
            <div class="control">
                <button class="button is-success" @click="applyFilters">Aplicar</button>
            </div>
          </div>


        </div>
        <div class="box">
          <router-link :to="{ name: 'ProductNewEdit', }" class="button is-primary"> Agregar </router-link>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td> {{product.id}} </td>
                <td> {{product.name}} </td>
                <td> {{product.price}} </td>
                <td> {{product.category}} </td>
                <td style="text-align: right">
                  <p class="field">
                    <a class="button is-danger" @click="confirmDelete(product.id)">
                                      <span class="icon">
                                          <i class="fa fa-trash-o"></i>
                                      </span>
                    </a>

                    <router-link class="button is-warning"
                                 :to="{name: 'ProductNewEdit', query: { 'productId': product.id}}">
                                      <span class="icon">
                                          <i class="fa fa-pencil-square-o"></i>
                                      </span>
                    </router-link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="pagination" role="navigation" aria-label="pagination">
          <a class="pagination-previous"
            v-show="currentPage > 1"
            @click="gotoPreviousPage">Anterior</a>
          <a class="pagination-next"
            @click="gotoNextPage"
            v-show="currentPage < totalPages">
            Siguiente</a>
          <ul class="pagination-list">
            <li v-for="page in totalPages">
              <a class="pagination-link"
              aria-label="Page 1"
              aria-current="page"
              :class="{'is-current': currentPage === page}"
              @click="gotoPage(page)">{{page}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <loader :is-loading="isLoading"/>
    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea eliminar este producto?"
                   @accept="deleteProduct"
                   @cancel="cancelConfirm"/>
  </div>
</template>
<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'Products',

    components: {
      FormCheckbox,
      FormInput,
      ConfirmModal,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        products: [],
        notificationMessage: null,
        currentPage: 1,
        totalPages: 1,
        category: null,
        isLoading: false,
        showConfirm: false,
        toDelete: null,
        confirmMsg: null
      }
    },
    computed: {
      categoryIsSet: function () {
        return this.category !== null
      }
    },
    methods: {
      gotoProduct: function (id) {
        this.$router.push({ name: 'ProductNewEdit', query: {product: id} })
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      loadData: function () {
        this.products = []
        return this.$store.dispatch('products_get')
          .then((products) => {
            this.totalPages = Math.ceil(products.length / 25)
            for (let i = 0; i < products.length; i++) {
              if (i >= ((this.currentPage - 1) * 25) && i < this.currentPage * 25) {
                this.products.push(products[i])
              }
            }
          })
      },
      gotoNextPage: function () {
        this.currentPage++
        this.isLoading = true
        return this.loadData()
          .then(() => {
            this.isLoading = false
          })
      },
      gotoPreviousPage: function () {
        this.currentPage--
        this.isLoading = true
        return this.loadData()
          .then(() => {
            this.isLoading = false
          })
      },
      gotoPage: function (num) {
        this.currentPage = num
        this.isLoading = true
        return this.loadData()
          .then(() => {
            this.isLoading = false
          })
      },
      applyFilters: function () {
        let data = {}
        if (this.categoryIsSet) {
          if (this.category !== 'Todos') data.category = this.category
        }
        this.isLoading = true
        return this.$store.dispatch('products_get', data)
          .then((products) => {
            this.totalPages = Math.ceil(products.length / 25)
            for (let i = 0; i < products.length; i++) {
              if (i >= ((this.currentPage - 1) * 25) && i < this.currentPage * 25) {
                this.products.push(products[i])
              }
            }
          })
          .then(() => {
            this.isLoading = false
          })
      },
      confirmDelete: function (id) {
        this.toDelete = id
        this.showConfirm = true
      },
      deleteProduct: function (id) {
        this.showConfirm = false
        return this
          .$store.dispatch('product_delete', {
            productId: this.toDelete
          })
          .then((res) => {
            console.log(res)
            this.toDelete = null
            this.showConfirm = false
            return this.loadData()
          })
          .catch(err => {
            console.log(err)
            // this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      }
    },
    created: function () {
      this.isLoading = true
      return this.loadData()
        .then(() => {
          this.isLoading = false
        })
    }
  }
</script>

<style lang="scss" scoped>
</style>
