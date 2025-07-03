<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const apiUrl = import.meta.env.VITE_APP
async function login() {
  try {
    const res = await fetch(`${apiUrl}admin/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
    const data = await res.json()

    if (data.success) {
      const { token, expired } = data

      document.cookie = `eveyiynToken=${token}; expires=${new Date(expired)}`
      checkLogin()
    } else {
      console.log('帳號密碼輸入錯誤')
    }
  } catch (error) {
    console.log('登入失敗')
  }
}

async function checkLogin() {
  try {
    const token = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('eveyiynToken='))
      ?.split('=')[1]

    console.log('Token:', token)

    if (!token) {
      console.log('Token not found in cookies')
      return
    }

    const res = await fetch(`${apiUrl}api/user/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
    const data = await res.json()

    if (data.success) {
      router.push({ path: '/dashboard' })
    }
  } catch (error) {
    console.log('請重新登入')
  }
}
</script>

<template>
  <div class="flex justify-center translate-y-1/2">
    <section
      class="w-[400px] border border-blue-900 rounded-md p-8 flex flex-col gap-8 bg-white"
    >
      <h1 class="text-2xl font-bold text-center text-blue-900">管理者登入</h1>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="email">帳號</label>
          <input
            v-model="username"
            type="text"
            placeholder="請輸入Email"
            required
            class="border border-blue-900 rounded-md p-2"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">密碼</label>
          <input
            v-model="password"
            type="password"
            placeholder="請輸入密碼"
            required
            class="border border-blue-900 rounded-md p-2"
          />
        </div>
      </div>
      <button
        type="button"
        class="bg-blue-900 hover:bg-sky-700 text-white p-2 rounded-md w-full"
        @click="login"
      >
        登入
      </button>
    </section>
  </div>
</template>
