<template>
  <div>
    <div class="d-flex mt-10 mb-3">
      <h2 class="h4 primary--text">
        {{ $t('views.shipment_notice_creation.packing') }}
      </h2>
      <div class="ml-auto d-flex">
        <v-btn
          v-if="!readonly"
          class="btn"
          color="primary"
          outlined
          large
          @click="showAddModal"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('common.add') }}
        </v-btn>
      </div>
    </div>
    <v-data-table
      :headers="availableHeaders"
      :items="packing"
      disable-pagination
      disable-sort
      hide-default-footer
    >
      <template v-if="!readonly" v-slot:item.actions="{ item }">
        <v-hover v-slot="{hover}">
          <v-icon
            class="mr-2"
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="showEditModal(item)"
          >
            mdi-pencil
          </v-icon>
        </v-hover>
        <v-hover v-slot="{hover}">
          <v-icon
            :class="hover ? '' : 'text--disabled'"
            color="primary"
            size="20"
            @click="removePacking(item)"
          >
            mdi-delete
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
    <packing-modal
      v-model="isModalShown"
      :selected-item="selectedItem"
      :selected-index="selectedIndex"
      :is-new="isNew"
      @addPacking="addPacking"
      @updatePacking="updatePacking"
    />
  </div>
</template>

<script>
import PackingModal from './PackingModal.vue';

export default {
  name: 'ShipmentNoticePacking',

  components: {
    PackingModal
  },

  props: {
    packing: {
      type: Array,
      required: true
    },

    readonly: {
      type: Boolean,
      default: () => false
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
        },
      ],

      isModalShown: false,
      selectedItem: null,
      selectedIndex: -1,
      isNew: true
    }
  },

  computed: {
    availableHeaders() {
      if (this.readonly) {
        return this.headers;
      }

      return [
        ...this.headers,
        {
          text: this.$t('common.actions'),
          value: 'actions',
          sortable: false,
          width: 150,
        },
      ]
    }
  },

  methods: {
    showAddModal() {
      this.selectedItem = null;
      this.selectedIndex = -1;
      this.isNew = true;
      this.isModalShown = true;
    },

    showEditModal(item) {
      this.selectedItem = item;
      this.selectedIndex = this.packing.indexOf(item);
      this.isNew = false;
      this.isModalShown = true;
    },

    addPacking(item) {
      this.$emit('addPacking', item);
      this.isModalShown = false;
    },

    updatePacking(index, item) {
      this.$emit('updatePacking', index, item);
      tthis.isModalShown = false;
    },

     removePacking(item) {
      this.$emit('removePacking', this.packing.indexOf(item));
    }
  }
}
</script>
