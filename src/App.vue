<script setup></script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-primary p-4 text-white text-xl flex justify-between">
      <h2><router-link to="/">Everiyn</router-link></h2>
      <ul class="flex gap-3">
        <li><router-link to="/allProduct">所有商品</router-link></li>
        <li>
          <router-link to="/cart"><i class="bi bi-cart3"></i></router-link>
        </li>
        <li><router-link to="/login">後台登入</router-link></li>
        <!-- <li>登出</li> -->
      </ul>
    </header>
    <!-- <div class="banner">
      <img
        src="https://storage.googleapis.com/vue-course-api.appspot.com/everlynapi/1751005604925.jpg"
        alt=""
      />
    </div> -->
    <div class="flex-1">
      <RouterView />
    </div>
    <footer class="w-full bg-primary p-4 text-white text-center">
      <p>此網站僅為作品使用</p>
    </footer>
  </div>
</template>

<style scoped></style>
