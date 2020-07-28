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
          <v-col cols="3" class="pb-0">
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

          <v-col cols="3" class="pb-0">
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

          <v-col cols="3" class="pb-0">
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

          <v-col cols="3" class="pb-0">
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

          <v-col cols="2" class="pb-0">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.departure_date') }}
              </label>
              <v-menu
                v-model="isDepartureDatePickerShown"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="departureDateFormatted"
                    readonly
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="asn.departureDate"
                  dark
                  @input="isDepartureDatePickerShown = false"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="2" class="pb-0">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.departure_time') }}
              </label>
              <v-menu
                ref="departureTime"
                v-model="isDepartureTimePickerShown"
                :close-on-content-click="false"
                :return-value.sync="asn.departureTime"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="asn.departureTime"
                    readonly
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="isDepartureTimePickerShown"
                  v-model="asn.departureTime"
                  dark
                  @click:minute="$refs.departureTime.save(asn.departureTime)"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="4" class="pb-0">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.estimated_date') }}
              </label>
              <v-menu
                v-model="isEstimatedDatePickerShown"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="estimatedDateFormatted"
                    readonly
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="asn.estimatedDate"
                  dark
                  @input="isEstimatedDatePickerShown = false"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="4" class="pb-0">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.estimated_time') }}
              </label>
              <v-menu
                ref="estimatedTime"
                v-model="isEstimatedTimePickerShown"
                :close-on-content-click="false"
                :return-value.sync="asn.estimatedTime"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="asn.estimatedTime"
                    readonly
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="isEstimatedTimePickerShown"
                  v-model="asn.estimatedTime"
                  dark
                  @click:minute="$refs.estimatedTime.save(asn.estimatedTime)"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="3" class="pb-0">
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

          <v-col cols="3" class="pb-0">
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

          <v-col cols="3" class="pb-0">
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

          <v-col cols="3" class="pb-0">
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

          <v-col cols="2" class="pb-0">
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

          <v-col cols="3" class="pb-0">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.invoice_date') }}
              </label>
              <v-menu
                v-model="isInvoiceDatePickerShown"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="invoiceDateFormatted"
                    readonly
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="asn.invoiceDate"
                  dark
                  @input="isInvoiceDatePickerShown = false"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="3" class="pb-0">
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

          <v-col cols="2" class="pb-0">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.shipment_notice_creation.torg_12_date') }}
              </label>
              <v-menu
                v-model="isTorg12DatePickerShown"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="torg12DateFormatted"
                    readonly
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="asn.torg12Date"
                  dark
                  @input="isTorg12DatePickerShown = false"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="2" class="pb-0">
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

export default {
  name: 'ShipmentNoticeCreation',

  components: {
    ShipmentNoticeParts,
    ShipmentNoticePacking
  },

  data() {
    return {
      asn: {
        carrier: '',
        plant: '',
        containerNumber: '',
        departureDate: null,
        departureTime: null,
        estimatedDate: null,
        estimatedTime: null,
        regime: '',
        billOfLading: '',
        freightBillNumber: '',
        netWeightKg: 0,
        grossWeightKg: 0,
        contract: '',
        invoiceDate: null,
        invoiceNumber: '',
        torg12Date: null,
        torg12Number: ''
      },

      parts: [],

      packing: [],

      supplier: {},

      isDepartureDatePickerShown: false,
      isDepartureTimePickerShown: false,
      isEstimatedDatePickerShown: false,
      isEstimatedTimePickerShown: false,
      isInvoiceDatePickerShown: false,
      isTorg12DatePickerShown: false,

      loading: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    },

    departureDateFormatted() {
      return this.asn.departureDate && this.$moment(this.asn.departureDate).format('L');
    },

    estimatedDateFormatted() {
      return this.asn.estimatedDate && this.$moment(this.asn.estimatedDate).format('L');
    },

    invoiceDateFormatted() {
      return this.asn.invoiceDate && this.$moment(this.asn.invoiceDate).format('L');
    },

    torg12DateFormatted() {
      return this.asn.torg12Date && this.$moment(this.asn.torg12Date).format('L');
    }
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
        departureDate,
        departureTime,
        estimatedDate,
        estimatedTime,
        invoiceDate,
        invoiceNumber,
        torg12Date,
        torg12Number,
        ...header
      } = this.asn;

      const [departureHour, departureMinute] = departureTime.split(':');
      const [estimatedHour, estimatedMinute] = estimatedTime.split(':');

      const { gsdb, name } = this.supplier;

      const asn = {
        ...header,
        shippingDate: this.$moment(departureDate).hour(departureHour).minute(departureMinute),
        estimatedDate: this.$moment(estimatedDate).hour(estimatedHour).minute(estimatedMinute),
        invoce: { date: this.$moment.utc(invoiceDate), number: invoiceNumber },
        TORG12: { date: this.$moment.utc(torg12Date), number: torg12Number },
        supplier: { gsdb, name },
        details: this.parts,
        packing: this.packing
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
        'departureDate',
        'departureTime',
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
        'torg12Number'
      ];
      return required.every((key) => this.asn[key]) && this.parts.length && this.packing.length;
    }
  }
}
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
