<template>
  <div>
    <app-loader v-if="loading" />
    <div
      v-else
      class="adds-board-detail-page"
    >
      <div class="d-flex mb-3">
        <h1 class="h4 primary--text">
          {{ bulletin.subject }}
        </h1>
        <div class="ml-auto d-flex">
          <router-link
            to="/bulletins/board"
            class="adds-board-detail-page__top__back-link my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path
                d="M9,4l.881.881L6.394,8.375H14v1.25H6.394l3.487,3.494L9,14,4,9Z"
                transform="translate(-4 -4)"
              />
            </svg>
            {{ $t('views.bulletin_details.back_to_board') }}
          </router-link>
        </div>
      </div>
      <main class="adds-board-detail-page__main">
        <div class="adds-board-detail-page__main__header">
          <div class="adds-board-detail-page__main__header__item">
            <span class="adds-board-detail-page__main__header__title">
              {{ $t('views.bulletin_details.start_date') }}:&nbsp;
            </span>
            <span class="adds-board-detail-page__main__header__date">
              {{ bulletin.startDate | moment('L LT') }}
            </span>
          </div>
          <div class="adds-board-detail-page__main__header__item">
            <span class="adds-board-detail-page__main__header__title">
              {{ $t('views.bulletin_details.end_date') }}:&nbsp;
            </span>
            <span class="adds-board-detail-page__main__header__date">
              {{ bulletin.endDate | moment('L') }}
            </span>
          </div>
        </div>
        <div class="adds-board-detail-page__main__content">
          <p class="adds-board-detail-page__main__content__text">
            {{ bulletin.text }}
          </p>
          <div class="attach">
            <span class="attach__title">{{ $t('views.bulletin_details.attachments') }}</span>
            <div class="attach__container">
              <a
                v-for="attachment of bulletin.attachments"
                :key="attachment.blobName"
                :href="attachment.path"
              >
                {{ attachment.name }}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/common/AppLoader.vue';

export default {
  name: 'BulletinDetails',

  components: {
    AppLoader,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      bulletin: {},
      loading: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  created() {
    this.getTimezone();
    this.getItem();
  },

  methods: {
    async getTimezone() {
      if (!this.user) {
        this.$moment.tz.setDefault();
        return;
      }

      try {
        const { data } = await this.$http.get(`/suppliers/${this.user.gsdb}`);
        if (data.timezone) {
          this.$moment.tz(data.timezone);
        } else {
          this.$moment.tz.setDefault();
        }
      } catch (error) {
        this.$moment.tz.setDefault();
      }
    },

    async getItem() {
      this.loading = true;
      try {
        const { data } = await this.$http.get(`/bulletins/${this.id}`);
        this.bulletin = {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          createdAt: new Date(data.createdAt),
          updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        };
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.adds-board-detail-page {
  &__top__back-link {
    text-decoration: none;
    transition: color 0.3s ease-in-out 0s;

    svg {
      fill: #ad7c59;
      margin-right: 5px;
      transition: fill 0.3s ease-in-out 0s;
    }

    &:hover {
      color: var(--margaritas);

      svg {
        fill: var(--margaritas);
      }
    }
  }

  &__main {
    min-height: calc(100vh - 215px);
    background-color: #fff;

    &__header {
      border-bottom: 1px solid #eeefee;
      padding: 20px 40px;
      display: flex;
      align-items: center;

      &__item {
        &:first-of-type {
          margin-right: 50px;
        }
      }

      &__title {
        color: var(--platinum);
      }

      &__date {
        color: var(--topaz);
      }
    }

    &__content {
      padding: 20px 40px;
      display: grid;
      row-gap: 60px;

      &__text {
        font-size: 22px;
        margin: 0;
        color: var(--topaz);
      }
    }
  }

  .attach {
    display: grid;
    row-gap: 10px;

    &__title {
      color: var(--platinum);
    }

    &__container {
      display: grid;
      row-gap: 5px;
    }

    &__file {
      width: fit-content;
      color: var(--sapphirus);
      transition: color 0.3 ease-in-out;

      &:hover {
        color: #005eaa;
        text-decoration: none;
      }
    }
  }
}
</style>
