<template>
  <div>
    <b-card bg-variant="info" text-variant="white" class="text-center">
      <router-link
          :to="{
            name: 'results',
            params: {algoName, datasetName, train}
          }">
        <b-card-title
            class="recipe-title"
            style="font-size: 20px"
        >{{algoName}}</b-card-title>
      </router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "resultsPreview",
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
  }
}
</script>

<style scoped>

</style>