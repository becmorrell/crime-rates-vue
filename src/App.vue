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
      newArr: [null],
      locations,
      theData: [null],
      labels: [null],
      selectedLocation: 'Bristol',
      categoryObject: {}
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
          `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2023-01`,
          {
            "Content-Type": "text/plain",
          }
        );
       
        const data = await response.json();
        console.log('data to start', data)
        const allCategories = data.map((item) => item.category);
        
        //looop through all data, if category exists increment that category count +1, if not, add to category to object and count is 1.

        for (let item in data){
          this.categoryObject.hasOwnProperty(data[item].category) 
          ? this.categoryObject[data[item].category]++ 
          : this.categoryObject[data[item].category] = 1
        }

        console.log('after loop:', this.categoryObject)
        
        const newLabels = Object.keys(this.categoryObject)
        this.labels = newLabels

        console.log("getlabels in array", this.labels);
        

        // Needs to be an array of values
        console.log('data', Object.values(this.categoryObject))
        const newData = Object.values(this.categoryObject)
        this.theData = newData

        console.log("data for graph", this.theData)
      
      } catch (e) {
        console.error(e);
      }
      }
      
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
