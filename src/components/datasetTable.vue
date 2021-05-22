<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
            label="Sort"
            label-for="sort-by-select"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
                id="sort-by-select"
                v-model="sortBy"
                :options="sortOptions"
                :aria-describedby="ariaDescribedby"
                class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                :aria-describedby="ariaDescribedby"
                size="sm"
                class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
<!--        <b-form-group-->
<!--            label="Initial sort"-->
<!--            label-for="initial-sort-select"-->
<!--            label-cols-sm="3"-->
<!--            label-align-sm="right"-->
<!--            label-size="sm"-->
<!--            class="mb-0"-->
<!--        >-->
<!--          <b-form-select-->
<!--              id="initial-sort-select"-->
<!--              v-model="sortDirection"-->
<!--              :options="['asc', 'desc', 'last']"-->
<!--              size="sm"-->
<!--          ></b-form-select>-->
<!--        </b-form-group>-->
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
            v-model="sortDirection"
            label="Filter On"
            description="Leave all unchecked to filter on all data"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
          >
            <b-form-checkbox value="claim">Claim</b-form-checkbox>
            <b-form-checkbox value="sentence">Sentence</b-form-checkbox>
            <b-form-checkbox value="stance">Stance</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
        >
          <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'datasetTable',
  props: {
    datasetName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      items: [],
      fields: [
        { key: 'claim', label: 'Claim', sortable: true},
        { key: 'sentence', label: 'Sentence', sortable: true },
        { key: 'stance', label: 'Stance', sortable: true},
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.update();
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async update(){
      try{
        const response = await this.axios.get(
            "http://127.0.0.1:5000/five_sentences_dataset/" + this.datasetName
        );

        var responseData = response.data;
        this.items = responseData['tableData'];

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