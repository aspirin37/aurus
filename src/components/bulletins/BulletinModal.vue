<template>
  <b-modal
    v-model="isShown"
    ref="modal"
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
            hide-details
            solo
          />
        </div>
        <div class="textarea-block textarea-block_white">
          <label class="textarea-block__label">
            {{ $t('views.bulletin_list.text') }}
          </label>
          <textarea
            v-model="bulletin.text"
            rows="5"
            class="textarea-block__textarea"
          />
        </div>
      </div>
      <div class="v-application d-flex">
        <v-btn
          class="mr-4 flex-grow-1"
          outlined
          large
          :disabled="loading"
          @click="$emit('input', false)"
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
    prop: 'value'
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    selectedBulletin: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      bulletin: {
        subject: '',
        text: ''
      },

      loading: false,

      isShown: false
    }
  },

  methods: {
    getBulletin() {
      const { subject, text } = this.selectedBulletin;
      this.bulletin = { subject, text };
    },

    hideModal() {
      this.$emit('input', false)
    },

    async submit() {
      this.loading = true;
      try {
        await this.$http.patch(`/bulletins/${this.selectedBulletin.id}`, this.bulletin);
        this.hideModal();
        this.$emit('submit');
      } finally {
        this.loading = false;
      }
    }
  },

  watch: {
    value(val) {
      this.isShown = val;
    }
  }
}
</script>
