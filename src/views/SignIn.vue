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
            :class="{'input-block__label_error': !!login.error}"
            for="login"
          >
            Логин
            <span
              v-if="!!login.error"
              class="error-text"
            >
              {{ login.error }}
            </span>
          </label>
          <input
            id="login"
            v-model="login"
            class="input-block__input"
            :class="{'input-block__input_error': !!login.error}"
            type="text"
          >
        </div>
        <div class="input-block">
          <label
            class="input-block__label"
            :class="{'input-block__label_error': !!password.error}"
            for="password"
          >
            Пароль
            <span
              v-if="!!login.error"
              class="error-text"
            >
              {{ password.error }}
            </span>
          </label>
          <input
            id="password"
            v-model="password"
            class="input-block__input"
            :class="{'input-block__input_error': !!password.error}"
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
            Запомнить меня
          </label>
        </div>
      </div>
      <div class="actions-block">
        <button
          :disabled="false"
          class="btn aurus-button aurus-button_line aurus-button_filled_white-color"
          type="submit"
        >
          Войти
        </button>
      </div>
      <div class="forget">
        <router-link
          class="forget__text"
          :to="{name: 'ResetPassword'}"
          tag="span"
        >
          Забыли пароль и хотите его восстановить?
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
    // login: {
    //   value: '',
    //   error: 'Пользователя с таким логином не существует',
    // },
    // password: {
    //   value: '',
    //   error: '',
    // },
    rememberMe: false,
  }),
  methods: {
    signIn() {
      this.$http.post('main/login', {
        email: this.login,
        password: this.password,
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
