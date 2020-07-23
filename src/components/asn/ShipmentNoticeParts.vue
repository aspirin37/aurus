<template>
  <div>
    <div class="d-flex mt-10 mb-3">
      <h2 class="h4 primary--text">
        {{ $t('views.shipment_notice_creation.parts') }}
      </h2>
      <div class="ml-auto d-flex">

      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="parts"
      disable-pagination
      disable-sort
      hide-default-footer
    />
  </div>
</template>

<script>
export default {
  name: 'ShipmentNoticeParts',

  props: {
    parts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      headers: [
        { text: this.$t('views.shipment_notice_creation.part_number'), value: 'detailNumber' },
        { text: this.$t('views.shipment_notice_creation.quantity_sent'), value: 'quantitySent' },
        { text: this.$t('views.shipment_notice_creation.previous_total'), value: 'previousTotal' },
        { text: this.$t('views.shipment_notice_creation.uom'), value: 'UOM' },
        { text: this.$t('views.shipment_notice_creation.weight_kg'), value: 'weightKg' },
        { text: this.$t('views.shipment_notice_creation.origin'), value: 'origin' }
      ]
    }
  }
}
</script>
