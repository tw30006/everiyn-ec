<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const cartlist = ref({
  carts: [],
  total: 0,
  final_total: 0,
})
const userData = ref({})

const apiUrl = import.meta.env.VITE_APP
const apiPath = import.meta.env.VITE_APP_PATH

async function getCartList() {
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/cart`)
    const data = await res.json()

    if (data.success) {
      cartlist.value = data.data
      console.log(cartlist.value)
      console.log(data.messages)
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
async function editCartList(cart, qty) {
  console.log(cart)
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/cart/${cart.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          product_id: cart.product_id,
          qty: qty,
        },
      }),
    })
    const data = await res.json()
    if (data.success) {
      console.log('編輯成功')
      // 重新獲取購物車列表
      await getCartList()
    } else {
      console.log('編輯失敗:', data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

// 增加數量
function increaseQty(item) {
  const newQty = item.qty + 1
  editCartList(item, newQty)
}

// 減少數量
function decreaseQty(item) {
  if (item.qty > 1) {
    const newQty = item.qty - 1
    editCartList(item, newQty)
  }
}

// 直接更新數量
function updateQty(item, value) {
  const qty = parseInt(value)
  if (qty >= 1) {
    editCartList(item, qty)
  }
}
async function deleteItem(id) {
  console.log(id)
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/cart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (data.success) {
      console.log(data.message)
      await getCartList()
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
async function deleteAll() {
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/carts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (data.success) {
      console.log(data.message)
      await getCartList()
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
async function checkOrder() {
  console.log(userData.value.userInfo.name)
  if (!userData.value) {
    console.log('請先填寫訂單資料')
    return
  }
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          user: {
            name: userData.value.userInfo.name,
            email: userData.value.userInfo.email,
            tel: userData.value.userInfo.phone,
            address: userData.value.userInfo.address,
          },
          message: userData.value.message || '這是留言',
        },
      }),
    })
    const data = await res.json()
    if (data.success) {
      console.log(data.message)
      router.push(`/checkorder/${data.orderId}`)
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

function handleCoupon(coupon) {
  cartlist.value.final_total = coupon.final_total
  getCartList()
}
function handleUserInfo(orderData) {
  userData.value = orderData
  console.log(userData.value)
}

// const buttonText = computed(() => {
//   if (route.path === '/cart') {
//     return '下一步'
//   } else if (route.path === '/cart/information') {
//     return '確認訂單'
//   }
// })

// const buttonLink = computed(() => {
//   if (route.path === '/cart') {
//     return '/cart/information'
//   } else if (route.path === '/cart/information') {
//     return '/cart/payment'
//   }
// })

onMounted(() => {
  getCartList()
})
</script>

<template>
  <div class="w-[1200px] mx-auto">
    <ul class="flex items-center justify-center gap-5 mb-10">
      <li class="flex gap-2 items-center">
        <span
          class="w-[36px] h-[36px] rounded-full bg-primary text-white text-xl flex items-center justify-center"
          >1</span
        >
        <p class="">確認訂單</p>
      </li>
      <span class="w-[50px] h-[2px] bg-gray-300"></span>
      <li class="flex gap-2 items-center">
        <span
          class="w-[36px] h-[36px] rounded-full bg-gray-300 text-white text-xl flex items-center justify-center"
          >2</span
        >
        <p>訂單資訊</p>
      </li>
      <span class="w-[50px] h-[2px] bg-gray-300"></span>
      <li class="flex gap-2 items-center">
        <span
          class="w-[36px] h-[36px] rounded-full bg-gray-300 text-white text-xl flex items-center justify-center"
          >3</span
        >
        <p>訂單完成</p>
      </li>
    </ul>

    <section class="grid grid-cols-3 gap-5">
      <!-- 左側商品列表 -->
      <div
        class="col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        v-if="cartlist.carts.length > 0"
      >
        <div class="flex gap-4 items-center pb-4">
          <input
            type="checkbox"
            id="all"
            class="w-5 h-5 text-blue-600 rounded border-gray-300"
          />
          <label for="all" class="text-xl">全選</label>
          <button
            type="button"
            class="text-right flex-1 text-red-600 hover:text-red-800 cursor-pointer"
            @click="deleteAll()"
          >
            <i class="bi bi-trash3"></i>
          </button>
        </div>

        <ul class="flex flex-col">
          <li
            class="flex items-center gap-4 py-4 border-t border-gray-200"
            v-for="item in cartlist.carts"
            :key="item.id"
          >
            <input
              type="checkbox"
              class="w-5 h-5 text-blue-600 rounded border-gray-300"
            />
            <div class="w-24 h-16 bg-gray-900 rounded-lg overflow-hidden">
              <img
                :src="item.product.imageUrl"
                :alt="item.product.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex justify-between flex-1">
              <h3 class="text-lg font-medium text-gray-900">
                {{ item.product.title }}
              </h3>
              <div class="flex gap-5">
                <p class="text-xl font-bold text-gray-900">
                  NT$ {{ item.total }}
                </p>
                <div class="flex items-center border border-gray-300 rounded">
                  <button
                    type="button"
                    class="px-2 py-1 hover:bg-gray-100 border-r border-gray-300"
                    @click="decreaseQty(item)"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                  <input
                    type="number"
                    :value="item.qty"
                    @input="updateQty(item, $event.target.value)"
                    class="w-[50px] text-center border-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                  />
                  <button
                    type="button"
                    class="px-2 py-1 hover:bg-gray-100 border-l border-gray-300"
                    @click="increaseQty(item)"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
                <button
                  class="text-md text-red-600 hover:text-red-800 cursor-pointer"
                  @click="deleteItem(item.id)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 class="font-bold text-2xl mb-4">訂單明細</h2>
          <div class="flex justify-between items-center mb-4 text-gray-600">
            <span> {{ cartlist.carts.length }} 個品項小計</span>
            <span>NT$ {{ cartlist.total }}</span>
          </div>
          <div
            class="flex justify-between items-center text-red-500 mb-4"
            v-if="cartlist.final_total < cartlist.total"
          >
            <span>已套用優惠券</span>
            <span>現折NT$ {{ cartlist.total - cartlist.final_total }}</span>
          </div>
          <div class="border-t pt-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-900">總計</span>
              <span class="text-2xl font-bold text-gray-900"
                >NT$ {{ cartlist.final_total }}</span
              >
            </div>
          </div>

          <router-link to="/cart/information" v-if="route.path === '/cart'">
            <button
              class="w-full bg-primary hover:bg-sky-200 hover:text-gray-800 text-white text-xl font-medium py-3 px-6 rounded-lg transition-colors mb-4"
            >
              下一步
            </button>
          </router-link>
          <button
            v-if="route.path === '/cart/information'"
            type="button"
            class="w-full bg-primary hover:bg-sky-200 hover:text-gray-800 text-white text-xl font-medium py-3 px-6 rounded-lg transition-colors mb-4"
            @click="checkOrder()"
          >
            確認付款
          </button>

          <p class="text-xs text-gray-500 leading-relaxed">
            確認購買即表示您已審閱 Everiyn
            所提供之購物相關條款，並同意條款內容。
          </p>
        </div>
      </div>
      <div
        class="col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col items-center justify-center"
        v-if="cartlist.carts.length == 0"
      >
        <div class="flex flex-col items-center justify-center gap-4">
          <p>購物車還沒有商品，立即逛逛！</p>
          <button class="bg-primary text-lg text-white px-6 py-3 rounded-lg">
            前往商品頁
          </button>
        </div>
      </div>
      <div class="col-span-2">
        <RouterView
          @handle-coupon="handleCoupon"
          @update-user-info="handleUserInfo"
          :userInfo="userData"
        />
      </div>
      <!-- 右側結帳區域 -->
    </section>
  </div>
</template>
