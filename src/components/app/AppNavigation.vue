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
        v-if="(menu.deep.length !== 0) && (menu.id === activeMenuId) && sidebarIsOpen"
        class="navigation__item__deep"
      >
        <router-link
          v-for="deep in menu.deep"
          :key="deep.name"
          :to="menu.link+deep.link"
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
        icon: 'art_track',
        link: '/bulletins',
        deep: [
          {
            id: 0,
            name: vm.$t('navigation.bulletin_board'),
            link: '/board',
          },
          {
            id: 1,
            name: vm.$t('navigation.bulletin_management'),
            link: '/list',
          },
        ],
      },
      {
        name: vm.$t('navigation.users'),
        link: '/users',
        icon: 'mdi-account-multiple',
        deep: [],
      },
      {
        name: vm.$t('navigation.roles'),
        link: '/roles',
        icon: 'mdi-shield-account',
        deep: [],
      },
      {
        name: vm.$t('navigation.emails'),
        link: '/emails',
        icon: 'mdi-email-outline',
        deep: [],
      },
      // {
      //   id: 2,
      //   name: 'Заказы',
      //   link: '/orders',
      //   icon: 'orders',
      //   deep: [
      //     {
      //       id: 0,
      //       name: 'Список заказов по дням',
      //       link: '/orders-day',
      //     },
      //     {
      //       id: 1,
      //       name: 'Список заказов по дням (поставщики)',
      //       link: '/orders-day-provider',
      //     },
      //     {
      //       id: 2,
      //       name: 'Подтверждение заказа',
      //       link: '/order-approve',
      //     },
      //     {
      //       id: 3,
      //       name: 'С ближайшей датой отгрузки',
      //       link: '/orders-date-shipment',
      //     },
      //     {
      //       id: 4,
      //       name: 'По деталям с горизонтом 12 месяцев',
      //       link: '/orders-details-12-month',
      //     },
      //     {
      //       id: 5,
      //       name: 'По детали с горизонтом  12 месяцев',
      //       link: '/order-detail-12-month',
      //     },
      //     {
      //       id: 6,
      //       name:
      //         'По детали по неделям с горизонтом на 14 недель с накопительным итогом',
      //       link: '/orders-detail-14-weeks',
      //     },
      //     {
      //       id: 7,
      //       name:
      //         'По детали по дням с горизонтом на 14 дней с накопительным итогом',
      //       link: '/orders-detail-14-days',
      //     },
      //     {
      //       id: 8,
      //       name: 'Список корректировок по заказам',
      //       link: '/adjustment',
      //     },
      //   ],
      // },
      // {
      //   id: 3,
      //   name: 'Отчеты',
      //   link: '/graphs',
      //   icon: 'graphs',
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
      // {
      //   id: 4,
      //   name: 'Файлы',
      //   link: 'null',
      //   icon: 'flies',
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
      // {
      //   id: 5,
      //   name: 'Этикетки',
      //   link: 'null',
      //   icon: 'labels',
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
      if (menu.deep.length === 0) {
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
