<template>
    <div class="container">
        <h2>Профиль</h2>
        <div class="card-body">
            <p class="h5">Имя пользователя: {{ userData.name }}</p>
            <p class="h5">E-mail пользователя: {{ userData.email }} <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emailModal">Изменить</button></p>
            <p class="h5">Телефон пользователя: {{ userData.phone}} <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#telModal">Изменить</button></p>
            <p class="h5">Дата регистрации пользователя: {{ ((new Date(userData.created_at)).toLocaleDateString('ru-RU')) }}</p>
            <p class="h5">Количество дней с момента регистрации на сайте: {{ Math.floor(((new Date()) - (new Date(userData.created_at)))/(1000*60*60*24)) }}</p>
            <p class="h5">Количество животных пользователя, у которых нашлись хозяева: {{ userData.petsCount }}</p>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="telModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Изменить номер телефона</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="tel" class="form-control" placeholder="Ваш новый телефон" v-model="phone">
                </div>
                <div v-if="errorValidate.find((err) => err.title == 'phone')">
                    {{ (errorValidate.find((err) => err.title == 'phone')).error }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" @click="validatePhone">Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="emailModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Изменить e-mail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="email" class="form-control" placeholder="Ваш новый e-mail" v-model="email">
                </div>
                <div v-if="errorValidate.find((err) => err.title == 'email')">
                    {{ (errorValidate.find((err) => err.title == 'email')).error }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" @click="validateEmail">Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h2>Ваши объявления</h2>
        <h4>Активные</h4>
        <div class="row g-3">
            <div class="col-md-6" v-for="orders in userOrders.active" :key="orders.id">
                <div class="card mx-2">

                    <img src="images/plug.png" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">{{ orders.kind }}</h5>
                        <p class="card-text">{{ orders.description }}</p>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ orders.district }}</li>
                        <li class="list-group-item">{{ orders.mark }}</li>
                        <li class="list-group-item">{{ orders.date }}</li>
                    </ul>

                    <div class="card-body">
                        <a href="" class="card-link" @click="$router.push('/pet/' + order.id)">Перейти к публикации</a>
                    </div>

                    <button class="btn btn-danger" @click="fetchDeleteOrder(orders.id)">Удалить</button>

                </div>
            </div>
            <div class="alert-warning col-12 p-3" v-if="!(userOrders.active) || (userOrders.active).length == 0">Животных не найдено</div>

        </div>
        <h4>Хозяин найден</h4>
        <div class="row g-3">
            <div class="col-md-6" v-for="orders in userOrders.wasFound" :key="orders.id">
                <div class="card mx-2">

                    <img src="images/plug.png" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">{{ orders.kind }}</h5>
                        <p class="card-text">{{ orders.description }}</p>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ orders.district }}</li>
                        <li class="list-group-item">{{ orders.mark }}</li>
                        <li class="list-group-item">{{ orders.date }}</li>
                    </ul>

                    <div class="card-body">
                        <a href="" class="card-link" @click="$router.push('/pet/' + order.id)">Перейти к публикации</a>
                    </div>

                    <button class="btn btn-danger" @click="fetchDeleteOrder(orders.id)">Удалить</button>

                </div>
            </div>
            <div class="alert-warning col-12 p-3" v-if="!(userOrders.wasFound) || (userOrders.wasFound).length == 0">Животных не найдено</div>

        </div>
        <h4>На модерации</h4>
        <div class="row g-3">
            <div class="col-md-6" v-for="orders in userOrders.onModeration" :key="orders.id">
                <div class="card mx-2">

                    <img src="images/plug.png" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">{{ orders.kind }}</h5>
                        <p class="card-text">{{ orders.description }}</p>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ orders.district }}</li>
                        <li class="list-group-item">{{ orders.mark }}</li>
                        <li class="list-group-item">{{ orders.date }}</li>
                    </ul>

                    <div class="card-body">
                        <a href="" class="card-link" @click="$router.push('/pet/' + order.id)">Перейти к публикации</a>
                    </div>

                    <button class="btn btn-danger" @click="fetchDeleteOrder(orders.id)">Удалить</button>

                </div>
            </div>
            <div class="alert-warning col-12 p-3" v-if="!(userOrders.onModeration) || (userOrders.onModeration).length == 0">Животных не найдено</div>

        </div>
        <h4>В архиве</h4>
        <div class="row g-3">
            <div class="col-md-6" v-for="orders in userOrders.archive" :key="orders.id">
                <div class="card mx-2">

                    <img src="images/plug.png" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">{{ orders.kind }}</h5>
                        <p class="card-text">{{ orders.description }}</p>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ orders.district }}</li>
                        <li class="list-group-item">{{ orders.mark }}</li>
                        <li class="list-group-item">{{ orders.date }}</li>
                    </ul>

                    <div class="card-body">
                        <a href="" class="card-link"  @click="$router.push('/pet/' + order.id)">Перейти к публикации</a>
                    </div>

                    <button class="btn btn-danger" @click="fetchDeleteOrder(orders.id)">Удалить</button>

                </div>
            </div>
            <div class="alert-warning col-12 p-3" v-if="!(userOrders.archive) || (userOrders.archive).length == 0">Животных не найдено</div>

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
            userData: [],
            email: '',
            phone: '',
            errorValidate: [],
            userOrders: [],
        }
    },
    methods: {
        async fetchUser() {
            try {
                let response = await fetch(this.homeUrl + 'api/users', {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('token'),
                    },
                    redirect: 'follow'
                })
                let data = await response.json();
                this.userData = data.data.user;
            } catch(err) {
                console.log(err.message);
            }
        },
        async fetchPhone() {
            try {
                let response = await fetch(this.homeUrl + 'api/users/phone', {
                    method: 'PATCH',
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        phone: this.phone
                    })
                })
            } catch(err) {
                console.log(err);
            }
        },
        async fetchEmail() {
            try {
                let response = await fetch(this.homeUrl + 'api/users/email', {
                    method: 'PATCH',
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('token'),
                    },
                    redirect: 'follow',
                    body: JSON.stringify({
                        email: this.email
                    })
                })
            } catch(err) {
                console.log(err.message);
            }
        },
        validatePhone() {
            this.errorValidate = [];
            if (!(/^[\+]{0,1}[0-9]{11}$/u.test(this.phone))) {
                this.errorValidate.push({title: 'phone', error: 'Ошибка в поле'});
            }
            
            if (!this.errorValidate.length) {
                this.fetchPhone();
            }
        },
        validateEmail() {
            this.errorValidate = [];
            if (!(this.email)) {
                this.errorValidate.push({title: 'email', error: 'Ошибка в поле'});
            }
            
            if (!this.errorValidate.length) {
                this.fetchEmail();
            }
        },
        async fetchUserOrders() {
            try {
                let response = await fetch(this.homeUrl + 'api/users/orders', {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('token'),
                    },
                    redirect: 'follow'
                });
                if(response.status === 200) {
                    let data = await response.json();
                    this.userOrders = data.data.orders;
                }
            } catch(err) {
                console.log(err.message);
            }
        },
        async fetchDeleteOrder(id) {
            try {
                let response = await fetch(this.homeUrl + 'api/users/orders' + '/' + id, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('token'),
                    },
                    redirect: 'follow'
                });
                this.fetchUserOrders();
            } catch(err) {
                console.log(err.message);
            }
        },
    },
    mounted() {
        this.fetchUser(),
        this.fetchUserOrders()
    }
}
</script>

<style>

</style>