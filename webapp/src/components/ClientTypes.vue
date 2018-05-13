<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Tipos de clientes Fresh
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px" v-show="!isLoading">
      <div class="container">
        <div class="box">
          <div class="field is-grouped is-grouped-centered has-addons">
            <p class="control">
              <router-link class="button is-info is-rounded" :to="{ name: 'ClientTypesNewEdit' }">
                <span class="icon is-small"> <i class="fa fa-plus"></i> </span>
                <span>Agregar cliente</span>
              </router-link>
            </p>
          </div>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descuento %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="type in types">
                <td>{{type.id}}</td>
                <td>{{type.nombre}}</td>
                <td>{{type.descuento}}</td>

                <td style="text-align: right">
                  <p class="field">
                    <a class="button is-danger" @click="confirmDelete(type.id)">
                                      <span class="icon">
                                          <i class="fa fa-trash-o"></i>
                                      </span>
                    </a>

                    <router-link class="button is-warning"
                                 :to="{name: 'ClientTypesNewEdit', query: { 'typeId': type.id}}">
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
      </div>
    </section>
    <loader :is-loading="isLoading"/>
    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea eliminar este tipo de cliente?"
                   @accept="deleteClient"
                   @cancel="cancelConfirm"/>
  </div>
</template>
<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'dashboard',

    components: {
      FormCheckbox,
      FormInput,
      ConfirmModal,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        types: [],
        notificationMessage: null,
        isLoading: false,
        showConfirm: false,
        toDelete: null,
        confirmMsg: null
      }
    },

    // Metodos de la Webapp
    // ExecuteQuery, manda la query actual al sevidor y espera la respuesta
    // CheckIfDrop, chequea si hay un DROP TABLE y pregunta si realmente quiere eliminar la tabla
    methods: {
      gotoNew: function () {
        this.$router.push({name: 'NewClient'})
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      loadData: function () {
        this.types = []
        return this.$store.dispatch('client_types')
          .then((types) => {
            this.types = types
          })
      },
      confirmDelete: function (id) {
        this.toDelete = id
        this.showConfirm = true
      },
      deleteClient: function () {
        this.showConfirm = false
        return this
          .$store.dispatch('client_type_delete', {
            typeId: this.toDelete
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
