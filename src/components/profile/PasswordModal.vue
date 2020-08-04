<template>
  <b-modal
    ref="modal"
    :title="$t('views.profile.new_password')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @hide="$emit('input', false)"
  >
    <v-form @submit.prevent="submit">
      <div class="v-application aurus-modal__body pt-0">
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('common.password') }}
          </label>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('common.password_placeholder')"
            hide-details
            solo
            @click:append="showPassword = !showPassword"
          />
        </div>
      </div>
      <div class="v-application d-flex">
        <v-btn
          color="primary"
          class="mr-4 flex-grow-1"
          :loading="loading"
          outlined
          large
          type="submit"
          :disabled="submitDisabled || loading"
        >
          {{ $t('common.save') }}
        </v-btn>
        <v-btn
          class="flex-grow-1"
          outlined
          large
          @click="$refs.modal.hide()"
        >
          {{ $t('common.cancel') }}
        </v-btn>
      </div>
    </v-form>
  </b-modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: false,
    showPassword: false,
    password: '',
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    title() {
      return this.isAddModal ? this.$t('views.user_list.adding_user') : this.$t('views.user_list.editing_user');
    },
    submitDisabled() {
      return !this.password;
    },

  },
  watch: {
    value(val) {
      if (val) {
        this.$refs.modal.show();
      } else {
        this.$emit('input', false);
      }
    },
  },
  methods: {
    async submit() {
      this.loading = true;
      const params = {
        password: this.password,
      };

      await this.$http.put(`users/${this.user.id}`, params).finally(() => {
        this.loading = false;
      });

      this.$refs.modal.hide();
    },
  },
};
</script>
