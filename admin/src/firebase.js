import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCeZS9IMjKp8M9-oQjCzaCMPbW183QBENI",
    authDomain: "netfilx-c8e46.firebaseapp.com",
    projectId: "netfilx-c8e46",
    storageBucket: "netfilx-c8e46.appspot.com",
    messagingSenderId: "876910117046",
    appId: "1:876910117046:web:6ed389991b29e3fe3da617",
    measurementId: "G-1DJ97HPSBX"
};


initializeApp(firebaseConfig);
const storage = getStorage()
export { storage, ref, uploadBytesResumable, getDownloadURL }