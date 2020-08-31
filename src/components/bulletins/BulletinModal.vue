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
              <date-picker
                v-model="bulletin.startDate"
                required
              />
            </div>
          </v-col>

          <v-col cols="4">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.bulletin_list.start_time') }}</label>
              <time-picker
                v-model="bulletin.startTime"
                required
              />
            </div>
          </v-col>

          <v-col cols="4">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.bulletin_list.end_date') }}</label>
              <date-picker
                v-model="bulletin.endDate"
                required
              />
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

        <div class="bulletin-modal__attachments">
          <div
            v-for="(attachment, index) of bulletin.attachments"
            :key="index"
            class="bulletin-modal__attachment"
          >
            <a
              v-if="attachment.path"
              :href="attachment.path"
              :download="attachment.name"
              class="bulletin-modal__attachment-link bulletin-modal__attachment-name"
            >
              {{ attachment.name }}
            </a>
            <span
              v-else
              class="bulletin-modal__attachment-name"
            >{{ attachment.file.name }}</span>
            <v-icon
              class="bulletin-modal__attachment-delete"
              @click="removeAttachment(index)"
            >
              delete
            </v-icon>
          </div>
        </div>

        <div>
          <input
            ref="attachments"
            type="file"
            class="d-none"
            @change="addAttachments"
          >
          <!-- eslint-disable max-len -->
          <button
            type="button"
            class="btn aurus-button aurus-button_line aurus-button_lowercase bulletin-modal__attach-file"
            :disabled="loading"
            @click.prevent="selectAttachments"
          >
            <v-icon>mdi-paperclip</v-icon>
            {{ $t('views.bulletin_list.attach_file') }}
          </button>
          <!-- eslint-enable max-len -->
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
import { v4 as uuidv4 } from 'uuid';
import DatePicker from '@/components/common/DatePicker.vue';
import TimePicker from '@/components/common/TimePicker.vue';

export default {
  name: 'BulletinModal',

  components: {
    DatePicker,
    TimePicker,
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
        attachments: [],
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
        attachments,
      } = this.selectedBulletin;

      this.bulletin = {
        subject,
        text,
        startDate: this.$moment.utc(startDate).format('L'),
        startTime: this.$moment.utc(startDate).format('HH:mm'),
        endDate: this.$moment.utc(endDate).format('L'),
        attachments: [...attachments],
      };
    },

    hideModal() {
      this.$emit('input', false);
    },

    async postAttachment(attachment) {
      let { blobName } = attachment;

      if (blobName) {
        return { ...attachment };
      }

      const uuid = uuidv4();
      const formData = new FormData();
      formData.append('file', attachment.file);
      await this.$http.post('/containers/file', formData, {
        headers: { container: this.$config.BULLETINS_CONTAINER, file: uuid },
      });
      blobName = uuid;
      const { type, name } = attachment.file;

      return { type, name, blobName };
    },

    async postAttachments() {
      const uploaders = this.bulletin.attachments.map(
        (attachment) => this.postAttachment(attachment),
      );
      const attachments = await Promise.all(uploaders);
      return attachments;
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
        const attachments = await this.postAttachments();
        await this.$http.patch(`/bulletins/${this.selectedBulletin.id}`, {
          subject,
          text,
          startDate,
          endDate,
          attachments,
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

    selectAttachments() {
      this.$refs.attachments.value = '';
      this.$refs.attachments.click();
    },

    addAttachments() {
      const attachments = [...this.$refs.attachments.files].map((item) => ({
        file: item,
        blobName: '',
      }));
      this.bulletin.attachments.push(...attachments);
    },

    removeAttachment(index) {
      this.bulletin.attachments.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.bulletin-modal__attachments {
  background-color: #f8f6f5;
}

.bulletin-modal__attachment {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;

  &-name {
    color: var(--v-anchor-base);
  }

  &-link {
    text-decoration: none;
    transition: color 0.3s ease-in-out 0s;

    &:hover {
      color: var(--margaritas);
    }
  }

  &-delete {
    color: var(--margaritas);
    transition: fill 0.3s ease-in-out;
    font-size: 16px;

    &:hover {
      color: var(--platinum);
    }
  }
}

.bulletin-modal__attach-file {
  padding: 10px 40px;

  i {
    color: var(--black);
    font-size: 16px;
  }

  &:hover i {
    color: var(--aurum);
  }

  &:active i {
    color: var(--aurum);
  }
}
</style>
