<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.reports.parts_properties') }}
      </h1>
      <div class="ml-auto">
        <download-excel
          file-name="parts-properties.xlsx"
          url="/records-reports/parts-properties.xlsx"
          :params="filters"
        />

        <v-btn
          outlined
          large
          @click="toggleFilters"
        >
          <v-icon left>
            mdi-filter-variant
          </v-icon>
          {{ $t('common.filter') }}
        </v-btn>
      </div>
    </div>
    <table-filters
      v-if="filtersShown"
      :filters="filters"
      :no-items-found="noItemsFound"
      @search="getItems"
    />
    <v-data-table
      v-else
      fixed-header
      :headers="headers"
      :items="items"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.startToUseDay="{ item }">
        {{ item.startToUseDay | moment('L') }}
      </template>
      <template v-slot:item.lastDate="{ item }">
        {{ item.lastDate | moment('L') }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import TableFilters from '@/components/common/TableFilters.vue';
import DownloadExcel from '@/components/common/DownloadExcel.vue';

export default {
  name: 'PartsProperties',
  components: {
    TableFilters,
    DownloadExcel,
  },
  data() {
    return {
      total: 0,
      items: [],
      loading: false,
      noItemsFound: false,
      options: {},
      headers: [{
        text: this.$t('common.number'),
        value: 'number',
      }, {
        text: this.$t('common.plant'),
        value: 'plant',
      }, {
        text: this.$t('common.supplier_name'),
        value: 'supplierName',
      }, {
        text: this.$t('common.supplierGsdb'),
        value: 'supplierGsdb',
      }, {
        text: this.$t('common.name'),
        value: 'name',
      }, {
        text: this.$t('common.weight'),
        value: 'weight',
      }, {
        text: this.$t('common.pack_qty'),
        value: 'packQty',
      }, {
        text: this.$t('common.pack'),
        value: 'pack',
      }, {
        text: this.$t('common.multiplicity'),
        value: 'multiplicity',
      }, {
        text: this.$t('common.startToUseDay'),
        value: 'startToUseDay',
      }, {
        text: this.$t('common.transitTime'),
        value: 'transitTime',
      }, {
        text: this.$t('common.frequencyOfSending'),
        value: 'frequencyOfSending',
      }, {
        text: this.$t('common.lastAsn'),
        value: 'lastAsn',
      }, {
        text: this.$t('common.lastQty'),
        value: 'lastQty',
      }, {
        text: this.$t('common.lastDate'),
        value: 'lastDate',
      }, {
        text: this.$t('common.totalQty'),
        value: 'totalQty',
      }, {
        text: this.$t('common.analyst'),
        value: 'analyst',
      }],
      filtersShown: true,
      filters: {
        supplierGsdb: '',
      },
    };
  },
  methods: {
    async getItems() {
      this.loading = true;

      const { data } = await this.$http.get('records-reports/parts-properties', { params: this.filters }).finally(() => {
        this.loading = false;
      });

      if (data.length) {
        this.noItemsFound = false;
        this.filtersShown = false;

        this.items = data;
      } else {
        this.noItemsFound = true;
      }
    },
    toggleFilters() {
      if (this.items.length) {
        this.filtersShown = !this.filtersShown;
        return;
      }
      this.filtersShown = true;
    },
  },
};
</script>
