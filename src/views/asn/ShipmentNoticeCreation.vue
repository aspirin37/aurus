<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="h4 primary--text">
        {{ $t('views.shipment_notice_creation.shipment_notice_creation') }}
      </h1>
      <div class="ml-auto d-flex">
        <router-link
          to="/asn"
          class="shipment-notice__back-link my-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
          >
            <path
              d="M9,4l.881.881L6.394,8.375H14v1.25H6.394l3.487,3.494L9,14,4,9Z"
              transform="translate(-4 -4)"
            />
          </svg>
          {{ $t('views.shipment_notice_creation.back_to_list') }}
        </router-link>
      </div>
    </div>

    <main class="shipment-notice__main">
      <v-form
        class="create-add-form"
        @submit.prevent
      >
        <v-row>
          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.carrier') }}
              </label>
              <v-text-field
                v-model="asn.carrier"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('common.plant') }}
              </label>
              <v-text-field
                v-model="asn.plant"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.container_number') }}
              </label>
              <v-text-field
                v-model="asn.containerNumber"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.transportation_mode') }}
              </label>
              <v-text-field
                v-model="asn.regime"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="2"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.shipping_date') }}
              </label>
              <date-picker v-model="asn.shippingDate" required />
            </div>
          </v-col>

          <v-col
            cols="2"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.shipping_time') }}
              </label>
              <time-picker v-model="asn.shippingTime" required />
            </div>
          </v-col>

          <v-col
            cols="4"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.estimated_date') }}
              </label>
              <date-picker v-model="asn.estimatedDate" required />
            </div>
          </v-col>

          <v-col
            cols="4"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.estimated_time') }}
              </label>
              <time-picker v-model="asn.estimatedTime" required />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.bill_of_lading') }}
              </label>
              <v-text-field
                v-model="asn.billOfLading"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.freight_bill_number') }}
              </label>
              <v-text-field
                v-model="asn.freightBillNumber"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.net_weight') }}
              </label>
              <v-text-field
                v-model="asn.netWeightKg"
                type="number"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.gross_weight') }}
              </label>
              <v-text-field
                v-model="asn.grossWeightKg"
                type="number"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="2"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.contract') }}
              </label>
              <v-text-field
                v-model="asn.contract"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.invoice_date') }}
              </label>
              <date-picker v-model="asn.invoiceDate" required />
            </div>
          </v-col>

          <v-col
            cols="3"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.invoice_number') }}
              </label>
              <v-text-field
                v-model="asn.invoiceNumber"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>

          <v-col
            cols="2"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.torg_12_date') }}
              </label>
              <date-picker v-model="asn.torg12Date" required />
            </div>
          </v-col>

          <v-col
            cols="2"
            class="pb-0"
          >
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.torg_12_number') }}
              </label>
              <v-text-field
                v-model="asn.torg12Number"
                solo
                :rules="[rules.required]"
              />
            </div>
          </v-col>
        </v-row>
      </v-form>

      <p>{{ $t('views.shipment_notice_creation.footnote') }}</p>
    </main>

    <shipment-notice-parts
      :parts="parts"
      @addPart="addPart"
      @updatePart="updatePart"
      @removePart="removePart"
    />

    <shipment-notice-packing
      :packing="packing"
      @addPacking="addPacking"
      @updatePacking="updatePacking"
      @removePacking="removePacking"
    />

    <div class="mt-7">
      <button
        :disabled="loading"
        class="btn aurus-button aurus-button_line aurus-button_lowercase"
        @click="create"
      >
        {{ $t('common.create') }}
      </button>
    </div>
  </div>
</template>

<script>
import ShipmentNoticeParts from '@/components/asn/ShipmentNoticeParts.vue';
import ShipmentNoticePacking from '@/components/asn/ShipmentNoticePacking.vue';
import DatePicker from '@/components/common/DatePicker.vue';
import TimePicker from '@/components/common/TimePicker.vue';

export default {
  name: 'ShipmentNoticeCreation',

  components: {
    ShipmentNoticeParts,
    ShipmentNoticePacking,
    DatePicker,
    TimePicker,
  },

  data() {
    return {
      asn: {
        carrier: '',
        plant: '',
        containerNumber: '',
        shippingDate: '',
        shippingTime: '',
        estimatedDate: '',
        estimatedTime: '',
        regime: '',
        billOfLading: '',
        freightBillNumber: '',
        netWeightKg: 0,
        grossWeightKg: 0,
        contract: '',
        invoiceDate: '',
        invoiceNumber: '',
        torg12Date: '',
        torg12Number: '',
      },

      parts: [],

      packing: [],

      supplier: {},

      loading: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      if (!this.user) {
        this.$moment.tz.setDefault();
        return;
      }

      try {
        this.supplier = await this.$http.get(`/suppliers/${this.user.gsdb}`);
        if (this.supplier.timezone) {
          this.$moment.tz(this.supplier.timezone);
        } else {
          this.$moment.tz.setDefault();
        }
      } catch (error) {
        this.$moment.tz.setDefault();
      }
    },

    addPart(item) {
      this.parts.push({ ...item });
    },

    updatePart(index, item) {
      this.parts.splice(index, 1, { ...item });
    },

    removePart(index) {
      this.parts.splice(index, 1);
    },

    addPacking(item) {
      this.packing.push({ ...item });
    },

    updatePacking(index, item) {
      this.packing.splice(index, 1, { ...item });
    },

    removePacking(index) {
      this.packing.splice(index, 1);
    },

    async create() {
      if (!this.validate()) {
        return;
      }

      const {
        shippingDate,
        shippingTime,
        estimatedDate,
        estimatedTime,
        invoiceDate,
        invoiceNumber,
        torg12Date,
        torg12Number,
        ...header
      } = this.asn;

      const [shippingHour, shippingMinute] = shippingTime.split(':');
      const [estimatedHour, estimatedMinute] = estimatedTime.split(':');

      const { gsdb, name } = this.supplier;

      const asn = {
        ...header,
        shippingDate: this.$moment(shippingDate, 'L').hour(shippingHour).minute(shippingMinute),
        estimatedDate: this.$moment(estimatedDate, 'L').hour(estimatedHour).minute(estimatedMinute),
        invoce: { date: this.$moment.utc(invoiceDate, 'L'), number: invoiceNumber },
        TORG12: { date: this.$moment.utc(torg12Date, 'L'), number: torg12Number },
        supplier: { gsdb, name },
        details: this.parts,
        packing: this.packing,
      };

      this.loading = true;
      try {
        await this.$http.post('/asn', asn);
        this.$router.push('/asn');
      } finally {
        this.loading = false;
      }
    },

    validate() {
      const required = [
        'carrier',
        'plant',
        'containerNumber',
        'shippingDate',
        'shippingTime',
        'estimatedDate',
        'estimatedTime',
        'regime',
        'billOfLading',
        'freightBillNumber',
        'netWeightKg',
        'grossWeightKg',
        'contract',
        'invoiceDate',
        'invoiceNumber',
        'torg12Date',
        'torg12Number',
      ];
      return required.every((key) => this.asn[key]) && this.parts.length && this.packing.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.shipment-notice__back-link {
  text-decoration: none;
  transition: color 0.3s ease-in-out 0s;

  svg {
    fill: #ad7c59;
    margin-right: 5px;
    transition: fill 0.3s ease-in-out 0s;
  }

  &:hover {
    color: var(--margaritas);

    svg {
      fill: var(--margaritas);
    }
  }
}

.shipment-notice__main {
  padding: 25px;
  background-color: #fff;
}
</style>

<style lang="scss">
.shipment-notice__main .v-input__slot {
  box-shadow: none !important;
}
</style>
