<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">
        {{ $t('views.report_list.title') }}
      </h1>
      <div class="ml-auto">
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
    <!-- <div class="fixed-column-table">
      <div style="width: 200px;">
        <v-data-table
          fixed-header
          hide-default-footer
          :headers="headersLeft"
          :items="items"
          :options.sync="options"
          :server-items-length="total"
          :loading="loading"
          :loading-text="$t('common.loading_data')"
        />
      </div>
      <div style="width: calc(100% - 200px)"> -->
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    />
    <!-- :options.sync="options" -->
    <!-- :server-items-length="total" -->
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ReportList',
  data() {
    return {
      total: 0,
      items: [],
      loading: false,
      options: {},
      headers: [
        // { text: this.$t('common.name'), value: 'name' },
        // { text: 'E-mail', value: 'email' },
        // { text: this.$t('common.role'), value: 'role' },
        // { text: 'GSDB', value: 'gsdb' },
        // { text: this.$t('common.name'), value: 'name' },
        // { text: 'E-mail', value: 'email' },
        // { text: this.$t('common.role'), value: 'role' },
        // { text: 'GSDB', value: 'gsdb' },
        // { text: this.$t('common.name'), value: 'name' },
        // { text: 'E-mail', value: 'email' },
        // { text: this.$t('common.role'), value: 'role' },
        // { text: 'GSDB', value: 'gsdb' },
        // { text: this.$t('common.name'), value: 'name' },
        // { text: 'E-mail', value: 'email' },
        // { text: this.$t('common.role'), value: 'role' },
        // { text: 'GSDB', value: 'gsdb' },
      ],
      headersLeft: [
        { text: '', value: 'name' },
      ],
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
      // const {
      //   sortBy, sortDesc, page, itemsPerPage,
      // } = this.options;

      const params = {
        part: 'part1',
      };

      // if (itemsPerPage !== -1) {
      //   params.pageSize = itemsPerPage;
      //   params.page = page;
      // }

      // if (sortBy.length) {
      //   params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      // }

      const { data } = await this.$http.get('order-reports/forecast-by-part', { params }).finally(() => {
        this.loading = false;
      });

      this.headers = data.headers;
      this.items = data.items;
      // this.total = data.total;
    },
  },
};
</script>
