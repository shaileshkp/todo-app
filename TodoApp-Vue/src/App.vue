<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navBar from './components/Navbar.vue'
export default {
  components: {
    navBar
  }
}
</script>

<style>
* {
      margin: 0px;
  }

  .container{
    width: 400px;
    height: 300px;

    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;

    border: 1px solid slategray;
  }

</style>
