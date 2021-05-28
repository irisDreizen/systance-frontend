<template>
  <div class="background">
    <div class="centered_content">
      <h1 style="margin-top: 20px" class="content_title">RESULTS</h1>
      <h3 style="margin-top: 20px"> <b>Dataset:</b> <span style="text-transform:uppercase;">{{datasetName}}</span></h3>
      <h3 style="margin-top: 20px"><b>Train Percent:</b> {{train}}</h3>
      <h4 style="margin-top: 20px">Choose which algorithm you would like to view the results:</h4>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

    </div>
    <div class="vertical-center">
      <div v-for="r in results" :key="r.id" >
        <!--      <resultsPreview :algoName="r" :datasetName="datasetName" :train="train"/>-->
        <b-button v-on:click="sendToResults(r, datasetName, train)" pill variant="info" size="lg" style="margin-top: 20px">{{r}}</b-button>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
    <div class="vertical-center">
      <b-button v-on:click="sendToCompareResults(results, datasetName, train)" pill variant="info" size="lg" style="margin-top: 20px">Compare the results</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "resultsPreviewPage",
  data: function() {
    return {
      datasetName: null,
      train: null,
      results:[],
    }
  },
  mounted(){
    this.update();
  },
  methods: {
    async update(){
      try{
        const id = this.$route.params.resultId;
        const response = await this.axios.get(
            "http://127.0.0.1:5000/result/" + id
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
    },
    sendToResults(algoName, datasetName, train){
      this.$router.push({
        name: 'results',
        params: { algoName: algoName, datasetName: datasetName, train: train }
      });
    },
    sendToCompareResults(algoNameArray, datasetName, train){
      this.$router.push({
        name: 'compareResults',
        params: { algoNameArray: algoNameArray, datasetName: datasetName, train: train }
      });
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
.vertical-center {
  position: absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  width: 100%;
}
.background{

  background: url("../assets/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 1024px;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;

}

</style>