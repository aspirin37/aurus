<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="h4 primary--text">
        {{ $t('views.customs_status_history.customs_status_history') }}
      </h1>
      <div class="ml-auto d-flex">
        <router-link
          to="/asn"
          class="shipment-notice__back-link my-auto"
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
          {{ $t('views.customs_status_history.back_to_list') }}
        </router-link>
      </div>
    </div>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :loading="loading"
      :loading-text="$t('common.loading_data')"
      disable-pagination
      disable-sort
      hide-default-footer
    />
  </div>
</template>

<script>
export default {
  name: 'CustomsStatusHistory',

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      items: [],
      headers: [
        { text: this.$t('views.customs_status_history.customs_status'), value: 'status' },
        { text: this.$t('common.date'), value: 'date' },
        { text: this.$t('common.user'), value: 'user' },
        { text: this.$t('common.comment'), value: 'comment' }
      ],
      loading: false,
    }
  },

  created() {
    this.getItems()
  },

  methods: {
    async getItems() {
      this.loading = true;
      try {
        const { data } = await this.$http.get(`/asn/${this.id}`);
        this.items = data.customsStatusHistory;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shipment-notice__back-link {
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
</style>
