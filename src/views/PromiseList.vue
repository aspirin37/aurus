<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">
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
      @submitFilter="getItems"
      @hide="hideFilter"
    />
    <v-data-table
      fixed-header
      :headers="headers"
      :items="promises"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
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
          text: this.$t('views.promise_list.supplier'),
          value: 'gsdb',
        },
        {
          text: this.$t('views.promise_list.plant'),
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

      loading: false,

      selectedPromise: null,

      isPromiseModalShown: false,
      isRemoveModalShown: false,
      isFilterShown: false,
    };
  },

  computed: {
    promises() {
      return this.items.map((item) => ({
        ...item,
        lastOrderDate: this.$d(item.lastOrderDate),
        lastDate: this.$d(item.lastDate),
        shippingDate: this.$d(item.shippingDate),
      }));
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

  methods: {
    async getItems(filter = {}) {
      this.loading = true;

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

      params.query = filter;

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

    hideFilter() {
      this.isFilterShown = false;
    },
  },
};
</script>
