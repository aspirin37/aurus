<template>
  <div>
    <app-loader v-if="loading" />
    <div v-else>
      <div class="d-flex mb-3">
        <h1 class="h4 primary--text">
          {{ $t('views.email.email_content') }}
        </h1>
        <div class="ml-auto d-flex">
          <router-link
            to="/emails"
            class="email__back-link my-auto"
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
            {{ $t('views.email.back') }}
          </router-link>
        </div>
      </div>
      <main class="email__content">
        <v-container v-html="email" />
      </main>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/common/AppLoader.vue';

export default {
  name: 'Email',
  components: {
    AppLoader,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    email: '',
  }),
  mounted() {
    this.getItem();
  },
  methods: {
    async getItem() {
      this.loading = true;
      const { data } = await this.$http.get(`/mails/${this.id}/html`).finally(() => {
        this.loading = false;
      });
      this.email = data;
    },
  },
};
</script>

<style lang="scss">
.email__back-link {
  text-decoration: none;
  transition: color 0.3s ease-in-out 0s;

  svg {
    fill: #ad7c59;
    margin-right: 5px;
    transition: fill 0.3s ease-in-out 0s;
  }
}

.email__content {
  min-height: calc(100vh - 215px);
  background-color: #fff;
}
</style>
