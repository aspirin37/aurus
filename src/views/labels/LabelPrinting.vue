<template>
  <div class="labels-page">
    <div class="mb-3">
      <h1 class="display-1 primary--text">
        {{ $t('views.label_printing.label_printing') }}
      </h1>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="6"
          class="pl-0"
        >
          <div class="step px-10 py-6 white">
            <h2 class="display-1 primary--text">
              {{ $t('views.label_printing.step1') }}
            </h2>
            <h3 class="h5 step__top__description">
              Загрузите данные для формирования этикетки
            </h3>


            <div class="mt-10">
              <!-- eslint-disable max-len -->
              <button
                :disabled="loading"
                class="btn aurus-button aurus-button_line aurus-button_lowercase step_first__buttons__button step_first__buttons__button_download mr-5"
                @click="downloadTemplate()"
              >
                <v-icon>mdi-download</v-icon>
                {{ $t('views.label_printing.download_template') }}
              </button>
              <!-- eslint-enable max-len -->
              <a
                v-if="template"
                v-show="false"
                ref="template"
                :href="template.path"
              />
              <!-- eslint-disable max-len -->
              <button
                :disabled="loading"
                class="btn aurus-button aurus-button_line aurus-button_lowercase step_first__buttons__button"
                @click="selectFile()"
              >
                <v-icon>mdi-upload</v-icon>
                {{ $t('common.upload') }}
              </button>
              <!-- eslint-enable max-len -->
              <input
                v-show="false"
                ref="file"
                type="file"
                accept=".xlsx"
                @change="setFile()"
              >
            </div>

            <div class="step_first__selected">
              <span v-if="file">
                <span class="step_first__selected-label">
                  {{ $t('views.label_printing.selected_file') }}
                </span>
                <span class="step_first__selected-file">{{ file.name }}</span>
              </span>
            </div>
          </div>
        </v-col>

        <v-col
          cols="6"
          class="pr-0"
        >
          <div class="step px-10 py-6 white">
            <h2 class="display-1 primary--text">
              {{ $t('views.label_printing.step2') }}
            </h2>
            <h3 class="h5 step__top__description">
              {{ $t('views.label_printing.print') }}
            </h3>

            <div class="mt-10">
              <!-- eslint-disable max-len -->
              <button
                :disabled="loading"
                class="btn aurus-button aurus-button_line aurus-button_lowercase step_second__buttons__button"
                @click="createLabels()"
              >
                {{ $t('views.label_printing.create_labels') }}
              </button>
              <!-- eslint-enable max-len -->
              <a
                v-if="pdf"
                v-show="false"
                ref="pdf"
                :href="pdf"
                download="labels.pdf"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LabelPrinting',

  data() {
    return {
      template: null,
      file: null,
      pdf: null,
      loading: false,
      copyAmount: 0,
    };
  },

  methods: {
    async downloadTemplate() {
      if (!this.template) {
        this.loading = true;
        try {
          const { data } = await this.$http.get('/labels/template');
          this.template = data;
          await this.$nextTick();
        } finally {
          this.loading = false;
        }
      }
      this.$refs.template.click();
    },

    selectFile() {
      this.$refs.file.value = null;
      this.$refs.file.click();
    },

    setFile() {
      [this.file] = this.$refs.file.files;
    },

    async createLabels() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        const { data } = await this.$http.post('/labels', formData, { responseType: 'blob' });
        this.pdf = `data:application/pdf;charset=utf-8;%EF%BB%BF,${data}`;
        await this.$nextTick();
        this.$refs.pdf.click();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.labels-page {
  .step {
    height: 280px;
  }

  .step__top__description {
    color: var(--topaz);
  }

  .step_first__buttons__button {
    padding: 12px 25px;

    i {
      font-size: 16px;
    }

    &:hover {
      i {
        color: var(--aurum);
      }
    }

    &_download {
      color: var(--aurum);

      i {
        color: var(--aurum);
      }

      &:hover {
        color: var(--margaritas);

        i {
          color: var(--margaritas);
        }
      }
    }
  }

  .step_first__selected {
    height: 50px;
    margin-top: 30px;

    &-label {
      color: var(--platinum);
    }

    &-filename {
      color: var(--topaz)
    }
  }

  .step_second__buttons__button {
    padding: 12px 25px;
  }
}
</style>
