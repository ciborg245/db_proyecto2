<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Sucursales por departamento
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
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="state in states">
                <td> {{state.nombre}} </td>
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
    name: 'resumen1',

    components: {
      Loader
    },

    data () {
      return {
        states: [],
        isLoading: false
      }
    },

    methods: {
      loadData: function () {
        this.states = []
        return this.$store.dispatch('resumen1_get')
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
