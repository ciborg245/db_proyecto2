<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Detalle de crédito por tipo de cliente
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
                <th>Tipo de cliente</th>
                <th>Crédito promedio</th>
                <th>Crédito mínimo</th>
                <th>Crédito máximo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in reports">
                <td> {{report['tipo_nombre']}} </td>
                <td> {{report['avg']}} </td>
                <td> {{report['min']}} </td>
                <td> {{report['max']}} </td>
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
    name: 'detail3',

    components: {
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        reports: [],
        isLoading: false,
        confirmMsg: null
      }
    },

    methods: {
      loadData: function () {
        this.states = []
        return this.$store.dispatch('detalle3_get')
          .then((reports) => {
            this.reports = reports
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
