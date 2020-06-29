<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.orders.history_by_days') }}
      </h1>
      <div class="ml-auto">
        <download-excel
          file-name="history-by-days.xlsx"
          url="/order-reports/history-by-days-xlsx"
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
    <div
      v-if="!loading && !filtersShown"
      class="fixed-column-table"
    >
      <v-data-table
        class="fixed-column-table__fixed"
        fixed-header
        :headers="headersFixed"
        :items="items"
        :options.sync="options"
        disable-pagination
        hide-default-footer
      />
      <v-data-table
        class="flex-grow-1"
        fixed-header
        :headers="headers"
        :items="items"
        :options.sync="options"
        disable-pagination
        hide-default-footer
      />
    </div>
  </div>
</template>

<script>
import TableFilters from '@/components/common/TableFilters.vue';
import DownloadExcel from '@/components/common/DownloadExcel.vue';

export default {
  name: 'HistoryByDays',
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
      headers: [],
      headersFixed: [],
      filtersShown: true,
      filters: {
        part: '',
        supplier: '',
        plant: '',
      },
    };
  },
  methods: {
    async getItems() {
      this.loading = true;

      const { data } = await this.$http.get('order-reports/history-by-days', { params: this.filters }).finally(() => {
        this.loading = false;
      });

      if (data.items.length) {
        this.noItemsFound = false;
        this.filtersShown = false;

        this.headers = data.headers.slice(1);
        this.headersFixed = data.headers.slice(0, 1);
        this.items = data.items;
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

<style lang="scss">

</style>
