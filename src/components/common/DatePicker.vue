<template>
  <div class="date-picker">
    <flat-pickr
      :value="value"
      :config="finalConfig"
      class="date-picker__input"
      @input="onInput"
    />
    <div class="date-picker__details"></div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { english as en } from 'flatpickr/dist/l10n/default.js';
import { Russian as ru } from 'flatpickr/dist/l10n/ru.js';

const locales = { en, ru };

const formatters = {
  en: 'm/d/Y',
  ru: 'd.m.Y'
}

export default {
  name: 'DatePicker',

  components: {
    FlatPickr
  },

  model: {
    prop: 'value'
  },

  props: {
    value: {
      type: String,
      required: true
    },

    config: {
      type: Object,
      default: () => ({})
    },

    required: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      baseConfig: {
        allowInput: true,
        locale: locales[this.$i18n.locale],
        dateFormat: formatters[this.$i18n.locale]
      }
    }
  },

  computed: {
    finalConfig() {
      return { ...this.baseConfig, ...this.config };
    }
  },

  methods: {
    onInput(date) {
      this.$emit('input', date);
    }
  }
}
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
    margin-bottom: 8px;

    &:focus {
      border-color: var(--aurum) !important;
      outline: none;
    }

    &:hover {
      border-color: var(--margaritas) !important;
    }
  }

  &__details {
    margin-bottom: 8px;
  }
}
</style>
