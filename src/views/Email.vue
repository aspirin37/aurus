<template>
  <v-container>
    <app-loader v-if="loading" />
    <div
      v-else
      v-html="email"
    />
  </v-container>
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
