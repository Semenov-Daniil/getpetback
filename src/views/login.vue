<template>
    <div class="container d-flex justify-content-center">
        <form action="profile.html" class="sign-height" @submit.prevent>
            <h2 class="mb-3">Войти в свой аккаунт</h2>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="." v-model="email" required>
                <label>E-mail</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="." v-model="password">
                <label>Password</label>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary" @click="validateForm">Войти</button>
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
            email: 'ds.daniil@gmail.com',
            password: 'Tdfyutkbjy1',
            errorValidate: [],
        }
    },
    methods: {
        validateForm() {
            if (!(this.email)) {
                this.errorValidate.push({title: 'email', error: 'Ошибка в поле'});
            }

            if (!(this.password)) {
                this.errorValidate.push({title: 'password', error: 'Ошибка в поле'});
            }
            
            if (!this.errorValidate.length) {
                this.feachLogin();
            }
        },
        async feachLogin() {
            try {
                let response = await fetch(this.homeUrl + 'api/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow',
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                })
                if (response.status == 200) {
                    let data = await response.json();
                    sessionStorage.setItem('token', data.data.token);
                    this.$router.push('/profile');
                } 
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>