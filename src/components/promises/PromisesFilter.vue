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
              :items="suppliers"
              item-text="gsdb"
              value="gsdb"
              hide-details
              clearable
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
              :items="parts"
              item-text="number"
              item-value="number"
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
            <v-menu
              v-model="isLastOrderDatePickerShown"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="lastOrderDateFormatted"
                  readonly
                  hide-details
                  solo
                  clearable
                  v-on="on"
                  @click:clear="localFilter.lastOrderDate = null"
                />
              </template>
              <v-date-picker
                v-model="localFilter.lastOrderDate"
                dark
                @input="isLastOrderDatePickerShown = false"
              />
            </v-menu>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.last_shipment') }}
            </label>
            <v-menu
              v-model="isLastDatePickerShown"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="lastDateFormatted"
                  readonly
                  hide-details
                  solo
                  clearable
                  v-on="on"
                  @click:clear="localFilter.lastDate = null"
                />
              </template>
              <v-date-picker
                v-model="localFilter.lastDate"
                dark
                @input="isLastDatePickerShown = false"
              />
            </v-menu>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.promised_shipment') }}
            </label>
            <v-menu
              v-model="isShippingDatePickerShown"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="shippingDateFormatted"
                  readonly
                  hide-details
                  solo
                  clearable
                  v-on="on"
                  @click:clear="localFilter.shippingDate = null"
                />
              </template>
              <v-date-picker
                v-model="localFilter.shippingDate"
                dark
                @input="isShippingDatePickerShown = false"
              />
            </v-menu>
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
export default {
  name: 'PromisesFilter',

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

    suppliers: {
      type: Array,
      default: () => [],
    },

    parts: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      localFilter: {
        gsdb: '',
        plant: '',
        partNumber: '',
        totalQty: null,
        lastOrderDate: null,
        lastDate: null,
        shippingDate: null,
        amount: null,
      },

      isLastOrderDatePickerShown: false,
      isLastDatePickerShown: false,
      isShippingDatePickerShown: false,
    };
  },

  computed: {
    lastOrderDateFormatted() {
      return this.localFilter.lastOrderDate
        && this.$moment.utc(this.localFilter.lastOrderDate).format('L');
    },

    lastDateFormatted() {
      return this.localFilter.lastDate
        && this.$moment.utc(this.localFilter.lastDate).format('L');
    },

    shippingDateFormatted() {
      return this.localFilter.shippingDate
        && this.$moment.utc(this.localFilter.shippingDate).format('L');
    },
  },

  watch: {
    isShown(value) {
      if (value) {
        this.init();
      }
    },
  },

  methods: {
    init() {
      this.localFilter = { ...this.filter };
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
