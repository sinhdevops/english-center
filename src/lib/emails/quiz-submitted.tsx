interface QuizSubmittedEmailProps {
  userEmail: string
  parentPhone: string
  quizSlug: string
  quizTitle: string
  totalQuestions: number
  completedAt: string
}

export function QuizSubmittedEmail({
  userEmail,
  parentPhone,
  quizSlug,
  quizTitle,
  totalQuestions,
  completedAt,
}: QuizSubmittedEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '24px', backgroundColor: '#f9fafb' }}>
      <div style={{ backgroundColor: '#00842B', borderRadius: '12px 12px 0 0', padding: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', margin: 0, fontSize: '22px', fontWeight: 'bold' }}>
          STEMKey — Học viên vừa nộp bài test
        </h1>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '0 0 12px 12px', padding: '32px', border: '1px solid #e5e7eb' }}>
        <p style={{ color: '#374151', fontSize: '15px', marginTop: 0 }}>
          Xin chào giáo viên, một học viên vừa hoàn thành bài test. Vui lòng chấm điểm và phản hồi kết quả.
        </p>

        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '13px', width: '140px', fontWeight: 'bold' }}>Bài test:</td>
                <td style={{ padding: '8px 0', color: '#111827', fontSize: '13px', fontWeight: 'bold' }}>{quizTitle} ({quizSlug})</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '13px', fontWeight: 'bold' }}>Email học viên:</td>
                <td style={{ padding: '8px 0', color: '#111827', fontSize: '13px' }}>{userEmail}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '13px', fontWeight: 'bold' }}>SĐT phụ huynh:</td>
                <td style={{ padding: '8px 0', color: '#111827', fontSize: '13px' }}>{parentPhone}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '13px', fontWeight: 'bold' }}>Số câu:</td>
                <td style={{ padding: '8px 0', color: '#111827', fontSize: '13px' }}>{totalQuestions} câu</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '13px', fontWeight: 'bold' }}>Thời gian nộp:</td>
                <td style={{ padding: '8px 0', color: '#111827', fontSize: '13px' }}>{completedAt}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', marginBottom: 0 }}>
          STEMKey Education · contact@stemkey.edu.vn
        </p>
      </div>
    </div>
  )
}
