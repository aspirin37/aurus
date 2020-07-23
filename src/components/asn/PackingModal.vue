<template>
  <b-modal
    ref="modal"
    v-model="isShown"
    :title="title"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @shown="getItem"
    @hidden="hideModal"
  >
    <v-form @submit.prevent="submit" class="mt-3">
      <b-row class="v-application">
        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.part_number') }}
            </label>
            <v-text-field
              v-model="item.detailNumber"
              solo
              :rules="[rules.required]"
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.quantity') }}
            </label>
            <v-text-field
              v-model="item.quantity"
              type="number"
              solo
              :rules="[rules.required]"
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.box_serial_number_level_3') }}
            </label>
            <v-text-field
              v-model="item.boxSerialNumberLevel3"
              solo
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.box_serial_number_level_2') }}
            </label>
            <v-text-field
              v-model="item.boxSerialNumberLevel2"
              solo
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.box_serial_number_level_1') }}
            </label>
            <v-text-field
              v-model="item.boxSerialNumberLevel1"
              solo
            />
          </div>
        </b-col>

        <b-col cols="6">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.unit_weight_gross_kg') }}
            </label>
            <v-text-field
              v-model="item.grossUnitWeightKg"
              type="number"
              solo
              :rules="[rules.required]"
            />
          </div>
        </b-col>
      </b-row>

      <div class="v-application d-flex">
        <v-btn
          class="mr-4 flex-grow-1"
          outlined
          large
          @click="hideModal"
        >
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          class="flex-grow-1"
          outlined
          large
          type="submit"
        >
          {{ isNew ? $t('common.add') : $t('common.save') }}
        </v-btn>
      </div>
    </v-form>
  </b-modal>
</template>

<script>
const EMPTY_VALUE = {
  detailNumber: '',
  quantity: 0,
  boxSerialNumberLevel3: '',
  boxSerialNumberLevel2: '',
  boxSerialNumberLevel1: '',
  grossUnitWeightKg: 0
};

export default {
  name: 'PackingModal',

  props: {
    isShown: {
      type: Boolean,
      default: () => false
    },

    selectedItem: {
      type: Object,
      default: () => null
    },

    selectedIndex: {
      type: Number,
      default: () => -1
    },

    isNew: {
      type: Boolean,
      required: true
    },
  },

  data() {
    return {
      item: { ...EMPTY_VALUE },
      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      }
    }
  },

  computed: {
    title() {
      return this.isNew ?
        this.$t('views.shipment_notice_creation.add_packing') :
        this.$t('views.shipment_notice_creation.edit_packing');
    }
  },

  methods: {
    getItem() {
      this.item = this.isNew ? { ...EMPTY_VALUE } : { ...this.selectedItem };
    },

    hideModal() {
      this.$emit('hideModal');
    },

    submit() {
      if (!this.validate()) {
        return;
      }
      if (this.isNew) {
        this.$emit('addPacking', this.item);
      } else {
        this.$emit('updatePacking', this.selectedIndex, this.item);
      }
    },

    validate() {
      const required = ['detailNumber', 'quantity', 'grossUnitWeightKg'];
      return required.every((key) => this.item[key]);
    }
  }
}
</script>
