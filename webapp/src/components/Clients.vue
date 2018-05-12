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
          <FormInput label="Nombre"/>
          <FormCheckbox label="Ordenar por nombre"/>
          <div class="control">
              <button class="button is-success">Aplicar</button>
          </div>
        </div>
        <div class="box">
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
        clients: [
          {
            id: 1,
            name: 'Cliente X',
            email: 'clientex@panito.fresh',
            gender: 'F',
            phone: '2333-6471',
            birthdate: '12-05-84',
            credit: 12.0
          }],
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
      gotoClient: function (id) {
        this.$router.push({ name: 'Client', query: {id: id} })
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      loadData: function () {
        this.clients = []
        return this.$store.dispatch('clients_get')
          .then((clientes) => {
            this.clients = clientes
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
