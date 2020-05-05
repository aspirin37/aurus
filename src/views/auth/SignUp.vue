<template>
  <form
    class="auth"
    @submit.prevent="submit"
  >
    <div class="description">
      <span class="description__text">Для регистрации на портале введите свой E-mail.</span>
      <div class="description__text pl-4 pr-4">
        Регистрационные данные будут высланы вам на почту.
      </div>
    </div>
    <div class="auth-block__data">
      <div class="input-block">
        <label
          class="input-block__label"
          :class="{'input-block__label_error': !!email.error}"
          for="email"
        >
          E-mail
          <span
            v-if="!!email.error"
            class="error-text"
          >
            {{ email.error }}
          </span>
        </label>
        <input
          id="email"
          v-model="email.value"
          class="input-block__input"
          :class="{'input-block__input_error': !!email.error}"
          type="text"
        >
      </div>
    </div>
    <div class="actions-block">
      <button
        :disabled="!email.value"
        class="btn aurus-button aurus-button_line aurus-button_filled_white-color"
        type="submit"
      >
        Войти
      </button>
      <router-link
        class="actions-block__switch-component"
        :to="{name: 'SignIn'}"
        tag="span"
      >
        Вернуться к авторизации
      </router-link>
    </div>
  </form>
</template>

<script>

export default {
  name: 'SignUp',
  data: () => ({
    email: {
      value: '',
      error: '',
    },
  }),
  methods: {
    submit() {

    },
  },
};
</script>
