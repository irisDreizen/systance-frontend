<template>
    <div>
        <div class="centered_content">
            <div class="content_title">
                Thanks for using our system!
            </div>
            <br>
            <span>
            We will send you an email as soon as our system will finish running your algorithms
        </span>
            <br>

        </div>
        <div class="main-header" style="position: relative">
        </div>
    </div>

</template>

<script>
    export default {
        name: "emailPage"
    }
</script>

<style scoped>
    .content_title {
        font-family: 'Bradley Hand', cursive;
        font-weight: bold;
        font-size: 50px;
    }
    .centered_content{
        margin: 50px;
        text-align: center;
    }
    .main-header {
        width: 100%;
        height: 200px;
        background: url("../assets/thankYou.jpg");
        background-size: cover;
    }
</style>
