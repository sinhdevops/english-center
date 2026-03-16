import * as z from 'zod';

export const scheduleSchema = z.object({
  branch_id: z.string().uuid('Cơ sở không hợp lệ'),
  course_id: z.string().uuid('Khóa học không hợp lệ'),
  class_code: z.string().min(1, 'Mã lớp không được để trống'),
  schedule: z.string().min(1, 'Lịch học không được để trống'),
  start_date: z.string().min(1, 'Ngày khai giảng không được để trống'),
  status: z.enum(['open', 'full', 'closed']),
});

export const studentSchema = z.object({
  name: z.string().min(1, 'Tên học viên không được để trống'),
  age: z.preprocess((val) => Number(val), z.number().min(0, 'Tuổi không hợp lệ')),
  grade: z.string().min(1, 'Lớp không được để trống'),
  parent_name: z.string().min(1, 'Tên phụ huynh không được để trống'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  branch_id: z.string().uuid('Cơ sở không hợp lệ'),
  course_id: z.string().uuid('Khóa học không hợp lệ'),
  schedule_id: z.string().uuid().optional().nullable().or(z.literal("")),
  status: z.enum(['active', 'inactive', 'graduated']),
});

export const branchSchema = z.object({
  name: z.string().min(1, 'Tên cơ sở không được để trống'),
  address: z.string().min(1, 'Địa chỉ không được để trống'),
});

export const programSchema = z.object({
  name: z.string().min(1, 'Tên chương trình không được để trống'),
  description: z.string().optional(),
  image_url: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')),
});

export const courseSchema = z.object({
  program_id: z.string().uuid('Chương trình không hợp lệ'),
  name: z.string().min(1, 'Tên khóa học không được để trống'),
  duration: z.string().optional(),
  level: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  category: z.string().optional(),
  description: z.string().min(1, 'Mô tả không được để trống'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  date: z.string().min(1, 'Ngày diễn ra không được để trống'),
  location: z.string().optional(),
  image_url: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')),
  author_image_url: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')),
});

export const registrationSchema = z.object({
  parentName: z.string().min(1, 'Vui lòng nhập họ tên'),
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(11, 'Số điện thoại không quá 11 số')
    .regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
  childName: z.string().min(1, 'Vui lòng nhập họ tên của con'),
  childClass: z.string().min(1, 'Vui lòng nhập lớp của con'),
  course: z.string().min(1, 'Vui lòng nhập khóa học quan tâm'),
  branch: z.string().min(1, 'Vui lòng chọn cơ sở'),
});

