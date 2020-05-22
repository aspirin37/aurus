<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">
        Список писем
      </h1>
      <div class="ml-auto">
        <v-btn
          outlined
          large
        >
          <v-icon left>
            mdi-filter-variant
          </v-icon>
          Фильтр
        </v-btn>
      </div>
    </div>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      loading-text="Данные загружаются..."
    >
      <template v-slot:item.actions="{ }">
        <v-icon
          class="mr-4"
          small
        >
          mdi-email-outline
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      total: 0,
      items: [],
      loading: false,
      options: {},
      headers: [
        { text: 'Событие', value: 'event' },
        { text: 'Кому', value: 'to' },
        { text: 'Копия', value: 'cc' },
        { text: 'Тема', value: 'subject' },
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
