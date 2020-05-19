<template>
  <div class="users-page">
    <div class="users-page__top">
      <page-title text="Пользователи - администрирование" />
      <div class="users-page__top__wrapper">
      <!-- <button
          v-b-modal.add-new-user
          class="btn aurus-button aurus-button_line aurus-button_lowercase users-page__top__button"
        >
          + добавить
        </button> -->
      <!-- <filter-component
          filter-class="users-page__top__button"
          :open-filter="openFilter"
          :change-filter-state="changeFilterState"
        /> -->
      </div>
    </div>
    <main class="users-page__main">
    <!-- <table-component
      table-type="users-administration"
      :list="tableData.list"
      :headers="tableData.th"
      :new-line-id="tableData.newLineId"
      :change-new-line-id="changeNewLineId"
      :open-filter="openFilter"
    /> -->
    </main>
    <!-- модальное окно -->
    <!-- <b-modal
      id="add-new-user"
      title="Добавление нового пользователя"
      modal-class="aurus-modal"
      hide-header-close
      centered
    >
      <div class="aurus-modal__body">
        <div class="input-block input-block_white">
          <label
            class="input-block__label"
            for="e-mail"
          >E-mail</label>
          <input
            id="e-mail"
            v-model="newUser.email"
            class="input-block__input input-block__input_white"
            type="text"
          >
        </div>
        <div class="input-block input-block_white">
          <label
            class="input-block__label"
            for="login"
          >Логин</label>
          <input
            id="login"
            v-model="newUser.login"
            class="input-block__input input-block__input_white"
            type="text"
          >
        </div>
        <div class="input-block input-block_white">
          <label
            class="input-block__label"
            for="time-password"
          >Временный пароль</label>
          <input
            id="time-password"
            v-model="newUser.timePassword"
            class="input-block__input input-block__input_white"
            type="text"
          >
        </div>
      </div>
      <template v-slot:modal-footer>
        <button
          class="btn aurus-button aurus-button_grayline aurus-button_lowercase w-100"
          @click="$bvModal.hide('add-new-user')"
        >
          отмена
        </button>
        <button
          class="btn aurus-button aurus-button_line aurus-button_lowercase w-100"
          @click="() => {addNewUser(); $bvModal.hide('add-new-user')}"
        >
          + добавить
        </button>
      </template>
    </b-modal> -->
    <!-- !модальное окно -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue';

export default {
  name: 'UserList',
  components: {
    PageTitle,
  },
  data: () => ({
    userList: [],
    tableData: {
      // id - добавленной новой записи
      newLineId: null,
      // th таблицы
      th: [
        {
          id: 0,
          name: 'E-mail',
          isFilter: true,
        },
        {
          id: 1,
          name: 'Поставщик',
          isFilter: true,
        },
        {
          id: 2,
          name: 'Пароль',
          isFilter: false,
        },
      ],
      // tr таблицы
      list: Array(105)
        .fill(0)
        .map((_, index) => ({
          /* eslint-disable */
          id: `f${(~~(Math.random() * 1e9)).toString(16)}`,
          fields: [
            {
              name: `email@email.email ${index}`,
            },
            {
              name: `GSDB1 ${index + Math.ceil(Math.random() * 100)}`,
            },
            {
              name: '********',
            },
          ],
        })),
    },
  }),
  methods: {
    async getUsers() {
      await this.$http.get('users');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
