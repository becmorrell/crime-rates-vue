<template>
    <Bar
        id="crime-types"
        :options="chartOptions"
        :data="chartData"
    />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'barChart',
    components: {Bar},
    props: {
        labels: { Type: Array }
    },
    data(){
        return {
            chartData: {
                labels: ['January', 'February', "March"],
                datasets: [
                    {
                        data: [1, 40, 32]
                    }
                ]
            },
            chartOptions: {
                reposonsive: true
            }
        }
    }
}
</script>

<style>

</style>