import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

let messageCallback = null
let subscription = null

const client = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
  reconnectDelay: 5000,
  onConnect: () => {
    console.log('✅ Conectado ao WebSocket STOMP')

    if (!subscription) {
      subscription = client.subscribe('/topic/messages', (message) => {
        try {
          if (messageCallback) {
            messageCallback(message.body)
          } else {
            console.warn('Callback ainda não está definido')
          }
        } catch (err) {
          console.error('Erro ao chamar callback:', err)
        }
      })
    }
  },
  onStompError: (frame) => {
    console.error('Erro STOMP:', frame)
  }
})

function activateStomp(callback) {
  messageCallback = callback

  if (!client.active) {
    client.activate()
  }
}

function sendMessage(destination, body) {
  if (client.connected) {
    client.publish({
      destination,
      body
    })
  } else {
    console.warn('STOMP não conectado')
  }
}

function deactivateStomp() {
  if (subscription) {
    subscription.unsubscribe()
    subscription = null
  }

  if (client.active) {
    client.deactivate()
  }
}

export { activateStomp, sendMessage, deactivateStomp }