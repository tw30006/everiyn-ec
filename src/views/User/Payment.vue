<script setup>
import { ref } from 'vue'

// 響應式數據
const selectedPayment = ref('credit') // 預設選擇信用卡付款
const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})
console.log(props.userInfo)
</script>
<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
      <i class="fas fa-credit-card mr-2 text-blue-500"></i>
      付款方式
    </h2>
    <div class="space-y-4">
      <div class="space-y-2">
        <label
          class="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            name="payment"
            value="credit"
            v-model="selectedPayment"
            class="text-blue-500 mr-3"
          />
          <i class="fas fa-credit-card text-blue-500 mr-2"></i>
          <span class="font-medium">信用卡付款</span>
        </label>
        <label
          class="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            name="payment"
            value="transfer"
            v-model="selectedPayment"
            class="text-blue-500 mr-3"
          />
          <i class="fas fa-university text-green-500 mr-2"></i>
          <span class="font-medium">銀行轉帳</span>
        </label>
        <label
          class="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            v-model="selectedPayment"
            class="text-blue-500 mr-3"
          />
          <i class="fas fa-money-bill-wave text-orange-500 mr-2"></i>
          <span class="font-medium">貨到付款</span>
        </label>
      </div>

      <!-- 信用卡付款表單 -->
      <div
        v-if="selectedPayment === 'credit'"
        class="border-t pt-4 transition-all duration-300"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >信用卡號碼</label
            >
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >到期日</label
            >
            <input
              type="text"
              placeholder="MM/YY"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >安全碼</label
            >
            <input
              type="text"
              placeholder="123"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >持卡人姓名</label
            >
            <input
              type="text"
              placeholder="請輸入持卡人姓名"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- 銀行轉帳表單 -->
      <div
        v-if="selectedPayment === 'transfer'"
        class="border-t pt-4 transition-all duration-300"
      >
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <i class="fas fa-info-circle text-blue-500 mr-2"></i>
            銀行轉帳資訊
          </h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">銀行名稱：</span>
              <span class="text-gray-900">第一銀行</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">銀行代碼：</span>
              <span class="text-gray-900">007</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">帳號：</span>
              <span class="text-gray-900">1234-5678-9012-3456</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">戶名：</span>
              <span class="text-gray-900">商店名稱</span>
            </div>
          </div>
          <div
            class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md"
          >
            <p class="text-sm text-yellow-800">
              <i class="fas fa-exclamation-triangle mr-1"></i>
              請於轉帳後保留轉帳明細，我們會於確認款項後處理您的訂單。
            </p>
          </div>
        </div>
      </div>

      <!-- 貨到付款表單 -->
      <div
        v-if="selectedPayment === 'cod'"
        class="border-t pt-4 transition-all duration-300"
      >
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <i class="fas fa-map-marker-alt text-orange-500 mr-2"></i>
            收件人資訊確認
          </h3>
          <div class="space-y-3">
            <div
              class="flex justify-between items-center py-2 border-b border-orange-200"
            >
              <span class="font-medium text-gray-700">收件人姓名：</span>
              <span class="text-gray-900">{{
                props.userInfo.name || '請先填寫收件人姓名'
              }}</span>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-orange-200"
            >
              <span class="font-medium text-gray-700">聯絡電話：</span>
              <span class="text-gray-900">{{
                props.userInfo.phone || '請先填寫收件人電話'
              }}</span>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-orange-200"
            >
              <span class="font-medium text-gray-700">收件地址：</span>
              <span class="text-gray-900">{{
                props.userInfo.address || '請先填寫收件地址'
              }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="font-medium text-gray-700">Email：</span>
              <span class="text-gray-900">{{
                props.userInfo.email || '請先填寫Email'
              }}</span>
            </div>
          </div>
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p class="text-sm text-blue-800">
              <i class="fas fa-info-circle mr-1"></i>
              商品將於 3-5 個工作天送達，送達時請準備現金付款。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
