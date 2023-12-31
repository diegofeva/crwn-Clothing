
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-Form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    //console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        };

        try{    
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
                
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        }catch(error){
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            } else {
                console.log('There is some kind of error', error.message);
            }
        };
    }

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setFormFields( { ...formFields, [name]: value })
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label="Display Name" type='text' required onChange={handleChange} name='displayName' value={displayName}></FormInput>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}></FormInput>
                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}></FormInput>
                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}></FormInput>
                <Button buttonType='google' type='submit'>Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;