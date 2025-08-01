<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['close-modal', 'update-product'])
const selectedFile = ref(null)
const previewUrl = ref(null)
const apiPath = import.meta.env.VITE_APP_PATH
const tempProduct = ref({})

const props = defineProps({
  isShowModal: {
    type: Boolean,
    required: false,
  },
  product: {
    type: Object,
    default: () => ({}),
  },
})
const token = document.cookie
  .split(';')
  .map((c) => c.trim())
  .find((c) => c.startsWith('eveyiynToken='))
  ?.split('=')[1]
console.log(token)
function handleFileImg(e) {
  selectedFile.value = e.target.files[0]
  previewUrl.value = URL.createObjectURL(selectedFile.value)
}
async function uploadImage() {
  const formData = new FormData()
  formData.append('file-to-upload', selectedFile.value)
  try {
    const res = await fetch(`/v2/api/${apiPath}/admin/upload`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
      tempProduct.value.imageUrl = data.imageUrl
    } else {
      console.log('上傳失敗')
    }
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => props.product,
  (newVal) => {
    tempProduct.value = { ...newVal }
  }
)
</script>

<template>
  <div class="absolute inset-0 bg-black/70 z-11" v-if="isShowModal">
    <section class="max-w-[1200px] mx-auto absolute inset-15 z-100">
      <div class="bg-white rounded-lg">
        <h2
          class="text-center text-2xl text-white bg-primary py-3 rounded-t-md"
        >
          新增產品
        </h2>
        <div class="flex">
          <div class="p-5 flex flex-col gap-5">
            <div class="flex items-center gap-3">
              <label for="title" class="text-2xl">名稱</label>
              <input
                v-model="tempProduct.title"
                type="text"
                id="title"
                name="title"
                class="border rounded-sm p-1 text-xl"
                required
              />
            </div>
            <div class="flex items-center gap-3">
              <label for="category" class="text-2xl">類別</label>
              <input
                v-model="tempProduct.category"
                type="text"
                id="category"
                name="category"
                class="border rounded-sm p-1 text-xl"
                required
              />
            </div>
            <div class="flex items-center gap-3">
              <label for="origin_price" class="text-2xl">原價</label>
              <input
                v-model="tempProduct.origin_price"
                type="number"
                id="origin_price"
                name="origin_price"
                class="border rounded-sm p-1 text-xl"
                required
              />
            </div>
            <div class="flex items-center gap-3">
              <label for="price" class="text-2xl">售價</label>
              <input
                v-model="tempProduct.price"
                type="number"
                id="price"
                name="price"
                class="border rounded-sm p-1 text-xl"
                required
              />
            </div>
            <div class="flex items-center gap-3">
              <label for="unit" class="text-2xl">單位</label>
              <input
                v-model="tempProduct.unit"
                type="text"
                id="unit"
                name="unit"
                class="border rounded-sm p-1 text-xl"
                required
              />
            </div>
            <div class="flex items-center gap-3">
              <label for="is_enabled" class="text-2xl">是否上架</label>
              <input
                v-model="tempProduct.is_enabled"
                type="checkbox"
                name="is_enabled"
                id="is_enabled"
              />
            </div>
          </div>
          <div class="p-5 flex gap-3">
            <label for="description" class="text-2xl">產品描述</label>
            <textarea
              v-model="tempProduct.description"
              name="description"
              id="description"
              cols="50"
              rows="7"
              class="border rounded-sm text-2xl p-2"
            ></textarea>
          </div>
        </div>
        <div class="p-5 flex flex-col gap-3">
          <div class="flex flex-col gap-3">
            <label class="text-2xl">新增圖片</label>
            <div class="grid grid-cols-8 gap-2">
              <input
                type="file"
                name="file-to-upload"
                accept="image/png, image/jpeg, image/jpg"
                class="bg-gray-200 p-2 rounded-sm cursor-pointer col-span-7"
                @change="handleFileImg"
              />
              <button
                type="button"
                class="bg-gray-500 rounded-sm py-2 text-white hover:bg-gray-400 cursor-pointer"
                @click="uploadImage"
              >
                上傳圖片
              </button>
            </div>
          </div>
          <div class="flex gap-3">
            <label for="imageUrl" class="text-2xl">圖片網址</label>
            <input
              type="text"
              id="imageUrl"
              v-model="tempProduct.imageUrl"
              class="border rounded-sm p-1 w-[50%]"
            />
          </div>
          <img
            :src="previewUrl"
            alt="預覽"
            v-if="previewUrl"
            class="w-[300px] h-auto"
          />

          <div class="flex gap-3 justify-end">
            <button
              type="button"
              class="py-2 px-3 bg-red-700 text-white text-xl rounded-md cursor-pointer"
              @click="emit('close-modal')"
            >
              取消
            </button>
            <button
              type="button"
              class="py-2 px-3 bg-sky-800 text-white text-xl rounded-md cursor-pointer"
              @click="emit('update-product', tempProduct)"
            >
              新增
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
