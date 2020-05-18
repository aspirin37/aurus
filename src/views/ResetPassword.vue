<template>
  <auth-wrapper>
    <form
      class="auth"
      @submit.prevent="reset"
    >
      <template v-if="isLetterSent">
        <div class="description">
          <div class="description__text">
            Письмо с указаниями для сброса пароля было отправлено по указанному адресу.
          </div>
        </div>
      </template>
      <template v-else>
        <div class="description">
          <div class="description__text">
            Если вы забыли пароль, введите E-Mail, привязанный к вашей учетной записи.
            Ссылка для сброса пароля будет выслана по указанному адресу.
          </div>
        </div>
        <div class="auth-block__data">
          <div class="input-block">
            <label
              class="input-block__label"
              :class="{'input-block__label_error': !!email.error}"
              for="forget-email"
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
              id="forget-email"
              v-model="email"
              class="input-block__input"
              :class="{'input-block__input_error': !!email.error}"
              type="text"
            >
          </div>
        </div>
      </template>
      <div class="actions-block">
        <template v-if="!isLetterSent">
          <button
            :disabled="!email"
            class="btn aurus-button aurus-button_line aurus-button_filled_white-color"
            type="submit"
          >
            Отправить
          </button>
        </template>
        <router-link
          class="actions-block__switch-component"
          :to="{name: 'SignIn'}"
          tag="span"
        >
          Вернуться к авторизации
        </router-link>
      </div>
    </form>
  </auth-wrapper>
</template>

<script>
import AuthWrapper from '@/components/auth/AuthWrapper.vue';

export default {
  name: 'ResetPassword',
  components: {
    AuthWrapper,
  },
  data: () => ({
    email: '',
    isLetterSent: false,
    isLoading: false,
  }),
  methods: {
    async reset() {
      this.isLoading = true;
      try {
        await this.$http.post('users/reset-password', {
          email: this.email,
        });
        this.isLetterSent = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
