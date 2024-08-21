<script>

import feather from 'feather-icons';
import AppHeaderLinks from './AppHeaderLinks.vue';

export default {
  components: {
    AppHeaderLinks,
  },
  updated() {
    feather.replace();
  },
};
</script>

<template>
  <nav id="nav" class="sm:container sm:mx-auto">
    <div class="z-10 max-w-screen-lg xl:max-w-screen-xl flex justify-between items-center my-6 px-4 sm:px-0">
      <div class="flex-shrink-0">
        <router-link to="/">
          <img src="@/assets/images/gulf-university-logo.png" class="w-12" alt="Light Logo"
            style="width: 100%;  height: 5%;" />
        </router-link>
      </div>

      <div class="flex-grow flex justify-center" style="margin-left: -25%;">
        <AppHeaderLinks />
      </div>
    </div>
  </nav>

</template>

<style scoped></style>
