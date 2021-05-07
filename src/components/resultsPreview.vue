<template>
  <div>
    <b-card bg-variant="info" text-variant="white" class="text-center">
      <router-link
          :to="{
            name: 'results',
            params: algoName, accuracy
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
  data: function () {
    return {
      algoName: "UCLMR",
      accuracy: 0.7
    }
  }
}
</script>

<style scoped>

</style>