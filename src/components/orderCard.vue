<template>
    <div class="col-md-4" v-for="order in ordersData" :key="order.id">
        <div class="card mx-2">

            <img src="images/plug.png" class="card-img-top" alt="...">

            <div class="card-body">
                <h5 class="card-title">{{ order.kind }}</h5>
                <p class="card-text">{{ order.description }}</p>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ order.district }}</li>
                <li class="list-group-item">{{ order.mark }}</li>
                <li class="list-group-item">{{ order.phone }}</li>
                <li class="list-group-item">{{ order.name }}</li>
                <li class="list-group-item">{{ order.date }}</li>
            </ul>

            <div class="card-body alert-success" v-if="order.register">Зарегестрированный пользователь</div>
            <div class="card-body alert-danger" v-else>Незарегестрированный пользователь</div>

            <div class="card-body">
                <a href="" @click="$router.push(`/pet/${order.id}`)" class="card-link">Перейти к публикации</a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'order-card',
    props: {
        ordersData: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>