<template>
  <div>
    <div class="d-flex mt-10 mb-3">
      <h2 class="h4 primary--text">
        {{ $t('views.shipment_notice_creation.packing') }}
      </h2>
      <div class="ml-auto d-flex">

      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="packing"
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
    packing: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      headers: [
        {
          text: this.$t('views.shipment_notice_creation.part_number'),
          value: 'detailNumber'
        },
        {
          text: this.$t('views.shipment_notice_creation.quantity'),
          value: 'quantity'
        },
        {
          text: this.$t('views.shipment_notice_creation.box_serial_number_level_3'),
          value: 'boxSerialNumberLevel3'
        },
        {
          text: this.$t('views.shipment_notice_creation.box_serial_number_level_2'),
          value: 'boxSerialNumberLevel2'
        },
        {
          text: this.$t('views.shipment_notice_creation.box_serial_number_level_1'),
          value: 'boxSerialNumberLevel1'
        },
        {
          text: this.$t('views.shipment_notice_creation.unit_weight_gross_kg'),
          value: 'grossUnitWeightKg'
        }
      ]
    }
  }
}
</script>
