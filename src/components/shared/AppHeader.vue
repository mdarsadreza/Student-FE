<template>
  <nav id="nav" class="sm:container sm:mx-auto">
    <div class="z-10 max-w-screen-lg xl:max-w-screen-xl flex justify-between items-center my-6 px-4 sm:px-0">
      <div class="flex-shrink-0">
        <router-link to="/">
          <img src="@/assets/images/gulf-university-logo.png" alt="Light Logo" class="w-full h-[5%]" />
        </router-link>
      </div>

      <div class="flex-grow flex justify-center" style="margin-left: -25%;">
        <div class="m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
          <router-link to="/"
            class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
            aria-label="Home">Home</router-link>
          <router-link to="/students"
            class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2"
            aria-label="Students">Students</router-link>
          <router-link to="/upload"
            class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
            aria-label="Visualizations">Upload</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped></style>
