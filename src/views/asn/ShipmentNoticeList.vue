<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.shipment_notice_list.shipment_notices') }}
      </h1>
      <div class="ml-auto">
        <v-btn
          to="/asn/create"
          class="btn mr-4"
          color="primary"
          outlined
          large
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('common.create') }}
        </v-btn>
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
    <shipment-notices-filter
      :is-shown="isFilterShown"
      :filter="filter"
      :can-get-full-list="canGetFullList"
      :suppliers="suppliers"
      @applyFilter="applyFilter"
    />
    <v-data-table
      v-if="!preloading"
      fixed-header
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    />
  </div>
</template>

<script>
import ShipmentNoticesFilter from '@/components/asn/ShipmentNoticesFilter.vue';

const FULL_LIST_ROLES = [
  'Security administrator',
  'Business administrator',
  'Data viewer',
  'generic',
  'Super user',
];

export default {
  name: 'ShipmentNoticeList',

  components: {
    ShipmentNoticesFilter,
  },

  data() {
    return {
      headers: [
        { text: this.$t('common.supplier'), value: 'supplier' },
        { text: this.$t('common.plant'), value: 'plant' },
        { text: this.$t('common.number'), value: 'number' },
        { text: this.$t('views.shipment_notice_list.shipment_date'), value: 'shippingDate' },
        { text: this.$t('views.shipment_notice_list.invoice'), value: 'invoice.number' },
      ],

      items: [],
      options: {},
      total: 0,

      filter: {
        supplier: '',
        startDate: this.$moment().format().substr(0, 10),
        endDate: this.$moment().format().substr(0, 10),
        number: '',
      },

      suppliers: [],

      preloading: false,
      loading: false,
      isFilterShown: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },

    canGetFullList() {
      return this.user.role.some((role) => FULL_LIST_ROLES.includes(role));
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

  async created() {
    await this.init();
    await this.getTimezone();
  },

  methods: {
    async init() {
      this.preloading = true;

      if (!this.canGetFullList) {
        this.filter.supplier = this.user.gsdb;
      }

      try {
        const { data } = await this.$http.get('/suppliers', { pageSize: 0 });
        this.suppliers = data.rows;
      } finally {
        this.preloading = false;
      }
    },

    async getTimezone() {
      if (!this.user) {
        this.$moment.tz.setDefault();
        return;
      }

      try {
        const { data } = await this.$http.get(`/suppliers/${this.user.gsdb}`);
        if (data.timezone) {
          this.$moment.tz(data.timezone);
        }
      } catch (error) {
        this.$moment.tz.setDefault();
      }
    },

    async getItems() {
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      const filter = this.mapFilter();

      const params = {};
      params.query = filter;
      params.pageSize = itemsPerPage;
      params.page = page;
      if (sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      this.loading = true;

      try {
        const { data } = await this.$http.get('/asn', { params });
        this.items = data.rows;
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
      if (this.filter.supplier) {
        filter.supplier = this.filter.supplier;
      }
      if (this.filter.number) {
        filter.number = this.filter.number;
      }
      filter.createdAt = {
        $lte: this.$moment(this.filter.startDate),
        $gte: this.$moment(this.filter.endDate).endOf('day'),
      };
      return filter;
    },
  },
};
</script>
