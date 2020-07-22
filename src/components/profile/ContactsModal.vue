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
          <label class="input-block__label">
            {{ $t('common.role') }}
          </label>
          <v-select
            v-model="contact.role"
            :items="contactRoles"
            hide-details
            elevation="0"
            :label="$t('common.select_role')"
            solo
          />
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('common.name') }}
          </label>
          <v-text-field
            v-model="contact.name"
            hide-details
            solo
          />
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">E-mail</label>
          <v-text-field
            v-model="contact.email"
            type="email"
            hide-details
            required
            solo
          />
        </div>
        <div class="input-block input-block_white">
          <label class="input-block__label">
            {{ $t('common.phone') }}
          </label>
          <v-text-field
            v-model="contact.phone"
            hide-details
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
import { mapState } from 'vuex';
import { contactRoles } from '@/utils/enums';

export default {
  name: 'ContactsModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    contactSelected: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    loading: false,
    contact: {
      email: '',
      name: '',
      role: '',
      phone: '',
    },
    roles: [],
  }),
  computed: {
    ...mapState(['user']),
    contactRoles() {
      return Array.from(Object.values(contactRoles));
    },
    title() {
      return this.isAddModal ? this.$t('views.contact_list.adding_contact') : this.$t('views.contact_list.editing_contact');
    },
    submitDisabled() {
      return Array.from(Object.values(this.contact)).some((it) => !it);
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
        this.$refs.modal.hide();
      }
    },
  },
  methods: {
    async getRoles() {
      const { data } = await this.$http.get('roles');
      this.roles = data.rows;
    },
    updateForm() {
      if (this.isAddModal) {
        Object.assign(this.$data.contact, this.$options.data().contact);
      } else {
        this.contact = { ...this.contactSelected };
      }
    },
    async submit() {
      if (this.isAddModal) {
        await this.$http.post(`suppliers/${this.user.gsdb}/contacts`, this.contact);
      } else {
        await this.$http.patch(`suppliers/${this.user.gsdb}/contacts/${this.contact.id}`, this.contact);
      }
      this.$emit('submit');
    },
  },
};
</script>
