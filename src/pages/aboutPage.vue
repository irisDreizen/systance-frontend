<template>
  <div>
    <div class="centered_content">
      <h1 class="content_title">Results</h1>
      <h3> <b>Dataset:</b> {{datasetName}}</h3>
      <h3><b>Train Percent:</b> {{train}}</h3>
      <h4>Choose which algorithm you would like to view the results:</h4>
    </div>
    <div v-for="r in results" :key="r.id">
      <resultsPreview :algoName="r" :datasetName="datasetName" :train="train"/>
      <br />
    </div>

  </div>
</template>

<script>
import resultsPreview from "../components/resultsPreview";

export default {
  name: "about",
  components:{
    resultsPreview
  },
  data: function() {
    return {
      datasetName: null,
      train: null,
      results:[]
    }
  },
  mounted(){
    this.update();
  },
  methods: {
    async update(){
      try{
        const response = await this.axios.get(
            "http://127.0.0.1:5000/result/" +1
        );
        var response_data = response.data;
        this.datasetName = response_data[1]
        this.train = response_data[2]

        for(var i = 0; i < response_data[0].length; i++){
          this.results.push(response_data[0][i]);
        }


        // this.datasetName = 'MPCHI';
        // this.train = 70;
        // this.results.push("UCLMR", "TAN", "SEN");


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
  .content_title {
    font-family: 'Bradley Hand', cursive;
    font-weight: bold;
    font-size: 55px;
  }
  .centered_content{
    margin: 20px;
    text-align: center;
    font-family: 'Bradley Hand', cursive;
  }

</style>