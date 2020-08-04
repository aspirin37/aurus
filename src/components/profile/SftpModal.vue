<template>
  <b-modal
    ref="sftpModal"
    title="Новый пароль"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @hide="$emit('input', false)"
  >
    <v-form
      v-if="sftp"
      @submit.prevent="submit"
    >
      <div class="v-application aurus-modal__body pt-0">
        <div class="h4 mt-3 text-center">
          {{ sftp.sftpPass }}
        </div>
        <div class="h5 text-center">
          <span class="font-weight-normal">Истекает:</span>
          {{ sftp.sftpPassExpiresAt | moment("DD.MM.YY, hh:mm") }}
        </div>
        <div class="text-center text-secondary">
          Пожалуйста, сохраните новый пароль. После закрытия диалогового окна данные будут утеряны.
        </div>
      </div>
      <div class="v-application d-flex">
        <v-btn
          class="mx-auto"
          outlined
          large
          @click="$emit('input', false)"
        >
          {{ $t('common.close') }}
        </v-btn>
      </div>
    </v-form>
  </b-modal>
</template>

<script>
export default {
  name: 'SftpModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    sftp: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.$refs.sftpModal.show();
      } else {
        this.$refs.sftpModal.hide();
      }
    },
  },
  methods: {
    async submit() {
      this.$emit('input', false);
    },
  },
};
</script>
