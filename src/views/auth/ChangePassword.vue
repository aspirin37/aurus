<template>
  <form
    class="auth"
    @submit.prevent="submit"
  >
    <title-changer title="Смена пароля" />
    <div class="description">
      <span class="description__text">Ваш доступ к системе временно заблокирован.</span>
      <div class="description__text">
        Необходимо сменить пароль.
      </div>
    </div>
    <div class="auth-block__data">
      <div class="input-block">
        <label
          class="input-block__label"
          for="new-password"
        >
          Пожалуйста, придумайте новый пароль
        </label>
        <input
          id="new-password"
          v-model="newPassword"
          class="input-block__input"
          :class="{'input-block__input_error': error}"
          type="password"
        >
      </div>
      <div class="input-block">
        <label
          class="input-block__label"
          :class="{'input-block__label_error': !!error}"
          for="new-password-confirm"
        >
          Подтвердите пароль
          <span
            v-if="!!error"
            class="error-text"
          >
            {{ error }}
          </span>
        </label>
        <input
          id="new-password-confirm"
          v-model="confirmPassword"
          class="input-block__input"
          :class="{'input-block__input_error': error}"
          type="password"
        >
      </div>
    </div>
    <div class="actions-block">
      <button
        class="btn aurus-button aurus-button_line aurus-button_filled_white-color"
        type="submit"
      >
        Сменить
      </button>
    </div>
  </form>
</template>

<script>

export default {
  name: 'ChangePassword',
  data: () => ({
    newPassword: '',
    confirmPassword: '',
    error: '',
  }),
  methods: {
    submit() {
    },
  },
};
</script>
