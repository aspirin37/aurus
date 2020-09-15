<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        {{ $t('views.bulletin_list.bulletin_list') }}
      </h1>
      <div class="ml-auto">
        <v-btn
          to="/bulletins/list/create"
          class="btn mr-4"
          color="primary"
          outlined
          large
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('common.add') }}
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
    <bulletins-filter
      v-model="isFilterShown"
      :filter="filter"
      @applyFilter="applyFilter"
    />
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :footer-props="{ itemsPerPageOptions: [10, 20, 50, 100] }"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
    >
      <template v-slot:item.startDate="{ item }">
        {{ $moment.utc(item.startDate).format('L LT') }}
      </template>
      <template v-slot:item.endDate="{ item }">
        {{ $moment.utc(item.endDate).format('L LT') }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ $moment.utc(item.updatedAt).format('L LT') }}
      </template>
      <template v-slot:item.isImportant="{ item }">
        {{ item.isImportant ? $t('common.yes') : $t('common.no') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{hover}">
          <v-icon
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
  name: 'BulletinList',

  components: {
    BulletinsFilter,
    BulletinModal,
    BulletinRemove,
  },

  data() {
    return {
      headers: [
        {
          text: this.$t('views.bulletin_list.subject'),
          value: 'subject',
        },
        {
          text: this.$t('views.bulletin_list.start_date'),
          value: 'startDate',
        },
        {
          text: this.$t('views.bulletin_list.end_date'),
          value: 'endDate',
        },
        {
          text: this.$t('views.bulletin_list.edited_by'),
          value: 'editedBy.name',
          sortable: false,
        },
        {
          text: this.$t('views.bulletin_list.updated_at'),
          value: 'updatedAt',
        },
        {
          text: this.$t('views.bulletin_list.email'),
          value: 'isImportant',
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
        subject: '',
        startDate: '',
        endDate: '',
        updatedAt: '',
        isImportant: null,
      },

      loading: false,
      isBulletinModalShown: false,
      isRemoveModalShown: false,
      isFilterShown: false,

      selectedBulletin: null,
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

  methods: {
    async getItems() {
      this.loading = true;
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      const filter = this.mapFilter();

      const params = {};
      params.query = { isActive: true, ...filter };
      params.validity = 'all';
      params.pageSize = itemsPerPage === -1 ? 0 : itemsPerPage;
      params.page = page;
      if (sortBy && sortBy.length) {
        params.sort = `${sortDesc[0] ? '-' : ''}${sortBy[0]}`;
      }

      try {
        const { data } = await this.$http.get('bulletins', { params });
        this.items = data.rows.map((item) => ({
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          createdAt: new Date(item.createdAt),
          updatedAt: item.updatedAt && new Date(item.updatedAt),
        }));
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

    applyFilter(filter) {
      this.isFilterShown = false;
      this.filter = { ...filter };
      this.getItems();
    },

    mapFilter() {
      const filter = {};
      if (this.filter.subject) {
        filter.subject = {
          $regex: `.*${this.filter.subject}.*`,
          $options: 'i',
        };
      }
      if (this.filter.startDate) {
        filter.startDate = {
          $gte: this.$moment.utc(this.filter.startDate, 'L'),
          $lte: this.$moment.utc(this.filter.startDate, 'L').endOf('day'),
        };
      }
      if (this.filter.endDate) {
        filter.endDate = this.$moment.utc(this.filter.endDate, 'L');
      }
      if (this.filter.updatedAt) {
        filter.updatedAt = {
          $gte: this.$moment.utc(this.filter.updatedAt, 'L'),
          $lte: this.$moment.utc(this.filter.updatedAt, 'L').endOf('day'),
        };
      }
      if (this.filter.isImportant !== null) {
        filter.isImportant = this.filter.isImportant;
      }
      return filter;
    },
  },
};
</script>
