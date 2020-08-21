<template>
  <b-modal
    ref="modal"
    v-model="isShown"
    :title="$t('views.promise_list.add_promise')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @hidden="hideModal"
  >
    <v-form @submit.prevent="submit">
      <div class="v-application aurus-modal__body pt-0">
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('common.plant') }}
          </label>
          <v-autocomplete
            v-model="promise.plant"
            :items="plants"
            solo
            :rules="[rules.required]"
            @change="promise.partNumber = ''"
          />
        </div>

        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('views.promise_list.part_number') }}
          </label>
          <v-autocomplete
            v-model="promise.partNumber"
            :items="availableParts"
            item-text="number"
            item-value="number"
            solo
            :rules="[rules.required]"
          />
        </div>

        <v-row>
          <v-col cols="6">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.promise_list.shipping_date') }}</label>
              <date-picker v-model="promise.shippingDate" />
            </div>
          </v-col>

          <v-col cols="6">
            <div class="input-block input-block_white">
              <label class="input-block__label">
                {{ $t('views.promise_list.amount') }}
              </label>
              <v-text-field
                v-model.number="promise.amount"
                type="number"
                solo
              />
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="v-application d-flex">
        <v-btn
          class="mr-4 flex-grow-1"
          outlined
          large
          :disabled="loading"
          @click="hideModal"
        >
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          class="flex-grow-1"
          :loading="loading"
          outlined
          large
          type="submit"
        >
          {{ $t('common.create') }}
        </v-btn>
      </div>
    </v-form>
  </b-modal>
</template>

<script>
import DatePicker from '@/components/common/DatePicker.vue';;

const EMPTY_VALUE = {
  plant: '',
  partNumber: '',
  shippingDate: '',
  amount: 0,
};

export default {
  name: 'PromiseCreation',

  components: {
    DatePicker
  },

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    parts: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      promise: { ...EMPTY_VALUE },

      loading: false,

      isShown: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },

    plants() {
      return this.parts.reduce(
        (acc, item) => (acc.includes(item.plant) ? acc : [...acc, item.plant]),
        [],
      );
    },

    availableParts() {
      return this.parts.filter((part) => part.plant === this.promise.plant);
    },
  },

  watch: {
    value(val) {
      this.isShown = val;
      if (val) {
        this.promise = { ...EMPTY_VALUE };
      }
    },
  },

  methods: {
    hideModal() {
      this.$emit('input', false);
    },

    async submit() {
      if (!this.validate()) {
        return;
      }

      this.loading = true;

      const { plant, amount } = this.promise;

      const promise = {
        plant,
        amount,
        part: { number: this.promise.partNumber },
        shippingDate: this.$moment.utc(this.promise.shippingDate, 'L'),
        gsdb: this.user.gsdb,
      };

      try {
        await this.$http.post('/promises', promise);
        this.hideModal();
        this.$emit('submit');
      } finally {
        this.loading = false;
      }
    },

    validate() {
      const required = ['plant', 'partNumber', 'shippingDate'];
      return required.every((field) => this.promise[field]);
    },
  },
};
</script>
