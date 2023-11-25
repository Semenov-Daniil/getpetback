<template>
    <div class="container">
        <h2 class="mb-2">Поиск</h2>
        <form class="row" @submit.prevent>
            <div class="mb-3 col-lg-4">
                <label class="form-label">Имя</label>
                <input type="text" class="form-control" placeholder="Ваше имя" required v-model="name">  
            </div>
            <div class="mb-3 col-lg-4">
                <label class="form-label">Телефон</label>
                <input type="text" class="form-control" placeholder="Ваш телефон" required v-model="phone">
            </div>
            <div class="mb-3 col-lg-4">
                <label for="e-mail" class="form-label">E-mail</label>
                <input type="text" class="form-control" id="e-mail" placeholder="Ваш e-mail" required v-model="email">
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Район</label>
                <select  class="form-select" placeholder="" v-model="selectDistricts" required>
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
            <div class="mb-3 col-lg-6">
                <label class="form-label">Вид</label>
                <select  class="form-select" placeholder="Вид животного" v-model="selectKinds" required>
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
            <div class="mb-3 col-lg-6">
                <label class="form-label">Клеймо</label>
                <input type="text" class="form-control" placeholder="Вид животного" v-model="mark">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile1" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile1"  accept="image/png, image/jpg">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile2" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile2"  accept="image/png, image/jpg">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile3" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile3" accept="image/png, image/jpg">
            </div>
            <label class="form-label">Описание животного и(или) места</label>
            <div class="mb-3 col-lg-12">
                <textarea class="form-control" v-model="description"></textarea>
            </div>
            <div class="mb-3 col-lg-12">
                <input type="checkbox" class="form-check-label" placeholder="" required v-model="confirm">
                <label class="form-label">Согласие на обработку персональных данных</label>
            </div>
            <div class="mb-3 col-lg-12">
                <input type="checkbox" class="form-check-label" placeholder="" v-model="register">
                <label class="form-label">Зарегестрироваться</label>
            </div>

            <div class="mb-3 col-lg-6" v-if="register">
                <label>Пароль</label>
                <input type="password" class="form-control" required v-model="password">
            </div>
            <div class="mb-3 col-lg-6" v-if="register">
                <label>Повторите пароль</label>
                <input type="password" class="form-control" required v-model="password_confirmation">
            </div>
       
            <div class="mb-3 col-lg-2">
                <button class="btn btn-primary" @click="validateForm">Разместить</button>
            </div>
        </form>
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
            selectDistricts: '',
            districtsData: [],
            selectKinds: '',
            kindsData: [],
            register: false,
            userData: [],
            name: '',
            phone: '',
            email: '',
            photo1: [],
            photo2: [],
            photo3: [],
            mark: '',
            description: '',
            confirm: false,
            password: '',
            password_confirmation: '',
            errorValidate: []
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
        async autoInput() {
            if (sessionStorage.getItem('token')) {
                try {
                    let response = await fetch(this.homeUrl + 'api/users', {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + sessionStorage.getItem('token'),
                        },
                        redirect: 'follow'
                    })
                    let data = await response.json();
                    this.phone = data.data.user.phone;
                    this.name = data.data.user.name;
                    this.email = data.data.user.email;
                } catch(err) {
                    console.log(err.message);
                }
            }
        },
        validateForm() {
            if (!(/^[а-яА-ЯёЁ\s\-]+$/u.test(this.name))) {
                this.errorValidate.push({title: 'name', error: 'Ошибка в поле'});
            }

            if (!(/^[\+]{0,1}[0-9]{11}$/u.test(this.phone))) {
                this.errorValidate.push({title: 'phone', error: 'Ошибка в поле'});
            }

            if(this.register) {
                if (!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{7,}$/.test(this.password))) {
                    this.errorValidate.push({title: 'password', error: 'Ошибка в поле'});
                }
    
                if (!(this.password_confirmation === this.password)) {
                    this.errorValidate.push({title: 'password_confirmation', error: 'Ошибка в поле'});
                }
            }

            if (!(this.confirm)) {
                this.errorValidate.push({title: 'confirm', error: 'Ошибка в поле'});
            }
            
            if (!(this.selectDistricts)) {
                this.errorValidate.push({title: 'selectDistricts', error: 'Ошибка в поле'});
            }

            if (!(this.selectKinds)) {
                this.errorValidate.push({title: 'selectKinds', error: 'Ошибка в поле'});
            }
            
            console.log(this.errorValidate);
            if (!this.errorValidate.length) {
                this.feachCreate();
            }
        },
        async feachCreate() {
            try {
                let response = await fetch(this.homeUrl + 'api/pets/new', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow',
                    body: JSON.stringify({
                        district: this.selectDistricts,
                        kind: this.selectKinds,
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        mark: this.mark,
                        description: this.description,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                        token: sessionStorage.getItem('token')
                    })
                })
            } catch(err) {
                console.log(err.message);
            }
        }
    },
    mounted() {
        this.fetchDistricts(),
        this.fetchKinds(),
        this.autoInput()
    },
    computed: {
        
    }
}
</script>

<style>

</style>