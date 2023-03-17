<template>
    <Bar
        :data="chartData"
        :options="chartOptions"
    />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'barChart',
    components: { Bar },
    props: {
        dataSet: {
            type: Array,
            required: false
        },
        chartLabels: {
            type: Array,
            required: true
    }
},
    data(){
        return {
            chartData: {
                labels: this.chartLabels,
                datasets: [
                    {
                        borderColor: '#f6b09e',
                        backgroundColor: 'rgb(246, 176, 157)',
                        label: 'crimes',
                        data: this.dataSet,
                    },
                ],
            },
            chartOptions: {
                reposonsive: true,
                maintianAspectRatio: false,
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