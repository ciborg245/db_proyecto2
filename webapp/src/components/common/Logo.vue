<template>
  <div class="columns">
    <div
      class="column is-8-mobile is-offset-2-mobile is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop has-text-centered">
      <router-link :to="{name: 'Signin'}">
        <img id="logo" src="../../assets/komplementarium-temp-logo.png" alt="KomplementariumLogo">
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Logo'
  }
</script>

<style lang="scss" scoped>
  #logo {
    padding-top: 40px;
  }
</style>
