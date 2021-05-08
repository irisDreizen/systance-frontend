<template>
  <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    <div v-for="i in series" :key="i">
      <p v-if="i.area>0">area = {{i.area}} for label {{i.name}}</p>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "ROCCurve",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    algoName: {
      type: String,
      required: true
    },
    datasetName: {
      type: String,
      required: true
    },
    train: {
      type: String,
      required: true
    },
  },
  data: function () {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          width: [5, 5, 5, 3],
          curve: 'straight',
          dashArray: [0, 0, 0, 10]
        },
        title: {
          text: 'ROC Curve',
          align: 'left'
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          type: 'numeric',
          title: {
            text: 'False Positive Rate'
          }
        },
        yaxis: {
          title: {
            text: 'True Positive Rate'
          }
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      }
    }
  },
  mounted(){
    this.update();
  },
  methods: {
    async update(){
      try{
        // const response = await this.axios.get(
        //     "http://localhost:3000/results/ROCCurve",
        //     {
        //       params: {
        //         algoName: this.algoName,
        //         datasetName: this.datasetName,
        //         train: this.train
        //       },
        //     }
        // );
        // this.params.data = response.data;
        // add width and dash array
        this.series = [{
          name: "Against",
          data: [[0,0],[0.04,0.69],[1,1]],
          area: 0.82
        },
          {
            name: "For",
            data: [[0,0],[0.18,0.75],[1,1]],
            area: 0.70
          },
          {
            name: 'Observing',
            data: [[0,0],[0.21,0.72],[1,1]],
            area: 0.75
          },
          {
            name: "Chance Line",
            data: [[0,0],[1,1]],
            area: 0
          }
        ];


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
</style>