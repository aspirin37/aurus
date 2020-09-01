<template>
  <form id="detailInfoModal">
    <b-modal
      v-model="show"
      title="Детальная информация"
      modal-class="aurus-modal"
      hide-header-close
      hide-footer
      centered
      size="lg"
      @hide="hideModal"
    >
      <div class="v-application aurus-modal__body pt-4 break-word">
        <vue-json-pretty
          v-if="detailInfo && detailInfo.data"
          :deep="2"
          show-length
          :select-on-click-node="false"
          :data="detailInfo.data"
        />
        <div
          v-else
          class="d-flex py-4"
        >
          <span class="mx-auto">Нет данных</span>
        </div>
      </div>
      <div class="v-application d-flex mt-4 sticky-bottom">
        <v-btn
          color="primary"
          class="mr-4 flex-grow-1"
          outlined
          large
          @click="hideModal"
        >
          {{ $t('common.close') }}
        </v-btn>
      </div>
    </b-modal>
  </form>
</template>

<script>
export default {
  name: 'DetailInfoModal',
  props: {
    value: Boolean,
    detailInfo: Object,
  },
  data: () => ({
    show: false,
  }),
  watch: {
    value(val) {
      this.show = val;
    },
  },
  methods: {
    hideModal() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss">
.break-word {
  overflow-wrap: break-word;
}
</style>
