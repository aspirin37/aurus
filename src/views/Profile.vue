<template>
  <div class="profile-page">
    <div class="profile-page__top">
      <div class="h4 primary--text">
        Мой профиль
      </div>
      <button
        class="btn aurus-button aurus-button_line aurus-button_lowercase profile-page__top__button"
      >
        сменить пароль
      </button>
    </div>
    <main
      v-if="supplier"
      class="profile-page__main"
    >
      <div class="profile-page__main__profile-info">
        <div class="profile-page__main__item">
          <div class="profile-page__main__item__container">
            <div class="profile-page__main__item__top">
              <span class="profile-page__main__item__title">Поставщик</span>
              <img src="@/assets/images/person.svg">
            </div>
            <div class="profile-page__main__item__wrapper">
              <span class="profile-page__main__item__name">{{ supplier.gsdb }}</span>
              <span class="profile-page__main__item__name">{{ supplier.name }}</span>
            </div>
            <div class="profile-page__main__item__content">
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">Частота отгрузки</span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.shippingFrequency }}
                </span>
              </div>
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">Транзитное время</span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.transitTime }} дней
                </span>
              </div>
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">
                  Ответственный аналитик
                </span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.analystAurus }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-page__main__item">
          <div class="profile-page__main__item__container">
            <div class="profile-page__main__item__top">
              <span class="profile-page__main__item__title">Контактная информация</span>
              <img src="@/assets/images/telephone.svg">
            </div>
            <div class="profile-page__main__item__wrapper">
              <span class="profile-page__main__item__name">e-mail@user.ru</span>
              <span class="profile-page__main__item__name">+7 (000) 000 00-00</span>
            </div>
            <div class="profile-page__main__item__content">
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">Адрес отгрузки</span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.shippingAddress }}
                </span>
              </div>
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">
                  Фактический адрес
                </span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.physicalAddress }}
                </span>
              </div>
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">
                  Юридический адрес
                </span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.legalAddress }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-page__main__item profile-page__main__item_with-control">
          <div class="profile-page__main__item__container">
            <div class="profile-page__main__item__top">
              <span class="profile-page__main__item__title">Временная зона места отгрузки</span>
              <img src="@/assets/images/timestamp.svg">
            </div>
            <div class="profile-page__main__item__wrapper">
              <div class="input-block input-block_white">
                <v-select
                  v-model="supplier.timezone"
                  :items="timezones"
                  hide-details
                  elevation="0"
                  :label="$t('common.select_role')"
                  solo
                />
              </div>
            </div>
            <div class="profile-page__main__item__content">
              <div class="profile-page__main__item__content__item">
                <span class="profile-page__main__item__content__item__title">Адрес отгрузки</span>
                <span class="profile-page__main__item__content__item__text">
                  {{ supplier.shippingAddress }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  data: () => ({
    supplier: null,
  }),
  computed: {
    ...mapState(['user']),
    timezones() {
      return this.$moment.tz.names();
    },
  },
  created() {
    this.getSupplier();
  },
  methods: {
    async getSupplier() {
      const { data } = await this.$http.get(`suppliers/${this.user.gsdb}`);
      this.supplier = data;
    },
  },
};
</script>
