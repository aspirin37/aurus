// враппер под все экраны, кроме экрана авторизации
<template>
  <div class="default-layout">
    <app-sidebar />
    <div class="deafult-layout__wrapper">
      <app-header />
      <div class="default-layout__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';

export default {
  name: 'AppWrapper',
  components: {
    AppHeader,
    AppSidebar,
  },
};
</script>

<style lang="scss">
.default-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: minmax(100vh, auto);

  &__content {
    padding: 35px 25px 20px;
  }
}
</style>
