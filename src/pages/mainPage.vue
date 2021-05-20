<template>
    <div class="background">
        <div class="main-header" style="position: relative">
<!--            <img src="../assets/network.jpg" alt="Network">-->
            <div class="centered">
                <h1 class="header-title">Systance</h1>
                <br>
                <h2 class="sub-header-title">Your journey to stance detection</h2>
                <h2 class="sub-sub-header-title">starts here</h2>
            </div>
        </div>
        <div class="centered_content">
            <h1 class="content_title">What Would You Like To Do?</h1>
            <div class="content_buttons">
                <b-button pill variant="info" size="lg" style="margin-left: 20px; margin-bottom: 60px"><router-link :to="{ name: 'CheckYourStances' }">Check My Stance</router-link></b-button>
                <b-button pill variant="info" size="lg" style="margin-left: 20px; margin-bottom: 60px"><router-link :to="{ name: 'chooseAlgorithmPage'}">Compare Algorithms</router-link></b-button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "mainPage"
    }
</script>

<style scoped>
    .main-header {
        width: 100%;
        height: 400px;
        background: url("../assets/network.jpg");
        background-size: cover;
    }
    .centered {
        color: white;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .header-title {
        -webkit-text-stroke: 2px darkblue; /* width and color */
        color: white;
        font-family: 'Bradley Hand', cursive;
        font-size: 120px;
        font-weight: bold;
        letter-spacing: -1px;
        line-height: 1;
        text-align: center;
    }
    .sub-header-title {
          -webkit-text-stroke: 0.5px black; /* width and color */
          font-size: 30px;
          font-family: 'Bradley Hand', cursive;
          font-weight: bold;
      }
    .sub-sub-header-title {
        -webkit-text-stroke: 1px black; /* width and color */
        font-size: 40px;
        font-family: 'Bradley Hand', cursive;
        font-weight: bold;
    }
    .content_title {
        font-family: 'Bradley Hand', cursive;
        font-weight: bold;
    }
    .centered_content{
        margin: 50px;
        text-align: center;
    }
    .content_buttons{
        margin: 50px;
    }
    .background{
      margin: auto;
      width: auto;
      height: 680px;
      background-color: lightgrey;
    }

</style>
