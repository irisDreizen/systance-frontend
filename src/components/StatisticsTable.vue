<template>
  <div style="width: 600px; margin:0 auto;">
    <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
  </div>
</template>

<script>
  import VueTableDynamic from 'vue-table-dynamic'

  export default {
    name: 'StatisticsTable',
    components: { VueTableDynamic },
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

    data() {
      return {
        params: {
          data: null,
          header: 'row',
          border: true,
          stripe: true,
          highlight: { row: [-1] },
          highlightedColor: 'rgb(255, 255, 153)',
          columnWidth: [{column: 0, width: 80}]
        },
      }
    },
    mounted(){
      this.update();
    },
    methods: {
      async update(){
        try{
          // const response = await this.axios.get(
          //     "http://localhost:3000/results/statisticsTable",
          //     {
          //       params: {
          //         algoName: this.algoName,
          //         datasetName: this.datasetName,
          //         train: this.train
          //       },
          //     }
          // );
          // this.params.data = response.data;
          this.params.data = [
            ['Label', 'Precision', 'Recall', 'F-Score', 'Support'],
            ['AGAINST', '0.81', '0.58', '0.68', '989'],
            ['FAVOR', '0.42', '0.60', '0.50', '349'],
            ['NONE', '0.39', '0.56', '0.46', '290'],
            ['TOTAL', '0.65', '0.58', '0.60', '1628']
          ];
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>