'use client';

import { useState } from "react";
import { signin } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignInForm() {
    const [state, action, pending] = useActionState(signin, undefined)
     
      return (
        <form action={action}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="Email" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={pending} type="submit">
            Sign In
          </button>
        </form>
      )
}