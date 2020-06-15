<template>
  <transition
    name="layout-fade"
    mode="out-in"
  >
    <div v-if="!loading">
      <div class="d-flex mb-3">
        <h1 class="display-1 primary--text">
          {{ $t('views.orders.view_orders') }}
        </h1>
        <div class="ml-auto">
          <v-btn
            outlined
            large
            class="mr-2"
            :loading="statusLoading"
            :disabled="isViewed"
            @click="confirmView"
          >
            <v-icon left>
              {{ isViewed ? 'mdi-check-all' : 'mdi-check' }}
            </v-icon>
            {{ isViewed ? $t('views.orders.order_confirmed') : $t('views.orders.confirm_orders') }}
          </v-btn>
          <download-excel
            :url="`/order-groups/${id}/forecast-xlsx`"
            file-name="order-forecast.xlsx"
          />
          <v-btn
            outlined
            large
          >
            <v-icon left>
              mdi-filter-variant
            </v-icon>
            {{ $t('common.filter') }}
          </v-btn>
        </div>
      </div>
      <div
        class="fixed-column-table"
      >
        <div
          style="width: 250px"
          class="white"
        >
          <v-data-table
            class="fixed-column-table__columns"
            fixed-header
            hide-default-footer
            :headers="headersFixed"
            :items="items"
            :options.sync="options"
            :server-items-length="total"
            :loading="loading"
            :loading-text="$t('common.loading_data')"
          />
        </div>
        <div style="width: calc(100% - 250px)">
          <v-data-table
            fixed-header
            :headers="headers"
            :items="items"
            :options.sync="options"
            :server-items-length="total"
            :loading="loading"
            :loading-text="$t('common.loading_data')"
          />
        </div>
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
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: {},
      statusLoading: false,
      total: 0,
      items: [],
      loading: true,
      options: {},
      headers: [],
      headersFixed: [],
    };
  },
  computed: {
    isViewed() {
      return this.status === 'viewed';
    },
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
    Promise.all([
      this.getOrderGroupStatus(),
      this.getItems(),
    ]).finally(() => {
      this.loading = false;
    });
  },
  methods: {
    async getOrderGroupStatus() {
      const { data: { status } } = await this.$http.get(`/order-groups/${this.id}`);
      this.status = status;

      return Promise.resolve();
    },
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

      const { data } = await this.$http.get(`/order-groups/${this.id}/forecast`, { params });

      this.headers = data.headers.slice(2).map((it) => ({
        ...it, sortable: false,
      }));
      this.headersFixed = data.headers.slice(0, 2);
      this.items = data.items;
      this.total = data.total;

      return Promise.resolve();
    },
    async confirmView() {
      this.statusLoading = true;
      await this.$http.post(`/order-groups/${this.id}/view`).finally(() => {
        this.statusLoading = false;
      });
      this.status = 'viewed';
    },
    async downloadExcel() {
      const response = await this.$http({
        method: 'GET',
        url: `/order-groups/${this.id}/forecast-xlsx`,
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'order-forecast.xlsx');
      document.body.appendChild(link);
      link.click();
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
