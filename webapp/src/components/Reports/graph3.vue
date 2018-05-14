<template>
  <div>
    <section class="hero is-danger is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Reportes Fresh
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px" v-show="!isLoading">
      <div class="container">
        <div class="box">
<!--  genero -->
          <div class="field">
            <label class="label">Género</label>
            <div class="control">
              <div class="select is-rounded">
                <select v-model="gender">
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Ambos</option>
                </select>
              </div>
            </div>
          </div>
<!--  edad minima -->
          <div class="field">
            <label class="label">Edad desde: </label>
            <div class="control">
              <input class="input" type="number" placeholder="Ingrese la edad mínima" v-model="minAge">
            </div>
          </div>
<!--  edad maxima -->
          <div class="field">
            <label class="label">Edad hasta: </label>
            <div class="control">
              <input class="input" type="number" placeholder="Ingrese la edad máxima" v-model="maxAge">
            </div>
          </div>

          <div class="field">
            <label class="label">Crédito mínimo: </label>
            <div class="control">
              <input class="input" type="number" placeholder="Ingrese el crédito mínimo" v-model="minCredit">
            </div>
          </div>

          <div class="field">
            <label class="label">Crédito máximo: </label>
            <div class="control">
              <input class="input" type="number" placeholder="Ingrese el crédito máximo" v-model="maxCredit">
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-info" @click="makeReport">Ver reporte</button>
            </div>
          </div>

        </div>
        <div v-if="!isLoading">
            <BarChart :width="640" :height="160" :chart-data="chartData" :options="chartOptions"/>
        </div>

      </div>
    </section>
    <loader :is-loading="isLoading"/>
  </div>
</template>
<script>
  import BarChart from '@/components/common/BarChart'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'

  export default {
    name: 'dashboard',

    components: {
      FormInput,
      BarChart,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        gender: null,
        minAge: null,
        maxAge: null,
        minCredit: null,
        maxCredit: null,
        chartData: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        },
        popularStates: [],
        notificationMessage: null,
        isLoading: false
      }
    },

    // Metodos de la Webapp
    // ExecuteQuery, manda la query actual al sevidor y espera la respuesta
    // CheckIfDrop, chequea si hay un DROP TABLE y pregunta si realmente quiere eliminar la tabla
    methods: {
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
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
      },
      makeReport: function () {
        this.isLoading = true
        let gender
        switch (this.gender) {
          case 'Masculino':
            gender = 'm'
            break
          case 'Femenino':
            gender = 'f'
            break
        }
        const data = {
          gender: gender || 'a',
          minAge: this.minAge || 0,
          maxAge: this.maxAge || 1000,
          minCredit: this.minCredit || 0,
          maxCredit: this.maxCredit || 500
        }
        this.favoriteProducts = []
        return this.$store.dispatch('report3_get', data)
          .then((states) => {
            if (states.length > 0) {
              this.popularStates = states
              return this.setChartData()
            }
            return
          })
          .then(() => {
            this.isLoading = false
          })
      },
      setChartData: function () {
        const chartData = {
          labels: [],
          datasets: []
        }

        const data = []

        for (const dataset of this.popularStates) {
          chartData.labels.push(dataset['departamentos_nombre'])
          data.push(dataset.count)
        }

        chartData.datasets.push(
          {
            label: 'Cantidad de clientes en ese intervalo',
            data: data,
            backgroundColor: 'cornflowerblue',
            borderColor: 'white',
            borderWidth: 1
          }
        )

        this.chartData = chartData
      }
    },
    created: function () {
    }
  }
</script>

<style lang="scss" scoped>
</style>
