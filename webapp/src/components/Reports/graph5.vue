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
    <section style="margin-top: 10px">
      <div class="container">
        <div class="box">
<!--  genero -->
          <div class="field">
            <label class="label">Intervalo de tiempo</label>
            <div class="control">
              <div class="select is-rounded">
                <select v-model="interval">
                  <option>dia</option>
                  <option>semana</option>
                  <option>mes</option>
                  <option>año</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-info" @click="makeReport">Ver reporte</button>
            </div>
          </div>

        </div>
        <div v-if="!isLoading">
            <LineChart :width="640" :height="160" :chart-data="chartData" :options="chartOptions"/>
        </div>

      </div>
    </section>
    <loader :is-loading="isLoading"/>
  </div>
</template>
<script>
  import LineChart from '@/components/common/LineChart'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'

  export default {
    name: 'dashboard',

    components: {
      FormInput,
      LineChart,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        interval: null,
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
        clients: [],
        notificationMessage: null,
        isLoading: false
      }
    },

    // Metodos de la Webapp
    // ExecuteQuery, manda la query actual al sevidor y espera la respuesta
    // CheckIfDrop, chequea si hay un DROP TABLE y pregunta si realmente quiere eliminar la tabla
    methods: {
      makeReport: function () {
        this.isLoading = true
        const data = {
          interval: this.interval
        }
        this.clients = []
        return this.$store.dispatch('report5_get', data)
          .then((clients) => {
            if (clients.length > 0) {
              this.clients = clients
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

        for (const clientData of this.clients.reverse()) {
          chartData.labels.push(clientData.interv)
          data.push(clientData.count * 1)
        }
        /*
        for (let i = this.clients.length - 1; i > 0; i--) {
          const dataBulk = this.clients[i]
          console.log(dataBulk)
          chartData.labels.push(dataBulk.interv)
          data.push(dataBulk.count * 1)
        }
        */
        chartData.datasets.push(
          {
            label: 'Cantidad de clientes',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 0.6)',
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
