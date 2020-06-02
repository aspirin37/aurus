<template>
  <b-modal
    ref="modal"
    :title="$t('views.role_list.role_editing')"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @hide="$emit('input', false)"
  >
    <v-form @submit.prevent="submit">
      <div class="v-application aurus-modal__body pt-4">
        <div
          v-if="roleSelected"
          class="title primary--text"
        >
          {{ $t('views.role_list.role') }}: <b>{{ roleSelected.name }}</b>
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('views.role_list.availability') }}
          </label>
          <v-select
            v-model="availableFor"
            :items="roleListFiltered"
            :placeholder="$t('views.role_list.select_role')"
            deletable-chips
            hide-selected
            hide-details
            multiple
            chips
            solo
          />
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('views.role_list.compatibility') }}
          </label>
          <v-select
            v-model="compatibleWith"
            :items="roleListFiltered"
            :placeholder="$t('views.role_list.select_role')"
            deletable-chips
            hide-selected
            hide-details
            multiple
            chips
            solo
          />
        </div>
      </div>
      <div class="v-application d-flex">
        <v-btn
          color="primary"
          class="mr-4 flex-grow-1"
          :loading="loading"
          outlined
          large
          type="submit"
          :disabled="loading"
        >
          {{ $t('common.save') }}
        </v-btn>
        <v-btn
          class="flex-grow-1"
          outlined
          large
          @click="$refs.modal.hide()"
        >
          {{ $t('common.cancel') }}
        </v-btn>
      </div>
    </v-form>
  </b-modal>
</template>

<script>

export default {
  name: 'RoleModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    roleSelected: {
      type: Object,
      default: () => ({}),
    },
    roleList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    availableFor: [],
    compatibleWith: [],
  }),
  computed: {
    roleListFiltered() {
      return this.roleList.map((it) => it.name);
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.availableFor = [...this.roleSelected.availableFor];
        this.compatibleWith = [...this.roleSelected.compatibleWith];
        this.$refs.modal.show();
      } else {
        this.$emit('input', false);
      }
    },
  },
  methods: {
    hideModal() {
      this.$emit('input', false);
    },
    async submit() {
      const requestOptions = {
        availableFor: this.availableFor,
        compatibleWith: this.compatibleWith,
      };

      this.loading = true;
      await this.$http.put(`roles/${this.roleSelected.id}`, requestOptions).finally(() => {
        this.loading = false;
      });
      this.$refs.modal.hide();
      this.$emit('submit');
    },
  },
};
</script>
