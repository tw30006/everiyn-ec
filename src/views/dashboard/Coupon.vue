<script setup>
import { ref,onMounted } from 'vue';
import CoupenModal from '../../components/CoupenModal.vue';
const isCouponModal = ref(false);
const tempCoupon = ref({});
const coupons = ref([]);
const isNewCoupon = ref(null);
const apiUrl = import.meta.env.VITE_APP
const apiPath = import.meta.env.VITE_APP_PATH


const token = document.cookie
  .split(';')
  .map((c) => c.trim())
  .find((c) => c.startsWith('eveyiynToken='))
  ?.split('=')[1]

function openCouponModal(isNew,item) {
  if(isNew){
    tempCoupon.value = {}
  }else {
    tempCoupon.value = {...item}
  }
  isNewCoupon.value = isNew;
  isCouponModal.value = true;
}

async function getCoupons() {
  try{
    const res = await fetch(`${apiUrl}api/${apiPath}/admin/coupons`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    })
    const data = await res.json()
    console.log(data)
    if(data.success){
      coupons.value = data.coupons
    }else {
      console.log(data.message)
    }
  }catch(error){
    console.log(error);
  }
}

async function addCoupon() {
  try{
    const res = await fetch(`${apiUrl}api/${apiPath}/admin/coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({data:tempCoupon.value}),
    })
    const data = await res.json()
    console.log(data)
    if(data.success){
      coupons.value = data.data
      console.log('更新成功')
      isCouponModal.value = false;
      await getCoupons()
    }else {
      console.log(data.message)
    }
  }catch(error){
    console.log(error);
  }
}

async function editCoupon(item) {
  try{
    const res = await fetch(`${apiUrl}api/${apiPath}/admin/coupon/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({data:item}),
    })
    const data = await res.json()
    console.log(data)
    if(data.success){
      isCouponModal.value = false;
      await getCoupons()
      console.log('更新成功')
    }else {
      console.log(data.message)
    }
  }catch(error){
    console.log(error);
  }
}



function updateCoupon(item) {
  tempCoupon.value = {...item}
  if(!isNewCoupon.value){
    editCoupon(tempCoupon.value)
  }else {
    addCoupon()
  }
  isCouponModal.value = false;
}

onMounted(() => {
  getCoupons()
})

</script>

<template>
  <section class="w-full">
    <div class="flex justify-end w-full mb-5">
      <button
        type="button"
        class="px-3 py-3 bg-sky-700 hover:bg-sky-600 text-white text-xl rounded-md leading-none"
        @click="openCouponModal(true)"
        >
        新增折價券
      </button>
    </div>

    <table class="w-full">
      <thead>
        <tr
          class="bg-gray-100 grid grid-cols-6 py-4 px-4 text-xl font-semibold text-gray-700 border-b border-gray-200"
        >
          <th class="text-left">優惠券名稱</th>
          <th class="text-left">代碼</th>
          <th class="text-left">折扣</th>
          <th class="text-left">使用期限</th>
          <th class="text-left">使用狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody  v-for="coupon in coupons" :key="coupon.id">
        <tr class="grid grid-cols-6 py-4 px-4 border-b border-gray-200 text-lg">
          <td class="text-gray-800 font-medium flex items-center">
            {{ coupon.title }}
          </td>
          <td class="flex items-center">
            <span class="text-blue-800">{{ coupon.code }}</span>
          </td>
          <td class="flex items-center">
            <span class="text-red-600 font-bold text-lg">{{ coupon.percent }}%</span>
          </td>
          <td class="text-gray-600 flex items-center">{{ coupon.due_date }}</td>
          <td class="flex items-center">
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full"
              >{{ coupon.is_enabled ? '使用中' : '已停用' }}</span
            >
          </td>
          <td class="flex justify-center items-center gap-3">
            <button
              class="bg-teal-700 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center"
              @click="openCouponModal(false,coupon)"
            >
              <span>編輯</span>
            </button>
            <button
              class="bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <span>刪除</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <CoupenModal :couponList="tempCoupon" :isCouponModal="isCouponModal" @close-coupon-modal="isCouponModal = false" @update-coupon="updateCoupon" 
  />
</template>


