<template>
    <div class="container d-flex justify-content-center">
        <form action="profile.html" class="sign-height" @submit.prevent>
            <h2 class="mb-3">Регистрация пользователя</h2>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" placeholder="." required v-model="name">
                <label>Имя</label>
                <div v-if="errorValidate.find((err) => err.title == 'name')">
                    {{ (errorValidate.find((err) => err.title == 'name')).error }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="tel" class="form-control" placeholder="." required v-model="phone">
                <label>Телефон</label>
                <div v-if="errorValidate.find((err) => err.title == 'phone')">
                    {{ (errorValidate.find((err) => err.title == 'phone')).error }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="." required v-model="email">
                <label>E-mail</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="." required v-model="password">
                <label>Пароль</label>
                <div v-if="errorValidate.find((err) => err.title == 'password')">
                    {{ (errorValidate.find((err) => err.title == 'password')).error }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="." required v-model="password_confirmation">
                <label>Повторите пароль</label>
                <div v-if="errorValidate.find((err) => err.title == 'password_confirmation')">
                    {{ (errorValidate.find((err) => err.title == 'password_confirmation')).error }}
                </div>
            </div>
            <div class="mb-3 form-check d-flex justify-content-center">
                <div class="mx-1">
                    <input type="checkbox" class="form-check-input" required v-model="confirm">
                </div>
                <label class="form-check-label">Согласие на обработку персональных данных</label>
                <div v-if="errorValidate.find((err) => err.title == 'confirm')">
                    {{ (errorValidate.find((err) => err.title == 'confirm')).error }}
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary" @click="validateForm">Зарегистрироваться</button>
            </div>
        </form>
        <div style="color: green;" v-if="register">
            Вы успешно зарегистрировались
        </div>
        <div style="color: red;" v-if="errorRegister">
            Ошибка
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
            name: 'Даниил',
            phone: '89817406942',
            email: 'ds.daniil@gmail.com',
            password: 'Tdfyutkbjy1',
            password_confirmation: 'Tdfyutkbjy1',
            confirm: '',
            errorValidate: [],
            register: false,
            errorRegister: false,
        }
    },
    methods: {
        validateForm() {
            if (!(/^[а-яА-ЯёЁ\s\-]+$/u.test(this.name))) {
                this.errorValidate.push({title: 'name', error: 'Ошибка в поле'});
            }

            if (!(/^[\+]{0,1}[0-9]{11}$/u.test(this.phone))) {
                this.errorValidate.push({title: 'phone', error: 'Ошибка в поле'});
            }

            if (!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{7,}$/.test(this.password))) {
                this.errorValidate.push({title: 'password', error: 'Ошибка в поле'});
            }

            if (!(this.password_confirmation === this.password)) {
                this.errorValidate.push({title: 'password_confirmation', error: 'Ошибка в поле'});
            }

            if (!(this.confirm)) {
                this.errorValidate.push({title: 'confirm', error: 'Ошибка в поле'});
            }
            
            if (!this.errorValidate.length) {
                this.feachRegister();
            }
        },
        async feachRegister() {
            try {
                let response = await fetch(this.homeUrl + 'api/register', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: 'follow',
                    body: JSON.stringify({
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                        confirm: this.confirm
                    })
                })
                if (response.status == 200) {
                    this.register = true;
                } 
                if (response.status == 422) {
                    this.errorRegister = true;
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