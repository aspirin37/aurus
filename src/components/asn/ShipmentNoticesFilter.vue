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
              :items="suppliers"
              item-text="gsdb"
              value="gsdb"
              :readonly="!canGetFullList"
              :clearable="canGetFullList"
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
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_list.start_date') }}
            </label>
            <v-menu
              v-model="isStartDatePickerShown"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="startDateFormatted"
                  readonly
                  hide-details
                  solo
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="localFilter.startDate"
                dark
                @input="isStartDatePickerShown = false"
              />
            </v-menu>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_list.end_date') }}
            </label>
            <v-menu
              v-model="isEndDatePickerShown"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="endDateFormatted"
                  readonly
                  hide-details
                  solo
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="localFilter.endDate"
                dark
                @input="isEndDatePickerShown = false"
              />
            </v-menu>
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
export default {
  name: 'ShipmentNoticesFilter',

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

    suppliers: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      localFilter: {
        supplier: '',
        plant: '',
        startDate: this.$moment().format().substr(0, 10),
        endDate: this.$moment().format().substr(0, 10),
        number: '',
      },

      isStartDatePickerShown: false,
      isEndDatePickerShown: false,
    };
  },

  computed: {
    startDateFormatted() {
      return this.localFilter.startDate && this.$moment(this.localFilter.startDate).format('L');
    },

    endDateFormatted() {
      return this.localFilter.endDate && this.$moment(this.localFilter.endDate).format('L');
    },
  },

  watch: {
    isShown() {
      this.init();
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
