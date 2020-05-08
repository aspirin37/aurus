<template>
  <div class="auth-page">
    <div class="auth-page__wrapper">
      <div class="auth-block">
        <div class="auth-block__logo">
          <img
            class="auth-block__logo__image"
            src="@/assets/images/logo.svg"
          >
          <span class="auth-block__logo__title">SUPPLIER-PORTAL</span>
        </div>
        <slot />
      </div>
      <privacy />
    </div>
  </div>
</template>

<script>
import Privacy from '@/components/auth/Privacy.vue';

export default {
  name: 'AuthWrapper',
  components: {
    Privacy,
  },
};
</script>
