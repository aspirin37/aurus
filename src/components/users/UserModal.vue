<template>
  <b-modal
    ref="modal"
    :title="title"
    modal-class="aurus-modal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    @hide="$emit('input', false)"
  >
    <v-form @submit.prevent="submit">
      <div
        class="v-application aurus-modal__body pt-0"
        :class="{'pt-4': isAddModal}"
      >
        <div
          v-if="isAddModal"
          class="input-block input-block_white"
        >
          <label class="input-block__label">E-mail</label>
          <v-text-field
            v-model="user.email"
            type="email"
            hide-details
            required
            solo
          />
        </div>
        <div
          v-else
          class="title primary--text"
        >
          {{ user.email }}
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('common.name') }}
          </label>
          <v-text-field
            v-model="user.name"
            hide-details
            solo
          />
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('common.role') }}
          </label>
          <v-select
            v-model="user.role"
            :items="roles"
            item-text="name"
            hide-details
            elevation="0"
            :label="$t('common.select_role')"
            solo
          />
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            GSDB
          </label>
          <v-text-field
            v-model="user.gsdb"
            hide-details
            solo
          />
        </div>
        <div
          v-if="isEditModal"
          class="input-block input-block_white"
        >
          <label class="input-block__label">
            {{ $t('common.password') }}
          </label>
          <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('common.password_placeholder')"
            hide-details
            solo
            @click:append="showPassword = !showPassword"
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
          :disabled="submitDisabled || loading"
        >
          <v-icon
            v-if="isAddModal"
            left
          >
            mdi-plus
          </v-icon>
          {{ $t(isAddModal ? 'common.add' : 'common.save') }}
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
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    userSelected: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    loading: false,
    showPassword: false,
    user: {
      email: '',
      name: '',
      gsdb: '',
      role: '',
      password: '',
    },
    roles: [],
  }),
  computed: {
    title() {
      return this.isAddModal ? this.$t('views.user_list.adding_user') : this.$t('views.user_list.editing_user');
    },
    submitDisabled() {
      return false;
    },
    isAddModal() {
      return this.type === 'add';
    },
    isEditModal() {
      return this.type === 'edit';
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.updateForm();
        this.$refs.modal.show();
      } else {
        this.$emit('input', false);
      }
    },
  },
  created() {
    this.getRoles();
  },
  methods: {
    updateForm() {
      if (this.isAddModal) {
        Object.assign(this.$data.user, this.$options.data().user);
      } else {
        this.user = { ...this.userSelected };
      }
    },
    async getRoles() {
      const { data } = await this.$http.get('roles');
      this.roles = data.rows;
    },
    async submit() {
      this.loading = true;

      const params = { ...this.user };
      params.role = [this.user.role];

      if (!this.user.password) {
        delete params.password;
      }

      if (this.isAddModal) {
        await this.$http.post('users', params).finally(() => {
          this.loading = false;
        });
      } else {
        await this.$http.put(`users/${this.user.id}`, params).finally(() => {
          this.loading = false;
        });
      }
      this.$refs.modal.hide();
      this.$emit('submit');
    },
  },
};
</script>
