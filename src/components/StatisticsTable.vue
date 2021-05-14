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
        type: Number,
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
          columnWidth: [{column: 0, width: 140}]
        },
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
              "http://127.0.0.1:5000/statisticsTable",formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  },
          );

          this.params.data = response.data['data'];

          // this.params.data = [
          //   ['Label', 'Precision', 'Recall', 'F-Score', 'Support'],
          //   ['AGAINST', '0.81', '0.58', '0.68', '989'],
          //   ['FAVOR', '0.42', '0.60', '0.50', '349'],
          //   ['NONE', '0.39', '0.56', '0.46', '290'],
          // ];

          //['TOTAL', '0.65', '0.58', '0.60', '1628']

          var totalPrecision = 0;
          var totalRecall = 0;
          var totalFScore = 0;
          var totalSupport = 0;


          for(var i = 1; i < this.params.data.length; i++){
            totalPrecision += parseFloat(this.params.data[i][1]);
            totalRecall += parseFloat(this.params.data[i][2]);
            totalFScore += parseFloat(this.params.data[i][3]);
            totalSupport += parseFloat(this.params.data[i][4]);
          }

          var numOfLabels = parseFloat(this.params.data.length - 1)

          totalPrecision = totalPrecision/numOfLabels;
          totalRecall = totalRecall/numOfLabels;
          totalFScore = totalFScore/numOfLabels;

          var prec = totalPrecision.toFixed(2);
          var recall = totalRecall.toFixed(2);
          var fscore = totalFScore.toFixed(2);

          prec = prec.toString();
          recall = recall.toString();
          fscore = fscore.toString();
          var support = totalSupport.toString();

          var total = ['TOTAL AVERAGE', prec, recall, fscore, support];

          this.params.data[numOfLabels+1] = total;

        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>