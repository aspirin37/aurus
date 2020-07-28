<template>
  <div>
    <div class="d-flex mb-3">
      <h1 class="h4 primary--text">
        {{ $t('views.shipment_notice_details.shipment_notice_details') }}
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
          {{ $t('views.shipment_notice_details.back_to_list') }}
        </router-link>
      </div>
    </div>

    <app-loader v-if="loading" />

    <div v-else>
      <main class="shipment-notice__main">
        <b-row>
          <b-col cols="6">
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('common.supplier') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.supplier.gsdb }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.supplier_name') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.supplier.name }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('common.plant') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.plant }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.carrier') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.carrier.code }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.carrier_name') }}
              </div>
              <div>
                {{ asn.carrier.name }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.asn_number') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.number }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.packing_list') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.packingList }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.shipment_date') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.createdAt.format('L LT') }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.estimated_date') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.estimatedDate.format('L LT') }}
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.container_number') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.containerNumber }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.freight_bill_number') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.freightBillNumber }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.bill_of_lading') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.billOfLading }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.net_weight') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.netWeightKg }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.gross_weight') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.grossWeightKg }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.contract') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.contract }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.invoice_date') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.invoceRu.date }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.invoice_number') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.invoceRu.number }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.torg_12_date') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.TORG12.date }}
              </div>
            </div>
            <div class="mb-3">
              <div class="shipment-notice__label">
                {{ $t('views.shipment_notice_details.torg_12_number') }}
              </div>
              <div class="shipment-notice__value">
                {{ asn.TORG12.number }}
              </div>
            </div>
          </b-col>
        </b-row>
      </main>

      <shipment-notice-parts :parts="asn.details" readonly />

      <shipment-notice-packing :packing="asn.packing" :parts="asn.details" readonly />
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/common/AppLoader.vue';
import ShipmentNoticeParts from '@/components/asn/ShipmentNoticeParts.vue';
import ShipmentNoticePacking from '@/components/asn/ShipmentNoticePacking.vue';

export default {
  name: 'ShipmentNoticeDetails',

  components: {
    AppLoader,
    ShipmentNoticeParts,
    ShipmentNoticePacking
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      asn: {},
      loading: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  created() {
    this.getTimezone();
    this.getItem();
  },

  methods: {
    async getTimezone() {
      if (!this.user) {
        this.$moment.tz.setDefault();
        return;
      }

      try {
        const { data } = await this.$http.get(`/suppliers/${this.user.gsdb}`);
        if (data.timezone) {
          this.$moment.tz(data.timezone);
        } else {
          this.$moment.tz.setDefault();
        }
      } catch (error) {
        this.$moment.tz.setDefault();
      }
    },

    async getItem() {
      this.loading = true;
      try {
        const { data } = await this.$http.get(`/asn/${this.id}`);
        this.asn = {
          ...data,
          shippingDate: this.$moment(data.shippingDate),
          estimatedDate: this.$moment(data.estimatedDate),
          createdAt: this.$moment(data.createdAt),
          updatedAt: this.$moment(data.updatedAt)
        };
      } finally {
        this.loading = false;
      }
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

  .shipment-notice__label {
    font-size: 20px;
    font-weight: 500;
    color: var(--topaz);
  }

  .shipment-notice__value {
    font-size: 18px;
    color: var(--topaz);
    min-height: 27px;
  }
}
</style>
