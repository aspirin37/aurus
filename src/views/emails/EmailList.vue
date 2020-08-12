<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.email_list.email_list') }}
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
    <emails-filter
      :is-shown="isFilterShown"
      :filter="filter"
      :suppliers="suppliers"
      :can-get-full-list="canGetFullList"
      @applyFilter="applyFilter"
    />
    <v-data-table
      v-if="!preloading"
      fixed-header
      :headers="headers"
      :items="emails"
      :options.sync="options"
      :server-items-length="total"
      :footer-props="{ itemsPerPageOptions: [5, 10, 15, 100] }"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{ hover }">
          <v-icon
            class="mr-4"
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="$router.push(`/emails/${item.id}`)"
          >
            mdi-email-outline
          </v-icon>
        </v-hover>
        <v-hover v-slot="{hover}">
          <v-icon
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="downloadMail(item.id)"
          >
            mdi-download
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import EmailsFilter from '@/components/emails/EmailsFilter.vue';

const FULL_LIST_ROLES = [
  'Security administrator',
  'Business administrator',
  'Data viewer',
  'generic',
  'Super user',
];

export default {
  name: 'EmailList',

  components: {
    EmailsFilter,
  },

  data() {
    return {
      items: [],
      total: 0,
      options: {},

      headers: [
        {
          text: this.$t('views.email_list.event'),
          value: 'event',
        },
        {
          text: this.$t('common.date'),
          value: 'timestamp',
        },
        {
          text: this.$t('views.email_list.subject'),
          value: 'subject',
        },
        {
          text: this.$t('views.email_list.to'),
          value: 'to',
        },
        {
          text: this.$t('views.email_list.cc'),
          value: 'cc',
        },
        {
          text: this.$t('views.email_list.suppliers'),
          value: 'suppliers',
        },
        {
          text: this.$t('common.actions'),
          value: 'actions',
          sortable: false,
          width: 150,
          align: 'center',
        },
      ],

      loading: false,
      preloading: false,
      isFilterShown: false,

      suppliers: [],

      filter: {
        supplier: '',
        type: '',
        to: '',
      },

      EventTypes: {
        system: 'system',
        business: 'business',
      },
    };
  },

  computed: {
    emails() {
      return this.items.map((email) => ({
        ...email,
        to: email.to.join(', '),
        cc: email.cc.join(', '),
        suppliers: email.suppliers.join(', '),
        timestamp: email.timestamp && this.$moment(email.timestamp).format('L LT'),
      }));
    },

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
        this.filter.type = this.EventTypes.business;
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
      const { type: eventType, ...query } = filter;
      params.query = query;
      if (eventType) {
        params.eventType = eventType;
      }
      params.pageSize = itemsPerPage;
      params.page = page;
      if (sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      this.loading = true;

      try {
        const { data } = await this.$http.get('mails', { params });
        this.items = data.rows.map((email) => ({
          ...email,
          timestamp: email.timestamp && new Date(email.timestamp),
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
      return Object.entries(this.filter).reduce(
        (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
        {},
      );
    },

    async downloadMail(id) {
      const { data } = await this.$http.get(`/mails/${id}/eml`, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.setAttribute('href', url);
      link.setAttribute('download', 'mail.eml');
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    },
  },
};
</script>
