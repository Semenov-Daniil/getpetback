<template>
    <div class="container">
        <div class="card border-0">

            <div class="d-flex justify-content-center flex-wrap flex-md-nowrap">
                <img src="http://localhost:8080/images/plug.png" class="m-2 max-w-33 img-thumbnail" alt="...">
                <img src="http://localhost:8080/images/plug.png" class="m-2 max-w-33 img-thumbnail" alt="...">
                <img src="http://localhost:8080/images/plug.png" class="m-2 max-w-33 img-thumbnail" alt="...">
            </div>


            <!-- <div class="d-flex justify-content-center ">
                <div class="row g-5">
                    <div class="col-md-4">
                        <img src="http://localhost:8080/images/plug.png" class="img-thumbnail" alt="...">
                    </div>
                    <div class="col-md-4">
                        <img src="http://localhost:8080/images/plug.png" class="img-thumbnail" alt="...">
                    </div>
                </div>
            </div> -->

            <div class="card-body">
                <div class="card-body">
                    <h5 class="card-title">{{ orderData.kind }}</h5>
                    <p class="card-text">{{ orderData.description }}</p>
                </div>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ orderData.district }}</li>
                    <li class="list-group-item">{{ orderData.mark }}</li>
                    <li class="list-group-item">{{ orderData.phone }}</li>
                    <li class="list-group-item">{{ orderData.name }}</li>
                    <li class="list-group-item">{{ orderData.email }}</li>
                    <li class="list-group-item">{{ orderData.date }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        homeUrl: {
            type: String
        }
    },
    data() {
        return {
            orderData: {},
        }
    },
    methods: {
        async fetchOrder() {
            try {
                let response = await fetch(this.homeUrl + 'api/pets' + '/' + this.$route.params.id, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow'
                })
                let data = await response.json();
                this.orderData = data.data.pet;
                console.log(this.orderData)
            } catch(err) {
                console.log(err.message);
            }
        },
    },
    mounted() {
        this.fetchOrder()
    }
}
</script>

<style>

</style>