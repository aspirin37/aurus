<template>
  <v-select
    v-model="currentLocale"
    :items="locales"
    class="locale-switch"
    hide-details
    dark
    @change="changeLocale"
  />
</template>

<script>
export default {
  name: 'LocaleSwitch',
  data: (vm) => ({
    locales: [
      'en',
      'ru',
    ],
    currentLocale: vm.$i18n.locale,
  }),
  methods: {
    changeLocale(locale) {
      localStorage.setItem('locale', locale);
      this.$http.defaults.headers['Accept-Language'] = locale;
      this.$vuetify.lang.current = locale;
      this.$i18n.locale = locale;
      this.$router.go();
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-switch {
  width: 80px;
}
</style>
