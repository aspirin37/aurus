<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">Объявления</h1>
      <div class="ml-auto">
        <v-btn
          to="/bulletins/list/create"
          class="btn mr-4"
          color="primary"
          outlined
          large
        >
          <v-icon left>mdi-plus</v-icon>
          добавить
        </v-btn>
        <v-btn
          outlined
          large
        >
          <v-icon left>mdi-filter-variant</v-icon>
          Фильтр
        </v-btn>
        <!-- <filter-component
          filterClass="adds-table-page__top__button"
          :openFilter="openFilter"
          :changeFilterState="changeFilterState"
        /> -->
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
        <v-hover v-slot="{hover}">
          <v-icon
            v-b-modal.user-modal
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="showUserModal('edit', item)"
          >
            mdi-pencil
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "BulletinList",

  data() {
    return {
      headers: [
        { text: 'Тема', value: 'subject' },
        { text: 'Дата', value: 'startDate' },
        { text: 'Истекает', value: 'endDate' },
        { text: 'Редактор', value: 'editedBy.name' },
        { text: 'Дата ред.', value: 'updatedAt' },
        { text: 'E-mail', value: 'isImportant' },
        { text: 'Действия', value: 'actions', sortable: false, width: 150, align: 'center' },
      ],

      items: [],

      options: {},

      total: 0,

      loading: false
    }
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

      try {
        const { data } = await this.$http.get('bulletins', { params });
        this.items = data.rows.map((it) => ({ ...it }));
        this.total = data.total;
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>
