<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.orders.nearest_shipment') }}
      </h1>
      <div class="ml-auto">
        <download-excel
          :url="`/order-reports/nearest-shipment-by-parts-xlsx`"
          file-name="nearest-shipment-by-parts.xlsx"
        />
      </div>
    </div>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
      :options.sync="options"
      :server-items-length="total"
    />
  </div>
</template>

<script>
import DownloadExcel from '@/components/common/DownloadExcel.vue';

export default {
  name: 'NearestShipment',
  components: {
    DownloadExcel,
  },
  data() {
    return {
      total: 0,
      items: [],
      loading: false,
      options: {},
      headers: [],
    };
  },
  watch: {
    options: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.loading = true;
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      const params = {};

      if (itemsPerPage !== -1) {
        params.pageSize = itemsPerPage;
        params.page = page;
      }

      if (sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      const { data } = await this.$http.get('order-reports/nearest-shipment-by-parts', { params }).finally(() => {
        this.loading = false;
      });

      this.headers = data.headers;
      this.items = data.items;
      this.total = data.total;
    },
  },
};
</script>
