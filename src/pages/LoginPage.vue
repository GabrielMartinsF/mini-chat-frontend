<template>
  <div class="login-container">
    <div class="login-box" ref="loginBox">
      <h2>Login</h2>
      <q-form @submit.prevent="handleLogin">
        <q-input
          v-model="usernameInput"
          label="Usuário"
          filled
          class="q-mb-md"
          lazy-rules
          :rules="[val => !!val || 'Digite o usuário']"
        />
        <q-btn
          label="Entrar"
          color="primary"
          class="full-width"
          type="submit"
        />
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/hooks/users'
import { gsap } from 'gsap'

const usernameInput = ref('')
const router = useRouter()
const userStore = useUserStore()
const loginBox = ref(null)

const handleLogin = () => {
  if (usernameInput.value.trim()) {
    userStore.setUsername(usernameInput.value)
    router.push('/chat')
  }
}

onMounted(() => {
  gsap.from(loginBox.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out'
  })
})
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1976D2, #42A5F5);
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
</style>