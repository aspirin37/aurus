<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.reports.turnover') }}
      </h1>
      <div class="ml-auto">
        <download-excel
          file-name="turnover.xlsx"
          url="/records-reports/turnover.xlsx"
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
    />
  </div>
</template>

<script>
import TableFilters from '@/components/common/TableFilters.vue';
import DownloadExcel from '@/components/common/DownloadExcel.vue';

export default {
  name: 'Turnover',
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
        text: this.$t('common.usage'),
        value: 'usage',
      }, {
        text: this.$t('common.pendingCYC'),
        value: 'pendingCYC',
      }, {
        text: this.$t('common.CYCLost'),
        value: 'CYCLost',
      }, {
        text: this.$t('common.CYCFound'),
        value: 'CYCFound',
      }, {
        text: this.$t('common.pendingRJ'),
        value: 'pendingRJ',
      }, {
        text: this.$t('common.RJSent'),
        value: 'RJSent',
      }, {
        text: this.$t('common.RJRestored'),
        value: 'RJRestored',
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

      const { data } = await this.$http.get('records-reports/turnover', { params: this.filters }).finally(() => {
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
