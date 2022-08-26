<template>
  <v-container>
    <v-row>
      <v-col>
        <FwCard title="Events">
          <template v-slot:content>
            <v-row>
              <v-col cols="4">
                <highcharts :options="activeEventsByUser"></highcharts>
              </v-col>
              <v-col cols="4">
                <highcharts :options="activeEventsByCategory"></highcharts>
              </v-col>
              <v-col cols="4">
                <highcharts :options="activeEventsByStatus"></highcharts>
              </v-col>
            </v-row>
          </template>
        </FwCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <FwCard title="Active Areas"></FwCard>
      </v-col>
      <v-col cols="6">
        <FwCard title="Meters Number/Quantity"></FwCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <FwCard title="DMA - Events"></FwCard>
      </v-col>
      <v-col cols="6">
        <FwCard title="DMA - Water Loss Volume (m³)"></FwCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import {
  type Ref,
  ref
} from "vue";
import FwCard from "@/components/Utils/FwCard.vue";

const activeEventsByUser = ref({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    width: 350,
    height: 350,
    backgroundColor: "transparent",
  },
  title: {
    text: "By User",
  },
  navigation: {
    buttonOptions: {
      enabled: false,
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      minSize: 180,
      size: 200,
      innerSize: 110,
      dataLabels: {
        enabled: true,
        format: "{y}",
      },
    },
  },
  series: [
    {
      name: "User",
      colorByPoint: true,
      data: [1, 2, 3],
      showInLegend: true,
    },
  ],
  credits: {
    style: {display: "none"},
  },
  legend: {
    labelFormat: "{name}",
    enabled: true,
  },
})
const activeEventsByCategory = ref({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    width: 350,
    height: 350,
    backgroundColor: "transparent",
  },
  title: {
    text: "By Category",
  },
  navigation: {
    buttonOptions: {
      enabled: false,
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      minSize: 180,
      size: 200,
      innerSize: 110,
      dataLabels: {
        enabled: true,
        format: "{y}",
      },
    },
  },
  series: [
    {
      name: "Category",
      colorByPoint: true,
      data: [1, 2, 3],
      showInLegend: true,
    },
  ],
  credits: {
    style: { display: "none" },
  },
  legend: {
    labelFormat: "{name}",
    enabled: true,
  },
})
const activeEventsByStatus = ref({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    width: 350,
    height: 350,
    backgroundColor: "transparent",
  },
  title: {
    text: "By Status",
  },
  navigation: {
    buttonOptions: {
      enabled: false,
    },
  },
  credits: {
    style: { display: "none" },
  },
  legend: {
    labelFormat: "{name}",
    enabled: true,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      minSize: 180,
      size: 200,
      innerSize: 110,
      dataLabels: {
        enabled: true,
        format: "{y}",
      },
    },
  },
  series: [
    {
      name: "Status",
      colorByPoint: true,
      data: [1, 2, 3],
      showInLegend: true,
    },
  ],
})

</script>
<style scoped>

</style>
