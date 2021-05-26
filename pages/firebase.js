import firebase from "firebase/app"
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-Y0G_iasoV9ZTIu6R5XeDSnILsIT8Idg",
  authDomain: "i11l-software.firebaseapp.com",
  projectId: "i11l-software",
  storageBucket: "i11l-software.appspot.com",
  messagingSenderId: "993356273372",
  appId: "1:993356273372:web:d051bb9752b6eb49da8619"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


export default firebase;