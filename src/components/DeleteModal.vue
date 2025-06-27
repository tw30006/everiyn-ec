<script setup>
const emit = defineEmits(['close-modal', 'delete-product'])
const props = defineProps({
  isShowDeleteModal: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="absolute inset-0 bg-black/70 z-11" v-if="isShowDeleteModal">
    <section
      class="w-[330px] h-[150px] rounded-md mx-auto bg-[#ffffff] flex flex-col justify-between absolute inset-50"
    >
      <h2 class="text-xl text-white bg-red-700 rounded-t-md p-2 text-center">
        刪除品項
      </h2>
      <p class="text-xl text-center">確定刪除 {{ product.title }} 嗎？</p>
      <div class="flex justify-end gap-2 p-2">
        <button
          type="button"
          class="bg-gray-500 px-3 py-1 text-white rounded-sm"
          @click="emit('close-modal')"
        >
          取消
        </button>
        <button
          type="button"
          class="bg-red-700 px-3 py-1 text-white rounded-sm"
          @click="emit('delete-product', product)"
        >
          確定
        </button>
      </div>
    </section>
  </div>
</template>
