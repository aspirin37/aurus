<template>
  <v-form
    v-if="isShown"
    class="promise-list__filter white mb-5"
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
              v-model="localFilter.gsdb"
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
        <v-col cols="4">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.part_number') }}
            </label>
            <v-autocomplete
              v-model="localFilter.partNumber"
              :loading="loadingParts"
              :items="parts"
              :search-input.sync="partSearch"
              item-text="number"
              item-value="number"
              :placeholder="$t('common.type_to_search')"
              cache-items
              hide-no-data
              hide-details
              clearable
              solo
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.sent') }}
            </label>
            <v-text-field
              v-model.number="localFilter.totalQty"
              type="number"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.last_order') }}
            </label>
            <date-picker
              v-model="localFilter.lastOrderDate"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.last_shipment') }}
            </label>
            <date-picker
              v-model="localFilter.lastDate"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.promised_shipment') }}
            </label>
            <date-picker
              v-model="localFilter.shippingDate"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.promised_amount') }}
            </label>
            <v-text-field
              v-model.number="localFilter.amount"
              type="number"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="promise-list__filter-apply"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            large
            class="promise-list__filter-apply-button"
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
  name: 'PromisesFilter',

  components: {
    DatePicker,
  },

  model: {
    prop: 'isShown',
  },

  props: {
    isShown: {
      type: Boolean,
      required: true,
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
        gsdb: '',
        plant: '',
        partNumber: '',
        totalQty: null,
        lastOrderDate: '',
        lastDate: '',
        shippingDate: '',
        amount: null,
      },

      suppliers: [],
      loadingSuppliers: false,
      supplierSearch: '',

      parts: [],
      loadingParts: false,
      partSearch: '',
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

    partSearch(value) {
      if (value && value !== this.localFilter.part) {
        this.getParts(value);
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

    async getParts(str) {
      this.loadingParts = true;

      const query = {
        number: { $regex: `.*${str}.*`, $options: 'i' },
      };

      try {
        const { data } = await this.$http.get('/parts', {
          params: { query },
        });
        this.parts = data.rows;
      } finally {
        this.loadingParts = false;
      }
    },

    submit() {
      this.$emit('applyFilter', this.localFilter);
    },
  },
};
</script>

<style lang="scss">
.promise-list__filter .v-input__slot {
  box-shadow: none !important;
}

.promise-list__filter-apply {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
