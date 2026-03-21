"use server";

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function login(dataLogin: {email: string, password: string}) {
  const supabase = await createClient()

  const data = {
    email: dataLogin.email,
    password: dataLogin.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)


  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')  
  redirect('/')  
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/dang-nhap')
}