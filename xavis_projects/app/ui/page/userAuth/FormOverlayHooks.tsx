'use client';

import { useState } from "react";


export function useFormOverlay() {
    const [signInFormOpen, setSignInFormOpen] = useState(true);
    const [signUpFormOpen, setSignUpFormOpen] = useState(false);


    return { signInFormOpen, setSignInFormOpen, signUpFormOpen, setSignUpFormOpen};
}