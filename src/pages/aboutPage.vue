<template>
  <div>
    <h2>Results</h2>
    <h3>Dataset: {{datasetName}}</h3>
    <h3>Train Percent: {{trainPercent}}</h3>
    <h4>Choose which algorithm you would like to view the results:</h4>
    <div v-for="r in results" :key="r.id">
      <resultsPreview :results="r" />
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
      datasetName: 'MPCHI',
      trainPercent: 70,
      results:[1, 2, 3]
    }
  }
}
</script>

<style scoped>

</style>