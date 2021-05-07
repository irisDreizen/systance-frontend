<template>
  <div style="width: 600px; margin:0 auto;">
    <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
  </div>
</template>

<script>
  import VueTableDynamic from 'vue-table-dynamic'

  export default {
    name: 'ConfusionMatrix',

    data() {
      return {
        params: {
          data: [
            ['TRUE LABEL', '', '', ''],
            ['AGAINST', '115', '18', '33'],
            ['FAVOR', '12', '357', '104'],
            ['NONE', '27', '85', '287'],
            ['PREDICTED LABEL', 'AGAINST', 'FAVOR', 'NONE'],

          ],
          border: true,
          stripe: false,
          highlight: { row: [0, -1], column: [0] },
         highlightedColor: 'rgb(153, 204, 255)'
        }
      }
    },
    components: { VueTableDynamic }
}
</script>