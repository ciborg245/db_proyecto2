<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Clientes de Panito Fresh
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px" v-show="!isLoading">
      <div class="container">
        <div class="box">
          <FormInput type="text"
          label="Nombre" v-model="nameSearch"/>
          <FormCheckbox label="Ordenar por nombre"
          v-model="orderByName"/>
          <FormSelectWithSearch
            label="Filtrar por departamento"
            place-holder="Seleccione el departamento"
            v-model="state"
            :list="states"/>
            <FormSelectWithSearch
              label="Filtrar por tipo de cliente"
              place-holder="Seleccione el tipo de cliente"
              v-model="clientType"
              :list="clientTypes"/>
          <div class="control">
              <button class="button is-success" @click="applyFilters">Aplicar</button>
          </div>

        </div>
        <div class="box">
          <div class="field is-grouped is-grouped-centered has-addons">
            <p class="control">
              <router-link class="button is-info is-rounded" :to="{ name: 'ClientNewEdit' }">
                <span class="icon is-small"> <i class="fa fa-plus"></i> </span>
                <span>Agregar cliente</span>
              </router-link>
            </p>
          </div>
          <hr>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Género</th>
                <th>Teléfono</th>
                <th>Fecha de nacimiento</th>
                <th>Límite de crédito</th>
                <th>Departamento</th>
                <th>Tipo cliente</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients">
                <td> <a @click="gotoClient(client.id)">{{client.id}}</a>  </td>
                <td> {{client.firstName}} </td>
                <td> {{client.email}} </td>
                <td> {{client.gender}} </td>
                <td> {{client.phone}} </td>
                <td> {{client.birthdate}} </td>
                <td> {{client.credit}} </td>
                <td> {{client.state}} </td>
                <td> {{client.clientType}} </td>
                <td style="text-align: right">
                  <p class="field">
                    <a class="button is-danger" @click="confirmDelete(client.id)">
                                      <span class="icon">
                                          <i class="fa fa-trash-o"></i>
                                      </span>
                    </a>

                    <router-link class="button is-warning"
                                 :to="{name: 'ClientNewEdit', query: { 'clientId': client.id}}">
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
                   confirm-msg="¿Realmente desea eliminar este cliente?"
                   @accept="deleteClient"
                   @cancel="cancelConfirm"/>
  </div>
</template>
<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'Clients',

    components: {
      FormCheckbox,
      FormSelectWithSearch,
      FormInput,
      ConfirmModal,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        clients: [],
        states: [],
        clientTypes: [],
        currentPage: 1,
        totalPages: 0,
        nameSearch: null,
        clientType: null,
        state: null,
        notificationMessage: null,
        orderByName: false,
        isLoading: false,
        showConfirm: false,
        toDelete: null,
        confirmMsg: null
      }
    },

    computed: {
      nameSearchIsSet: function () {
        return this.nameSearch !== null
      },
      stateIsSet: function () {
        return this.state !== null
      },
      clientTypeIsSet: function () {
        return this.clientType !== null
      }
    },

    // Metodos de la Webapp para ver clientes
    methods: {
      gotoClient: function (id) {
        this.$router.push({ name: 'Client', query: {id: id} })
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      loadData: function () {
        return this.getStates()
          .then(() => {
            return this.getClientTypes()
          })
          .then(() => {
            return this.getClients()
          })
      },
      getStates: function () {
        return this.$store.dispatch('states_get')
          .then((states) => {
            this.states = []
            for (const state of states) {
              this.states.push(
                {
                  value: state.id,
                  text: state.nombre
                }
              )
            }
          })
      },
      getClientTypes: function () {
        return this.$store.dispatch('client_types')
          .then((types) => {
            for (const type of types) {
              this.clientTypes.push(
                {
                  value: type.id,
                  text: type.nombre
                }
              )
            }
          })
      },
      getClients: function () {
        this.clients = []
        return this.$store.dispatch('clients_get')
          .then((clientes) => {
            this.totalPages = Math.ceil(clientes.length / 25)
            for (let i = 0; i < clientes.length; i++) {
              for (const state of this.states) {
                if (state.value === clientes[i].state) {
                  clientes[i].state = state.text
                }
              }
              for (const type of this.clientTypes) {
                if (type.value === clientes[i].clientType) {
                  clientes[i].clientType = type.text
                }
              }
              if (i >= (this.currentPage - 1) * 25 && i < this.currentPage * 25) {
                this.clients.push(clientes[i])
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
      deleteClient: function () {
        this.showConfirm = false
        return this
          .$store.dispatch('client_delete', {
            clientId: this.toDelete
          })
          .then(() => {
            this.toDelete = null
            return this.loadData()
          })
          .catch(err => {
            console.log(err)
          })
      },
      applyFilters: function () {
        let data = {}
        if (this.nameSearchIsSet) data.nameSearch = this.nameSearch
        if (this.stateIsSet) data.state = this.state
        if (this.clientTypeIsSet) data.clientType = this.clientType
        if (this.orderByName) data.orderby = 'nombre'
        this.isLoading = true
        return this.$store.dispatch('clients_get', data)
          .then((clientes) => {
            this.totalPages = Math.ceil(clientes.length / 25)
            for (let i = 0; i < clientes.length; i++) {
              for (const state of this.states) {
                if (state.value === clientes[i].state) {
                  clientes[i].state = state.text
                }
              }
              for (const type of this.clientTypes) {
                if (type.value === clientes[i].clientType) {
                  clientes[i].clientType = type.text
                }
              }
              if (i >= (this.currentPage - 1) * 25 && i < this.currentPage * 25) {
                this.clients.push(clientes[i])
              }
            }
          })
          .then(() => {
            this.isLoading = false
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
