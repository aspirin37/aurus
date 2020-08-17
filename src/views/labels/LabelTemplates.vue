<template>
  <div>
    <div class="mb-6">
      <h1 class="h4 primary--text">
        {{ $t('views.label_template.label_template') }}
      </h1>
    </div>
    <main>
      <b-row>
        <b-col>
          <label-template
            label-type="label"
            :header="$t('views.label_template.type_label')"
          />
        </b-col>
        <b-col>
          <label-template
            label-type="packingList"
            :header="$t('views.label_template.type_packing_list')"
          />
        </b-col>
      </b-row>
      <div class="label_template">
        <div v-if="elements.length">
          <h2 class="label-template__fields h5 mb-3">
            {{ $t('views.label_template.template_elements') }}
          </h2>
          <v-chip-group
            column
            class="mb-6"
          >
            <v-chip
              v-for="element of elements"
              :key="element"
              @click="copyToClipboard(element)"
            >
              {{ element }}
            </v-chip>
          </v-chip-group>
        </div>

        <div v-if="fields.length">
          <h2 class="label-template__fields h5 mb-3">
            {{ $t('views.label_template.template_fields') }}
          </h2>
          <v-chip-group
            column
            class="mb-6"
          >
            <v-chip
              v-for="field of fields"
              :key="field"
              @click="copyToClipboard(field)"
            >
              {{ field }}
            </v-chip>
          </v-chip-group>
        </div>

        <div v-if="fonts.length">
          <h2 class="label-template__fields h5 mb-3">
            {{ $t('views.label_template.template_fonts') }}
          </h2>
          <v-chip-group column>
            <v-chip
              v-for="font of fonts"
              :key="font"
              @click="copyToClipboard(font)"
            >
              {{ font }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LabelTemplate from '@/components/labels/LabelTemplate.vue';

export default {
  name: 'LabelTemplates',

  components: {
    LabelTemplate
  },

  data() {
    return {
      elements: [],
      fields: [],
      fonts: [],
    };
  },

  created() {
    this.loadElements();
    this.loadFields();
    this.loadFonts();
  },

  methods: {
    async loadElements() {
      const { data: elements } = await this.$http.get('/labels/elements');
      this.elements = elements;
    },

    async loadFields() {
      const { data: fields } = await this.$http.get('/labels/fields');
      this.fields = fields;
    },

    async loadFonts() {
      const { data: fonts } = await this.$http.get('/labels/fonts');
      this.fonts = fonts;
    },

    copyToClipboard(field) {
      navigator.clipboard.writeText(field);
    },
  },
};
</script>

<style lang="scss">
.label-template {
  padding: 25px 25px 30px 25px;
  background-color: #fff;

  &__select {
    margin-right: 20px;
    padding: 12px 25px;
  }

  &__save {
    padding: 12px 25px;
    color: var(--aurum);

    &:hover {
      color: var(--margaritas);
    }
  }

  &__selected {
    height: 50px;
    margin-top: 20px;

    &-label {
      color: var(--platinum);
    }

    &-filename {
      color: var(--topaz);
    }
  }

  &__fields {
    color: var(--topaz);
  }
}
</style>
