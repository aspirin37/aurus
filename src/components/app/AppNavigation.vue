<template>
  <div class="navigation">
    <div
      v-for="menu in menus"
      :key="menu.name"
      class="navigation__item"
    >
      <v-hover v-slot="{ hover }">
        <router-link
          v-slot="{isActive}"
          :to="menu.link"
        >
          <a
            class="navigation__item__link"
            :class="{'navigation__item__link_active': isActive }"
            @click.prevent="setActiveMenuId(menu)"
          >
            <v-icon
              :color="isActive || hover ? 'primary' : 'white'"
              large
            >
              {{ menu.icon }}
            </v-icon>
            <transition name="fade">
              <span
                v-if="sidebarIsOpen"
                class="navigation__item__text"
              >{{ menu.name }}</span>
            </transition>
          </a>
        </router-link>
      </v-hover>
      <div
        v-if="menu.deep && menu.id === activeMenuId && sidebarIsOpen"
        class="navigation__item__deep"
      >
        <router-link
          v-for="deep in menu.deep"
          :key="deep.name"
          :to="deep.link"
          class="navigation__item__deep__link"
          active-class="navigation__item__deep__link_active"
        >
          {{ deep.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNavigation',
  props: {
    sidebarIsOpen: {
      type: Boolean,
    },
  },
  data: (vm) => ({
    activeMenuId: null,
    menus: [
      {
        id: 0,
        name: vm.$t('navigation.bulletins'),
        link: '/bulletins',
        icon: 'art_track',
        deep: [
          {
            name: vm.$t('navigation.bulletin_board'),
            link: '/bulletins/board',
          },
          {
            name: vm.$t('navigation.bulletin_management'),
            link: '/bulletins/list',
          },
        ],
      },
      {
        name: vm.$t('navigation.users'),
        link: '/users',
        icon: 'mdi-account-multiple',
      },
      {
        name: vm.$t('navigation.suppliers'),
        link: '/suppliers',
        icon: 'mdi-truck-outline',
      },
      {
        name: vm.$t('navigation.roles'),
        link: '/roles',
        icon: 'mdi-shield-account',
      },
      {
        name: vm.$t('navigation.emails'),
        link: '/emails',
        icon: 'mdi-email-outline',
      },
      {
        name: vm.$t('navigation.forecasts'),
        link: '/forecast/report',
        icon: 'mdi-chart-bar',
      },
      {
        id: 1,
        name: vm.$t('navigation.orders'),
        link: '/orders',
        icon: 'mdi-format-list-bulleted',
        deep: [
          {
            name: vm.$t('navigation.orders_grouped_by_day'),
            link: '/orders/order-groups',
          },
          {
            name: vm.$t('navigation.nearest_shipment'),
            link: '/orders/nearest-shipment',
          },
          {
            name: vm.$t('navigation.report_list_by_part'),
            link: '/orders/reports-by-part',
          },
          {
            name: vm.$t('navigation.report_list_by_parts'),
            link: '/orders/reports-by-parts',
          },
          {
            name: vm.$t('navigation.history_by_days'),
            link: '/orders/history-by-days',
          },
          {
            name: vm.$t('navigation.history_by_weeks'),
            link: '/orders/history-by-weeks',
          },
          {
            id: 8,
            name: vm.$t('navigation.promises'),
            link: '/orders/promises',
          },
        ],
      },
      {
        id: 4,
        name: vm.$t('navigation.asn'),
        link: '/asn',
        icon: 'mdi-truck-delivery-outline',
      },
      {
        id: 5,
        name: vm.$t('navigation.labels'),
        link: '/labels',
        icon: 'mdi-relative-scale',
        deep: [
          {
            name: vm.$t('navigation.label_printing'),
            link: '/labels/print',
          },
          {
            name: vm.$t('navigation.label_template'),
            link: '/labels/template',
          },
        ],
      },
    ],
  }),
  methods: {
    setActiveMenuId(menu) {
      if (!menu.deep) {
        if (this.$route.path !== menu.link) {
          this.$router.push(menu.link);
        }
      } else if (this.sidebarIsOpen) {
        this.activeMenuId = this.activeMenuId === menu.id ? null : menu.id;
      } else {
        this.$emit('open');
        this.activeMenuId = menu.id;
      }
    },
  },
};
</script>

<style lang="scss">
.navigation__item__text {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
