<template>
  <aside
    class="sidebar"
    :class="{sidebar_open: sidebarIsOpen}"
  >
    <div class="sidebar__logo">
      <transition name="fade">
        <img
          :key="currentLogo"
          :src="require(`@/assets/images/${currentLogo}.svg`)"
          class="sidebar__logo__image"
          :class="{sidebar__logo__image_full: sidebarIsOpen}"
        >
      </transition>
    </div>
    <div class="sidebar__wrapper">
      <div class="sidebar__content">
        <Navigation
          :sidebar-is-open="sidebarIsOpen"
          @open="sidebarIsOpen = true"
        />
      </div>
      <div class="sidebar__bottom">
        <button
          class="sidebar__toggler"
          @click="sidebarIsOpen = !sidebarIsOpen"
        >
          <img :src="require('@/assets/images/toggler.svg')">
          <transition name="fade">
            <span
              v-if="sidebarIsOpen"
              class="sidebar__toggler__text"
            >
              {{ $t('layout.collapse') }}
            </span>
          </transition>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import Navigation from '@/components/app/AppNavigation.vue';

export default {
  name: 'AppSidebar',
  components: {
    Navigation,
  },
  data: () => ({
    sidebarIsOpen: true,
  }),
  computed: {
    currentLogo() {
      return this.sidebarIsOpen ? 'logo-text' : 'logo';
    },
  },
  methods: {
    changeSidebarOpen(payload) {
      this.sidebarIsOpen = payload;
    },
  },
};
</script>

<style lang="scss">

</style>
