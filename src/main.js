import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from "@fawmi/vue-google-maps"

import './assets/main.css'

const app = createApp(App);

app.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCxuAlTHeKdjJ6kyP1AuiIElcznV5JjxAM"
    }
}).mount("#app")



// app.use(VueGoogleMaps, {
//     load: {
//         key: "AIzaSyCxuAlTHeKdjJ6kyP1AuiIElcznV5JjxAM'AIzaSyCxuAlTHeKdjJ6kyP1AuiIElcznV5JjxAM"
//     },
// }).mount('#app');


