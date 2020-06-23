<template>
  <v-card class="adds-board-page__main__add">
    <v-card-text class="p-0">
      <v-row>
        <v-col cols="4">
          <span>{{ $t('views.bulletin_board.start_date') }}: </span>
          <span>{{ $d(bulletin.startDate) }}</span>
        </v-col>
        <v-col cols="8">
          <span>{{ $t('views.bulletin_board.end_date') }}: </span>
          <span>{{ $d(bulletin.endDate) }}</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-title class="px-0 pt-0">
      {{ bulletin.subject }}
    </v-card-title>
    <v-card-text class="p-0">
      <router-link
        :to="`/bulletins/board/${bulletin.id}`"
        class="adds-board-page__main__add__link"
      >
        {{ $t('views.bulletin_board.text') }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path
            d="M9,4l-.881.881,3.487,3.494H4v1.25h7.606L8.119,13.119,9,14l5-5Z"
            transform="translate(-4 -4)"
          />
        </svg>
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BulletinCard',

  props: {
    bulletin: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.adds-board-page__main__add {
  padding: 20px 40px;
  margin-bottom: 20px;
}

.adds-board-page__main__add__link {
  width: fit-content;
  color: var(--aurum);
  transition: color .3s ease-in-out;
  text-decoration: none;

  &:hover {
    color: var(--margaritas);
    text-decoration: none;

    svg {
      fill: var(--margaritas);
    }
  }

  svg {
    fill: var(--aurum);
    transition: fill .3s ease-in-out;
  }
}
</style>
