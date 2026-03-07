"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS, QUIZ_SETTINGS } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { QuizIntro } from "@/components/pages/quiz/quiz-intro";
import { QuizTaking } from "@/components/pages/quiz/quiz-taking";
import { QuizReview } from "@/components/pages/quiz/quiz-review";
import { QuizResult } from "@/components/pages/quiz/quiz-result";

export default function QuizPage({ test = { title: "Bài kiểm tra", grade: "Tổng quan" } }: any) {
	const [gameState, setGameState] = useState<"intro" | "taking" | "result" | "review">("intro");
	const [timeLeft, setTimeLeft] = useState(QUIZ_SETTINGS.DEFAULT_TIME);
	const [currentAnswers, setCurrentAnswers] = useState<Record<number, number>>({});
	const [score, setScore] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const router = useRouter();
	const { user, isLoading } = useAuthStore();

	useEffect(() => {
		if (!isLoading && !user) {
			router.push("/dang-nhap");
		}
	}, [user, isLoading, router]);

	const handleFinish = useCallback(() => {
		let correct = 0;
		QUIZ_QUESTIONS.forEach((q) => {
			if (currentAnswers[q.id] === q.correctAnswer) {
				correct++;
			}
		});
		setScore(correct);
		setGameState("result");
	}, [currentAnswers]);

	useEffect(() => {
		let timer: any;
		if (gameState === "taking" && timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		} else if (gameState === "taking" && timeLeft === 0) {
			handleFinish();
		}
		return () => clearInterval(timer);
	}, [gameState, timeLeft, handleFinish]);

	const formatTime = (seconds: number) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	};

	const handleStart = () => {
		setGameState("taking");
		setTimeLeft(QUIZ_SETTINGS.DEFAULT_TIME);
		setCurrentAnswers({});
		setCurrentQuestionIndex(0);
	};

	const handleRetake = () => {
		setGameState("intro");
	};

	const handleReview = () => {
		setGameState("review");
		setCurrentQuestionIndex(0);
	};

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
			<div className="relative z-20 mx-auto mb-8 flex max-w-7xl flex-col items-center gap-4 md:mb-12">
				<div className="rounded-full bg-white px-8 py-1.5 shadow-lg">
					<span className="text-xl font-black tracking-widest text-slate-800 uppercase">StemKey</span>
				</div>

				<h1 className="px-4 text-center text-2xl font-black text-white uppercase drop-shadow-lg md:text-4xl lg:text-5xl">
					{test.title} - {test.grade}
				</h1>

				<div className="flex w-full flex-wrap items-center justify-center gap-3 md:gap-6">
					{gameState === "taking" && (
						<>
							<div className="flex items-center gap-3 rounded-xl border-b-4 border-slate-200 bg-white p-3 shadow-xl md:p-4">
								<div className="text-[10px] font-bold text-slate-400 uppercase md:text-xs">
									Tiến độ:
								</div>
								<div className="text-lg font-black text-slate-800 md:text-2xl">
									{Object.keys(currentAnswers).length}/{QUIZ_QUESTIONS.length}
								</div>
							</div>
							<div className="relative flex items-center gap-3 rounded-xl border-b-4 border-slate-200 bg-white p-3 shadow-xl md:p-4">
								<div className="text-[10px] font-bold text-slate-400 uppercase md:text-xs">
									Thời gian:
								</div>
								<div className="font-mono text-lg font-black text-slate-800 md:text-2xl">
									{formatTime(timeLeft)}
								</div>
								<div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-yellow-400 shadow-lg md:-top-4 md:-right-4 md:h-12 md:w-12 md:border-4">
									<Clock size={16} className="text-white md:hidden" />
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
						questionCount={QUIZ_QUESTIONS.length}
						timeLimit={QUIZ_SETTINGS.DEFAULT_TIME / 60}
						onStart={handleStart}
					/>
				)}
				{gameState === "taking" && (
					<QuizTaking
						questions={QUIZ_QUESTIONS}
						currentQuestionIndex={currentQuestionIndex}
						currentAnswers={currentAnswers}
						onQuestionSelect={setCurrentQuestionIndex}
						onAnswerSelect={(qid, aid) => setCurrentAnswers((prev) => ({ ...prev, [qid]: aid }))}
						onFinish={handleFinish}
						onPrev={() => setCurrentQuestionIndex((prev) => prev - 1)}
						onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
					/>
				)}
				{gameState === "review" && (
					<QuizReview
						questions={QUIZ_QUESTIONS}
						currentQuestionIndex={currentQuestionIndex}
						currentAnswers={currentAnswers}
						onQuestionSelect={setCurrentQuestionIndex}
						onRetake={handleRetake}
						onPrev={() => setCurrentQuestionIndex((prev) => prev - 1)}
						onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
					/>
				)}
				<AnimatePresence>
					{gameState === "result" && (
						<QuizResult
							score={score}
							totalQuestions={QUIZ_QUESTIONS.length}
							onReview={handleReview}
							onRetake={handleRetake}
						/>
					)}
				</AnimatePresence>
			</div>

			{/* Back Button */}
			<button
				onClick={() => router.back()}
				className="fixed bottom-8 left-4 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-bold text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/40 md:left-8"
			>
				<ChevronRight size={20} className="rotate-180" /> Quay lại
			</button>
		</div>
	);
}
