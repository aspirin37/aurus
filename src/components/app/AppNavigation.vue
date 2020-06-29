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
        name: vm.$t('navigation.users'),
        link: '/users',
        icon: 'mdi-account-multiple',
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
        ],
      },
      // {
      //   name: vm.$t('navigation.reports'),
      //   link: '/reports',
      //   icon: 'mdi-format-list-bulleted',
      //   deep: [
      //     {
      //       id: 0,
      //       name: 'С ближайшей датой отгрузки',
      //       link: '',
      //     },
      //     {
      //       id: 1,
      //       name: 'По деталям с горизонтом 12 месяцев',
      //       link: '',
      //     },
      //     {
      //       id: 2,
      //       name: 'По детали с горизонтом  12 месяцев',
      //       link: '',
      //     },
      //     {
      //       id: 3,
      //       name:
      //         'По детали по дням с горизонтом на 14 дней с накопительным итогом',
      //       link: '',
      //     },
      //     {
      //       id: 4,
      //       name:
      //         'По детали по неделям с горизонтом на 14 недель с накопительным итогом',
      //       link: '',
      //     },
      //     {
      //       id: 5,
      //       name: 'Список корректировок по заказам',
      //       link: '',
      //     },
      //   ],
      // },
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
