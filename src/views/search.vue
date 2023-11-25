<template>
    <div class="container">
        <h2 class="mb-2">Поиск</h2>
        <form class="row" @submit.prevent>
            <div class="mb-3 col-md-6">
                <label class="form-label">Район</label>
                <select  class="form-select" placeholder="" v-model="selectDistricts">
                    <option value="">
                        Район нахождения
                    </option>
                    <option
                        v-for="option in districtsData"
                        :key="option.id"
                        :value="option.district"
                    >
                    {{ option.district }}
                    </option>
                </select>
            </div>
            <div class="mb-3 col-md-6">
                <label class="form-label">Вид животного</label>
                <select  class="form-select" placeholder="Вид животного" v-model="selectKinds">
                    <option value="">
                        Вид
                    </option>
                    <option
                        v-for="option in kindsData"
                        :key="option.id"
                        :value="option.kind"
                    >
                    {{ option.kind }}
                    </option>
                </select>
            </div>
            <button class="btn btn-primary" @click="validateForm">Найти</button>
            <div v-if="validateMessage" style="color: red;">
                Выберите хотя бы одно из значений!
            </div>
        </form>
    </div>

    <div class="container" v-if="search">
        <h2 class="mb-2">Результаты поиска</h2>
        <div v-if="searchOrders.length">
            <div class="row g-3">
                <order-card :ordersData="paginationOrders"></order-card>
            </div>
            <div class="d-flex justify-content-center my-4">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#" @click="page > 1 ? page-- : page = 1">Previous</a></li>
                        <li 
                            class="page-item" 
                            v-for="pageNum in totalPage"
                            :key="pageNum"
                            :class="{'active': pageNum === page}"
                        >
                            <a class="page-link" href="" @click.prevent @click="page = pageNum">{{ pageNum }}</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#" @click="page < totalPage ? page++ : page = totalPage">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="alert-warning col-12 p-3" v-else>Животных не найдено</div>
    </div>
</template>

<script>
import orderCard from '@/components/orderCard.vue'
export default {
    components: {
        orderCard
    },
    props: {
        homeUrl: {
            type: String
        }
    },
    data() {
        return {
            selectDistricts: '',
            districtsData: [],
            selectKinds: '',
            kindsData: [],
            validateMessage: false,
            searchOrders: [],
            search: false,
            limitOrders: 10,
            page: 1,
            totalPage: 0,
        }
    },
    methods: {
        async fetchDistricts() {
            try {
                let response = await fetch(this.homeUrl + 'api/districts', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow'
                })
                let data = await response.json();
                this.districtsData = data.data.districts;
            } catch(err) {
                console.log(err.message);
            }
        },
        async fetchKinds() {
            try {
                let response = await fetch(this.homeUrl + 'api/kinds', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow'
                })
                let data = await response.json();
                this.kindsData = data.data.kinds;
            } catch(err) {
                console.log(err.message);
            }
        },
        validateForm() {
            this.validateMessage = false;
            if (!this.selectDistricts && !this.selectKinds) {
                this.validateMessage = true;
            } else {
                this.search = true;
                this.fetchSearchOrders()
            }
        },
        async fetchSearchOrders() {
            let data = {};
            try {
                let response = await fetch(this.homeUrl + 'api/search' + '?' + new URLSearchParams({ district: this.selectDistricts, kind: this.selectKinds}), {
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
                this.totalPage = Math.ceil(this.searchOrders.length / this.limitOrders);
            } catch(err) {
                console.log(err);
            }
        }
    },
    mounted() {
        this.fetchDistricts(),
        this.fetchKinds()
    },
    computed: {
        paginationOrders() {
            return [...this.searchOrders].slice((this.page-1)*this.limitOrders, ((this.page-1)*this.limitOrders)+this.limitOrders)
            // return this.searchOrders;
        }
    }
}
</script>

<style>

</style>