<template>
  <div class="labels-page">
    <div class="mb-3">
      <h1 class="display-1 primary--text">
        {{ $t('views.label_printing.label_printing') }}
      </h1>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="6"
          class="pl-0"
        >
          <div class="px-10 py-6 white">
            <h2 class="display-1 primary--text">
              {{ $t('views.label_printing.step1') }}
            </h2>
            <h3 class="h5 step__top__description">
              Загрузите данные для формирования этикетки
            </h3>

            <div class="mt-10">
              <button
                :disabled="loading"
                class="btn aurus-button aurus-button_line aurus-button_lowercase step_first__buttons__button step_first__buttons__button_download mr-5"
              >
                <v-icon>mdi-download</v-icon>
                {{ $t('views.label_printing.download_template') }}
              </button>
              <button
                :disabled="loading"
                class="btn aurus-button aurus-button_line aurus-button_lowercase step_first__buttons__button"
              >
                <v-icon>mdi-download</v-icon>
                {{ $t('common.upload') }}
              </button>
            </div>

            <div class="mt-6">
              <span class="step_first__maket__title">
                {{ $t('views.label_printing.template') }}
              </span>
            </div>
          </div>
        </v-col>

        <v-col
          cols="6"
          class="pr-0"
        >
          <div class="px-10 py-6 white">
            <h2 class="display-1 primary--text">
              {{ $t('views.label_printing.step2') }}
            </h2>
            <h3 class="h5 step__top__description">
              Введите необходимое количество макетов
            </h3>

            <div class="input-block input-block-white step_second__amount-block__inline mt-10 d-flex">
              <label class="input-block__label">{{ $t('views.label_printing.copy_amount') }}</label>
              <input
                type="number"
                v-model.number="copyAmount"
                class="input-block__input input-block__input_white"
              />
            </div>

            <div class="mt-10">
              <button
                :disabled="loading"
                class="btn aurus-button aurus-button_line aurus-button_lowercase"
              >
                {{ $t('views.label_printing.print') }}
              </button>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LabelPrinting',

  data() {
    return {
      loading: false,
      copyAmount: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.labels-page {
  .step__top__description {
    color: var(--topaz);
  }

  .step_first__buttons__button {
    padding: 12px 25px;

    i {
      font-size: 16px;
    }

    &:hover {
      i {
        color: var(--aurum);
      }
    }

    &_download {
      color: var(--aurum);

      i {
        color: var(--aurum);
      }

      &:hover {
        color: var(--margaritas);

        i {
          color: var(--margaritas);
        }
      }
    }
  }

  .step_first__maket__title {
    color: var(--topaz);
  }

  .step_second__amount-block__inline {
    label {
      width: 110px;
      color: var(--topaz);
      align-self: center;
    }

    input {
      width: 138px;
    }
  }
}
</style>
