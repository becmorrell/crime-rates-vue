<template>
<div>
    <Bar
        :data="chartData"
        :options="chartOptions"
    />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    extends: Bar,
    components: { Bar },
    props: {
        dataset: {
            type: Array,
            required: false
        },
        labels: {
            type: Array,
            required: true
    }
},
    
    data(){
        return {
            chartData: {
                labels: this.labels,
                datasets: [
                    {
                        borderColor: '#f6b09e',
                        backgroundColor: 'rgb(246, 176, 157)',
                        label: 'crimes',
                        data: this.dataset,
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'Crimes 🥷🏻 in your area' },
                },
            },
    }
    }
   
    
}
</script>

<style>

</style>