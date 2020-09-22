<template>
  <div>
    <h1 class="h4 primary--text mb-3">
      {{ $t('views.role_list.role_list') }}
    </h1>
    <v-data-table
      fixed-header
      disable-pagination
      hide-default-footer
      :headers="headers"
      :items="items"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :options.sync="options"
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
            @click="showRoleModal(item)"
          >
            mdi-pencil
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
    <role-modal
      v-model="roleModal"
      :role-list="items"
      :role-selected="roleSelected"
      @submit="getItems"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoleModal from '@/components/roles/RoleModal.vue';

export default {
  name: 'RoleList',
  components: {
    RoleModal,
  },
  data() {
    return {
      roleModal: false,
      roleSelected: null,
      total: 0,
      items: [],
      loading: false,
      options: {},
    };
  },
  computed: {
    ...mapGetters(['readOnly']),
    headers() {
      const headers = [
        { text: this.$t('views.role_list.role'), value: 'name' },
        { text: this.$t('views.role_list.availability'), value: 'availableFor' },
        { text: this.$t('views.role_list.compatibility'), value: 'compatibleWith' },
      ];

      const actions = {
        text: this.$t('common.actions'), value: 'actions', sortable: false, width: 150, align: 'center',
      };

      if (!this.readOnly) {
        headers.push(actions);
      }

      return headers;
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
  mounted() {
    this.getItems();
  },
  methods: {
    showRoleModal(role) {
      this.roleSelected = role;
      this.roleModal = true;
    },
    async getItems() {
      this.loading = true;
      const {
        sortBy, sortDesc,
      } = this.options;

      const params = {};

      if (sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      const { data } = await this.$http.get('roles', { params }).finally(() => {
        this.loading = false;
      });

      this.items = data.rows;
      this.total = data.total;
    },
  },
};
</script>
