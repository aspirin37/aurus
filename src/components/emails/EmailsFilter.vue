<template>
  <v-form
    v-if="isShown"
    class="email-list__filter white mb-5"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col cols="3">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('common.supplier') }}
            </label>
            <v-autocomplete
              v-model="localFilter.supplier"
              :items="suppliers"
              item-text="gsdb"
              value="gsdb"
              :readonly="!canGetFullList"
              :clearable="canGetFullList"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="3">
          <div class="select-block select-block_white">
            <label class="select-block__label">
              {{ $t('views.email_list.type') }}
            </label>
            <v-select
              v-model="localFilter.type"
              :items="Object.values(EventTypes)"
              :readonly="!canGetFullList"
              :clearable="canGetFullList"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col cols="4">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.email_list.to') }}
            </label>
            <v-text-field
              v-model="localFilter.to"
              hide-details
              solo
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="email-list__filter-apply"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            large
            class="email-list__filter-apply-button"
          >
            {{ $t('common.apply') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'EmailsFilter',

  props: {
    isShown: {
      type: Boolean,
      default: () => false,
    },

    filter: {
      type: Object,
      required: true,
    },

    canGetFullList: {
      type: Boolean,
      default: () => false,
    },

    suppliers: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      localFilter: {
        supplier: '',
        type: '',
        to: '',
      },

      EventTypes: {
        system: 'system',
        business: 'business',
      },
    };
  },

  watch: {
    isShown() {
      this.init();
    },
  },

  methods: {
    init() {
      this.localFilter = { ...this.filter };
    },

    submit() {
      this.$emit('applyFilter', this.localFilter);
    },
  },
};
</script>

<style lang="scss">
.email-list__filter .v-input__slot {
  box-shadow: none !important;
}

.email-list__filter-apply {
  align-self: flex-end;

  &-button {
    height: 48px !important;
    width: 100%
  }
}
</style>
