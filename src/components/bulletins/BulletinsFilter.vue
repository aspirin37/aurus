<template>
  <v-form
    v-if="isShown"
    class="bulletin-list__filter white mb-5"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.bulletin_list.subject') }}
            </label>
            <v-text-field
              v-model="localFilter.subject"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">{{ $t('views.bulletin_list.start_date') }}</label>
            <date-picker v-model="localFilter.startDate" hide-details />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">{{ $t('views.bulletin_list.end_date') }}</label>
            <date-picker v-model="localFilter.endDate" hide-details />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="input-block input-block_white">
            <label class="input-block__label">{{ $t('views.bulletin_list.updated_at') }}</label>
            <date-picker v-model="localFilter.updatedAt" hide-details />
          </div>
        </v-col>
        <v-col cols="2">
          <div class="select-block select-block_white">
            <label class="select-block__label">{{ $t('views.bulletin_list.email') }}</label>
            <v-select
              v-model="localFilter.isImportant"
              :items="emailOptions"
              solo
              hide-details
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="bulletin-list__filter-apply"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            large
            class="bulletin-list__filter-apply-button"
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
  name: 'BulletinsFilter',

  components: {
    DatePicker
  },

  model: {
    prop: 'isShown',
  },

  props: {
    isShown: {
      type: Boolean,
      default: false,
    },

    filter: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localFilter: {
        subject: '',
        startDate: '',
        endDate: '',
        updatedAt: '',
        isImportant: null,
      },

      emailOptions: [
        { value: null, text: '' },
        { value: false, text: this.$t('common.no') },
        { value: true, text: this.$t('common.yes') },
      ],
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
.bulletin-list__filter .v-input__slot {
  box-shadow: none !important;
}

.bulletin-list__filter-apply {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
