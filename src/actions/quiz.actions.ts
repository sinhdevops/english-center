'use server'

import { Resend } from 'resend'
import { render } from '@react-email/render'
import { createClient } from '@/utils/supabase/server'
import { QuizSubmittedEmail } from '@/lib/emails/quiz-submitted'

export async function createQuizRecord(
  userId: string,
  userEmail: string | null,
  phone: string,
  quizSlug: string,
  totalQuestions: number,
  defaultTime: number,
): Promise<{ data: { id: string } | null; error: unknown }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('quiz_results')
    .insert({
      user_id: userId,
      user_email: userEmail,
      parent_phone: phone,
      quiz_slug: quizSlug,
      total_questions: totalQuestions,
      status: 'in_progress',
      time_left: defaultTime,
    })
    .select('id')
    .single()
  return { data, error }
}

export async function updateQuizRecord(
  recordId: string,
  score: number,
  completedCount: number,
  answers: Record<number, number>,
  userEmail: string | null,
  parentPhone: string,
  quizSlug: string,
  quizTitle: string,
): Promise<void> {
  const supabase = await createClient()
  const completedAt = new Date().toISOString()

  await supabase
    .from('quiz_results')
    .update({
      score,
      completed_count: completedCount,
      answers,
      status: 'completed',
      completed_at: completedAt,
    })
    .eq('id', recordId)

  const teacherEmail = process.env.TEACHER_EMAIL
  const resendKey = process.env.RESEND_API_KEY
  if (teacherEmail && resendKey) {
    try {
      const resend = new Resend(resendKey)
      const html = await render(
        QuizSubmittedEmail({
          userEmail: userEmail ?? 'Không rõ',
          parentPhone,
          quizSlug,
          quizTitle,
          totalQuestions: completedCount,
          completedAt: new Date(completedAt).toLocaleString('vi-VN'),
        }),
      )
      await resend.emails.send({
        from: process.env.NEXT_PUBLIC_BASE_EMAIL ?? 'noreply@stemkey.edu.vn',
        to: teacherEmail,
        subject: `[STEMKey] Học viên vừa nộp bài: ${quizTitle}`,
        html,
      })
    } catch (err) {
      console.error('[updateQuizRecord] Failed to send email:', err)
    }
  }
}
