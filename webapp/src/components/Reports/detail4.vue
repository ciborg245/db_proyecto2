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
                <th>Edad máxima</th>
                <th>Crédito promedio</th>
                <th>Producto favorito</th>
                <th>Cantidad de clientes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in reports">
                <td> {{report['age_interval']}} </td>
                <td> {{report['avg']}} </td>
                <td> {{report['productos_nombre']}} </td>
                <td> {{report['clientes']}} </td>
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
    name: 'detail4',

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

    // Metodos de la Webapp
    // ExecuteQuery, manda la query actual al sevidor y espera la respuesta
    // CheckIfDrop, chequea si hay un DROP TABLE y pregunta si realmente quiere eliminar la tabla
    methods: {
      loadData: function () {
        this.states = []
        return this.$store.dispatch('detalle4_get')
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
