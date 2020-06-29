<template>
  <transition
    name="layout-fade"
    mode="out-in"
  >
    <div v-if="!loading">
      <div class="d-flex mb-3 align-items-end">
        <h1 class="h4 primary--text">
          {{ $t('views.orders.report_list_by_parts') }}
        </h1>
        <div class="ml-auto">
          <download-excel
            url="order-reports/forecast-by-parts"
            file-name="forecast-by-parts.xlsx"
          />
        </div>
      </div>
      <div class="fixed-column-table">
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
  </transition>
</template>

<script>
import DownloadExcel from '@/components/common/DownloadExcel.vue';

export default {
  name: 'OrderGroup',
  components: {
    DownloadExcel,
  },
  data() {
    return {
      total: 0,
      items: [],
      loading: true,
      options: {},
      headers: [],
      headersFixed: [],
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      const params = {};

      if (itemsPerPage !== -1) {
        params.pageSize = itemsPerPage;
        params.page = page;
      }

      if (sortBy && sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      const { data } = await this.$http.get('order-reports/forecast-by-parts', { params }).finally(() => {
        this.loading = false;
      });

      this.headers = data.headers.slice(2).map((it) => ({
        ...it, sortable: false,
      }));
      this.headersFixed = data.headers.slice(0, 2);
      this.items = data.items;
      this.total = data.total;
    },
  },
};
</script>

<style lang="scss">
.fixed-column-table {
  display: flex;
  white-space: nowrap;
}
</style>
