<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Crédito por departamento
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
                <th>Crédito mínimo</th>
                <th>Crédito máximo</th>
                <th>Crédito promedio</th>
                <th>Cantidad de clientes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="state in states">
                <td> {{state['departamentos_nombre']}} </td>
                <td> {{state.min}} </td>
                <td> {{state.max}} </td>
                <td> {{state.avg}} </td>
                <td> {{state.count}} </td>
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

    data () {
      return {
        states: [],
        notificationMessage: null,
        isLoading: false
      }
    },

    methods: {
      loadData: function () {
        this.states = []
        return this.$store.dispatch('detalle1_get')
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
