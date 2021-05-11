<template>
  <div style="width: 600px; margin:0 auto;">
    <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
  </div>
</template>

<script>
  import VueTableDynamic from 'vue-table-dynamic'

  export default {
    name: 'ConfusionMatrix',
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
          border: true,
          stripe: false,
          highlight: { row: [0, -1], column: [0] },
         highlightedColor: 'rgb(153, 204, 255)'
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
              "http://127.0.0.1:5000/confusionMatrix",formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  },
          );



          this.params.data=response.data['data']

          //this.params.data = response.data;
          // this.params.data = [
          //   ['TRUE LABEL', '', '', ''],
          //   ['AGAINST', '115', '18', '33'],
          //   ['FAVOR', '12', '357', '104'],
          //   ['NONE', '27', '85', '287'],
          //   ['PREDICTED LABEL', 'AGAINST', 'FAVOR', 'NONE'],
          // ];
        } catch (error) {
          console.log(error);
        }
      }
    }

}
</script>