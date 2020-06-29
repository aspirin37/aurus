<template>
  <v-form
    v-if="isShown"
    class="promise-list__filter white mb-5"
  >
    <v-container>
      <v-row>
        <v-col cols="4">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.supplier') }}
            </label>
            <v-text-field
              v-model="filter.gsdb"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="4">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.plant') }}
            </label>
            <v-text-field
              v-model="filter.plant"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="4">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.promise_list.detail_number') }}
            </label>
            <v-text-field
              v-model="filter.partNumber"
              hide-details
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
              v-model.number="filter.totalQty"
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
                  @click:clear="filter.lastOrderDate = null"
                />
              </template>
              <v-date-picker
                v-model="filter.lastOrderDate"
                dark
                @input="isLastOrderDatePickerShown = false"
              />
            </v-menu>
          </div>
        </v-col>
        <v-col cols="2">
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
                  @click:clear="filter.lastDate = null"
                />
              </template>
              <v-date-picker
                v-model="filter.lastDate"
                dark
                @input="isLastDatePickerShown = false"
              />
            </v-menu>
          </div>
        </v-col>
        <v-col cols="2">
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
                  @click:clear="filter.shippingDate = null"
                />
              </template>
              <v-date-picker
                v-model="filter.shippingDate"
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
              v-model.number="filter.amount"
              type="number"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="2" class="promise-list__filter-submit">
          <v-btn
            color="primary"
            outlined
            large
            class="promise-list__filter-submit-button"
            @click="submit"
          >
            Применить
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
      default: false
    }
  },

  data() {
    return {
      filter: {
        gsdb: '',
        plant: '',
        partNumber: '',
        totalQty: null,
        lastOrderDate: null,
        lastDate: null,
        shippingDate: null,
        amount: null
      },

      isLastOrderDatePickerShown: false,
      isLastDatePickerShown: false,
      isShippingDatePickerShown: false
    }
  },

  computed: {
    lastOrderDateFormatted() {
      return this.filter.lastOrderDate && this.$d(new Date(this.filter.lastOrderDate));
    },

    lastDateFormatted() {
      return this.filter.lastDate && this.$d(new Date(this.filter.lastDate));
    },

    shippingDateFormatted() {
      return this.filter.shippingDate && this.$d(new Date(this.filter.shippingDate));
    },
  },

  methods: {
    hide() {
      this.$emit('input', false);
    },

    submit() {
      this.hide();
      const filter = this.mapFilter();
      this.$emit('submitFilter', filter);
    },

    mapFilter() {
      const filter = {};
      if (this.filter.gsdb) {
        filter.gsdb = this.filter.gsdb;
      }
      if (this.filter.plant) {
        filter.plant = this.filter.plant;
      }
      if (this.filter.partNumber) {
        filter.part.number = this.filter.partNumber;
      }
      if (typeof this.filter.totalQty === 'number') {
        filter.totalQty = this.filter.totalQty;
      }
      if (this.filter.lastOrderDate) {
        filter.lastOrderDate = new Date(this.filter.lastOrderDate);
      }
      if (this.filter.lastDate) {
        filter.lastDate = new Date(this.filter.lastDate);
      }
      if (this.filter.shippingDate) {
        filter.shippingDate = new Date(this.filter.shippingDate);
      }
      if (typeof this.filter.amount === 'number') {
        filter.amount = this.filter.amount;
      }
      return filter;
    },
  }
}
</script>

<style lang="scss">
.promise-list__filter .v-input__slot {
  box-shadow: none !important;
}

.promise-list__filter-submit {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
