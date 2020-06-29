<template>
  <div>
    <form
      class="table-filters"
      autocomplete="off"
    >
      <div class="table-filters__form">
        <div
          v-for="(val, key) in filters"
          :key="key"
          class="input-block input-block_white mr-3"
        >
          <label class="input-block__label">
            {{ $t(`common.${key}`) }}
          </label>
          <v-text-field
            v-model="filters[key]"
            hide-details
            required
            solo
          />
        </div>
      </div>
      <v-btn
        outlined
        large
        :disabled="!isValid"
        @click="$emit('search')"
      >
        {{ $t('common.search') }}
      </v-btn>
    </form>
    <transition
      name="layout-fade"
      mode="out-in"
    >
      <div
        v-if="noItemsFound"
        class="h4 text-center"
      >
        {{ $t('common.no_data') }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TableFilters',
  props: {
    filters: {
      type: Object,
      required: true,
    },
    noItemsFound: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isValid() {
      return Array.from(Object.values(this.filters)).every((it) => !!it);
    },
  },
};
</script>

<style lang="scss" scoped>
  .table-filters {
    padding: 30px;
    margin-bottom: 30px;
    background: white;
    border-radius: 5px;

    &__form {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 20px;
    }
  }
</style>
