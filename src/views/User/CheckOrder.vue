<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
const route = useRoute()
// 從路由參數中獲取 orderId
const orderId = route.params.orderId
console.log(orderId)
const apiUrl = import.meta.env.VITE_APP
const apiPath = import.meta.env.VITE_APP_PATH
const orderData = ref({})
// -OUJdbKPXBl7aFgNAM0G
// 將 products 對象轉換為陣列
const productsList = computed(() => {
  if (!orderData.value.products) return []
  return Object.values(orderData.value.products)
})

async function getOrder(orderId) {
  console.log(orderData.value)
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/order/${orderId}`)
    const data = await res.json()
    if (data.success) {
      console.log('Products:', data.order.products)
      console.log('Success:', data.success)
      console.log(data.order.user)
      orderData.value = data.order
    } else {
      console.log(data.success)
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getOrder(orderId)
})
</script>
<template>
  <div class="w-[900px] mx-auto bg-white rounded-md">
    <div class="p-4">
      <!-- 訂單成立確認 -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
        >
          <i class="bi bi-check-lg text-3xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">訂單成立成功！</h1>
        <p class="text-gray-600">感謝您的購買，我們會盡快為您處理訂單</p>
      </div>

      <!-- 訂單資訊卡片 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                訂單編號: {{ orderData.id }}
              </h2>
              <p class="text-sm text-gray-600">
                訂單建立時間: 2024/1/15 下午2:30:45
              </p>
            </div>
            <div class="mt-2 sm:mt-0">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full font-medium text-green-600 bg-green-100"
              >
                已付款
              </span>
            </div>
          </div>
        </div>

        <!-- 購買商品清單 -->
        <div class="px-6 py-4">
          <h3
            class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
          >
            <i class="bi bi-bag mr-2 text-blue-900"></i>
            購買商品清單
          </h3>
          <div class="space-y-4">
            <!-- 商品 1 -->
            <div
              class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              v-for="item in productsList"
              :key="item.id"
            >
              <div
                class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
              >
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-medium text-gray-900">
                  {{ item.product.title }}
                </h4>
              </div>
              <div class="text-right">
                <p class="text-gray-600">數量: {{ item.qty }}</p>
                <p class="text-lg font-semibold text-gray-900">
                  NT$ {{ item.total }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 訂單金額總計 -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="space-y-2">
            <div class="flex justify-between text-xl font-bold text-gray-900">
              <span>訂單總計</span>
              <span>NT$ {{ orderData.total }}</span>
            </div>
          </div>
        </div>

        <!-- 用戶資訊 -->
        <div class="px-6 py-4" v-if="orderData.user">
          <h3
            class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
          >
            <i class="bi bi-person-fill mr-2 text-blue-900"></i>
            收件人資訊
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block font-medium text-gray-900 mb-1"
                >收件人姓名</label
              >
              <p class="text-gray-900 text-xl">
                {{ orderData.user?.name || '載入中...' }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block font-medium text-gray-900 mb-1 text-xl"
                >聯絡電話</label
              >
              <p class="text-gray-900">
                {{ orderData.user?.tel || '載入中...' }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block font-medium text-gray-900 mb-1 text-xl"
                >電子信箱</label
              >
              <p class="text-gray-900">
                {{ orderData.user?.email || '載入中...' }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block font-medium text-gray-900 mb-2 text-xl"
                >付款狀態</label
              >
              <span
                class="inline-flex items-center px-2 py-1 rounded-full font-medium text-green-600 bg-green-100"
              >
                {{ orderData.is_paid ? '已付款' : '未付款' }}
              </span>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <label class="block font-medium text-gray-900 mb-1 text-xl"
                >收件地址</label
              >
              <p class="text-gray-900">
                {{ orderData.user?.address || '載入中...' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 付款方式資訊 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="px-6 py-4">
          <h3
            class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
          >
            <i class="bi bi-credit-card mr-2 text-blue-900"></i>
            付款方式
          </h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-900 font-medium">信用卡付款</p>
          </div>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          type="button"
          class="w-full bg-primary hover:bg-sky-200 hover:text-gray-800 text-white text-xl font-medium py-3 px-6 rounded-lg transition-colors mb-4"
        >
          確認付款
        </button>
      </div>
    </div>
  </div>
</template>
