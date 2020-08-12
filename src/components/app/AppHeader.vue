<template>
  <header class="header">
    <div class="header__wrapper">
      <span class="header__name">supplier-portal</span>
    </div>
    <div class="header__wrapper">
      <locale-switch />
    </div>
    <div class="header__wrapper">
      <div class="header__user">
        <span class="header__user__login">{{ user.name }}</span>
        <div class="header__user__modal">
          <div class="header__user__modal__content">
            <router-link
              v-if="user.gsdb"
              to="/supplier"
              class="header__user__modal__link mb-n4"
            >
              {{ $t('common.my_profile') }}
            </router-link>

            <a
              class="header__user__modal__link"
              @click.prevent="passwordModal = true"
            >
              сменить пароль
            </a>

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
    <password-modal v-model="passwordModal" />
  </header>
</template>

<script>
import { mapState } from 'vuex';
import LocaleSwitch from '@/components/common/LocaleSwitch.vue';
import PasswordModal from '@/components/profile/PasswordModal.vue';

export default {
  name: 'AppHeader',
  components: {
    LocaleSwitch,
    PasswordModal,
  },
  data: () => ({
    passwordModal: false,
  }),
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

<style lang="scss">
.header .locale-switch {
  transform: translateY(-10px);
}
</style>
