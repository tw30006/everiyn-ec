<script setup>
import twCities from '@/assets/tw-cities.json'
import { ref, onMounted, watch, computed } from 'vue'
const cityOptions = ref([])
const districtOptions = ref([])
const selectedCity = ref('')
const selectedDistrict = ref('')
const couponCode = ref('')
const apiUrl = import.meta.env.VITE_APP
const apiPath = import.meta.env.VITE_APP_PATH
const userInfo = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  message: '',
})

const emit = defineEmits(['update-user-info', 'handle-coupon'])

function emitUserInfo() {
  const orderData = {
    userInfo: {
      name: userInfo.value.name,
      phone: userInfo.value.phone,
      email: userInfo.value.email,
      address: userInfo.value.address,
    },
    message: userInfo.value.message,
  }
  emit('update-user-info', orderData)
}

watch(
  userInfo,
  () => {
    emitUserInfo()
  },
  { deep: true }
)
const getFullAdress = computed(() => {
  console.log(selectedCity.value)
  console.log(selectedDistrict.value)
  if (selectedCity.value && selectedDistrict.value) {
    return `${selectedCity.value}${selectedDistrict.value}`
  }
  return ''
})

watch(getFullAdress, (newAddress) => {
  userInfo.value.address = newAddress
})

async function checkCoupen(couponCode) {
  console.log(couponCode)
  try {
    const res = await fetch(`${apiUrl}api/${apiPath}/coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          code: couponCode,
        },
      }),
    })
    const data = await res.json()
    if (data.success) {
      console.log(data.message)
      emit('handle-coupon', data)
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

function getDistricts(cityName) {
  const city = cityOptions.value.find((city) => city.name === cityName)
  console.log(city)
  if (city) {
    districtOptions.value = city.districts
    console.log(districtOptions.value)
  } else {
    districtOptions.value = []
  }
}

watch(selectedCity, (newVal) => {
  getDistricts(newVal)
  selectedDistrict.value = ''
})
onMounted(() => {
  cityOptions.value = twCities
})
</script>

<template>
  <section class="w-[800px] mx-auto flex flex-col gap-5">
    <div
      class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col gap-2"
    >
      <label for="coupon" class="text-lg font-bold">請輸入優惠券代碼</label>
      <div class="flex items-center gap-2 relative">
        <input
          v-model="couponCode"
          type="text"
          id="coupon"
          class="w-full p-2 border border-gray-300 rounded-md"
          placeholder="請輸入優惠券代碼"
        />
        <button
          type="button"
          class="bg-primary text-white hover:bg-sky-200 hover:text-gray-800 px-4 py-2 rounded-r-md whitespace-nowrap absolute right-0 cursor-pointer cursor-pointer"
          @click="checkCoupen(couponCode)"
        >
          確認
        </button>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 class="font-bold text-2xl mb-4">填寫收件資訊</h2>
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label
              for="name"
              class="text-lg font-bold before:content-['*'] before:text-red-500 before:mr-1"
              >收件人</label
            >
            <input
              v-model="userInfo.name"
              type="text"
              id="name"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="請輸入收件人姓名"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label
              for="phone"
              class="text-lg font-bold before:content-['*'] before:text-red-500 before:mr-1"
              >收件人電話</label
            >
            <input
              v-model="userInfo.phone"
              type="text"
              id="phone"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0912345678"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="email"
            class="text-lg font-bold before:content-['*'] before:text-red-500 before:mr-1"
            >Email</label
          >
          <input
            v-model="userInfo.email"
            type="email"
            id="email"
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="example@example.com"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label
              for="city"
              class="text-lg font-bold before:content-['*'] before:text-red-500 before:mr-1"
              >縣市</label
            >
            <div class="relative">
              <select
                class="w-full p-2 border border-gray-300 rounded-md custom-select"
                id="city"
                v-model="selectedCity"
              >
                <option
                  v-for="city in cityOptions"
                  :key="city.name"
                  :value="city.name"
                >
                  {{ city.name }}
                </option>
              </select>
              <i
                class="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              ></i>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label
              for="district"
              class="text-lg font-bold before:content-['*'] before:text-red-500 before:mr-1"
              >鄉鎮市區</label
            >
            <div class="relative">
              <select
                class="w-full p-2 border border-gray-300 rounded-md custom-select"
                id="district"
                v-model="selectedDistrict"
              >
                <option
                  v-for="district in districtOptions"
                  :key="district"
                  :value="district"
                >
                  {{ district }}
                </option>
              </select>
              <i
                class="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              ></i>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="address"
            class="text-lg font-bold before:content-['*'] before:text-red-500 before:mr-1"
            >收件地址</label
          >

          <input
            v-model="userInfo.address"
            type="text"
            id="address"
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="請輸入收件地址"
          />
        </div>
        <label for="message" class="text-lg font-bold">訂單備註</label>
        <div class="flex items-center gap-2">
          <textarea
            v-model="userInfo.message"
            id="message"
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="請輸入訂單備註"
          ></textarea>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
