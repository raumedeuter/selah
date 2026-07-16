import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApogK8ZUf1kj9BI1lY9kzjG3iv66L-unw",
  authDomain: "selah-9f63a.firebaseapp.com",
  projectId: "selah-9f63a",
  storageBucket: "selah-9f63a.appspot.com",
  messagingSenderId: "232787942356",
  appId: "1:232787942356:web:d46c01b27a23f030879441",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const db = getFirestore(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BKpg-_v0r3uNs4ocUz5e08KyOYfSRwH0i1hTQp3KUay-nQPZfXijOrJxZMf1K_a193-tBWzUVr9Yrt_0ByP17s4",
      });
      if (token) {
        // Save token to Firestore
        await setDoc(doc(db, "fcm_tokens", token), {
          token,
          createdAt: new Date().toISOString(),
          platform: navigator.userAgent,
        });
        console.log("Token saved:", token);
      }
      return token;
    }
  } catch (error) {
    console.error("Notification permission error:", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
