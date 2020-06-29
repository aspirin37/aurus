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
            {{ $t('views.promise_list.plant') }}
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
          <v-text-field
            v-model="promise.partNumber"
            solo
            :rules="[rules.required]"
          />
        </div>

        <v-row>
          <v-col cols="6">
            <div class="input-block input-block_white">
              <label class="input-block__label">{{ $t('views.promise_list.shipping_date') }}</label>
              <v-menu
                v-model="isShippingDatePickerShown"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                nudge-bottom="10px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="shippingDateFormatted"
                    readonly
                    hide-details
                    solo
                    :rules="[rules.required]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="promise.shippingDate"
                  dark
                  @input="isShippingDatePickerShown = false"
                />
              </v-menu>
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
export default {
  name: 'PromiseCreation',

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
      promise: {
        plant: '',
        partNumber: '',
        shippingDate: null,
        amount: 0,
      },

      loading: false,

      isShown: false,

      isShippingDatePickerShown: false,

      rules: {
        required: (value) => Boolean(value) || this.$t('validation.required'),
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },

    shippingDateFormatted() {
      return this.$d(new Date(this.promise.shippingDate));
    },
  },

  watch: {
    value(val) {
      this.isShown = val;
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
        shippingDate: new Date(this.promise.shippingDate),
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
