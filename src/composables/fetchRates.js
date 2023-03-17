import {ref} from 'vue'

export function fetchRates(url){
    const data = ref(null)
    const error = ref(null) 

    fetch('https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592')
        .then(response => response.json())
        .then(data => data.value = response)
        .catch((err) => (error.value = err))

        return { data, error }
}
