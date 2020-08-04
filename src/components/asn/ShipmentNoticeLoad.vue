<template>
  <b-modal
    v-model="isShown"
    :title="$t('views.shipment_notice_list.create_asn_from_file')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @hidden="hideModal"
  >
    <div class="my-4">
      <div>
        <!-- eslint-disable max-len -->
        <button
          :disabled="loading"
          class="btn aurus-button aurus-button_line aurus-button_lowercase shipment-notice-load__btn"
          @click="downloadTemplate()"
        >
          <v-icon>mdi-download</v-icon>
          {{ $t('views.shipment_notice_list.download_template') }}
        </button>
        <!-- eslint-enable max-len -->
        <a
          v-if="template"
          v-show="false"
          ref="template"
          :href="template"
          download="asn-template.xlsx"
        />
        <!-- eslint-disable max-len -->
        <button
          :disabled="loading"
          class="btn aurus-button aurus-button_line aurus-button_lowercase shipment-notice-load__btn"
          @click="selectFile()"
        >
          {{ $t('views.shipment_notice_list.select_file') }}
        </button>
        <!-- eslint-enable max-len -->
        <span
          v-if="file"
          class="shipment-notice-load__filename"
        >{{ file.name }}</span>
        <input
          v-show="false"
          ref="file"
          type="file"
          accept=".xlsx"
          @change="setFile()"
        >
      </div>
    </div>

    <div class="v-application d-flex">
      <v-btn
        :disabled="loading"
        outlined
        large
        class="mr-4 flex-grow-1"
        @click="hideModal"
      >
        {{ $t('common.cancel') }}
      </v-btn>
      <v-btn
        :disabled="loading"
        color="primary"
        outlined
        large
        class="flex-grow-1"
        @click="uploadFile()"
      >
        <v-icon>mdi-upload</v-icon>
        {{ $t('common.upload') }}
      </v-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ShipmentNoticeLoad',

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShown: false,
      template: null,
      file: null,
      loading: false,
    };
  },

  watch: {
    value(val) {
      this.isShown = val;
    },
  },

  methods: {
    async downloadTemplate() {
      if (!this.template) {
        this.loading = true;
        try {
          const { data } = await this.$http.get('/asn/asn-template.xlsx', {
            headers: {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            responseType: 'blob',
          });
          this.template = URL.createObjectURL(data);
          await this.$nextTick();
        } finally {
          this.loading = false;
        }
      }
      this.$refs.template.click();
    },

    hideModal() {
      this.$emit('input', false);
    },

    selectFile() {
      this.$refs.file.value = null;
      this.$refs.file.click();
    },

    setFile() {
      [this.file] = this.$refs.file.files;
    },

    async uploadFile() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        await this.$http.post('/asn/create-from-xlsx', formData);
        this.hideModal();
        this.$emit('created');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shipment-notice-load__btn {
  padding: 10px 30px;
  margin-right: 20px;
}

.shipment-notice-load__filename {
  color: var(--topaz)
}
</style>
