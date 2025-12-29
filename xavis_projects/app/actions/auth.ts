'use server';

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { createClient } from "@/lib/supabase/server";

export async function signup(state: FormState, formData: FormData) {
  console.log(state) // logging for eslint error until I decide what to do with state


  const supabase = await createClient()
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

  // 3. Insert the user into the database or call an Auth Library's API
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  }); // supabase handles password hashing

  console.log("returned supabase data" + data)

  if (!data) {
    return {
      message:
        "An error occurred while creating your account." + error?.message,
    };
  }

  return { message: "Sign Up Successful" }
}

export async function signin(state: FormState, formData: FormData) {
  console.log(state) // logging for eslint error until I decide what to do with state

  const supabase = await createClient()
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

  // 3. Insert the user into the database or call an Auth Library's API
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  }); // note the cookie is set in the supabase/server.ts files function

  if (!data) {
    return {
      message:
        "An error occurred while creating your account." + error?.message,
    };
  }

  return { message: "Login Successful" }
}

export async function signout() {
  const supabase = await createClient()
  supabase.auth.signOut()
}