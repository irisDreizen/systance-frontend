<template>
  <div>
    <h2>Results</h2>
    <h3>Dataset: {{datasetName}}</h3>
    <h3>Train Percent: {{train}}</h3>
    <h4>Choose which algorithm you would like to view the results:</h4>
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
        var response_data= response.data;

        this.datasetName=response_data[1]


        this.train=response_data[2]


        for(var i = 0; i < response_data[0].length; i++){
          this.results.push(response_data[0][i]);
        }



        //
        // this.datasetName = 'MPCHI';
        // this.train = 70;
        // this.results.push("UCLMR");


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>