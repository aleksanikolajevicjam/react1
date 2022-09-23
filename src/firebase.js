import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";




const firebaseConfig = {
  apiKey: "AIzaSyAewm8wppTFv81C6w0EcaKzoDk_GMqlmGc",
  authDomain: "todoapp-8257e.firebaseapp.com",
  databaseURL: "https://todoapp-8257e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-8257e",
  storageBucket: "todoapp-8257e.appspot.com",
  messagingSenderId: "82586981981",
  appId: "1:82586981981:web:df9778257a6378033a1fb4",
  measurementId: "G-B8H6JYC9DX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


const Usermejl = () =>  {
const [user, loading, error] = useAuthState(auth);

var mejl = user?.email
}
const messaging = getMessaging();

const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BIqVE17v6ajIFWBCNupjQ0RyjjA5jtdbSANPWP9NViw-b1OWKuk3trzgOaLUdEBz9aFKgQUkWTeqA-9CzFotcR4` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
        var AuthUserID = (window.localStorage.getItem('AuthUserID'))

          console.log(AuthUserID)
        var body = {
          firstName: 'testName',
      };

      axios.post('https://test.taxifrom.com/backend/crud.php?token=' + currentToken + "&id=" + AuthUserID, body)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  


  

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  onMessageListener,
  requestForToken
};
