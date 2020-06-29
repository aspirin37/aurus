<template>
  <v-btn
    outlined
    large
    class="mr-2"
    @click="downloadExcel"
  >
    <v-icon left>
      mdi-file-excel
    </v-icon>
    {{ $t('common.download') }}
  </v-btn>
</template>

<script>
export default {
  name: 'DownloadExcel',
  props: {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    async downloadExcel() {
      const response = await this.$http({
        method: 'GET',
        responseType: 'blob',
        url: this.url,
        params: this.params,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.fileName);
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>
