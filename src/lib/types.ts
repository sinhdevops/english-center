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
