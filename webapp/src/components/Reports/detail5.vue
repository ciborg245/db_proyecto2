<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Productos nuevos
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
                <th>Categoría</th>
                <th>Mes anterior</th>
                <th>Año anterior</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in reports">
                <td> {{report['categoria']}} </td>
                <td> {{report.lastMonth}} </td>
                <td> {{report.lastYear}} </td>
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
        return this.$store.dispatch('detalle5_get')
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
