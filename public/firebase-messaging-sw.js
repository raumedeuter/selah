/* eslint-disable */
// @ts-nocheck

importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyApogK8ZUf1kj9BI1lY9kzjG3iv66L-unw",
  authDomain: "selah-9f63a.firebaseapp.com",
  projectId: "selah-9f63a",
  storageBucket: "selah-9f63a.firebasestorage.app",
  messagingSenderId: "232787942356",
  appId: "1:232787942356:web:d46c01b27a23f030879441"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification
  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  })
})