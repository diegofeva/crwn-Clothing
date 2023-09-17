
import { signInwithGooglePopup, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';

const SignIn = () => {

    const logGoogleUser = async () => {
       await signInwithGooglePopup();
       onAuthStateChanged(auth, (user) => {
        if (user) {
            const userDocRef = createUserDocumentFromAuth(user);
        }
    });
    }

    return(
        <div>
            <h1>Sign in Page</h1>
            <button onClick={ logGoogleUser }>Sign in with google Popup</button>
        </div>
    )
};

export default SignIn;