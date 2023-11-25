<template>
    <div class="container">
        <h2 class="mb-2">Поиск</h2>
        <form class="row">
            <div class="mb-3 col-lg-4">
                <label class="form-label">Имя</label>
                <input type="text" class="form-control" value="Ваше имя" disabled required>
            </div>
            <div class="mb-3 col-lg-4">
                <label class="form-label">Телефон</label>
                <input type="text" class="form-control" value="Ваш телефон" disabled required>
            </div>
            <div class="mb-3 col-lg-4">
                <label for="e-mail" class="form-label">E-mail</label>
                <input type="text" class="form-control" id="e-mail" value="Ваш e-mail" disabled required>
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Район</label>
                <input type="text" class="form-control" placeholder="Район, в котором вы нашли животное">
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Вид</label>
                <input type="text" class="form-control" placeholder="Вид животного">
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Клеймо</label>
                <input type="text" class="form-control" placeholder="Вид животного">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile1" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile1">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile2" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile2">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile3" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile3">
            </div>
            <label class="form-label">Описание животного и(или) места</label>
            <div class="mb-3 col-lg-12">
                <textarea class="form-control"></textarea>
            </div>
            <div class="mb-3 col-lg-2">
                <button class="btn btn-primary">Разместить</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>