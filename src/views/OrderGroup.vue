<template>
  <transition
    name="layout-fade"
    mode="out-in"
  >
    <div v-if="!loading">
      <div class="d-flex mb-3 align-items-end">
        <h1 class="h4 primary--text">
          {{ $t('views.orders.view_orders') }}
        </h1>
        <div class="ml-auto">
          <v-btn
            outlined
            large
            class="mr-2"
            :loading="statusLoading"
            :disabled="!isPosted"
            @click="confirmView"
          >
            <v-icon left>
              {{ isViewed ? 'mdi-check-all' : 'mdi-check' }}
            </v-icon>
            {{
              isViewed ?
                $t('views.orders.order_confirmed') :
                $t('views.orders.confirm_orders')
            }}
          </v-btn>
          <download-excel
            :url="`/orders/${id}/forecast-xlsx`"
            file-name="order-forecast.xlsx"
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
          :loading-text="$t('common.loading_data')"
          disable-pagination
          hide-default-footer
        />
        <v-data-table
          class="flex-grow-1"
          fixed-header
          :headers="headers"
          :items="items"
          :options.sync="options"
          :loading-text="$t('common.loading_data')"
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
    isPosted() {
      return this.status === 'posted';
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
      const { data: { status } } = await this.$http.get(`/orders/${this.id}`);
      this.status = status;

      return Promise.resolve();
    },
    async getItems() {
      const { data } = await this.$http.get(`/orders/${this.id}/forecast`);

      this.headers = data.headers.slice(2).map((it) => ({
        ...it, sortable: false,
      }));
      this.headersFixed = data.headers.slice(0, 2);
      this.items = data.items;

      return Promise.resolve();
    },
    async confirmView() {
      this.statusLoading = true;
      await this.$http.post(`/orders/${this.id}/view`).finally(() => {
        this.statusLoading = false;
      });
      this.status = 'viewed';
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
