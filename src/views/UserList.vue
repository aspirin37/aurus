<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">
        {{ $t('views.user_list.title') }}
      </h1>
      <div class="ml-auto">
        <v-btn
          class="mr-4"
          color="primary"
          outlined
          large
          @click="showUserModal('add')"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('common.add') }}
        </v-btn>
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
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{hover}">
          <v-icon
            class="mr-4"
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
          >
            mdi-book-open-variant
          </v-icon>
        </v-hover>
        <v-hover v-slot="{hover}">
          <v-icon
            class="mr-4"
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
          >
            mdi-email-outline
          </v-icon>
        </v-hover>
        <v-hover v-slot="{hover}">
          <v-icon
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
    <user-modal
      v-model="userModal"
      :user-selected="userSelected"
      :type="modalType"
      @submit="getItems"
    />
  </div>
</template>

<script>
import UserModal from '@/components/users/UserModal.vue';

export default {
  name: 'UserList',
  components: {
    UserModal,
  },
  data() {
    return {
      userModal: false,
      userSelected: null,
      modalType: 'add',
      total: 0,
      items: [],
      loading: false,
      options: {},
      headers: [
        { text: this.$t('common.name'), value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: this.$t('common.role'), value: 'role' },
        { text: 'GSDB', value: 'gsdb' },
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
    showUserModal(type, user) {
      this.userSelected = user;
      this.modalType = type;
      this.userModal = true;
    },
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

      const { data } = await this.$http.get('users', { params }).finally(() => {
        this.loading = false;
      });

      this.items = data.rows.map((it) => ({ ...it, role: it.role.join(', ') }));
      this.total = data.total;
    },
  },
};
</script>