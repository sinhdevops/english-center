import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createQuizRecord, updateQuizRecord } from '@/actions/bai-thi.actions'
import PageContent from './_page-content'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: quizSet } = await supabase
    .from('quiz_sets')
    .select('title, age_group')
    .eq('id', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (!quizSet) {
    return { title: 'Không tìm thấy bài thi' }
  }

  return {
    title: `Làm bài thi: ${quizSet.title}`,
    description: `Bài thi ${quizSet.title} dành cho học viên trình độ ${quizSet.age_group} tại STEMKey. Tham gia kiểm tra đánh giá năng lực ngay!`,
    openGraph: {
      type: 'website',
      title: `Bài thi: ${quizSet.title} - STEMKey`,
      description: `Bài kiểm tra đánh giá năng lực tư duy độ tuổi ${quizSet.age_group}`,
    },
	alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://stemkey.vn'}/bai-thi/${slug}`,
    },
  }
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/dang-nhap')

  const { data: quizSet } = await supabase
    .from('quiz_sets')
    .select('*, questions:quiz_questions(*)')
    .eq('id', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (!quizSet || !quizSet.questions?.length) notFound()

  quizSet.questions = quizSet.questions.sort(
    (a: { question_order: number }, b: { question_order: number }) =>
      a.question_order - b.question_order,
  )

  const { data: initialRecord } = await supabase
    .from('quiz_results')
    .select('id, status, score, answers, current_question_index, time_left, parent_phone')
    .eq('user_id', user.id)
    .eq('quiz_slug', slug)
    .maybeSingle()

  return (
    <PageContent
      slug={slug}
      userId={user.id}
      userEmail={user.email ?? null}
      quizSet={quizSet}
      initialRecord={initialRecord}
      createQuizRecord={createQuizRecord}
      updateQuizRecord={updateQuizRecord}
    />
  )
}
