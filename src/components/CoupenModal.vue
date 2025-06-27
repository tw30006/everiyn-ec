<script setup>
import { ref,watch } from 'vue';
const props = defineProps({
  couponList: {
    type: Object,
    default: () => ({}),
  },
  isCouponModal: {
    type: Boolean,
    required: false,
  },
});
const emit = defineEmits(['close-coupon-modal','update-coupon']);
const tempCoupon = ref({});

watch(()=>props.couponList,(newVal)=>{
  tempCoupon.value = {...newVal}
})
</script>

<template>
    <div class="absolute inset-0 bg-black/70 z-11" v-if="isCouponModal">
    <section class="max-w-[500px] mx-auto absolute inset-70 z-100">
      <div class="bg-white rounded-lg">
        <h2 class="text-center text-2xl text-white bg-sky-700 py-3 rounded-t-md">
          新增優惠券
        </h2>
      </div>
      <div class="bg-white rounded-b-lg flex flex-col gap-5 p-5">
        <div class="flex items-center gap-3">
          <label for="title" class="text-2xl">名稱</label>
          <input v-model="tempCoupon.title" type="text" id="title" name="title" class="border rounded-sm p-1 text-xl" required>
        </div>
        <div class="flex items-center gap-3">
          <label for="code" class="text-2xl">代號</label>
          <input v-model="tempCoupon.code" type="text" id="code" name="code" class="border rounded-sm p-1 text-xl" placeholder="請輸入數字或英文" maxlength="8" required>
        </div>
        <div class="flex items-center gap-3">
          <label for="percent" class="text-2xl">折扣</label>
          <input v-model="tempCoupon.percent" type="number" id="percent" name="percent" class="border rounded-sm p-1 text-xl" placeholder="10" maxlength="4" required>
        </div>
        <div class="flex items-center gap-3">
          <label for="due_date" class="text-2xl">使用期限</label>
          <input v-model="tempCoupon.due_date" type="number" id="due_date" name="due_date" class="border rounded-sm p-1 text-xl" placeholder="20261010" required>
        </div>
        <div class="flex items-center gap-3">
          <label for="is_enagled" class="text-2xl">使用狀態</label>
          <input v-model="tempCoupon.is_enabled" type="checkbox" id="is_enabled" name="is_enabled" class="border rounded-sm p-1 text-xl" required :true-value="1" :false-value="0">
        </div>
        <div class="flex justify-center gap-3">
          <button class="bg-red-700 hover:bg-red-600 px-3 py-2 rounded-lg  flex items-center justify-center w-[20%]" @click="emit('close-coupon-modal')">
            <span class="text-xl text-white">取消</span>
          </button>
          <button class="bg-sky-700 hover:bg-sky-600 px-3 py-2 rounded-lg flex items-center justify-center w-[20%]" @click="emit('update-coupon',tempCoupon)">
            <span class="text-xl text-white">確認</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
