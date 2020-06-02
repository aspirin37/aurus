<template>
  <div class="auth-page">
    <div class="auth-page__wrapper">
      <div class="auth-block">
        <div class="auth-block__logo">
          <img
            class="auth-block__logo__image"
            src="@/assets/images/logo.svg"
            width="121"
            height="93"
          >
          <span class="auth-block__logo__title">SUPPLIER PORTAL</span>
        </div>
        <slot />
        <locale-switch class="mx-auto" />
      </div>
      <privacy />
    </div>
  </div>
</template>

<script>
import Privacy from '@/components/auth/Privacy.vue';
import LocaleSwitch from '@/components/common/LocaleSwitch.vue';

export default {
  name: 'AuthWrapper',
  components: {
    Privacy,
    LocaleSwitch,
  },
};
</script>
