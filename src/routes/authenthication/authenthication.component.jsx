
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authenthication.styles.scss'



const Authenthication = () => {

    return(
        <div className='authenthication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
};

export default Authenthication;