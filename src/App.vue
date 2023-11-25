<template>
    <my-header></my-header>
    <router-view :homeUrl="homeUrl"></router-view>
</template>

<script>
import myHeader from './components/myHeader.vue'
export default {
    components: {
        myHeader,
    },
    data() {
        return {
            homeUrl: 'http://apiyiianimals/',
        }
    }
}
</script>

<style>

</style>
