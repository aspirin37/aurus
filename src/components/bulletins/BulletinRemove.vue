<template>
  <b-modal
    v-model="isShown"
    ref="modal"
    :title="$t('views.bulletin_list.bulletin_delete')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    @hidden="hideModal"
  >
    <div class="aurus-modal__body">
      <p class="delete-action-modal__text">
        {{ $t('views.bulletin_list.bulletin_remove_answer') }}
        <br>
        {{ $t('views.bulletin_list.bulletin_remove_confirmation') }}
      </p>
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
        @click="submit"
      >
        {{ $t('common.delete') }}
      </v-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'BulletinRemove',

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
      loading: false,

      isShown: false
    }
  },

  methods: {
    hideModal() {
      this.$emit('input', false)
    },

    async submit() {
      this.loading = true;
      try {
        await this.$http.patch(`/bulletins/${this.selectedBulletin.id}`, { isActive: false });
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

<style lang="scss">
.delete-action-modal__text {
  text-align: center;
  margin-bottom: 0;
}
</style>
