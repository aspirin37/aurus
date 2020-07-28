<template>
  <auth-wrapper>
    <form
      class="auth"
      @submit.prevent="signIn"
    >
      <div class="auth-block__data">
        <div class="input-block">
          <label
            class="input-block__label"
            :class="{'input-block__label_error': error}"
            for="login"
          >
            {{ $t('common.login') }}
            <span
              v-if="error"
              class="error-text"
            >
              {{ error }}
            </span>
          </label>
          <input
            id="login"
            v-model="login"
            class="input-block__input"
            :class="{'input-block__input_error': error}"
            autocomplete="username"
            type="email"
          >
        </div>
        <div class="input-block">
          <label
            class="input-block__label"
            for="password"
          >
            {{ $t('common.password') }}
          </label>
          <input
            id="password"
            v-model="password"
            class="input-block__input"
            autocomplete="current-password"
            type="password"
          >
        </div>
        <!-- eslint-disable-next-line max-len -->
        <div class="custom-control custom-checkbox mt-2 d-flex justify-content-center aurus-custom-control">
          <input
            id="remember-me"
            v-model="rememberMe"
            class="custom-control-input"
            type="checkbox"
          >
          <label
            class="custom-control-label"
            for="remember-me"
          >
            {{ $t('views.sign_in.remember_me') }}
          </label>
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
      <div class="forget">
        <router-link
          class="forget__text"
          :to="{name: 'ResetPassword'}"
          tag="span"
        >
          {{ $t('views.sign_in.forgot_password') }}
        </router-link>
      </div>
    </form>
  </auth-wrapper>
</template>

<script>
import AuthWrapper from '@/components/auth/AuthWrapper.vue';

export default {
  name: 'SignIn',
  components: {
    AuthWrapper,
  },
  data: () => ({
    login: '',
    password: '',
    rememberMe: false,
    error: '',
  }),
  methods: {
    signIn() {
      this.$http.post('main/login', {
        email: this.login,
        password: this.password,
      }).then(() => {
        this.$router.push('/users');
      }).catch((e) => {
        this.error = e.response.data.message;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .forget {
    display: flex;
    justify-content: center;

    &__text {
      color: var(--margaritas);
      cursor: pointer;
      border-bottom: 1px solid var(--margaritas);
      transition: 0.3s ease-in-out;
      transition-property: color, border-bottom-color;

      &:hover {
        color: var(--aurum);
        border-bottom-color: var(--aurum);
      }
    }
  }
</style>
