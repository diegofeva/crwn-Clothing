import { useEffect } from 'react';
import { signInwithGoogleredirect, signInwithGooglePopup, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';

const SignIn = () => {

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getRedirectResult(auth);
                
                if(response){
                    const userDocRef = createUserDocumentFromAuth(response.user);
                }    
            }catch(error){
                console.log('Error fetching redirect result data', error.message);
            }
        }
        fetchData();           
    }, [])

    const logGoogleUser = async () => {
       await signInwithGooglePopup();
       onAuthStateChanged(auth, (user) => {
        if (user) {
            const userDocRef = createUserDocumentFromAuth(user);
        }
    });
    }

    const logGoogleRedirectUser = async () => {
       const { user } = await signInwithGoogleredirect();
       console.log(user);
       
    };

    return(
        <div>
            <h1>Sign in Page</h1>
            <button onClick={ logGoogleUser }>Sign in with google Popup</button>
            <button onClick={ logGoogleRedirectUser }>Sign in with google Redirect</button>
        </div>
    )
};

export default SignIn;