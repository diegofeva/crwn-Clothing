import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBCNCqYST4L4O8YkCv5owrmt0D7dyc4bM8",
    authDomain: "crwn-clothing-db-7caec.firebaseapp.com",
    projectId: "crwn-clothing-db-7caec",
    storageBucket: "crwn-clothing-db-7caec.appspot.com",
    messagingSenderId: "923701454223",
    appId: "1:923701454223:web:79ecc20909c42de9c017fa"
};
  
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInwithGooglePopup = () =>  signInWithPopup(auth, provider)
.then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
});

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
};
  
