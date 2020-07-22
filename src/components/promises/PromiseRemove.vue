<template>
  <b-modal
    ref="modal"
    v-model="isShown"
    :title="$t('views.promise_list.promise_delete')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    @hidden="hideModal"
  >
    <div class="aurus-modal__body">
      <p class="delete-action-modal__text">
        {{ $t('views.promise_list.promise_remove_answer') }}
        <br>
        {{ $t('views.promise_list.promise_remove_confirmation') }}
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
  name: 'PromiseRemove',

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    selectedPromise: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      loading: false,
      isShown: false,
    };
  },

  watch: {
    value(val) {
      this.isShown = val;
    },
  },

  methods: {
    hideModal() {
      this.$emit('input', false);
    },

    async submit() {
      this.loading = true;
      try {
        await this.$http.delete(`/promises/${this.selectedPromise.id}`);
        this.hideModal();
        this.$emit('submit');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.delete-action-modal__text {
  text-align: center;
  margin-bottom: 0;
}
</style>
