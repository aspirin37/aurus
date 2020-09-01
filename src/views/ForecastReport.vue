<template>
  <div>
    <div class="d-flex mb-3 align-items-end">
      <h1 class="h4 primary--text">
        Прогнозы
      </h1>
      <div class="ml-auto">
        <download-excel
          file-name="forecast-report.xlsx"
          url="/forecasts/report.xlsx"
          :params="filters"
        />
      </div>
    </div>
    <table-filters
      v-if="filtersShown"
      :filters="filters"
      :no-items-found="noItemsFound"
      @search="getReport"
    />
    <div
      v-if="!loading && !filtersShown"
      class="fixed-column-table"
    >
      <v-data-table
        class="fixed-column-table__fixed"
        :headers="headersFixed"
        :items="rows"
        :loading-text="$t('common.loading_data')"
        disable-pagination
        hide-default-footer
      />
      <v-data-table
        :headers="headers"
        :items="rows"
        :loading-text="$t('common.loading_data')"
        disable-pagination
        hide-default-footer
      >
        <!-- <template v-slot:headers="props">
          <tr>
            <th
              v-for="it in props.headers"
              :key="it.value"
              :style="getStyle(it.style, it.value)"
            >
              {{ it.text }}
            </th>
          </tr>
        </template> -->
        <template v-slot:body="props">
          <tr
            v-for="(it, i) in props.items"
            :key="i"
          >
            <td
              v-for="(header, j) in headers"
              :key="j"
              :style="getStyle(it.style, header.value)"
            >
              {{ it[header.value] }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import TableFilters from '@/components/common/TableFilters.vue';
import DownloadExcel from '@/components/common/DownloadExcel.vue';

export default {
  name: 'ForecastReport',
  components: {
    TableFilters,
    DownloadExcel,
  },
  data: () => ({
    loading: false,
    noItemsFound: false,
    filtersShown: true,
    filters: {
      supplierGsdb: 'code-4',
      number: 'number-6',
      TT: '90',
    },
    headers: [],
    headersFixed: [],
    rows: [],
    // headers: [
    //   {
    //     text: '',
    //     value: 'col0',
    //   },
    //   {
    //     text: '2020-04-15',
    //     value: 'col1',
    //   },
    //   {
    //     text: '2020-04-16',
    //     value: 'col2',
    //   },
    //   {
    //     text: '2020-04-17',
    //     value: 'col3',
    //     style: {
    //       'background-color': 'red',
    //     },
    //   },
    //   {
    //     text: '2020-04-18',
    //     value: 'col4',
    //   },
    //   {
    //     text: '2020-04-19',
    //     value: 'col5',
    //   },
    //   {
    //     text: '2020-04-20',
    //     value: 'col6',
    //   },
    //   {
    //     text: '2020-04-21',
    //     value: 'col7',
    //   },
    //   {
    //     text: '2020-04-22',
    //     value: 'col8',
    //   },
    //   {
    //     text: '2020-04-23',
    //     value: 'col9',
    //   },
    //   {
    //     text: '2020-04-24',
    //     value: 'col10',
    //   },
    //   {
    //     text: '2020-04-25',
    //     value: 'col11',
    //   },
    //   {
    //     text: '2020-04-26',
    //     value: 'col12',
    //   },
    //   {
    //     text: '2020-04-27',
    //     value: 'col13',
    //   },
    //   {
    //     text: '2020-04-28',
    //     value: 'col14',
    //   },
    //   {
    //     text: '2020-04-29',
    //     value: 'col15',
    //   },
    // ],
    // rows: [
    //   {
    //     col0: 'Это прогноз',
    //     col3: true,
    //     col11: true,
    //   },
    //   {
    //     col0: 'Loose',
    //     col3: 31,
    //     col11: 68,
    //     style: {
    //       col3: {
    //         'background-color': 'red',
    //         color: 'white',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'Usage',
    //     col3: 31,
    //     col11: 68,
    //     style: {
    //       col3: {
    //         'background-color': 'red',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'In transit',
    //     col3: 70,
    //     col11: 49,
    //     style: {
    //       col3: {
    //         'background-color': 'red',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'Will make',
    //     col3: 71,
    //     col11: 5,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'InPlant',
    //     col3: 66,
    //     col11: 49,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'InSystem',
    //     col3: 0,
    //     col11: 0,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'Receiving',
    //     col3: 0,
    //     col11: 0,
    //   },
    //   {
    //     col0: 'Shipment',
    //     col3: 0,
    //     col11: 0,
    //   },
    //   {
    //     col0: 'Подозрение на потерю по результатам пересчета',
    //     col3: 8,
    //     col11: 2,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'Потеряно по результатам пересчета',
    //     col3: 35,
    //     col11: 93,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'Подозрение на брак',
    //     col3: 6,
    //     col11: 68,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    //   {
    //     col0: 'Отправлено в брак',
    //     col3: 8,
    //     col11: 45,
    //     style: {
    //       col3: {
    //         'background-color': 'grey',
    //       },
    //       col11: {
    //         'background-color': 'grey',
    //       },
    //     },
    //   },
    // ],
  }),
  // mounted() {
  //   this.getReport();
  // },
  methods: {
    async getReport() {
      this.loading = true;

      const { data } = await this.$http.get('records-reports/balanceForecast', { params: this.filters }).finally(() => {
        this.loading = false;
      });

      if (data.rows.length) {
        this.noItemsFound = false;
        this.filtersShown = false;

        this.headers = data.headers.slice(1);
        this.headersFixed = data.headers.slice(0, 1);
        this.rows = data.rows;
      } else {
        this.noItemsFound = true;
      }
    },
    toggleFilters() {
      if (this.rows.length) {
        this.filtersShown = !this.filtersShown;
        return;
      }
      this.filtersShown = true;
    },
    getStyle(styleObj, column) {
      return styleObj && styleObj[column]
        ? Array.from(Object.entries(styleObj[column])).reduce((acc, [key, value]) => {
          acc += `${key}: ${value};`;
          return acc;
        }, '')
        : undefined;
    },
  },
};
</script>
