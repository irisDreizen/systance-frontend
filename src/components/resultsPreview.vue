<template>
  <div>
    <b-card bg-variant="info" text-variant="white" header={header} class="text-center">
      <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "resultsPreview",
  data: function () {
    return {
      header: "Algorithm: UCLMR",
      accuracy: 0.7
    }
  }
}
</script>

<style scoped>

</style>