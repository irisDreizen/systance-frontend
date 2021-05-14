<template>
  <div>
    <ve-table border-y :row-style-option="rowStyleOption" :columns="columns" :table-data="tableData" />
  </div>
</template>

<script>

export default {
  name: 'dataSampleTable',
  props: {
    datasetName: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
      },
      columns: [
        { field: "claim", key: "a", title: "Claim", align: "center" },
        { field: "sentence", key: "b", title: "Sentence", align: "center" },
        { field: "stance", key: "c", title: "Stance", align: "center" },
      ],
      tableData: [],
    }
  },
  created(){
    this.update();
  },
  methods: {
    async update(){
      try{
        const response = await this.axios.get(
            "http://127.0.0.1:5000/five_sentences_dataset/" + this.datasetName
        );

        var responseData = response.data;
        this.tableData = responseData['tableData'];

        // this.tableData = [
        //   {
        //     claim: "Are E-Cigarettes safe?",
        //     sentence: "The report concluded that \"There is no indication that EC users are exposed to dangerous levels of formaldehydes.",
        //     stance: "FAVOR",
        //   },
        //   {
        //     claim: "Are E-Cigarettes safe?",
        //     sentence: "Nicotine is no more dangerous to health than coffee, but 90 percent of the public still consider it harmful, according to a report from the U.K.?s Royal Society for Public Health.",
        //     stance: "FAVOR",
        //   },
        //   {
        //     claim: "Are E-Cigarettes safe?",
        //     sentence: "The health effects on intensive e-cigarette users are unknown.",
        //     stance: "NONE",
        //   },
        //   {
        //     claim: "Are E-Cigarettes safe?",
        //     sentence: "Vapor e-liquid products contain chemicals known to the State of California to cause cancer, birth defects, and other reproductive harm.",
        //     stance: "AGAINST",
        //   },
        //   {
        //     claim: "Are E-Cigarettes safe?",
        //     sentence: "Researchers at the University of California, San Francisco followed a small group of smokers for a year and found no link between trying e-cigarettes and quitting, or cutting down on smoking.",
        //     stance: "NONE",
        //   },
        // ];

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

