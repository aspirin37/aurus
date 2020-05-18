<template>
  <header class="header">
    <div class="header__wrapper">
      <span class="header__name">supplier-portal</span>
    </div>
    <div class="header__wrapper">
      <div class="header__notification">
        <img :src="require('@/assets/images/notification.svg')">
        <span class="header__notification__count">3</span>
      </div>
    </div>
    <div class="header__wrapper">
      <div class="header__user">
        <span class="header__user__login">{{ user.name }}</span>
        <div class="header__user__modal">
          <div class="header__user__modal__content">
            <router-link
              to="/profile/provider-profile"
              class="header__user__modal__link"
            >
              Мой профиль
            </router-link>
            <!-- eslint-disable max-len -->
            <button
              class="btn aurus-button aurus-button_lowercase aurus-button_danger header__user__modal__exit"
              @click="signOut"
            >
              Выйти
            </button>
            <!-- eslint-enable max-len -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    signOut() {
      this.$router.push('/sign-in');
      this.$store.commit('signOut');
    },
  },
};
</script>
