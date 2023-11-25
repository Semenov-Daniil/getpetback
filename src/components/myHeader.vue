<template>
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between py-3 mb-4 border-bottom">
            <a href="" @click="$router.push('/')" class="h3 d-flex align-items-center col-lg-3 mb-2 mb-md-0 text-dark text-decoration-none">
                GET PET BACK
            </a>

            <ul class="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="" @click="$router.push('/')" :class="{'nav-link': true, 'px-2': true, 'link-secondary': (route.name == 'home'), 'link-dark': (route.name != 'home')}">Главная</a></li>
                <li><a href="" @click="$router.push('/search')" :class="{'nav-link': true, 'px-2': true, 'link-secondary': (route.name == 'search'), 'link-dark': (route.name != 'search')}">Поиск</a></li>
                <li><a href="" @click="profile()" :class="{'nav-link': true, 'px-2': true, 'link-secondary': (route.name == 'profile'), 'link-dark': (route.name != 'profile')}">Профиль</a></li>
                <li><a href="" @click="$router.push('/create')" :class="{'nav-link': true, 'px-2': true, 'link-secondary': (route.name == 'create'), 'link-dark': (route.name != 'create')}">Разместить объявление</a></li>
            </ul>

            <div class="col-lg-3 text-end">
                <a type="button" class="btn btn-outline-primary me-2" href="" @click="$router.push('/register')">Регистрация</a>
                <a type="button" class="btn btn-primary" href="" @click="$router.push('/login')" v-if="!(getToken())">Войти</a>
                <a type="button" class="btn btn-primary" href="" @click="logout()" v-if="(getToken())">Выйти</a>
            </div>
        </header>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
export default {
    name: 'my-header',
    data() {
        return {
            router: useRouter(),
            route: useRoute()
        }
    },
    methods: {
        getToken() {
            return sessionStorage.getItem('token')
        },
        logout() {
            sessionStorage.removeItem('token');
            this.$router.push('/');
        },
        profile() { 
            if(sessionStorage.getItem('token')) {
                this.$router.push('/profile');
            } else {
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style>

</style>