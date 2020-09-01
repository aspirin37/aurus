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
          <v-text-field
            v-model="promise.plant"
            solo
            :rules="[rules.required]"
          />
        </div>

        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('views.promise_list.part_number') }}
          </label>
          <v-autocomplete
            v-model="promise.partNumber"
            :loading="loadingParts"
            :items="parts"
            :search-input.sync="partSearch"
            item-text="number"
            item-value="number"
            :placeholder="$t('common.type_to_search')"
            cache-items
            hide-no-data
            clearable
            solo
            :rules="[rules.required]"
          />
        </div>

        <v-row>
          <v-col cols="6">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.promise_list.shipping_date') }}</label>
              <date-picker
                v-model="promise.shippingDate"
                :config="dateConfig"
                required
              />
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
import DatePicker from '@/components/common/DatePicker.vue';

const EMPTY_VALUE = {
  plant: '',
  partNumber: '',
  shippingDate: '',
  amount: 0,
};

export default {
  name: 'PromiseCreation',

  components: {
    DatePicker,
  },

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      promise: { ...EMPTY_VALUE },

      loading: false,
      isShown: false,

      parts: [],
      loadingParts: false,
      partSearch: '',

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },

      dateConfig: {
        minDate: this.$moment.utc().startOf('day').toDate(),
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  watch: {
    value(val) {
      this.isShown = val;
      if (val) {
        this.promise = { ...EMPTY_VALUE };
      }
    },

    partSearch(value) {
      if (value && value !== this.promise.part) {
        this.getParts(value);
      }
    },
  },

  methods: {
    hideModal() {
      this.$emit('input', false);
    },

    async getParts(str) {
      this.loadingParts = true;

      const query = {
        number: { $regex: `.*${str}.*`, $options: 'i' },
      };

      try {
        const { data } = await this.$http.get('/parts', {
          params: { query },
        });
        this.parts = data.rows;
      } finally {
        this.loadingParts = false;
      }
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
