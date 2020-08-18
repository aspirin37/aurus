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
                  clearable
                  v-on="on"
                  @click:clear="localFilter.startDate = null"
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
            <label class="input-block__label">{{ $t('views.bulletin_list.end_date') }}</label>
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
                  clearable
                  v-on="on"
                  @click:clear="localFilter.endDate = null"
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
            <label class="input-block__label">{{ $t('views.bulletin_list.updated_at') }}</label>
            <v-menu
              v-model="isUpdatedAtPickerShown"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="updatedAtFormatted"
                  readonly
                  hide-details
                  solo
                  clearable
                  v-on="on"
                  @click:clear="localFilter.updatedAt = null"
                />
              </template>
              <v-date-picker
                v-model="localFilter.updatedAt"
                dark
                @input="isUpdatedAtPickerShown = false"
              />
            </v-menu>
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
export default {
  name: 'BulletinsFilter',

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
        startDate: null,
        endDate: null,
        updatedAt: null,
        isImportant: null,
      },

      isStartDatePickerShown: false,
      isEndDatePickerShown: false,
      isUpdatedAtPickerShown: false,

      emailOptions: [
        { value: null, text: '' },
        { value: false, text: this.$t('common.no') },
        { value: true, text: this.$t('common.yes') },
      ],
    };
  },

  computed: {
    startDateFormatted() {
      return this.localFilter.startDate && this.$moment.utc(this.localFilter.startDate).format('L');
    },

    endDateFormatted() {
      return this.localFilter.endDate && this.$moment.utc(this.localFilter.endDate).format('L');
    },

    updatedAtFormatted() {
      return this.localFilter.updatedAt && this.$moment.utc(this.localFilter.updatedAt).format('L');
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
