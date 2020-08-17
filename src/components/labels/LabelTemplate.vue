<template>
  <div class="label-template">
    <h2 class="label-template__fields h5 mb-5">{{ header }}</h2>
    <div
      v-if="template"
      class="mb-5 ml-1"
    >
      <span>{{ $t('views.label_template.current_template') }}</span>
      <a :href="template.path">{{ template.name }}</a>
    </div>
    <input
      v-show="false"
      ref="file"
      type="file"
      accept=".xml"
      @change="setFile"
    >
    <button
      :disabled="loading"
      class="btn aurus-button aurus-button_line aurus-button_lowercase label-template__select"
      @click="selectFile"
    >
      {{ $t('views.label_template.select_template') }}
    </button>
    <button
      :disabled="loading"
      class="btn aurus-button aurus-button_line aurus-button_lowercase label-template__save"
      @click="saveTemplate"
    >
      {{ $t('common.save') }}
    </button>
    <div class="label-template__selected">
      <span v-if="file">
        <span class="label-template__selected-label">
          {{ $t('views.label_template.selected_file') }}
        </span>
        <span
          v-if="file"
          class="label-template__selected-filename"
        >{{ file.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelTemplate',

  props: {
    labelType: {
      type: String,
      required: true
    },

    header: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      template: null,
      file: null,
      loading: false
    };
  },

  created() {
    this.loadTemplate();
  },

  methods: {
    async loadTemplate() {
      const { data } = await this.$http.get(`/labels/template?type=${this.labelType}`);
      this.template = data;
    },

    selectFile() {
      this.$refs.file.value = null;
      this.$refs.file.click();
    },

    setFile() {
      [this.file] = this.$refs.file.files;
    },

    async saveTemplate() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        await this.$http.post('/labels/template', formData, {
          headers: { 'label-type': this.labelType }
        });
        await this.loadTemplate();
      } finally {
        this.loading = false;
      }
    },

    copyToClipboard(field) {
      navigator.clipboard.writeText(field);
    },
  },
};
</script>

<style lang="scss">
.label-template {
  padding: 25px 25px 30px 25px;
  background-color: #fff;

  &__select {
    margin-right: 20px;
    padding: 12px 25px;
  }

  &__save {
    padding: 12px 25px;
    color: var(--aurum);

    &:hover {
      color: var(--margaritas);
    }
  }

  &__selected {
    height: 50px;
    margin-top: 20px;

    &-label {
      color: var(--platinum);
    }

    &-filename {
      color: var(--topaz);
    }
  }

  &__fields {
    color: var(--topaz);
  }
}
</style>
