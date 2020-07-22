<template>
  <auth-wrapper>
    <form
      class="auth"
      @submit.prevent="signIn"
    >
      <div class="auth-block__data">
        <div
          v-if="isEmailVerified === null && processing && !user"
          class="alert alert-info py-4 d-flex align-items-center justify-content-center"
        >
          <b class="mr-2">Пожалуйста, подождите...</b>
          <b-spinner type="grow" />
        </div>
        <div
          v-else-if="isEmailVerified && user"
          class="alert alert-info pt-4 pb-4 text-center"
        >
          <b>Пользователь: {{ user.email }}</b><br>
          <b>E-mail адрес успешно подтвержден!</b>
        </div>
        <div
          v-else-if="isEmailVerified === false"
          class="alert alert-warning"
        >
          Не удалось подтвердить e-mail. Повторите попытку позже или обратитесь к администратору.
        </div>
        <div
          v-if="isEmailVerified"
          class="input-block"
        >
          <label
            class="input-block__label"
            for="password"
          >
            {{ $t('common.create_password') }}
          </label>
          <input
            id="password"
            v-model="password"
            class="input-block__input"
            autocomplete="new-password"
            type="password"
          >
        </div>
        <label
          class="input-block__label"
          for="password"
        >
          {{ $t('common.confirm_password') }}
        </label>
        <input
          id="password"
          v-model="confirmPassword"
          class="input-block__input"
          autocomplete="new-password"
          type="password"
        >
      </div>
      </div>
      <div class="actions-block">
        <button
          :disabled="false"
          class="btn aurus-button aurus-button_line aurus-button_filled_white-color"
          type="submit"
        >
          {{ $t('views.sign_in.sign_in') }}
        </button>
      </div>
    </form>
  </auth-wrapper>
</template>

<script>
import { mapState } from 'vuex';
import AuthWrapper from '@/components/auth/AuthWrapper.vue';

export default {
  name: 'EmailVerification',
  components: {
    AuthWrapper,
  },
  props: {
    verificationCode: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isEmailVerified: null,
    processing: false,
    password: '',
    confirmPassword: '',
    validation: {
      password: { error: '', state: null },
      confirmPassword: { error: '', state: null },
    },
  }),
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.$store.commit('logOut');
    setTimeout(() => {
      this.verifyEmail();
    }, 100);
  },
  methods: {
    async verifyEmail() {
      this.processing = true;

      try {
        await this.$http.post('main/token-validate', {
          token: this.verificationCode,
        });
        this.isEmailVerified = true;
      } catch (error) {
        this.isEmailVerified = false;
      } finally {
        this.processing = false;
      }
    },
    validateForm() {
      Object.assign(this.$data.validation, this.$options.data().validation);

      let isFormValid = true;

      if (this.password && this.password.length < 8) {
        this.validation.password.error = 'Длина пароля менее 8 символов';
        this.validation.password.state = false;
        isFormValid = false;
      }

      if (!this.password) {
        this.validation.password.error = 'Необходимо заполнить поле';
        this.validation.password.state = false;
        isFormValid = false;
      }

      if (!this.confirmPassword) {
        this.validation.confirmPassword.error = 'Необходимо заполнить поле';
        this.validation.confirmPassword.state = false;
        isFormValid = false;
      }

      if (this.password !== this.confirmPassword) {
        this.validation.confirmPassword.error = 'Пароль и подтверждение не совпадают';
        this.validation.confirmPassword.state = false;
        isFormValid = false;
      }

      return isFormValid;
    },
    async changePassword() {
      // if (this.validateForm()) {
      //   this.processing = true;
      //   try {
      //     await this.$http.post('user/1.0/set-password', {
      //       password: this.password,
      //     });
      //     this.$router.push('/user-list');
      //   } finally {
      //     this.processing = false;
      //   }
      // }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
