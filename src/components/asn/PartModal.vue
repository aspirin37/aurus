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
        <b-col cols="12" class="pb-0">
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
              {{ $t('views.shipment_notice_creation.quantity_sent') }}
            </label>
            <v-text-field
              v-model="item.quantitySent"
              type="number"
              solo
              :rules="[rules.required]"
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.previous_total') }}
            </label>
            <v-text-field
              v-model="item.previousTotal"
              type="number"
              solo
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.uom') }}
            </label>
            <v-text-field
              v-model="item.UOM"
              solo
              :rules="[rules.required]"
            />
          </div>
        </b-col>

        <b-col cols="6" class="pb-0">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.weight_kg') }}
            </label>
            <v-text-field
              v-model="item.weightKg"
              type="number"
              solo
              :rules="[rules.required]"
            />
          </div>
        </b-col>

        <b-col cols="12">
          <div class="input-block input-block_white">
            <label class="input-block__label">
              {{ $t('views.shipment_notice_creation.origin') }}
            </label>
            <v-text-field
              v-model="item.origin"
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
  quantitySent: 0,
  previousTotal: 0,
  UOM: '',
  weightKg: 0,
  origin: ''
};

export default {
  name: 'PartModal',

  model: {
    prop: 'value'
  },

  props: {
    value: {
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
      },
      isShown: false
    }
  },

  computed: {
    title() {
      return this.isNew ?
        this.$t('views.shipment_notice_creation.add_part') :
        this.$t('views.shipment_notice_creation.edit_part');
    }
  },

  watch: {
    value(val) {
      this.isShown = val;
    }
  },

  methods: {
    getItem() {
      this.item = this.isNew ? { ...EMPTY_VALUE } : { ...this.selectedItem };
    },

    hideModal() {
      this.$emit('input', false);
    },

    submit() {
      if (!this.validate()) {
        return;
      }
      if (this.isNew) {
        this.$emit('addPart', this.item);
      } else {
        this.$emit('updatePart', this.selectedIndex, this.item);
      }
    },

    validate() {
      const required = ['detailNumber', 'quantitySent', 'UOM', 'weightKg', 'origin'];
      return required.every((key) => this.item[key]);
    }
  }
}
</script>
