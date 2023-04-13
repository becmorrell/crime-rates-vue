<template>
  <div>

    <h1>Crime Rates in {{selectedLocation}}</h1>
    <BarChartNew v-if="theData" :data="theData" :labels="labels" />

    <select name="location" @change="getLocation($event, this.locations)" v-model="selectedLocation">
      <option v-for="(coordinates, location) in locations" :key="location" :value="location">
        {{location}}
      </option>
    </select>

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
      categories: null,
      newArr: null,
      locations,
      theData: [],
      labels: [],
      selectedLocation: 'Bristol',
      categoryObject: {}
    };
  },
  methods: {
    async fetchData(selectedLocation) {
      const lat = this.locations[selectedLocation].lat
      const lng = this.locations[selectedLocation].lng

    try {
        const response = await fetch(
          `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2023-01`,
          {
            "Content-Type": "text/plain",
          }
        );
        const data = await response.json();

        for (let item in data){
          this.categoryObject.hasOwnProperty(data[item].category) 
          ? this.categoryObject[data[item].category]++ 
          : this.categoryObject[data[item].category] = 1
        }
        this.labels.push(...Object.keys(this.categoryObject))
        this.theData = Object.values(this.categoryObject)
      } catch (e) {
        console.error(e);
      }
    },
    getLocation(event){
      const selectedLocation = event.target.value

      this.labels = [];
      this.fetchData(event.target.value)

      return { selectedLocation }
    }
  },
  mounted() {
    this.fetchData(this.selectedLocation);
  },
  
};
</script>

<style></style>
