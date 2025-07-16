import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBl48GDNRu2pSwTuGuFK7cw4xTE2jeARmA",
  authDomain: "stackit-61b94.firebaseapp.com",
  projectId: "stackit-61b94",
  storageBucket: "stackit-61b94.appspot.com",
  messagingSenderId: "301261363111",
  appId: "1:301261363111:web:e33d9aa6ab40313ca64882"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
