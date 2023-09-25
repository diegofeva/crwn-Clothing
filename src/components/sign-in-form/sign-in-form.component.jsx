
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { useState } from "react";
import { signInwithGooglePopup, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword, auth } from "../../utils/firebase/firebase.utils";
import { onAuthStateChanged } from 'firebase/auth';
import './sign-in-Form.styles.scss'

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
            await signInwithGooglePopup();
            onAuthStateChanged(auth, (user) => {
             if (user) {
                 const userDocRef = createUserDocumentFromAuth(user);
             }
         });
     }
 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{    
            const response = await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response);
            resetFormFields();

        }catch(error){
            if(error.code === "auth/invalid-login-credentials"){
                alert('incorrect password or email')
            }
            console.log(error);
        };
    }

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setFormFields( { ...formFields, [name]: value })
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}></FormInput>
                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}></FormInput>
                <div className="buttons-container">
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle} >G sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;