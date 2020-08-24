<template>
  <div class="date-picker">
    <flat-pickr
      :value="value"
      :config="finalConfig"
      class="date-picker__input"
      @on-close="wasActivated = true"
      @input="onChange"
    />
    <div v-if="!hideDetails" class="date-picker__details">
      <div
        v-if="required && wasActivated && !value"
        class="date-picker__details-error"
      >
        {{ $t('validation.required') }}
      </div>
    </div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';
import { english as en } from 'flatpickr/dist/l10n/default';
import { Russian as ru } from 'flatpickr/dist/l10n/ru';

const locales = { en, ru };

const dateFormats = {
  en: 'm/d/Y',
  ru: 'd.m.Y',
};

export default {
  name: 'DatePicker',

  components: {
    FlatPickr,
  },

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: String,
      required: true,
    },

    config: {
      type: Object,
      default: () => ({}),
    },

    hideDetails: {
      type: Boolean,
      default: () => false
    },

    required: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      baseConfig: {
        allowInput: true,
        locale: locales[this.$i18n.locale],
        dateFormat: dateFormats[this.$i18n.locale],
      },

      wasActivated: false,
    };
  },

  computed: {
    finalConfig() {
      return { ...this.baseConfig, ...this.config };
    },
  },

  methods: {
    onChange(date) {
      this.$emit('input', date);
    },
  },
};
</script>

<style lang="scss">
.date-picker {
  display: flex;
  flex-direction: column;

  &__input {
    line-height: 30px;
    border: 1px solid var(--platinum);
    border-radius: 4px;
    padding: 8px 6px !important;

    &:focus {
      border-color: var(--aurum) !important;
      outline: none;
    }

    &:hover {
      border-color: var(--margaritas) !important;
    }
  }

  &__details {
    min-height: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 0 12px;
  }

  &__details-error {
    font-size: 12px;
    color: var(--v-error-base);
  }
}
</style>
