<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthPage() {
      return this.$route.matched.some(({ name }) => name === 'Auth');
    },
  },
};
</script>

<style>

</style>
