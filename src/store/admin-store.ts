import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';
import { Branch, Course, Program, ClassSchedule, Student, Event } from '@/lib/types';

interface AdminState {
  branches: Branch[];
  courses: Course[];
  programs: Program[];
  schedules: ClassSchedule[];
  students: Student[];
  events: Event[];
  isLoading: boolean;
  error: string | null;

  fetchBranches: () => Promise<void>;
  fetchCourses: () => Promise<void>;
  fetchPrograms: () => Promise<void>;
  fetchSchedules: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchAll: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  branches: [],
  courses: [],
  programs: [],
  schedules: [],
  students: [],
  events: [],
  isLoading: false,
  error: null,

  fetchBranches: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('branches').select('*').order('name');
      if (error) throw error;
      set({ branches: data || [], error: null });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCourses: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('courses').select('*').order('name');
      if (error) throw error;
      set({ courses: data || [], error: null });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPrograms: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('programs').select('*').order('name');
      if (error) throw error;
      set({ programs: data || [], error: null });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSchedules: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*, students(count)')
        .order('start_date', { ascending: true });
      if (error) throw error;
      
      const processed = (data || []).map(s => ({
        ...s,
        student_count: s.students?.[0]?.count || 0
      }));
      
      set({ schedules: processed, error: null });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStudents: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      set({ students: data || [], error: null });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      set({ events: data || [], error: null });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAll: async () => {
    set({ isLoading: true });
    try {
      await Promise.all([
        get().fetchBranches(),
        get().fetchCourses(),
        get().fetchPrograms(),
        get().fetchSchedules(),
        get().fetchStudents(),
        get().fetchEvents(),
      ]);
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));
