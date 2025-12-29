'use client';
import NavBar from '../app/ui/page/NavBar';
import { useFormOverlay } from '../app/ui/page/userAuth/FormOverlayHooks';
import SignInForm from '../app/ui/page/userAuth/SignIn';
import SignOutForm from '../app/ui/page/userAuth/SignOut';
import SignUpForm from '../app/ui/page/userAuth/SignUp';

export default function RootLayoutComponent({
    initialSignedIn,
    children,
}: {
    initialSignedIn: boolean
    children: React.ReactNode
}) {

    const {
        signInFormOpen, setSignInFormOpen,
        signUpFormOpen, setSignUpFormOpen,
        signOutFormOpen, setSignOutFormOpen,
        signedInState, setSignedInState,

    } = useFormOverlay(initialSignedIn);

    //const [signInAction, setSignInAction] = useState('No display on page load')

    const signInStateAction = (signInAction: string) => {
        console.log('func called')
        setSignInFormOpen(false)
        setSignUpFormOpen(false)
        setSignOutFormOpen(false)

        if (signInAction === 'Signing In') {
            setSignInFormOpen(true)
        }
        else if (signInAction === 'Signing Out') {
            setSignOutFormOpen(true)
        }
        else if (signInAction === 'Creating Account') {
            setSignUpFormOpen(true)
        }
    }

    return (
        <>
            <div className='bg-[#0F172A] flex flex-col text-white'>
                <NavBar signInStateAction={signInStateAction} signedInState={signedInState} />
            </div>

            {/* Forms that will display over page content */}
            <SignInForm open={signInFormOpen} onClose={() => setSignInFormOpen(false)} setSignedInState={setSignedInState} signInStateAction={signInStateAction} />
            <SignOutForm open={signOutFormOpen} onClose={() => setSignOutFormOpen(false)} setSignedInState={setSignedInState} signInStateAction={signInStateAction} />
            <SignUpForm open={signUpFormOpen} onClose={() => setSignUpFormOpen(false)} setSignedInState={setSignedInState} signInStateAction={signInStateAction} />
            {/* <SignOutForm />
            <SignUpForm />
            <ResetPasswordForm /> */}

            <main className='rounded-2xl shadow-2xl mx-auto max-w-7xl px-6 bg-black text-white w-full flex-grow mb-10 mt-10'>
                {children}
            </main>
            <footer className='text-gray-500 text-center text-sm pt-8 mb-5'>
                Connect with me on <a href='https://linkedin.com/in/xavierlmendez' className='underline text-emerald-400'>LinkedIn</a> — Feedback & collaboration welcome!
            </footer>
        </>
    )
}