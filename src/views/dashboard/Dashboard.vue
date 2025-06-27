<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="max-w-[960px] mx-auto my-4">
    <nav class="mb-10">
      <ul class="flex text-2xl font-bold">
        <li class="flex-1 text-center">
          <router-link
            to="/dashboard/product"
            class="border-b-5 border-blue-200 pb-1"
            active-class="border-b-5 border-blue-900"
            >產品列表</router-link
          >
        </li>
        <li class="flex-1 text-center">
          <router-link
            to="/dashboard/order"
            class="border-b-5 border-blue-200 pb-1"
            active-class="border-b-5 border-blue-900"
            >訂單查詢</router-link
          >
        </li>
        <li class="flex-1 text-center">
          <router-link
            to="/dashboard/coupon"
            class="border-b-5 border-blue-200 pb-1"
            active-class="border-b-5 border-blue-900"
            >優惠券</router-link
          >
        </li>
        <li class="flex-1 text-center">
          <router-link
            to="/dashboard/article"
            class="border-b-5 border-blue-200 pb-1"
            active-class="border-b-5 border-blue-900"
            >文章</router-link
          >
        </li>
      </ul>
    </nav>
    <RouterView />
  </main>
</template>
