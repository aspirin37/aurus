<template>
  <v-form
    v-if="isShown"
    class="bulletin-list__filter white mb-5"
  >
    <v-container>
      <v-row>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.bulletin_list.subject') }}
            </label>
            <v-text-field
              v-model="filter.subject"
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
                  @click:clear="filter.startDate = null"
                />
              </template>
              <v-date-picker
                v-model="filter.startDate"
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
                  @click:clear="filter.endDate = null"
                />
              </template>
              <v-date-picker
                v-model="filter.endDate"
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
                  @click:clear="filter.updatedAt = null"
                />
              </template>
              <v-date-picker
                v-model="filter.updatedAt"
                dark
                @input="isUpdatedAtPickerShown = false"
              />
            </v-menu>
          </div>
        </v-col>
        <v-col cols="1">
          <div class="select-block select-block_white">
            <label class="select-block__label">{{ $t('views.bulletin_list.email') }}</label>
            <v-select
              v-model="filter.isImportant"
              :items="emailOptions"
              solo
              hide-details
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="bulletin-list__filter-submit"
        >
          <v-btn
            color="primary"
            outlined
            large
            class="bulletin-list__filter-submit-button"
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
  name: 'BulletinsFilter',

  model: {
    prop: 'isShown',
  },

  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      filter: {
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
      return this.filter.startDate && this.$moment.utc(this.filter.startDate).format('L');
    },

    endDateFormatted() {
      return this.filter.endDate && this.$moment.utc(this.filter.endDate).format('L');
    },

    updatedAtFormatted() {
      return this.filter.updatedAt && this.$moment.utc(this.filter.updatedAt).format('L');
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
      if (this.filter.subject) {
        filter.subject = {
          $regex: `.*${this.filter.subject}.*`,
          $options: 'i',
        };
      }
      if (this.filter.startDate) {
        filter.startDate = {
          $gte: this.$moment.utc(this.filter.startDate),
          $lte: this.$moment.utc(this.filter.startDate).endOf('day'),
        };
      }
      if (this.filter.endDate) {
        filter.endDate = this.$moment.utc(this.filter.endDate);
      }
      if (this.filter.updatedAt) {
        filter.updatedAt = {
          $gte: this.$moment.utc(this.filter.updatedAt),
          $lte: this.$moment.utc(this.filter.updatedAt).endOf('day'),
        };
      }
      if (this.filter.isImportant !== null) {
        filter.isImportant = this.filter.isImportant;
      }
      return filter;
    },
  },
};
</script>

<style lang="scss">
.bulletin-list__filter .v-input__slot {
  box-shadow: none !important;
}

.bulletin-list__filter-submit {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
