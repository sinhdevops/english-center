import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'
import { quickConsultSchema } from '@/lib/validations/admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = quickConsultSchema.parse(body)

    const { data, error } = await supabase.from('registrations').insert([
      {
        parent_name: validatedData.parentName,
        phone: validatedData.phone,
        student_name: '',
        status: 'pending',
      },
    ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Registration successful', data }, { status: 201 })
  } catch (error: unknown) {
    console.error('Quick registration error:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
