'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type SignUpResult = { success: true } | { success: false; error: string }

export async function signIn(
  email: string,
  password: string,
  redirectTo: string,
): Promise<{ error: string } | undefined> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  redirect(redirectTo)
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  phone: string,
): Promise<SignUpResult> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function signInWithGoogle(
  callbackUrl: string,
): Promise<{ error: string } | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: callbackUrl },
  })
  if (error) return { error: error.message }
  redirect(data.url)
}
