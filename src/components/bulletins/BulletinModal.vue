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
              <date-picker v-model="bulletin.startDate" required />
            </div>
          </v-col>

          <v-col cols="4">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.bulletin_list.start_time') }}</label>
              <time-picker v-model="bulletin.startTime" required />
            </div>
          </v-col>

          <v-col cols="4">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.bulletin_list.end_date') }}</label>
              <date-picker v-model="bulletin.endDate" required />
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
import DatePicker from '@/components/common/DatePicker.vue';
import TimePicker from '@/components/common/TimePicker.vue';

export default {
  name: 'BulletinModal',

  components: {
    DatePicker,
    TimePicker
  },

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
        startDate: '',
        startTime: '',
        endDate: '',
      },

      loading: false,
      isShown: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    };
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
        startDate: this.$moment.utc(startDate).format('L'),
        startTime: this.$moment.utc(startDate).format('HH:mm'),
        endDate: this.$moment.utc(endDate).format('L'),
      };
    },

    hideModal() {
      this.$emit('input', false);
    },

    async submit() {
      const { subject, text } = this.bulletin;

      const [hour, minute] = this.bulletin.startTime.split(':');
      const startDate = this.$moment.utc(this.bulletin.startDate, 'L').hour(hour).minute(minute);
      const endDate = this.$moment.utc(this.bulletin.endDate, 'L');

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
