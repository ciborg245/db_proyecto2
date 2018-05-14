<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Sucursales Fresh
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px">
      <div class="container">
        <div class="box" v-show="!isLoading">
          <router-link :to="{ name: 'StoreNewEdit'}" class="button is-primary">Agregar</router-link>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Departamento</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="store in stores">
                <td> {{store.id}}  </td>
                <td> {{store['id_depto']}} </td>
                <td> {{store.direccion}} </td>
                <td style="text-align: right">
                  <p class="field">
                    <a class="button is-danger" @click="confirmDelete(store.id)">
                                      <span class="icon">
                                          <i class="fa fa-trash-o"></i>
                                      </span>
                    </a>

                    <router-link class="button is-warning"
                                 :to="{name: 'StoreNewEdit', query: { 'storeId': store.id}}">
                                      <span class="icon">
                                          <i class="fa fa-pencil-square-o"></i>
                                      </span>
                    </router-link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
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
      </div>
    </section>
    <loader :is-loading="isLoading"/>
    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea eliminar esta sucursal?"
                   @accept="deleteStore"
                   @cancel="cancelConfirm"/>
  </div>
</template>
<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'Stores',

    components: {
      FormCheckbox,
      FormInput,
      ConfirmModal,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        stores: [],
        states: [],
        currentPage: 1,
        totalPages: 0,
        notificationMessage: null,
        isLoading: false,
        showConfirm: false,
        toDelete: null,
        confirmMsg: null
      }
    },

    methods: {
      gotoNew: function () {
        this.$router.push({name: 'NewStore'})
      },
      gotoStore: function (id) {
        this.$router.push({ name: 'Store', query: {store: id} })
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      loadData: function () {
        this.stores = []
        return this.$store.dispatch('states_get')
          .then((states) => {
            this.states = states
            return this.$store.dispatch('stores_get')
          })
          .then((tiendas) => {
            this.totalPages = Math.ceil(tiendas.length / 25)
            for (let i = 0; i < tiendas.length; i++) {
              for (const state of this.states) {
                if (state.id === tiendas[i]['id_depto']) {
                  tiendas[i]['id_depto'] = state.nombre
                }
              }
              if (i > (this.currentPage - 1) * 25 && i < this.currentPage * 25) {
                this.stores.push(tiendas[i])
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
      confirmDelete: function (id) {
        this.toDelete = id
        this.showConfirm = true
      },
      deleteStore: function (id) {
        this.showConfirm = false
        return this
          .$store.dispatch('store_delete', {
            storeId: this.toDelete
          })
          .then(() => {
            this.toDelete = null
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
