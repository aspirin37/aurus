<template>
  <v-form
    v-if="isShown"
    class="shipment-notices__filter white mb-5"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col cols="2">
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
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('common.plant') }}
            </label>
            <v-text-field
              v-model="localFilter.plant"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_list.start_date') }}
            </label>
            <date-picker
              v-model="localFilter.startDate"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_list.end_date') }}
            </label>
            <date-picker
              v-model="localFilter.endDate"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('common.number') }}
            </label>
            <v-text-field
              v-model="localFilter.number"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="shipment-notice-list__filter-apply"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            large
            class="shipment-notice-list__filter-apply-button"
          >
            {{ $t('common.apply') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import DatePicker from '@/components/common/DatePicker.vue';

export default {
  name: 'ShipmentNoticesFilter',

  components: {
    DatePicker,
  },

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
        plant: '',
        startDate: '',
        endDate: '',
        number: '',
      },

      suppliers: [],
      loadingSuppliers: false,
      supplierSearch: '',
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
.shipment-notice-list__filter .v-input__slot {
  box-shadow: none !important;
}

.shipment-notice-list__filter-apply {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
