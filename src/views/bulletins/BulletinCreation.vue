<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">
        {{ $t('views.bulletin_creation.bulletin_creation') }}
      </h1>
      <div class="ml-auto d-flex">
        <router-link
          to="/bulletins/list"
          class="create-add-page__top__back-link my-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
          >
            <path
              d="M9,4l.881.881L6.394,8.375H14v1.25H6.394l3.487,3.494L9,14,4,9Z"
              transform="translate(-4 -4)"
            />
          </svg>
          {{ $t('views.bulletin_creation.back_to_list') }}
        </router-link>
      </div>
    </div>
    <main class="create-add-page__main">
      <v-form
        class="create-add-form"
        @submit.prevent="create"
      >
        <div class="input-block input-block_white">
          <label class="input-block__label">{{ $t('views.bulletin_creation.subject') }}</label>
          <v-text-field
            v-model="bulletin.subject"
            solo
            :rules="[rules.required]"
          />
        </div>

        <div class="create-add-form__item create-add-form__item_three">
          <div class="input-block input-block_white">
            <label class="input-block__label">{{ $t('views.bulletin_creation.start_date') }}</label>
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
                  solo
                  :rules="[rules.required]"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="startDate"
                dark
                @input="isStartDatePickerShown = false"
              />
            </v-menu>
          </div>

          <div class="input-block input-block_white">
            <label class="input-block__label">{{ $t('views.bulletin_creation.start_time') }}</label>
            <v-menu
              ref="startTime"
              v-model="isStartTimePickerShown"
              :close-on-content-click="false"
              :return-value.sync="startTime"
              transition="scale-transition"
              offset-y
              nudge-bottom="10px"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startTime"
                  readonly
                  solo
                  :rules="[rules.required]"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-if="isStartTimePickerShown"
                v-model="startTime"
                dark
                @click:minute="$refs.startTime.save(startTime)"
              />
            </v-menu>
          </div>

          <div class="input-block input-block_white">
            <label class="input-block__label">{{ $t('views.bulletin_creation.end_date') }}</label>
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
                  solo
                  :rules="[rules.required]"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                dark
                @input="isEndDatePickerShown = false"
              />
            </v-menu>
          </div>
        </div>

        <div class="create-add-form__item">
          <div class="textarea-block textarea-block_white">
            <label class="textarea-block__label">{{ $t('views.bulletin_creation.text') }}</label>
            <v-textarea
              v-model="bulletin.text"
              outlined
              :rules="[rules.required]"
            />
          </div>
        </div>

        <div class="create-add-form__item create-add-form__item_two">
          <div class="create-add-form__item__wrapper create-add-form__item__wrapper_with-attach">
            <div class="select-block select-block_white">
              <label class="select-block__label">
                {{ $t('views.bulletin_creation.suppliers') }}
              </label>
              <v-select
                v-model="bulletin.suppliers"
                :items="suppliers"
                multiple
                solo
                chips
                :label="$t('common.all')"
                class="select-block__select"
              />
            </div>

            <div class="attach">
              <div class="attach-block">
                <div
                  v-for="(attachment, index) of attachments"
                  :key="index"
                  class="attach-block__element"
                >
                  <span class="attach-block__title">{{ attachment.file.name }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9.333"
                    height="12"
                    viewBox="0 0 9.333 12"
                    @click="removeAttachment(index)"
                  >
                    <!-- eslint-disable max-len -->
                    <path
                      d="M5.667,13.667A1.337,1.337,0,0,0,7,15h5.333a1.337,1.337,0,0,0,1.333-1.333v-8h-8Zm8.667-10H12L11.333,3H8l-.667.667H5V5h9.333Z"
                      transform="translate(-5 -3)"
                    />
                    <!-- eslint-enable max-len -->
                  </svg>
                </div>
              </div>

              <div class="attach-block attach-block_buttons">
                <input
                  ref="attachments"
                  type="file"
                  class="d-none"
                  @change="addAttachments"
                >
                <!-- eslint-disable max-len -->
                <button
                  type="button"
                  class="btn aurus-button aurus-button_line aurus-button_lowercase attach-block__button attach-block__button_upload"
                  :disabled="loading"
                  @click.prevent="selectAttachments"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7.182"
                    height="13.058"
                    viewBox="0 0 7.182 13.058"
                  >
                    <path
                      d="M2,10.591A3.589,3.589,0,0,1,5.591,7h6.855a2.612,2.612,0,0,1,0,5.223H6.9a1.632,1.632,0,1,1,0-3.264h4.9v1.306H6.838c-.359,0-.359.653,0,.653h5.608a1.306,1.306,0,0,0,0-2.612H5.591a2.285,2.285,0,0,0,0,4.57h6.2v1.306h-6.2A3.589,3.589,0,0,1,2,10.591Z"
                      transform="translate(-7 15.058) rotate(-90)"
                    />
                  </svg>
                  {{ $t('views.bulletin_creation.attach_file') }}
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="btn aurus-button aurus-button_line aurus-button_lowercase attach-block__button"
                >
                  {{ $t('common.create') }}
                </button>
                <!-- eslint-enable max-len -->
              </div>
            </div>
          </div>

          <div class="create-add-form__item__wrapper create-add-form__item__wrapper_with-checkbox">
            <span class="create-add-form__item__title">
              {{ $t('views.bulletin_creation.send_mails') }}
            </span>
            <div class="create-add-form__item__inner align-items-center my-auto">
              <!-- eslint-disable max-len -->
              <div
                class="custom-control custom-checkbox d-flex aurus-custom-control aurus-custom-control_white"
              >
                <input
                  id="add-messsage-mailing"
                  v-model="bulletin.isImportant"
                  type="checkbox"
                  class="custom-control-input"
                >
                <label
                  for="add-messsage-mailing"
                  class="custom-control-label"
                >
                  {{ $t('views.bulletin_creation.send_mails_true') }}
                </label>
              </div>
              <!-- eslint-enable max-len -->
            </div>
          </div>
        </div>
      </v-form>
    </main>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'BulletinCreation',

  data() {
    return {
      bulletin: {
        subject: '',
        startDate: null,
        endDate: null,
        text: '',
        suppliers: [],
        isImportant: false,
        attachments: [],
      },

      startDate: new Date().toISOString().substr(0, 10),
      startTime: '00:00',
      endDate: new Date().toISOString().substr(0, 10),

      attachments: [],

      isStartDatePickerShown: false,
      isStartTimePickerShown: false,
      isEndDatePickerShown: false,

      suppliers: [],

      loading: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    };
  },

  computed: {
    startDateFormatted() {
      return this.$moment.utc(this.startDate).format('L');
    },

    endDateFormatted() {
      return this.$moment.utc(this.endDate).format('L');
    },
  },

  created() {
    this.getSuppliers();
  },

  methods: {
    selectAttachments() {
      this.$refs.attachments.value = '';
      this.$refs.attachments.click();
    },

    addAttachments() {
      const attachments = [...this.$refs.attachments.files].map((item) => ({
        file: item,
        blobName: '',
      }));
      this.attachments.push(...attachments);
    },

    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },

    async getSuppliers() {
      const { data } = await this.$http.get('suppliers');
      this.suppliers = data.rows.map((item) => item.gsdb);
    },

    async postAttachment(attachment) {
      let { blobName } = attachment.blobName;
      if (!blobName) {
        const uuid = uuidv4();
        const { path } = await this.$http.get(
          `/containers/${this.$configBULLETINS_CONTAINER}/${uuid}`,
          {
            params: {
              type: attachment.file.type,
              operation: 'write',
            },
          },
        );
        await this.$http.post(path, attachment);
        blobName = uuid;
      }
      const { type, name } = attachment;
      return { type, name, blobName };
    },

    async postAttachments() {
      const uploaders = this.attachments.map((attachment) => this.postAttachment(attachment));
      const attachments = await Promise.all(uploaders);
      return attachments;
    },

    async create() {
      const [hour, minute] = this.startTime.split(':');
      this.bulletin.startDate = this.$moment.utc(this.startDate).hour(hour).minute(minute);
      this.bulletin.endDate = this.$moment.utc(this.endDate);

      if (!this.validate()) {
        return;
      }

      this.loading = true;
      try {
        this.bulletin.attachments = await this.postAttachments();
        await this.$http.post('bulletins', this.bulletin);
        this.$router.push('/bulletins/list');
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

<style lang="scss" scoped>
.create-add-page__top__back-link {
  text-decoration: none;
  transition: color 0.3s ease-in-out 0s;

  svg {
    fill: #ad7c59;
    margin-right: 5px;
    transition: fill 0.3s ease-in-out 0s;
  }

  &:hover {
    color: var(--margaritas);

    svg {
      fill: var(--margaritas);
    }
  }
}

.create-add-page__main {
  padding: 25px;
  min-height: calc(100vh - 215px);
  background-color: #fff;

  .create-add-form {
    max-width: 1082px;
    display: grid;
    row-gap: 3px;

    &__item {
      display: grid;
      column-gap: 50px;

      &_three {
        grid-template-columns: repeat(3, auto);
      }

      &_two {
        grid-template-columns: repeat(2, 1fr);
      }

      &__wrapper {
        display: grid;
        row-gap: 7px;

        &_with-attach {
          row-gap: 40px;
        }

        &_with-checkbox {
          grid-template-rows: 19px 38px;
        }
      }
    }

    .attach {
      display: grid;
      row-gap: 20px;
    }

    .attach-block {
      &_buttons {
        display: grid;
        grid-template-columns: repeat(2, auto);
        column-gap: 20px;
      }

      &__element {
        background-color: #f8f6f5;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__title {
        color: var(--sapphirus);
      }

      svg {
        fill: var(--margaritas);
        cursor: pointer;
        transition: fill 0.3s ease-in-out;

        &:hover {
          fill: var(--platinum);
        }
      }

      &__button {
        width: 100%;
        padding: 12px 10px;

        &_upload {
          color: var(--aurum);

          svg {
            fill: var(--aurum);
          }

          &:hover {
            color: var(--margaritas);

            svg {
              fill: var(--margaritas);
            }
          }

          &:active {
            color: #9d6d4c;

            svg {
              fill: #9d6d4c;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.create-add-page__main .v-input__slot {
  box-shadow: none !important;
}
</style>
