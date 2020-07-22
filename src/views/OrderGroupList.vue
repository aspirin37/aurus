<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.orders.order_groups') }}
      </h1>
    </div>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.date="{ item }">
        {{ item.date | moment("DD.MM.YY") }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{hover}">
          <router-link
            class="icon-link"
            :to="`/orders/order-groups/${item.id}`"
          >
            <v-icon
              class="mr-4"
              :class="hover ? '' : 'text--disabled'"
              color="primary"
              size="20"
            >
              mdi-open-in-new
            </v-icon>
          </router-link>
        </v-hover>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'OrderGroupList',
  data() {
    return {
      total: 0,
      items: [],
      loading: false,
      options: {},
      headers: [
        { text: this.$t('common.date'), value: 'date' },
        { text: this.$t('common.supplier'), value: 'supplier' },
        { text: this.$t('common.plant'), value: 'plant' },
        { text: this.$t('common.status'), value: 'status' },
        {
          text: this.$t('common.actions'), value: 'actions', sortable: false, width: 150, align: 'center',
        },
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
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      const params = {};

      if (itemsPerPage !== -1) {
        params.pageSize = itemsPerPage;
        params.page = page;
      }

      if (sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      const { data } = await this.$http.get('/order-groups', { params }).finally(() => {
        this.loading = false;
      });

      this.items = data.rows;
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
