<template>
  <v-form
    v-if="isShown"
    class="aftersales-orders__filter white mb-5"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('common.date') }}
            </label>
            <date-picker
              v-model="localFilter.date"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="1">
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
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.aftersales_order_list.estimated_date') }}
            </label>
            <date-picker
              v-model="localFilter.estimatedDate"
              hide-details
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.aftersales_order_list.total_with_vat') }}
            </label>
            <v-text-field
              v-model="localFilter.totalWithVAT"
              type="number"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="1">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.aftersales_order_list.currency') }}
            </label>
            <v-text-field
              v-model="localFilter.currency"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('common.status') }}
            </label>
            <v-select
              v-model="localFilter.status"
              :items="statuses"
              clearable
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="aftersales-orders__filter-apply"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            large
            class="aftersales-orders__filter-apply-button"
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
  name: 'AftersalesOrdersFilter',

  components: {
    DatePicker
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
  },

  data() {
    return {
      localFilter: {
        date: '',
        number: '',
        estimatedDate: '',
        totalWithVAT: null,
        currency: '',
        status: ''
      },

      statuses: ['new', 'confirmed', 'closed']
    }
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
  }
}
</script>

<style lang="scss">
.aftersales-orders__filter .v-input__slot {
  box-shadow: none !important;
}

.aftersales-orders__filter-apply {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
