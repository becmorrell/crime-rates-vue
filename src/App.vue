<template>
  <div>
    <h1>Crime Rates in {{selectedLocation}}</h1>
    <BarChartNew :dataSet="theData" :chartLabels="labels" />

    <select name="location" @change="getLocation($event, this.locations)" v-model="selectedLocation">
      <option v-for="(coordinates, location) in locations" :key="location" :value="location">
        {{location}}
      </option>
    </select>

    <!-- <Bar :data="data" :options="options" :labels="labels" /> -->

    <!-- <div v-for="item in crimes" :key="item">
      {{item.category}} - {{item.location.street.name}} -->

    <!-- </div> -->
  </div>
</template>

<script>
import { locations } from "@/middleware/locations.js";
import BarChartNew from "./components/barChartNew.vue";

export default {
  name: "App",
  components: { BarChartNew },
  data() {
    return {
      crimes: null,
      categories: [null],
      newArrLabels: [null],
      locations,
      theData: [12, 42, 53, 23, 53, 12, 43, 53, 23, 53, 36, 80, 36, 80],
      labels: [null],
      selectedLocation: 'Bristol'
    };
  },
  methods: {
    async fetchData(selectedLocation) {
      if (locations.hasOwnProperty(selectedLocation)){
      const lat = this.locations[selectedLocation].lat
      console.log('lat', lat)
      const lng = this.locations[selectedLocation].lng
      console.log('long', lng)

    try {
        const response = await fetch(
          `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2022-12`,
          {
            "Content-Type": "text/plain",
          }
        );
       
        const data = await response.json();
        const allCategories = data.map((item) => item.category);

        console.log("allCat", allCategories);

        this.labels = allCategories.filter(function (item, index) {
          return allCategories.indexOf(item) === index;
        });

        console.log("getlabels", this.labels);

        

        this.crimes = data;
      } catch (e) {
        console.error(e);
      }
      }
      //otherwise, fetch data and assign to variable.
      
    },
    getLocation(event){
      const selectedLocation = event.target.value
      console.log('updated location = ', selectedLocation)
      return { selectedLocation }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    selectedLocation(a){
      console.log('new change')
      this.fetchData(a)
    }
  }
};
</script>

<style></style>
