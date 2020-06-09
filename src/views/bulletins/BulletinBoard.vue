<template>
  <div class="adds-board-page">
    <div class="d-flex mb-3">
      <h1 class="display-1 primary--text">{{ $t('views.bulletin_board.bulletin_board') }}</h1>
      <div class="adds-board-page__top__filter ml-auto">
        <v-btn-toggle
          v-model="validity"
          tile
          dense
          group
          borderless
          color="#9b9b9b"
          active-class="adds-board-page__top__filter__item_active"
          @change="getItems"
        >
          <v-btn value="all" class="adds-board-page__top__filter__item">
            {{ $t('views.bulletin_board.all') }}
          </v-btn>
          <v-btn value="current" class="adds-board-page__top__filter__item">
            {{ $t('views.bulletin_board.current') }}
          </v-btn>
          <v-btn value="past" class="adds-board-page__top__filter__item">
            {{ $t('views.bulletin_board.past') }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col cols="6" class="pl-0">
          <bulletin-card v-for="bulletin of oddBulletins" :key="bulletin.id" :bulletin="bulletin" />
        </v-col>
        <v-col cols="6" class="pr-0">
          <bulletin-card v-for="bulletin of evenBulletins" :key="bulletin.id" :bulletin="bulletin" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BulletinCard from '@/components/bulletins/BulletinCard.vue';

export default {
  name: 'BulletinBoard',

  components: {
    BulletinCard
  },

  data() {
    return {
      validity: 'current',
      items: []
    }
  },

  computed: {
    oddBulletins() {
      return this.items.filter((_, i) => i % 2 === 0);
    },

    evenBulletins() {
      return this.items.filter((_, i) => i % 2 === 1);
    }
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.loading = true;
      try {
        const { data } = await this.$http.get('/bulletins', {
          params: {
            validity: this.validity,
            query: { isActive: true }
          }
        });
        this.items = data.rows.map((item) => ({
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          createdAt: new Date(item.createdAt),
          updatedAt: item.updatedAt ? new Date(item.updatedAt) : null
        }));
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss">
.adds-board-page .adds-board-page__top__filter .adds-board-page__top__filter__item_active {
  background-color: var(--aurum) !important;
  color: #fff;
}
</style>
