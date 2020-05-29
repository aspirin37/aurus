<template>
  <header class="header">
    <div class="header__wrapper">
      <span class="header__name">supplier-portal</span>
    </div>
    <!-- <div class="d-flex">
      <div>EN</div>
      <div>&nbsp;|&nbsp;</div>
      <div>RU</div>
    </div> -->
    <div class="header__wrapper">
      <div class="header__user">
        <span class="header__user__login">{{ user.name }}</span>
        <div class="header__user__modal">
          <div class="header__user__modal__content">
            <router-link
              to="/"
              class="header__user__modal__link"
            >
              {{ $t('common.my_profile') }}
            </router-link>

            <v-btn
              color="primary"
              outlined
              @click="signOut"
            >
              {{ $t('common.sign_out') }}
            </v-btn>
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
