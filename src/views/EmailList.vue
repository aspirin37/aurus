<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.email_list.email_list') }}
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
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{ hover }">
          <v-icon
            class="mr-4"
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="$router.push(`/emails/${item.id}`)"
          >
            mdi-info-outline
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: 'EmailList',
  data() {
    return {
      total: 0,
      items: [],
      loading: false,
      options: {},
      headers: [
        { text: this.$t('views.email_list.event'), value: 'event' },
        { text: this.$t('views.email_list.to'), value: 'to' },
        { text: this.$t('views.email_list.cc'), value: 'cc' },
        { text: this.$t('views.email_list.subject'), value: 'subject' },
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

      const { data } = await this.$http.get('mails', { params }).finally(() => {
        this.loading = false;
      });

      this.items = data.rows;
      this.total = data.total;
    },
  },
};
</script>
