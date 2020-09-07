<template>
  <v-form
    v-if="isShown"
    class="email-list__filter white mb-5"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('common.supplier') }}
            </label>
            <v-autocomplete
              v-model="localFilter.supplier"
              :loading="loadingSuppliers"
              :items="suppliers"
              :search-input.sync="supplierSearch"
              item-text="gsdb"
              item-value="gsdb"
              :readonly="!canGetFullList"
              :clearable="canGetFullList"
              :placeholder="$t('common.type_to_search')"
              cache-items
              hide-no-data
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="3">
          <div class="select-block select-block_white">
            <label class="select-block__label">
              {{ $t('views.email_list.type') }}
            </label>
            <v-select
              v-model="localFilter.type"
              :items="Object.values(EventTypes)"
              :readonly="!canGetFullList"
              :clearable="canGetFullList"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="4">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.email_list.to') }}
            </label>
            <v-text-field
              v-model="localFilter.to"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="email-list__filter-apply"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            large
            class="email-list__filter-apply-button"
          >
            {{ $t('common.apply') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'EmailsFilter',

  props: {
    isShown: {
      type: Boolean,
      default: () => false,
    },

    filter: {
      type: Object,
      required: true,
    },

    canGetFullList: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      localFilter: {
        supplier: '',
        type: '',
        to: '',
      },

      suppliers: [],
      loadingSuppliers: false,
      supplierSearch: '',

      EventTypes: {
        system: 'system',
        business: 'business',
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  watch: {
    isShown(value) {
      if (value) {
        this.init();
      }
    },

    supplierSearch(value) {
      if (value && value !== this.localFilter.supplier) {
        this.getSuppliers(value);
      }
    },
  },

  methods: {
    init() {
      if (!this.canGetFullList) {
        this.suppliers = [{ gsdb: this.user && this.user.gsdb }];
      }
      this.localFilter = { ...this.filter };
    },

    async getSuppliers(str) {
      this.loadingSuppliers = true;

      const query = {
        gsdb: { $regex: `.*${str}.*`, $options: 'i' },
      };

      try {
        const { data } = await this.$http.get('/suppliers', {
          params: { query },
        });
        this.suppliers = data.rows;
      } finally {
        this.loadingSuppliers = false;
      }
    },

    submit() {
      this.$emit('applyFilter', this.localFilter);
    },
  },
};
</script>

<style lang="scss">
.email-list__filter .v-input__slot {
  box-shadow: none !important;
}

.email-list__filter-apply {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
