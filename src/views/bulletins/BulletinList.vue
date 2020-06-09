<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">{{ $t('views.bulletin_list.bulletin_list') }}</h1>
      <div class="ml-auto">
        <v-btn
          to="/bulletins/list/create"
          class="btn mr-4"
          color="primary"
          outlined
          large
        >
          <v-icon left>mdi-plus</v-icon>
          {{ $t('common.add') }}
        </v-btn>
        <v-btn
          outlined
          large
          @click="toggleFilter"
        >
          <v-icon left>mdi-filter-variant</v-icon>
          {{ $t('common.filter') }}
        </v-btn>
      </div>
    </div>
    <bulletins-filter v-model="isFilterShown" @submitFilter="getItems" @hide="hideFilter"/>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="bulletins"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{hover}">
          <v-icon
            v-b-modal.bulletin-modal
            class="mr-2"
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="showBulletinModal(item)"
          >
            mdi-pencil
          </v-icon>
        </v-hover>
        <v-hover v-slot="{hover}">
          <v-icon
            v-b-modal.bulletin-modal
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
    <bulletin-modal
      v-model="isBulletinModalShown"
      :selected-bulletin="selectedBulletin"
      @submit="getItems"
    />
    <bulletin-remove
      v-model="isRemoveModalShown"
      :selected-bulletin="selectedBulletin"
      @submit="getItems"
    />
  </div>
</template>

<script>
import BulletinsFilter from '@/components/bulletins/BulletinsFilter.vue';
import BulletinModal from '@/components/bulletins/BulletinModal.vue';
import BulletinRemove from '@/components/bulletins/BulletinRemove.vue';

export default {
  name: "BulletinList",

  components: {
    BulletinsFilter,
    BulletinModal,
    BulletinRemove
  },

  data() {
    return {
      headers: [
        {
          text: this.$t('views.bulletin_list.subject'),
          value: 'subject'
        },
        {
          text: this.$t('views.bulletin_list.start_date'),
          value: 'startDate'
        },
        {
          text: this.$t('views.bulletin_list.end_date'),
          value: 'endDate'
        },
        {
          text: this.$t('views.bulletin_list.edited_by'),
          value: 'editedBy.name'
        },
        {
          text: this.$t('views.bulletin_list.updated_at'),
          value: 'updatedAt'
        },
        {
          text: this.$t('views.bulletin_list.email'),
          value: 'isImportant'
        },
        {
          text: this.$t('common.actions'),
          value: 'actions',
          sortable: false,
          width: 150
        },
      ],

      items: [],

      options: {},

      total: 0,

      loading: false,

      selectedBulletin: null,

      isBulletinModalShown: false,

      isRemoveModalShown: false,

      isFilterShown: false
    }
  },

  computed: {
    bulletins() {
      return this.items.map((item) => ({
        ...item,
        startDate: this.$d(new Date(item.startDate)),
        endDate: this.$d(new Date(item.endDate)),
        updatedAt: this.$d(new Date(item.updatedAt)),
        isImportant: item.isImportant ? this.$t('common.yes') : this.$t('common.no')
      }));
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

      if (sortBy.length) {
        params.sort = `${sortDesc[0] ? '+' : '-'}${sortBy[0]}`;
      }

      params.query = { isActive: true, ...filter };
      params.validity = 'all';

      try {
        const { data } = await this.$http.get('bulletins', { params });
        this.items = data.rows.map((it) => ({ ...it }));
        this.total = data.total;
      } finally {
        this.loading = false;
      }
    },

    showBulletinModal(item) {
      this.selectedBulletin = item;
      this.isBulletinModalShown = true;
    },

    showRemoveModal(item) {
      this.selectedBulletin = item;
      this.isRemoveModalShown = true;
    },

    toggleFilter() {
      this.isFilterShown = !this.isFilterShown;
    },

    hideFilter() {
      this.isFilterShown = false;
    }
  }
};
</script>
