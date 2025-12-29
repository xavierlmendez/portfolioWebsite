'use client';

import { useState } from "react";


export function useFormOverlay(initialSignedIn: boolean) {
    const [signInFormOpen, setSignInFormOpen] = useState(false);
    const [signUpFormOpen, setSignUpFormOpen] = useState(false);
    const [signOutFormOpen, setSignOutFormOpen] = useState(false);
    const [signedInState, setSignedInState] = useState(initialSignedIn ? "Signed In" : "not signed in");

    return { signInFormOpen, setSignInFormOpen, signUpFormOpen, setSignUpFormOpen, signOutFormOpen, setSignOutFormOpen, signedInState, setSignedInState };
}