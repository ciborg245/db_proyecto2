<script>
  import { Pie, mixins } from 'vue-chartjs'

  const {reactiveProp} = mixins

  export default {
    extends: Pie,

    name: 'pie-chart',

    mixins: [
      reactiveProp
    ],

    props: ['options'],

    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
