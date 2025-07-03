<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const apiUrl = import.meta.env.VITE_APP

const apiPath = import.meta.env.VITE_APP_PATH


async function getProducts() {
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/products`, {
      method: 'GET',
    })
    const data = await res.json()
    if (data.success) {
      console.log('取得商品成功')
      products.value = data.products
    }
  } catch (error) {
    console.log(error)
  }
}

async function addToCart(product) {
  console.log(product.qty)
  try{
    const res = await fetch(`${apiUrl}api/${apiPath}/cart`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        data:{
          product_id:product.id,
          qty:1
        }
      })
    })
    const data = await res.json()
    if(data.success){
      console.log(data.message)
    }else{
      console.log(data.message)
    }
  }catch(error){
    console.log(error)
  }
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <section class="w-[1200px] mx-auto">
    <div class="grid grid-cols-3 gap-5">
      <div
        class="bg-base-100 shadow-sm rounded-md bg-white"
        v-for="product in products"
        :key="product.id"
      >
        <figure>
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="rounded-t-md mb-2"
          />
        </figure>
        <div class="p-2 flex flex-col gap-4 mb-2">
          <h2 class="text-2xl">{{ product.title }}</h2>
          <p class="text-lg">
            {{ product.description }}
          </p>
          <div class="flex item-center justify-between">
            <p class="text-2xl text-cyan-600 font-bold">
              NT${{ product.price }}
            </p>
            <button
              type="button"
              class="p-2 bg-blue-900 hover:bg-sky-200 rounded-sm text-white"
              @click="addToCart(product)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
