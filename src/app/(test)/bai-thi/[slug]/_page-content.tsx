"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { QUIZ_SETS } from "@/constants";
import { QuizIntro } from "@/components/pages/quiz/quiz-intro";
import { QuizTaking } from "@/components/pages/quiz/quiz-taking";
import { QuizReview } from "@/components/pages/quiz/quiz-review";
import { QuizResult } from "@/components/pages/quiz/quiz-result";

type GameState = "loading" | "intro" | "taking" | "result" | "review";

interface QuizRecord {
	id: string;
	status: string;
	score: number | null;
	answers: Record<number, number> | null;
	current_question_index: number | null;
	time_left: number | null;
	parent_phone: string | null;
}

interface Props {
	slug: string;
	userId: string;
	userEmail: string | null;
	initialRecord: QuizRecord | null;
	createQuizRecord: (
		userId: string,
		userEmail: string | null,
		phone: string,
		quizSlug: string,
		totalQuestions: number,
		defaultTime: number,
	) => Promise<{ data: { id: string } | null; error: unknown }>;
	updateQuizRecord: (
		recordId: string,
		score: number,
		completedCount: number,
		answers: Record<number, number>,
	) => Promise<void>;
}

function formatTime(seconds: number) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function PageContent({ slug, userId, userEmail, initialRecord, createQuizRecord, updateQuizRecord }: Props) {
	const router = useRouter();

	const quizSet = useMemo(() => QUIZ_SETS.find((s) => s.id === slug) ?? QUIZ_SETS[0], [slug]);
	const { questions, durationSeconds: defaultTime } = quizSet;

	const storageKey = useMemo(() => `quiz_progress_${userId}_${slug}`, [userId, slug]);

	const [gameState, setGameState] = useState<GameState>("loading");
	const [timeLeft, setTimeLeft] = useState(defaultTime);
	const [currentAnswers, setCurrentAnswers] = useState<Record<number, number>>({});
	const [score, setScore] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [recordId, setRecordId] = useState<string | null>(null);
	const [parentPhone, setParentPhone] = useState("");
	const isFinishing = useRef(false);

	// Init state from server-fetched record or localStorage
	useEffect(() => {

		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const data = JSON.parse(saved);
				setRecordId(data.recordId);
				setParentPhone(data.parentPhone || "");
				setCurrentAnswers(data.answers || {});
				setCurrentQuestionIndex(data.currentQuestionIndex || 0);
				setTimeLeft(data.timeLeft ?? defaultTime);
				setGameState("taking");
				return;
			} catch {
				localStorage.removeItem(storageKey);
			}
		}

		if (initialRecord?.status === "completed") {
			setScore(initialRecord.score ?? 0);
			setCurrentAnswers(initialRecord.answers || {});
			setGameState("result");
			return;
		}

		if (initialRecord?.status === "in_progress") {
			setRecordId(initialRecord.id);
			setParentPhone(initialRecord.parent_phone || "");
			setCurrentAnswers(initialRecord.answers || {});
			setCurrentQuestionIndex(initialRecord.current_question_index || 0);
			setTimeLeft(initialRecord.time_left ?? defaultTime);
			localStorage.setItem(
				storageKey,
				JSON.stringify({
					recordId: initialRecord.id,
					parentPhone: initialRecord.parent_phone || "",
					answers: initialRecord.answers || {},
					currentQuestionIndex: initialRecord.current_question_index || 0,
					timeLeft: initialRecord.time_left ?? defaultTime,
				}),
			);
			setGameState("taking");
			return;
		}

		setGameState("intro");
	}, [storageKey]);

	// Auto-save to localStorage on answer/question change
	useEffect(() => {
		if (gameState !== "taking" || !recordId || !storageKey) return;
		localStorage.setItem(
			storageKey,
			JSON.stringify({ recordId, parentPhone, answers: currentAnswers, currentQuestionIndex, timeLeft }),
		);
	}, [currentAnswers, currentQuestionIndex, timeLeft, gameState, recordId, parentPhone, storageKey]);

	const handleFinish = useCallback(async () => {
		if (isFinishing.current) return;
		isFinishing.current = true;

		const correct = questions.filter((q) => currentAnswers[q.id] === q.correctAnswer).length;
		const calculatedScore = Math.round((correct / questions.length) * 10 * 10) / 10;

		setScore(calculatedScore);

		if (recordId) {
			await updateQuizRecord(recordId, calculatedScore, Object.keys(currentAnswers).length, currentAnswers);
		}

		if (storageKey) localStorage.removeItem(storageKey);

		setGameState("result");
	}, [currentAnswers, recordId, storageKey, questions, updateQuizRecord]);

	useEffect(() => {
		if (gameState !== "taking") return;
		if (timeLeft === 0) {
			handleFinish();
			return;
		}
		const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearInterval(timer);
	}, [gameState, timeLeft, handleFinish]);

	const handleStart = useCallback(
		async (phone: string) => {
			setParentPhone(phone);

			const { data, error } = await createQuizRecord(
				userId,
				userEmail,
				phone,
				slug,
				questions.length,
				defaultTime,
			);

			if (error || !data) {
				console.error("Error creating quiz result:", error);
				return;
			}

			setRecordId(data.id);
			setTimeLeft(defaultTime);
			setCurrentAnswers({});
			setCurrentQuestionIndex(0);
			isFinishing.current = false;

			localStorage.setItem(
				storageKey,
				JSON.stringify({
					recordId: data.id,
					parentPhone: phone,
					answers: {},
					currentQuestionIndex: 0,
					timeLeft: defaultTime,
				}),
			);

			setGameState("taking");
		},
		[userId, userEmail, storageKey, createQuizRecord, slug, questions.length, defaultTime],
	);

	const handleAnswerSelect = useCallback(
		(qid: number, aid: number) => setCurrentAnswers((prev) => ({ ...prev, [qid]: aid })),
		[],
	);
	const handlePrev = useCallback(() => setCurrentQuestionIndex((prev) => prev - 1), []);
	const handleNext = useCallback(() => setCurrentQuestionIndex((prev) => prev + 1), []);
	const handleRetake = useCallback(() => router.push("/kiem-tra-truc-tuyen"), [router]);
	const handleReview = useCallback(() => {
		setGameState("review");
		setCurrentQuestionIndex(0);
	}, []);

	if (gameState === "loading") {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#ff9f43]">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#ff9f43] p-4 md:p-8">
			{/* Background Doodles */}
			<div className="pointer-events-none absolute inset-0 opacity-10">
				<div className="animate-spin-slow absolute top-20 left-20 h-40 w-40 rounded-full border-4 border-dashed border-white" />
				<div className="absolute right-20 bottom-40 h-60 w-60 rounded-[3rem] border-8 border-dashed border-white" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black tracking-tighter text-white uppercase select-none">
					STEM
				</div>
			</div>

			{/* Header */}
			<div className="relative z-20 mx-auto mb-6 flex max-w-7xl flex-col items-center gap-3 md:mb-12 md:gap-4">
				<div className="rounded-full bg-white px-5 py-1 shadow-lg md:px-8 md:py-1.5">
					<span className="text-sm font-black tracking-widest text-slate-800 uppercase md:text-xl">
						StemKey
					</span>
				</div>

				<h1 className="px-4 text-center text-xl font-black text-white uppercase drop-shadow-lg md:text-4xl lg:text-5xl">
					{quizSet.title} – {quizSet.ageGroup}
				</h1>

				<div className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-6">
					{gameState === "taking" && (
						<>
							<div className="flex items-center gap-2 rounded-xl border-b-2 border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-sm md:gap-3 md:border-b-4 md:p-4">
								<div className="text-[8px] font-extrabold text-slate-400 uppercase md:text-xs">
									Tiến độ
								</div>
								<div className="text-sm font-black text-slate-800 md:text-2xl">
									{Object.keys(currentAnswers).length}/{questions.length}
								</div>
							</div>
							<div className="relative flex items-center gap-2 rounded-xl border-b-2 border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-sm md:gap-3 md:border-b-4 md:p-4">
								<div className="text-[8px] font-extrabold text-slate-400 uppercase md:text-xs">
									Thời gian
								</div>
								<div className="font-mono text-sm font-black text-slate-800 md:text-2xl">
									{formatTime(timeLeft)}
								</div>
								<div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-400 shadow-lg md:-top-4 md:-right-4 md:h-12 md:w-12 md:border-4">
									<Clock size={12} className="text-white md:hidden" />
									<Clock size={24} className="hidden text-white md:block" />
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			{/* Main Content Area */}
			<div className="relative z-20">
				{gameState === "intro" && (
					<QuizIntro
						questionCount={questions.length}
						timeLimit={defaultTime / 60}
						onStart={handleStart}
					/>
				)}
				{gameState === "taking" && (
					<QuizTaking
						questions={questions}
						currentQuestionIndex={currentQuestionIndex}
						currentAnswers={currentAnswers}
						onQuestionSelect={setCurrentQuestionIndex}
						onAnswerSelect={handleAnswerSelect}
						onFinish={handleFinish}
						onPrev={handlePrev}
						onNext={handleNext}
					/>
				)}
				{gameState === "review" && (
					<QuizReview
						questions={questions}
						currentQuestionIndex={currentQuestionIndex}
						currentAnswers={currentAnswers}
						onQuestionSelect={setCurrentQuestionIndex}
						onRetake={handleRetake}
						onPrev={handlePrev}
						onNext={handleNext}
					/>
				)}
				<AnimatePresence>
					{gameState === "result" && (
						<QuizResult
							score={score}
							totalQuestions={questions.length}
							onReview={handleReview}
							onRetake={handleRetake}
						/>
					)}
				</AnimatePresence>
			</div>

			{/* Back Button */}
			<button
				onClick={() => router.back()}
				className="fixed bottom-6 left-4 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-white/30 px-5 py-2.5 text-xs font-black text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/40 active:scale-95 md:bottom-8 md:left-8 md:px-6 md:py-3 md:text-base"
			>
				<ChevronRight size={16} className="rotate-180 md:h-5 md:w-5" /> Quay lại
			</button>
		</div>
	);
}
