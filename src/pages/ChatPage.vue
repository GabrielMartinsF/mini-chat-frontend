<template>
  <q-page class="chat-page">
    <div class="messages-container" 
          :style="{ maxHeight: 'calc(100vh - 50px - ' + inputHeight + 'px)' }"
          ref="messagesContainer">
      <q-chat-message
        v-for="(msg, index) in receivedMessages"
        :key="index"
        :text="[msg.content]"
        :sent="msg.sender === username"
        :bg-color="msg.sender === username ? 'amber-7' : 'primary'"
        text-color="white"
      />
    </div>

    <div class="input-container" ref="inputContainer">
      <q-input
        v-model="message"
        label="Digite uma mensagem"
        @keyup.enter="handleSend"
        dense
        filled
      >
        <template v-slot:append>
          <q-icon name="send" @click="handleSend" style="cursor: pointer;" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useUserStore } from 'src/hooks/users'
import { activateStomp, sendMessage, deactivateStomp } from 'src/services/webSocket'

const userStore = useUserStore()
const username = ref(userStore.username)
const message = ref('')
const receivedMessages = ref([])
const strangerName = ref('')
const inputHeight = ref(80)

const inputContainer = ref(null)
const messagesContainer = ref(null)

const scrollToBottom = () => {
  const el = messagesContainer.value
  if (el) el.scrollTop = el.scrollHeight
}

const handleSend = () => {
  if (message.value.trim()) {
    const payload = {
      sender: username.value,
      content: message.value
    }
    sendMessage('/app/chat', JSON.stringify(payload))
    message.value = ''
    nextTick(scrollToBottom)
  }
}

const updateInputHeight = () => {
  if (inputContainer.value) {
    inputContainer.value.style.height = `${inputContainer.value.scrollHeight}px`
  }
}

onMounted(() => {
  updateInputHeight()
  window.addEventListener('resize', updateInputHeight)

  activateStomp((msgBody) => {
    try {
      const parsed = JSON.parse(msgBody)
      receivedMessages.value.push(parsed)
      if (!strangerName.value && parsed.sender !== username.value) {
        strangerName.value = parsed.sender
      }
      nextTick(scrollToBottom)
    } catch (e) {
      console.warn('Mensagem mal formatada:', msgBody)
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateInputHeight)
  deactivateStomp()
})
</script>

<style>
html, body, #q-app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.chat-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch; 
}

.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: white;
  border-radius: 10px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--q-primary);
  border-radius: 10px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--q-secondary);
}

.input-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}
</style>