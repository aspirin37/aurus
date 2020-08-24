<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.promise_list.promise_list') }}
      </h1>
      <div class="ml-auto">
        <v-btn
          class="btn mr-4"
          color="primary"
          outlined
          large
          @click="showPromiseModal"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('views.promise_list.add_promise') }}
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
    <promises-filter
      v-model="isFilterShown"
      :filter="filter"
      :suppliers="suppliers"
      :parts="parts"
      @applyFilter="applyFilter"
    />
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading || loadingAdditional"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.lastOrderDate="{ item }">
        {{ $moment.utc(item.lastOrderDate).format('L') }}
      </template>
      <template v-slot:item.lastDate="{ item }">
        {{ $moment.utc(item.lastDate).format('L') }}
      </template>
      <template v-slot:item.shippingDate="{ item }">
        {{ $moment.utc(item.shippingDate).format('L') }}
      </template>
      <template v-slot:item.remove="{ item }">
        <v-hover v-slot="{hover}">
          <v-icon
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="showRemoveModal(item)"
          >
            mdi-delete
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
    <promise-creation
      v-model="isPromiseModalShown"
      :parts="parts"
      @submit="getItems"
    />
    <promise-remove
      v-model="isRemoveModalShown"
      :selected-promise="selectedPromise"
      @submit="getItems"
    />
  </div>
</template>

<script>
import PromisesFilter from '@/components/promises/PromisesFilter.vue';
import PromiseCreation from '@/components/promises/PromiseCreation.vue';
import PromiseRemove from '@/components/promises/PromiseRemove.vue';

export default {
  name: 'PromiseList',

  components: {
    PromisesFilter,
    PromiseCreation,
    PromiseRemove,
  },

  data() {
    return {
      headers: [
        {
          text: this.$t('common.supplier'),
          value: 'gsdb',
        },
        {
          text: this.$t('common.plant'),
          value: 'plant',
        },
        {
          text: this.$t('views.promise_list.part_number'),
          value: 'part.number',
        },
        {
          text: this.$t('views.promise_list.sent'),
          value: 'totalQty',
        },
        {
          text: this.$t('views.promise_list.last_order'),
          value: 'lastOrderDate',
        },
        {
          text: this.$t('views.promise_list.last_shipment'),
          value: 'lastDate',
        },
        {
          text: this.$t('views.promise_list.promised_shipment'),
          value: 'shippingDate',
        },
        {
          text: this.$t('views.promise_list.promised_amount'),
          value: 'amount',
        },
        {
          text: this.$t('common.delete'),
          value: 'remove',
          sortable: false,
          width: 100,
          align: 'center',
        },
      ],

      items: [],
      options: {},
      total: 0,

      filter: {
        gsdb: '',
        plant: '',
        partNumber: '',
        totalQty: null,
        lastOrderDate: '',
        lastDate: '',
        shippingDate: '',
        amount: null,
      },

      loading: false,
      loadingAdditional: false,

      suppliers: [],
      parts: [],

      selectedPromise: null,

      isPromiseModalShown: false,
      isRemoveModalShown: false,
      isFilterShown: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
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

  created() {
    this.getAdditional();
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
        const { data } = await this.$http.get('/promises', { params });
        this.items = data.rows.map((item) => ({
          ...item,
          lastOrderDate: new Date(item.lastOrderDate),
          lastDate: new Date(item.lastDate),
          shippingDate: new Date(item.shippingDate),
        }));
        this.total = data.total;
      } finally {
        this.loading = false;
      }
    },

    async getAdditional() {
      this.loadingAdditional = true;

      try {
        await Promise.all([
          this.getSuppliers(),
          this.getParts(),
        ]);
      } finally {
        this.loadingAdditional = false;
      }
    },

    async getSuppliers() {
      const params = { pageSize: 0 };
      const { data } = await this.$http.get('/suppliers', { params });
      this.suppliers = data.rows;
    },

    async getParts() {
      const params = {
        pageSize: 0,
        query: { supplierGsdb: this.user.gsdb },
      };
      const { data } = await this.$http.get('/partsSuppliers', { params });
      this.parts = data.rows;
    },

    showPromiseModal() {
      this.isPromiseModalShown = true;
    },

    showRemoveModal(item) {
      this.selectedPromise = item;
      this.isRemoveModalShown = true;
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
      if (this.filter.gsdb) {
        filter.gsdb = this.filter.gsdb;
      }
      if (this.filter.plant) {
        filter.plant = this.filter.plant;
      }
      if (this.filter.partNumber) {
        filter.part = { number: this.filter.partNumber };
      }
      if (typeof this.filter.totalQty === 'number') {
        filter.totalQty = this.filter.totalQty;
      }
      if (this.filter.lastOrderDate) {
        filter.lastOrderDate = this.$moment.utc(this.filter.lastOrderDate, 'L');
      }
      if (this.filter.lastDate) {
        filter.lastDate = this.$moment.utc(this.filter.lastDate, 'L');
      }
      if (this.filter.shippingDate) {
        filter.shippingDate = this.$moment.utc(this.filter.shippingDate, 'L');
      }
      if (typeof this.filter.amount === 'number') {
        filter.amount = this.filter.amount;
      }
      return filter;
    },
  },
};
</script>
