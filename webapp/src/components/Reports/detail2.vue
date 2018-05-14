<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Clientes nuevos
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px" v-show="!isLoading">
      <div class="container">
        <div class="box">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Clientes nuevos este mes</th>
                <th>Clientes nuevos este año</th>
                <th>Cantidad de clientes en total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="state in states">
                <td> {{state['departamentos_nombre']}} </td>
                <td> {{state['new_clients_month']}} </td>
                <td> {{state['new_clients_year']}} </td>
                <td> {{state['total_clients']}} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <loader :is-loading="isLoading"/>
  </div>
</template>
<script>
  import Loader from '@/components/common/Loader'
  export default {
    name: 'dashboard',

    components: {
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        states: [],
        isLoading: false,
        confirmMsg: null
      }
    },

    methods: {
      loadData: function () {
        this.states = []
        return this.$store.dispatch('detalle2_get')
          .then((states) => {
            this.states = states
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
