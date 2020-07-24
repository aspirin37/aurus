<template>
  <div>
    <div class="d-flex mt-10 mb-3">
      <h2 class="h4 primary--text">
        {{ $t('views.shipment_notice_creation.parts') }}
      </h2>
      <div class="ml-auto d-flex">
        <v-btn
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
      :headers="headers"
      :items="parts"
      disable-pagination
      disable-sort
      hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
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
            @click="removePart(item)"
          >
            mdi-delete
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
    <part-modal
      v-model="isModalShown"
      :selected-item="selectedItem"
      :selected-index="selectedIndex"
      :is-new="isNew"
      @addPart="addPart"
      @updatePart="updatePart"
    />
  </div>
</template>

<script>
import PartModal from './PartModal.vue';

export default {
  name: 'ShipmentNoticeParts',

  components: {
    PartModal
  },

  props: {
    parts: {
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
          text: this.$t('views.shipment_notice_creation.quantity_sent'),
          value: 'quantitySent'
        },
        {
          text: this.$t('views.shipment_notice_creation.previous_total'),
          value: 'previousTotal'
        },
        {
          text: this.$t('views.shipment_notice_creation.uom'),
          value: 'UOM'
        },
        {
          text: this.$t('views.shipment_notice_creation.weight_kg'),
          value: 'weightKg'
        },
        {
          text: this.$t('views.shipment_notice_creation.origin'),
          value: 'origin'
        },
        {
          text: this.$t('common.actions'),
          value: 'actions',
          sortable: false,
          width: 150,
        },
      ],

      isModalShown: false,
      selectedItem: null,
      selectedIndex: -1,
      isNew: true
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
      this.selectedIndex = this.parts.indexOf(item);
      this.isNew = false;
      this.isModalShown = true;
    },

    addPart(item) {
      this.$emit('addPart', item);
      this.isModalShown = false;
    },

    updatePart(index, item) {
      this.$emit('updatePart', index, item);
      this.isModalShown = false;
    },

    removePart(item) {
      this.$emit('removePart', this.parts.indexOf(item));
    }
  }
}
</script>
