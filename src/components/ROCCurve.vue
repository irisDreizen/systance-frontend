<template>
  <div id="chart">
<!--    <div v-for="i in series" :key="i">-->
<!--      <p v-if="i.area>0">Area = {{i.area}} for label {{i.name}}</p>-->
<!--    </div>-->
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
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
      type: Number,
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
          width: [],
          curve: 'straight',
          dashArray: []
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
        let formData = new FormData();
        formData.append('model', this.algoName);
        formData.append('ds_name', this.datasetName);
        formData.append('percent',this.train);
        const response = await this.axios.post(
            "http://127.0.0.1:5000/tpr_fpr",formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                },
        );
        this.series = response.data;

        this.series.push({
              name: "CHANCE LINE",
              data: [[0,0],[1,1]],
              area: 0
            })

        // this.series = [{
        //   name: "Against",
        //   data: [[0,0],[0.04,0.69],[1,1]],
        //   area: 0.82
        // },
        //   {
        //     name: "For",
        //     data: [[0,0],[0.18,0.75],[1,1]],
        //     area: 0.70
        //   },
        //   {
        //     name: 'Observing',
        //     data: [[0,0],[0.21,0.72],[1,1]],
        //     area: 0.75
        //   },
        //   {
        //     name: "Chance Line",
        //     data: [[0,0],[1,1]],
        //     area: 0
        //   }
        // ];
        var numOfLabels = this.series.length - 1;
        var counter = 0;

        while(counter < numOfLabels){
          this.chartOptions.stroke.width.push(5);
          this.chartOptions.stroke.dashArray.push(0);
          counter++;
        }
        this.chartOptions.stroke.width.push(3);
        this.chartOptions.stroke.dashArray.push(10);

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
</style>