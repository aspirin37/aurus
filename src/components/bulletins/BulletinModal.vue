<template>
  <b-modal
    ref="modal"
    v-model="isShown"
    :title="$t('views.bulletin_list.bulletin_edit')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @shown="getBulletin"
    @hidden="hideModal"
  >
    <v-form @submit.prevent="submit">
      <div
        class="v-application aurus-modal__body pt-0"
      >
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('views.bulletin_list.subject') }}
          </label>
          <v-text-field
            v-model="bulletin.subject"
            solo
            :rules="[rules.required]"
          />
        </div>

        <v-row>
          <v-col cols="4">
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
                    v-model="startDateFormatted"
                    readonly
                    hide-details
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="bulletin.startDate"
                  dark
                  @input="isStartDatePickerShown = false"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="4">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.bulletin_list.start_time') }}</label>
              <v-menu
                ref="startTime"
                v-model="isStartTimePickerShown"
                :close-on-content-click="false"
                :return-value.sync="bulletin.startTime"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="bulletin.startTime"
                    readonly
                    hide-details
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="isStartTimePickerShown"
                  v-model="bulletin.startTime"
                  dark
                  @click:minute="$refs.startTime.save(bulletin.startTime)"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="4">
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
                    v-model="endDateFormatted"
                    readonly
                    hide-details
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="bulletin.endDate"
                  dark
                  @input="isEndDatePickerShown = false"
                />
              </v-menu>
            </div>
          </v-col>
        </v-row>

        <div class="textarea-block textarea-block_white">
          <label class="textarea-block__label">
            {{ $t('views.bulletin_list.text') }}
          </label>
          <v-textarea
            v-model="bulletin.text"
            outlined
            :rules="[rules.required]"
          />
        </div>
      </div>

      <div class="v-application d-flex">
        <v-btn
          class="mr-4 flex-grow-1"
          outlined
          large
          :disabled="loading"
          @click="hideModal"
        >
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          class="flex-grow-1"
          :loading="loading"
          outlined
          large
          type="submit"
        >
          {{ $t('common.save') }}
        </v-btn>
      </div>
    </v-form>
  </b-modal>
</template>

<script>
export default {
  name: 'BulletinModal',

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    selectedBulletin: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      bulletin: {
        subject: '',
        text: '',
        startDate: null,
        startTime: null,
        endDate: null,
      },

      loading: false,

      isShown: false,

      isStartDatePickerShown: false,
      isStartTimePickerShown: false,
      isEndDatePickerShown: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    };
  },

  computed: {
    startDateFormatted() {
      return this.$moment.utc(this.bulletin.startDate).format('L');
    },

    endDateFormatted() {
      return this.$moment.utc(this.bulletin.endDate).format('L');
    },
  },

  watch: {
    value(val) {
      this.isShown = val;
    },
  },

  methods: {
    getBulletin() {
      const {
        subject,
        text,
        startDate,
        endDate,
      } = this.selectedBulletin;

      this.bulletin = {
        subject,
        text,
        startDate: new Date(startDate).toISOString().substr(0, 10),
        startTime: new Date(startDate).toISOString().substr(11, 5),
        endDate: new Date(endDate).toISOString().substr(0, 10),
      };
    },

    hideModal() {
      this.$emit('input', false);
    },

    async submit() {
      const { subject, text } = this.bulletin;

      const [hour, minute] = this.bulletin.startTime.split(':');
      const startDate = this.$moment.utc(this.bulletin.startDate).hour(hour).minute(minute);
      const endDate = this.$moment.utc(this.bulletin.endDate);

      if (!this.validate()) {
        return;
      }

      this.loading = true;

      try {
        await this.$http.patch(`/bulletins/${this.selectedBulletin.id}`, {
          subject,
          text,
          startDate,
          endDate,
        });
        this.hideModal();
        this.$emit('submit');
      } finally {
        this.loading = false;
      }
    },

    validate() {
      const required = ['subject', 'startDate', 'endDate', 'text'];
      return required.every((field) => this.bulletin[field]);
    },
  },
};
</script>
