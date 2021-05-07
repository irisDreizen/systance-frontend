<template>
  <div style="width: 600px; margin:0 auto;">
    <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
  </div>
</template>

<script>
  import VueTableDynamic from 'vue-table-dynamic'

  export default {
    name: 'StatisticsTable',

    data() {
      return {
        params: {
          data: [
            ['Label', 'Precision', 'Recall', 'F-Score', 'Support'],
            ['AGAINST', '0.81', '0.58', '0.68', '989'],
            ['FAVOR', '0.42', '0.60', '0.50', '349'],
            ['NONE', '0.39', '0.56', '0.46', '290'],
            ['TOTAL', '0.65', '0.58', '0.60', '1628']
          ],
          header: 'row',
          border: true,
          stripe: true,
          highlight: { row: [-1] },
          highlightedColor: 'rgb(255, 255, 153)',
          columnWidth: [{column: 0, width: 80}]
        }
      }
    },
    components: { VueTableDynamic }
  }
</script>