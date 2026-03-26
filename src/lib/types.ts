export interface Branch {
  id: string;
  name: string;
  address: string;
  city?: string;
  created_at?: string;
}

export interface BrandsAndPartners {
  id: string;
  name: string;
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}

export interface Course {
  id: string;
  program_id: string;
  name: string;
  duration?: string;
  level?: string;
  created_at?: string;
}

export interface ClassSchedule {
  id: string;
  branch_id: string;
  course_id: string;
  class_code: string;
  schedule: string;
  start_date: string;
  status: 'open' | 'full' | 'closed';
  created_at?: string;
  // Join fields (optional)
  branch_name?: string;
  course_name?: string;
  student_count?: number;
}

export interface Event {
  id: string;
  title: string;
  category?: string;
  description: string;
  excerpt?: string;
  content?: string;
  date: string;
  location: string;
  image_url?: string;
  author_image_url?: string;
  created_at?: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  parent_name: string;
  phone: string;
  email: string;
  branch_id: string;
  course_id: string;
  schedule_id?: string;
  status: 'active' | 'inactive' | 'graduated';
  created_at?: string;
}

export interface Banner {
  id: string;
  title?: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface Registration {
  id: string;
  student_name: string;
  grade: string;
  parent_name: string;
  phone: string;
  email: string;
  course_id: string;
  branch_id: string;
  created_at: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'cancelled';
}

export interface QuizQuestion {
  id: number;
  quiz_set_id: string;
  question_order: number;
  text: string;
  options: string[];
  correct_answer: number;
}

export interface QuizSet {
  id: string;
  title: string;
  age_group: string;
  duration_seconds: number;
  is_active: boolean;
  created_at?: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  user_id: string;
  user_email: string | null;
  parent_phone: string;
  quiz_slug: string;
  score: number | null;
  total_questions: number;
  completed_count: number;
  answers: Record<number, number>;
  current_question_index: number;
  time_left: number | null;
  status: 'in_progress' | 'completed';
  started_at: string;
  completed_at: string | null;
  created_at: string;
}
