<script setup></script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-900 p-4 text-white text-xl flex justify-between">
    <h2>hello</h2>
    <ul class="flex gap-3">
      <li>購物車</li>
      <li><router-link to="/login">登入</router-link></li>
      <li>登出</li>
    </ul>
  </header>
  <div class="flex-1">
    <RouterView />
  </div>
  <footer
    class="w-full bg-blue-900 p-4 text-white text-center"
  >
    <p>此網站僅為作品使用</p>
  </footer>
  </div>
  

  
</template>

<style scoped></style>
