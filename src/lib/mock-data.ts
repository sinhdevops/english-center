import { Branch, Program, Course, ClassSchedule, Event, Student, Registration } from './types';

export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Cơ sở Quận 7', address: '90 Nguyễn Thị Thập, P. Tân Hưng, Tp HCM' },
  { id: 'b2', name: 'Cơ sở Quận 1', address: '123 Lê Lợi, P. Bến Thành, Tp HCM' },
];

export const MOCK_PROGRAMS: Program[] = [
  { 
    id: 'p1', 
    name: 'Tiếng Anh Thiếu Nhi', 
    description: 'Dành cho trẻ em từ 4-12 tuổi',
    image_url: 'https://picsum.photos/seed/kids/800/600'
  },
  { 
    id: 'p2', 
    name: 'Luyện thi IELTS', 
    description: 'Cam kết đầu ra 6.5+',
    image_url: 'https://picsum.photos/seed/ielts/800/600'
  },
  { 
    id: 'p3', 
    name: 'Tiếng Anh Giao Tiếp', 
    description: 'Phản xạ tự nhiên trong 3 tháng',
    image_url: 'https://picsum.photos/seed/communication/800/600'
  },
];

export const MOCK_COURSES: Course[] = [
  { id: 'c1', program_id: 'p1', name: 'KIDDIE 4-5 tuổi (BEE 1)', duration: '24 buổi', level: 'Mầm non' },
  { id: 'c2', program_id: 'p1', name: 'KIDDIE 6-7 tuổi (BEE 2)', duration: '24 buổi', level: 'Tiểu học' },
  { id: 'c3', program_id: 'p2', name: 'IELTS Foundation', duration: '36 buổi', level: 'Cơ bản' },
];

export const MOCK_SCHEDULES: ClassSchedule[] = [
  {
    id: 's1',
    branch_id: 'b1',
    course_id: 'c1',
    class_code: 'BEE1-91412',
    schedule: 'MsHoa Junior - Ca (16h30 - 18h00 Thứ 7, CN)',
    start_date: '2026-02-28',
    status: 'open',
  },
  {
    id: 's2',
    branch_id: 'b1',
    course_id: 'c2',
    class_code: 'BEE2-88210',
    schedule: 'MrJohn - Ca (18h30 - 20h00 Thứ 2, 4, 6)',
    start_date: '2026-03-05',
    status: 'open',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Ngày hội Open Day 2026',
    description: 'Tham gia trải nghiệm lớp học thử miễn phí và nhận học bổng lên đến 50%.',
    date: '2026-04-15',
    location: 'Cơ sở Quận 7',
  },
  {
    id: 'e2',
    title: 'Workshop: Bí quyết chinh phục IELTS 8.0',
    description: 'Chia sẻ từ các chuyên gia hàng đầu về lộ trình học IELTS hiệu quả.',
    date: '2026-05-10',
    location: 'Cơ sở Quận 1',
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'st1',
    name: 'Nguyễn Văn An',
    age: 7,
    grade: 'Lớp 2',
    parent_name: 'Nguyễn Văn Bình',
    phone: '0901234567',
    email: 'an.nv@gmail.com',
    branch_id: 'b1',
    course_id: 'c2',
    status: 'active'
  },
  {
    id: 'st2',
    name: 'Trần Thị Bình',
    age: 5,
    grade: 'Mầm non',
    parent_name: 'Trần Văn Cường',
    phone: '0907654321',
    email: 'binh.tt@gmail.com',
    branch_id: 'b1',
    course_id: 'c1',
    status: 'active'
  }
];

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: 'r1',
    student_name: 'Lê Hoàng Nam',
    grade: 'Lớp 3',
    parent_name: 'Lê Văn Dũng',
    phone: '0988888888',
    email: 'nam.lh@gmail.com',
    course_id: 'c2',
    branch_id: 'b1',
    created_at: '2026-03-01T10:00:00Z',
    status: 'pending'
  },
  {
    id: 'r2',
    student_name: 'Phạm Minh Đức',
    grade: 'Lớp 10',
    parent_name: 'Phạm Văn Hùng',
    phone: '0977777777',
    email: 'duc.pm@gmail.com',
    course_id: 'c3',
    branch_id: 'b2',
    created_at: '2026-03-05T14:30:00Z',
    status: 'contacted'
  }
];
