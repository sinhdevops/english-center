export type AgeGroup = "3-4 tuổi" | "4-5 tuổi" | "5-6 tuổi" | "Tiểu học";

export interface QuizQuestion {
	id: number;
	text: string;
	options: string[]; // plain text only, no "A. B. C. D." prefix
	correctAnswer: number; // index 0-3
}

export interface QuizSet {
	id: string;
	title: string;
	ageGroup: AgeGroup;
	durationSeconds: number;
	questions: QuizQuestion[];
}

const QUESTIONS_3_4: QuizQuestion[] = [
	{ id: 1, text: "small", options: ["small", "big", "large", "nice"], correctAnswer: 0 },
	{ id: 2, text: "doll", options: ["doll", "ball", "car", "apple"], correctAnswer: 0 },
	{ id: 3, text: "black", options: ["white", "red", "blue", "pen"], correctAnswer: 0 },
	{ id: 4, text: "cat", options: ["dog", "bird", "fish", "cat"], correctAnswer: 3 },
	{ id: 5, text: "one", options: ["two", "three", "four", "one"], correctAnswer: 3 },
];

const QUESTIONS_4_5: QuizQuestion[] = [
	{ id: 1, text: "classroom", options: ["library", "playground", "house", "classroom"], correctAnswer: 3 },
	{ id: 2, text: "teacher", options: ["student", "doctor", "nurse", "teacher"], correctAnswer: 3 },
	{ id: 3, text: "apple", options: ["orange", "banana", "grape", "apple"], correctAnswer: 3 },
	{ id: 4, text: "Monday", options: ["Tuesday", "Wednesday", "Thursday", "Monday"], correctAnswer: 3 },
	{ id: 5, text: "Red", options: ["Green", "Yellow", "Blue", "Red"], correctAnswer: 3 },
];

const QUESTIONS_5_6: QuizQuestion[] = [
	{ id: 1, text: "small", options: ["small", "big", "large", "nice"], correctAnswer: 0 },
	{ id: 2, text: "doll", options: ["doll", "ball", "car", "apple"], correctAnswer: 0 },
	{ id: 3, text: "black", options: ["white", "red", "blue", "pen"], correctAnswer: 0 },
	{ id: 4, text: "cat", options: ["dog", "bird", "fish", "cat"], correctAnswer: 3 },
	{ id: 5, text: "one", options: ["two", "three", "four", "one"], correctAnswer: 3 },
];

const QUESTIONS_TIEU_HOC: QuizQuestion[] = [
	{ id: 1, text: "classroom", options: ["library", "playground", "house", "classroom"], correctAnswer: 3 },
	{ id: 2, text: "teacher", options: ["student", "doctor", "nurse", "teacher"], correctAnswer: 3 },
	{ id: 3, text: "apple", options: ["orange", "banana", "grape", "apple"], correctAnswer: 3 },
	{ id: 4, text: "Monday", options: ["Tuesday", "Wednesday", "Thursday", "Monday"], correctAnswer: 3 },
	{ id: 5, text: "Red", options: ["Green", "Yellow", "Blue", "Red"], correctAnswer: 3 },
];

export const QUIZ_SETS: QuizSet[] = [
	{
		id: "tu-duy-3-4-tuoi",
		title: "Test đánh giá năng lực tư duy",
		ageGroup: "3-4 tuổi",
		durationSeconds: 2700, // 45 phút
		questions: QUESTIONS_3_4,
	},
	{
		id: "tu-duy-4-5-tuoi",
		title: "Test đánh giá năng lực tư duy",
		ageGroup: "4-5 tuổi",
		durationSeconds: 2700, // 45 phút
		questions: QUESTIONS_4_5,
	},
	{
		id: "tu-duy-5-6-tuoi",
		title: "Test đánh giá năng lực tư duy",
		ageGroup: "5-6 tuổi",
		durationSeconds: 3600, // 60 phút
		questions: QUESTIONS_5_6,
	},
	{
		id: "tu-duy-tieu-hoc",
		title: "Test đánh giá năng lực tư duy",
		ageGroup: "Tiểu học",
		durationSeconds: 3600, // 60 phút
		questions: QUESTIONS_TIEU_HOC,
	},
];

export const QUIZ_SETTINGS = {
	POINTS_PER_QUESTION: 2,
};
