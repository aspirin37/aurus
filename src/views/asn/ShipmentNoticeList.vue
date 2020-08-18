<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.shipment_notice_list.shipment_notices') }}
      </h1>
      <div class="ml-auto">
        <v-btn
          to="/asn/create"
          color="primary"
          outlined
          large
          class="btn mr-4"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('common.create') }}
        </v-btn>
        <v-btn
          color="primary"
          outlined
          large
          class="btn mr-4"
          @click="showLoadModal"
        >
          <v-icon left>
            mdi-upload
          </v-icon>
          {{ $t('common.upload') }}
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
    >
      <template v-slot:item.number="{ item }">
        <router-link :to="`/asn/${item.id}`">
          {{ item.number }}
        </router-link>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ $moment(item.createdAt).format('L') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{hover}">
              <v-icon
                class="mr-2"
                :class="hover ? '' : 'text--disabled'"
                color="primary"
                size="20"
                v-bind="attrs"
                v-on="on"
                @click="$router.push(`/asn/${item.id}/track-statuses`)"
              >
                drive_eta
              </v-icon>
            </v-hover>
          </template>
          <span>{{ $t('views.shipment_notice_list.track_status_history') }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{hover}">
              <v-icon
                class="mr-2"
                :class="hover ? '' : 'text--disabled'"
                color="primary"
                size="20"
                v-bind="attrs"
                v-on="on"
                @click="$router.push(`/asn/${item.id}/customs-statuses`)"
              >
                flag
              </v-icon>
            </v-hover>
          </template>
          <span>{{ $t('views.shipment_notice_list.customs_status_history') }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{hover}">
              <v-icon
                class="mr-2"
                :class="hover ? '' : 'text--disabled'"
                color="primary"
                size="20"
                v-bind="attrs"
                v-on="on"
                @click="$router.push(`/asn/${item.id}/system-statuses`)"
              >
                mdi-state-machine
              </v-icon>
            </v-hover>
          </template>
          <span>{{ $t('views.shipment_notice_list.system_status_history') }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{hover}">
              <v-icon
                :class="hover ? '' : 'text--disabled'"
                color="primary"
                size="20"
                v-bind="attrs"
                v-on="on"
                @click="getLabels(item.id)"
              >
                mdi-label
              </v-icon>
            </v-hover>
          </template>
          <span>{{ $t('views.shipment_notice_list.print_labels') }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <shipment-notice-load
      v-model="isLoadModalShown"
      @created="getItems"
      @hideModal="hideLoadModal"
    />
    <a
      v-if="pdf"
      v-show="false"
      ref="pdf"
      :href="pdf"
      download="labels.pdf"
    />
  </div>
</template>

<script>
import ShipmentNoticesFilter from '@/components/asn/ShipmentNoticesFilter.vue';
import ShipmentNoticeLoad from '@/components/asn/ShipmentNoticeLoad.vue';

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
    ShipmentNoticeLoad,
  },

  data() {
    return {
      headers: [
        {
          text: this.$t('common.supplier'),
          value: 'supplier.gsdb',
        },
        {
          text: this.$t('common.plant'),
          value: 'plant',
        },
        {
          text: this.$t('common.number'),
          value: 'number',
        },
        {
          text: this.$t('views.shipment_notice_list.shipment_date'),
          value: 'createdAt',
        },
        {
          text: this.$t('views.shipment_notice_list.invoice'),
          value: 'invoice.number',
        },
        {
          text: this.$t('common.actions'),
          value: 'actions',
          sortable: false,
          width: 150,
        },
      ],

      items: [],
      options: {},
      total: 0,

      filter: {
        supplier: '',
        plant: '',
        startDate: this.$moment().format().substr(0, 10),
        endDate: this.$moment().format().substr(0, 10),
        number: '',
      },

      suppliers: [],

      pdf: null,

      preloading: false,
      loading: false,
      isFilterShown: false,
      isLoadModalShown: false,
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
        } else {
          this.$moment.tz.setDefault();
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
        params.sort = `${sortDesc[0] ? '-' : ''}${sortBy[0]}`;
      }

      this.loading = true;

      try {
        const { data } = await this.$http.get('/asn', { params });
        this.items = data.rows.map((item) => ({
          ...item,
          shippingDate: new Date(item.shippingDate),
          estimatedDate: new Date(item.estimatedDate),
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
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
      if (this.filter.supplier) {
        filter.supplier = this.filter.supplier;
      }
      if (this.filter.plant) {
        filter.plant = this.filter.plant;
      }
      if (this.filter.number) {
        filter.number = this.filter.number;
      }
      filter.createdAt = {
        $gte: this.$moment(this.filter.startDate),
        $lte: this.$moment(this.filter.endDate).endOf('day'),
      };
      return filter;
    },

    showLoadModal() {
      this.isLoadModalShown = true;
    },

    hideLoadModal() {
      this.isLoadModalShown = false;
    },

    async getLabels(id) {
      const { data } = await this.$http.get(`/labels/${id}`, {
        responseType: 'blob',
      });
      this.pdf = URL.createObjectURL(data);
      await this.$nextTick();
      this.$refs.pdf.click();
    },
  },
};
</script>
