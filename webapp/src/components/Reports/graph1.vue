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

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-info" @click="makeReport">Ver reporte</button>
            </div>
          </div>

        </div>
        <div v-if="!isLoading">
            <DoughnutChart :width="640" :height="160" :chart-data="chartData" :options="chartOptions"/>
        </div>

      </div>
    </section>
    <loader :is-loading="isLoading"/>
  </div>
</template>
<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import BarChart from '@/components/common/BarChart'
  import LineChart from '@/components/common/LineChart'
  import DoughnutChart from '@/components/common/DoughnutChart'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  export default {
    name: 'dashboard',

    components: {
      FormCheckbox,
      FormInput,
      LineChart,
      BarChart,
      DoughnutChart,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        gender: null,
        minAge: null,
        maxAge: null,
        chartData: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true
        },
        favoriteProducts: [],
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
          maxAge: this.maxAge || 1000
        }
        this.favoriteProducts = []
        return this.$store.dispatch('report1_get', data)
          .then((products) => {
            if (products.length > 0) {
              this.favoriteProducts = products
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

        for (const dataset of this.favoriteProducts) {
          chartData.labels.push(dataset['productos_nombre'])
          data.push(dataset.count)
        }

        chartData.datasets.push(
          {
            label: 'Producto favorito',
            data: data,
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(100, 162, 50, 0.4)', 'rgba(235, 62, 54, 0.4)', 'rgba(54, 162, 235, 0.6)'],
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
