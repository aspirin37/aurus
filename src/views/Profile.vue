<template>
  <div class="profile-page">
    <div class="profile-page__top mb-5">
      <div class="h4 primary--text">
        Поставщик
        <span v-if="supplier">
          {{ supplier.name }} / {{ supplier.gsdb }}
        </span>
      </div>
    </div>
    <v-card
      v-if="supplier"
      class="profile-page__main mb-5"
    >
      <v-form
        @submit.prevent="save"
      >
        <div class="profile-page__main__item">
          <div class="profile-page__main__item__container">
            <v-row>
              <v-col
                cols="12"
                lg="6"
                xl="4"
                class="profile-page__main__item__content"
              >
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title">
                    Адрес отгрузки
                  </span>
                  <div class="input-block input-block_white mt-1">
                    <v-text-field
                      v-model="supplier.shippingAddress"
                      dense
                      solo
                    />
                  </div>
                </div>
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title">
                    Временная зона места отгрузки
                  </span>
                  <div class="input-block input-block_white mt-1">
                    <multiselect
                      v-model="supplier.timezone"
                      :options="timezones"
                      placeholder=""
                      selected-label=""
                      select-label=""
                      deselect-label=""
                    />
                  </div>
                </div>
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title">
                    Фактический адрес
                  </span>
                  <div class="input-block input-block_white mt-1">
                    <v-text-field
                      v-model="supplier.physicalAddress"
                      dense
                      solo
                    />
                  </div>
                </div>
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title">
                    Юридический адрес
                  </span>
                  <div class="input-block input-block_white mt-1">
                    <v-text-field
                      v-model="supplier.legalAddress"
                      dense
                      solo
                    />
                  </div>
                </div>
                <v-btn
                  color="primary"
                  outlined
                  type="submit"
                >
                  {{ $t('common.save') }}
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                lg="6"
                xl="4"
                class="profile-page__main__item__content"
              >
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title mb-2">
                    Частота отгрузки
                  </span>
                  <span class="profile-page__main__item__content__item__text">
                    {{ supplier.shippingFrequency }}
                  </span>
                </div>
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title mb-2">
                    Транзитное время
                  </span>
                  <span class="profile-page__main__item__content__item__text">
                    {{ supplier.transitTime }} дней
                  </span>
                </div>
                <div class="profile-page__main__item__content__item">
                  <span class="profile-page__main__item__content__item__title mb-2">
                    Ответственный аналитик
                  </span>
                  <span class="profile-page__main__item__content__item__text">
                    {{ supplier.analystAurus }}
                  </span>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-form>
    </v-card>
    <template v-if="supplier">
      <div class="d-flex mb-3 align-items-end">
        <h1 class="h4 primary--text">
          {{ $t('views.user_list.title') }}
        </h1>
        <div class="ml-auto">
          <v-btn
            class="mr-4"
            color="primary"
            outlined
            large
            @click="showContactsModal('add')"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            {{ $t('common.add') }}
          </v-btn>
        </div>
      </div>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="contacts"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50, 100],
          }"
          class="px-5"
        >
          <template v-slot:item.actions="{ item }">
            <v-hover v-slot="{hover}">
              <v-icon
                class="mr-2"
                :class="hover ? '' : 'text--disabled'"
                color="primary"
                size="20"
                @click="showContactsModal('edit', item)"
              >
                mdi-pencil
              </v-icon>
            </v-hover>
            <v-hover v-slot="{hover}">
              <v-icon
                :class="hover ? '' : 'text--disabled'"
                color="primary"
                size="20"
                @click="removeContact(item.id)"
              >
                mdi-trash-can-outline
              </v-icon>
            </v-hover>
          </template>
        </v-data-table>
      </v-card>
      <contacts-modal
        v-model="contactsModal"
        :contact-selected="contactSelected"
        :type="modalType"
        @submit="contactsModalSubmit"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ContactsModal from '@/components/profile/ContactsModal.vue';

export default {
  name: 'Profile',
  components: {
    ContactsModal,
  },
  data: (vm) => ({
    supplier: null,
    contacts: [],
    headers: [
      { text: vm.$t('common.role'), value: 'role' },
      { text: vm.$t('common.name'), value: 'name' },
      { text: vm.$t('common.phone'), value: 'phone' },
      { text: 'E-mail', value: 'email' },
      {
        text: vm.$t('common.actions'), value: 'actions', sortable: false, width: 150, align: 'center',
      },
    ],
    passwordModal: false,
    contactsModal: false,
    contactSelected: null,
    modalType: 'add',
  }),
  computed: {
    ...mapState(['user']),
    timezones() {
      return this.$moment.tz.names();
    },
  },
  created() {
    this.getSupplier();
    this.getContacts();
  },
  methods: {
    async getSupplier() {
      const { data } = await this.$http.get(`suppliers/${this.user.gsdb}`);
      this.supplier = data;
    },
    async getContacts() {
      const { data: { rows } } = await this.$http.get(`suppliers/${this.user.gsdb}/contacts`);
      this.contacts = rows;
      return Promise.resolve();
    },
    async save() {
      const params = {
        shippingAddress: this.supplier.shippingAddress,
        physicalAddress: this.supplier.physicalAddress,
        legalAddress: this.supplier.legalAddress,
        timezone: this.supplier.timezone,
      };

      this.$http.patch(`suppliers/${this.user.gsdb}`, params);
    },
    showContactsModal(type, contact) {
      this.contactSelected = contact;
      this.modalType = type;
      this.contactsModal = true;
    },
    async removeContact(id) {
      const { data } = await this.$http.delete(`suppliers/${this.user.gsdb}/contacts/${id}`);
      this.contacts = data;
    },
    async contactsModalSubmit() {
      await this.getContacts();
      this.contactsModal = false;
    },
  },
};
</script>

<style lang="scss">
.profile-page .input-block {
  max-width: 350px;
}

.multiselect {
  max-width: 350px;

   ul {
    padding-left: 0;
  }
}
</style>
