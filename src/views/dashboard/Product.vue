<script setup>
import { ref, onMounted } from 'vue'
import ProductModal from '../../components/ProductModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import Loading from 'vue-loading-overlay'

const tempProduct = ref({})
const products = ref([])
const isNewProduct = ref(null)
const isShowModal = ref(false)
const isShowDeleteModal = ref(false)
const isLoading = ref(false)
const apiUrl = import.meta.env.VITE_APP

const apiPath = import.meta.env.VITE_APP_PATH
const token = document.cookie
  .split(';')
  .map((c) => c.trim())
  .find((c) => c.startsWith('eveyiynToken='))
  ?.split('=')[1]

// 定義 loading 組件需要的變數
const fullPage = ref(true)
const onCancel = () => {
  console.log('User cancelled the loader.')
}

//取得產品列表
async function getProducts() {
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/admin/products`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    })

    const data = await res.json()
    isLoading.value = false
    if (data.success) {
      products.value = data.products
    } else {
      console.log(data.message)
    }

    console.log(products.value)
  } catch (error) {
    console.log(error)
  }
}

function openModal(isNew, item) {
  if (isNew) {
    tempProduct.value = {}
  } else {
    tempProduct.value = { ...item }
  }
  isNewProduct.value = isNew
  isShowModal.value = true
}
function openDeleteModal(item) {
  console.log(item.id)
  tempProduct.value = { ...item }
  isShowDeleteModal.value = true
}

async function addProduct() {
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/admin/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ data: tempProduct.value }),
    })

    const data = await res.json()
    console.log('回應資料:', data)

    if (data.success) {
      tempProduct.value = data.data
      console.log('更新成功:', tempProduct.value)
      isShowModal.value = false
      // 重新取得產品列表
      await getProducts()
    } else {
      console.log('新增失敗:', data.message)
    }
  } catch (error) {
    console.log('請求錯誤:', error)
  }
}
async function editProduct(item) {
  console.log(item.id)
  console.log('編輯')
  try {
    const res = await fetch(
      `${apiUrl}api/${apiPath}/admin/product/${item.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ data: item }),
      }
    )

    const data = await res.json()
    console.log('回應資料:', data)

    if (data.success) {
      isShowModal.value = false
      // 重新取得產品列表
      await getProducts()
    } else {
      console.log('新增失敗:', data.message)
    }
  } catch (error) {
    console.log('請求錯誤:', error)
  }
}
async function deleteProduct(item) {
  try {
    const res = await fetch(
      `${apiUrl}api/${apiPath}/admin/product/${item.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    )
    const data = await res.json()
    if (data.success) {
      console.log('刪除成功')
      isShowDeleteModal.value = false
      await getProducts()
    } else {
      console.log('刪除失敗')
    }
  } catch (error) {
    console.log(error)
  }
}
//要把modal關閉，重新取得資料並渲染在畫面上
function updateProduct(item) {
  tempProduct.value = { ...item }
  if (!isNewProduct.value) {
    editProduct(tempProduct.value)
  } else {
    console.log('新增')
    addProduct()
  }
}
onMounted(() => {
  isLoading.value = true

  getProducts()
})
</script>

<template>
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
    :color="'#002752'"
  />
  <section class="max-w-[960px] grid grid-cols-3 gap-5" v-if="!isLoading">
    <div
      class="flex flex-col items-center justify-center gap-4 border border-blue-900 p-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200"
      @click="openModal(true)"
    >
      <i class="bi bi-plus-circle text-4xl"></i>
      <p class="text-2xl">新增商品</p>
    </div>
    <div
      class="flex flex-col gap-4 border border-blue-900 p-2 rounded-md relative"
      v-for="product in products"
      :key="product.id"
    >
      <div
        :class="
          product.is_enabled === false
            ? 'w-full h-full bg-slate-500/80 absolute top-0 left-0 z-10 flex items-center justify-center'
            : 'hidden'
        "
      >
        <span class="text-white text-3xl py-2 px-4 rounded-md bg-sky-800">{{
          product.is_enabled === false ? '下架' : '上架'
        }}</span>
      </div>
      <div class="aspect-16/9 object-cover">
        <img :src="product.imageUrl" alt="對戒" class="rounded-md" />
      </div>
      <div>
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-2xl">{{ product.title }}</h2>
          <span
            class="bg-gray-100 text-gray-700 border border-gray-700 px-2 rounded-md"
            >{{ product.category }}</span
          >
        </div>
        <p class="text-lg">
          {{ product.description }}
        </p>
      </div>
      <div class="grid grid-cols-8 items-center gap-2">
        <span class="text-xl">${{ product.price }}</span>
        <button
          type="button"
          class="py-1 bg-teal-700 text-white text-xl rounded-md cursor-pointer col-start-5 col-end-7"
          @click="openModal(false, product)"
        >
          編輯
        </button>
        <button
          type="button"
          class="py-1 bg-red-700 text-white text-xl rounded-md cursor-pointer col-start-7 col-end-9"
          @click="openDeleteModal(product)"
        >
          刪除
        </button>
      </div>
    </div>
  </section>

  <ProductModal
    :product="tempProduct"
    :isShowModal="isShowModal"
    @close-modal="isShowModal = false"
    @update-product="updateProduct"
  />
  <DeleteModal
    :product="tempProduct"
    :isShowDeleteModal="isShowDeleteModal"
    @close-modal="isShowDeleteModal = false"
    @delete-item="deleteProduct"
  />
</template>
