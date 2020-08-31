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
        startDate: '',
        endDate: '',
        number: '',
      },
    };
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
