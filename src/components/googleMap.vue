<template>
    <GMapMap
        :center="center"
        :zoom="11"
        ref="myMapRef" 
        style="height: 30rem; width: 80vw;" 
        
    >
        <GMapMarker 
            v-for="marker in markers"
            :key="marker.id"
            :position="center"
            :icon="'/images/crime-icon.svg'"/>

    </GMapMap>
</template>

<script>
export default {
    name: 'GoogleMap',
    props: {
        center: { type: Object },
        icon: Image
    },    
    data() {
        return {
            markers: [
                {
                    id: 'bristol',
                    position: {
                        lat: 51.454514, lng: -2.587910
                    },
                }
            ],
       
        }
    }
}
</script>