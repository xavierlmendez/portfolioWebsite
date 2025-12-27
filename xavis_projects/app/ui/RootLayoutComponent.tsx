'use client';
import NavBar from './page/NavBar';
import { useFormOverlay } from './page/userAuth/FormOverlayHooks';
import SignInForm from './page/userAuth/SignIn';
import SignOutForm from './page/userAuth/SignOut';
import SignUpForm from './page/userAuth/SignUp';

export default function RootLayoutComponent() {

    const {
        signInFormOpen, setSignInFormOpen,
        signUpFormOpen, setSignUpFormOpen,
        signOutFormOpen, setSignOutFormOpen,
        signedInState, setSignedInState,

    } = useFormOverlay();

    //const [signInAction, setSignInAction] = useState('No display on page load')

    const signInStateAction = (signInAction: string) => {
        console.log('func called')
        setSignInFormOpen(false)
        setSignUpFormOpen(false)
        setSignOutFormOpen(false)

        if (signInAction === 'Signing In') {
            setSignInFormOpen(true)
        }
        else if (signInAction === 'Signing Out')  {
            setSignOutFormOpen(true)
        }
        else if (signInAction === 'Creating Account')  {
            setSignUpFormOpen(true)
        }
    }

    return (
        <>
            <div className='bg-[#0F172A] flex flex-col text-white'>
                <NavBar signInStateAction={signInStateAction} signedInState={signedInState}/>
            </div>
            <SignInForm open={signInFormOpen} onClose={() => setSignInFormOpen(false)} setSignedInState={setSignedInState} signInStateAction={signInStateAction} />
            <SignOutForm open={signOutFormOpen} onClose={() => setSignOutFormOpen(false)} setSignedInState={setSignedInState} signInStateAction={signInStateAction}/>
            <SignUpForm open={signUpFormOpen} onClose={() => setSignUpFormOpen(false)} setSignedInState={setSignedInState} signInStateAction={signInStateAction}/>
            {/* <SignOutForm />
            <SignUpForm />
            <ResetPasswordForm /> */}
        </>
    )
}