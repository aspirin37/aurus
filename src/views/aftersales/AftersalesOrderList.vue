<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.aftersales_order_list.aftersales_orders') }}
      </h1>
      <div class="ml-auto">
        <v-btn
          outlined
          large
          @click="toggleFilter"
        >
          <v-icon left>
            mdi-filter-variant
          </v-icon>
          {{ $t('common.filter') }}
        </v-btn>
      </div>
    </div>

    <aftersales-orders-filter
      :is-shown="isFilterShown"
      :filter="filter"
      @applyFilter="applyFilter"
    />

    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :footer-props="{ itemsPerPageOptions: [10, 20, 50, 100] }"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.number="{ item }">
        <router-link :to="`/aftersales-orders/${item.id}`">
          {{ item.number }}
        </router-link>
      </template>
      <template v-slot:item.date="{ item }">
        {{ $moment.utc(item.date).format('L') }}
      </template>
      <template v-slot:item.estimatedDate="{ item }">
        {{ $moment.utc(item.estimatedDate).format('L') }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AftersalesOrdersFilter from '@/components/aftersales/AftersalesOrdersFilter.vue';

export default {
  name: 'AftersalesOrderList',

  components: {
    AftersalesOrdersFilter,
  },

  data() {
    return {
      headers: [
        { text: this.$t('common.date'), value: 'date' },
        { text: this.$t('common.number'), value: 'number' },
        { text: this.$t('views.aftersales_order_list.estimated_date'), value: 'estimatedDate' },
        { text: this.$t('views.aftersales_order_list.total_with_vat'), value: 'totalWithVAT' },
        { text: this.$t('views.aftersales_order_list.currency'), value: 'currency' },
        { text: this.$t('common.status'), value: 'status' },
      ],

      items: [],
      options: {},
      total: 0,

      filter: {
        date: '',
        number: '',
        estimatedDate: '',
        totalWithVAT: null,
        currency: '',
        status: '',
      },

      loading: false,
      isFilterShown: false,
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

  methods: {
    async getItems() {
      this.loading = true;

      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      const filter = this.mapFilter();

      const params = {};
      params.pageSize = itemsPerPage === -1 ? 0 : itemsPerPage;
      params.page = page;
      params.query = filter;
      if (sortBy && sortBy.length) {
        params.sort = `${sortDesc[0] ? '-' : ''}${sortBy[0]}`;
      }

      try {
        const { data } = await this.$http.get('/aftersales-orders', { params });
        this.items = data.rows.map((item) => ({
          ...item,
          date: item.date && new Date(item.date),
          estimatedDate: item.estimatedDate && new Date(item.estimatedDate),
        }));
        this.total = data.total;
      } finally {
        this.loading = false;
      }
    },

    toggleFilter() {
      this.isFilterShown = !this.isFilterShown;
    },

    applyFilter(filter) {
      this.isFilterShown = false;
      this.filter = { ...filter };
      this.getItems();
    },

    mapFilter() {
      const filter = {};
      if (this.filter.date) {
        filter.date = this.$moment.utc(this.filter.date, 'L');
      }
      if (this.filter.number) {
        filter.number = this.filter.number;
      }
      if (this.filter.estimatedDate) {
        filter.estimatedDate = this.$moment.utc(this.filter.estimatedDate, 'L');
      }
      if (typeof this.filter.totalWithVAT === 'number') {
        filter.totalWithVAT = this.filter.totalWithVAT;
      }
      if (this.filter.currency) {
        filter.currency = this.filter.currency;
      }
      if (this.filter.status) {
        filter.status = this.filter.status;
      }
      return filter;
    },
  },
};
</script>
