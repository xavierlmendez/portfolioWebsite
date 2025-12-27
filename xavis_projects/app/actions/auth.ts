'use server';

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase/client";
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });

  if (!data) {
    return {
      message:
        "An error occurred while creating your account." + error?.message,
    };
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}

export async function signin(state: FormState, formData: FormData) {
  console.log('sign in called');
  // Validate form fields
  console.log(formData)
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('called');
  // 3. Insert the user into the database or call an Auth Library's API
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: hashedPassword,
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });

  if (!data) {
    return {
      message:
        "An error occurred while creating your account." + error?.message,
    };
  }

  return {message: "Login Successful"}

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}


export async function ping(_p: any, _fd: FormData) {
  console.log('PING ACTION CALLED')
  return {}
}