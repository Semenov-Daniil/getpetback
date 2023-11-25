<template>
    <loading
        v-show="loaderShow"
    />
    <div class="container"
        v-show="!loaderShow"
    >
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button
                    v-for="slider in sliderData.length"
                    :key="slider"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    :data-bs-slide-to="slider - 1"
                    :class="{ active: slider === 1}"
                    :aria-current="(slider === 1)"
                    :aria-label="'Slide ' + slider"
                ></button>
            </div>
            <div class="carousel-inner">
                <div
                    v-for="(pet, index) in sliderData"
                    :key="pet.id"
                    :class="{'carousel-item': true, 'active': index === 0}"
                >
                    <img src="images/plug.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{{ (pet.kind).charAt(0).toUpperCase() + (pet.kind).slice(1)}}</h5>
                        <p>{{ pet.description }}</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

    <div class="container">
        <form class="my-3 row" @submit.prevent>
            <label class="form-label h3">Поиск</label>
            <div class="mb-3 col-sm-10 input-group">
                <input
                    type="search"
                    class="form-control"
                    placeholder="Введите значение"
                    v-model.trim="searchLink"
                    list="orders"
                />
                <datalist id="orders">
                    <option
                        v-for="(opt, index) in listOrdersSearch"
                        :key="index"
                        :value="opt.description"
                    ></option>
                </datalist>
                <button type="submit" class="btn btn-primary" @click="fetchSearchOrders()">Найти</button>
            </div>
        </form>
        <div class="container">
            <div class="row g-3">
                <order-card :ordersData="searchOrders"></order-card>
                <div class="alert-warning col-12 p-3" v-show="searchOrders.length === 0">Животных не найдено</div>
            </div>
        </div>
    </div>

    <div class="container">
        Найденые животные
        <div class="row g-3">
            <order-card :ordersData="petsArr"></order-card>
        </div>
    </div>

    <div class="container">
        <form class="m-3 row" @submit.prevent v-show="formEmail">
            <label class="form-label h3">Подпишитесь, чтобы получать наши новости первыми!</label>
            <div class="mb-3 col-md-10 input-group">
                <input type="email" class="form-control" placeholder="Ваша почта" v-model="emailValue">
                <button type="submit" class="btn btn-primary" @click="newsSub">Подписаться</button>
            </div>
        </form>
        <div class="alert-success col-12 p-3" v-show="!formEmail">Вы успешно подписались на наши уведомления!</div>
        <div class="alert-danger col-12 p-3" v-show="errorValidateEmail">{{ errorValidateEmail }}</div>
    </div>
</template>

<script>
import orderCard from '@/components/orderCard.vue'
export default {
    components: {
        orderCard,
    },
    props: {
        homeUrl: {
            type: String
        }
    },
    data() {
        return {
            loaderShow: true,
            sliderData: [],
            searchLink: '',
            listOrdersSearch: [],
            petsArr: [],
            emailValue: '',
            errorValidateEmail: '',
            formEmail: true,
            searchOrders: [],
        }
    },
    methods: {
        async fetchSlider() {
            try {
                let response = await fetch(this.homeUrl + 'api/pets/slider', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow'
                })
                let data = await response.json();
                this.sliderData = data.data.pets;
            } catch(err) {
                console.log(err.message);
            }
        },
        changeLoaderShow() {
            setTimeout(() => this.loaderShow = false, 3000);
        },
        debounce() {
            setTimeout(
                async () => {
                    let data = {};
                    try {
                        let response = await fetch(this.homeUrl + 'api/search' + '?' + new URLSearchParams({ description: this.searchLink}), {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            redirect: 'follow'
                        })
                        if (response.status == 200) {
                            data = await response.json();
                            this.listOrdersSearch = data.data.orders;
                        } else {
                            this.listOrdersSearch = [{description: 'Результатов не найдено'}];
                        }
                        console.log(this.listOrdersSearch)
                    } catch(err) {
                        console.log(err);
                    }
                }, 3000
            )
        },
        async fetchPets() {
            try {
                let response = await fetch(this.homeUrl + 'api/pets', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow'
                })
                let data = await response.json();
                this.petsArr = data.data.orders;
            } catch(err) {
                console.log(err.message);
            }
        },
        async newsSub() {
            try {
                let response = await fetch(this.homeUrl + 'api/subscription', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow',
                    body: JSON.stringify({
                        'email': this.emailValue
                    })
                })

                if (response.status == 422) {
                    let data = await response.json();
                    this.errorValidateEmail = data.error.errors[0].email[0];
                }

                if (response.status == 200) {
                    this.formEmail = false;
                }
            } catch(err) {
                console.log(err.message);
            }
        },
        async fetchSearchOrders() {
            let data = {};
            try {
                let response = await fetch(this.homeUrl + 'api/search' + '?' + new URLSearchParams({ description: this.searchLink}), {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow'
                })
                if (response.status == 200) {
                    data = await response.json();
                    this.searchOrders = data.data.orders;
                } else {
                    this.searchOrders = [];
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    watch: {
        searchLink() {
            if (this.searchLink.length > 3) {
                this.debounce();
            }
        }
    },
    mounted() {
        this.fetchSlider()
        this.changeLoaderShow()
        this.fetchPets()
    }
}
</script>

<style>

</style>