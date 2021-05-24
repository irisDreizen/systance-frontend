<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" class="header">
      <b-navbar-brand>
        <router-link class="link" :to="{ name: 'main' }">Systance</router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="link" :to="{ name: 'about' }">About</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="link" :to="{ name: 'CheckYourStances' }">Check My Stance</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="link" :to="{ name: 'chooseAlgorithmPage' }">Compare Algorithms</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--      <footer>-->
    <!--          <div class="bg-secondary text-white py-4">-->
    <!--              <div class="container text-center text-white">-->
    <!--                  <p class="text-white mb-0 py-2">© 2021 All rights reserved.</p>-->
    <!--              </div>-->
    <!--          </div>-->
    <!--      </footer>-->
  </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo() {
    return {
      meta: [
        {
          name: "viewport"
        }
      ]
    }
  },
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
  /*background:#6cf;*/
}

.header {
  position: fixed
}

.link {
  color: white;
}

</style>
