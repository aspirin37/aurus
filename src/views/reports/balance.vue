<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.reports.balance') }}
      </h1>
      <div class="ml-auto">
        <download-excel
          file-name="balance.xlsx"
          url="/records-reports/balance.xlsx"
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
  name: 'Balance',
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
        text: this.$t('common.loose'),
        value: 'loose',
      }, {
        text: this.$t('common.arrived'),
        value: 'arrived',
      }, {
        text: this.$t('common.inTransit'),
        value: 'inTransit',
      }, {
        text: this.$t('common.willMake'),
        value: 'willMake',
      }, {
        text: this.$t('common.inPlant'),
        value: 'inPlant',
      }, {
        text: this.$t('common.inSystem'),
        value: 'inSystem',
      }, {
        text: this.$t('common.pendingCYC'),
        value: 'pendingCYC',
      }, {
        text: this.$t('common.CYC'),
        value: 'CYC',
      }, {
        text: this.$t('common.pendingRJ'),
        value: 'pendingRJ',
      }, {
        text: this.$t('common.RJ'),
        value: 'RJ',
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

      const { data } = await this.$http.get('records-reports/balance', { params: this.filters }).finally(() => {
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
