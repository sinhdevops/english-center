"use client";

import { motion } from "motion/react";
import { CheckCircle2, XCircle, ChevronRight, ArrowRight } from "lucide-react";

interface Question {
	id: number;
	text: string;
	options: string[];
	correct_answer: number;
}

interface QuizReviewProps {
	questions: Question[];
	currentQuestionIndex: number;
	currentAnswers: Record<number, number>;
	onQuestionSelect: (index: number) => void;
	onRetake: () => void;
	onPrev: () => void;
	onNext: () => void;
}

export const QuizReview = ({
	questions,
	currentQuestionIndex,
	currentAnswers,
	onQuestionSelect,
	onRetake,
	onPrev,
	onNext,
}: QuizReviewProps) => {
	const currentQuestion = questions[currentQuestionIndex];

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6 pb-24 md:gap-8 lg:grid lg:grid-cols-12 lg:pb-0">
			{/* Left Panel: Question Grid */}
			<div className="md:rounded-5xl order-2 h-fit rounded-3xl border-4 border-white/50 bg-white p-5 md:p-8 lg:order-1 lg:col-span-4">
				<h3 className="mb-6 text-lg font-black text-slate-800 md:mb-8 md:text-xl">Kết quả chi tiết</h3>

				<div className="grid grid-cols-5 gap-2 sm:grid-cols-10 md:gap-3 lg:grid-cols-5">
					{questions.map((q, idx) => {
						const isCorrect = currentAnswers[q.id] === q.correct_answer;
						const isActive = currentQuestionIndex === idx;

						return (
							<button
								key={q.id}
								onClick={() => onQuestionSelect(idx)}
								className={`flex aspect-square w-full grow cursor-pointer items-center justify-center rounded-lg border-2 text-sm font-black transition-all md:rounded-xl md:text-lg ${
									isActive ? "z-10 scale-110 border-slate-800" : "border-transparent"
								} ${isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
							>
								{idx + 1}
							</button>
						);
					})}
				</div>

				<div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
					<div className="flex flex-row gap-4 lg:flex-col">
						<div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 md:text-sm">
							<div className="h-3 w-3 rounded bg-emerald-500 md:h-4 md:w-4" />
							<span>Câu đúng</span>
						</div>
						<div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 md:text-sm">
							<div className="h-3 w-3 rounded bg-red-500 md:h-4 md:w-4" />
							<span>Câu sai</span>
						</div>
					</div>
				</div>
			</div>

			{/* Right Panel: Review Question */}
			<motion.div
				key={currentQuestionIndex}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="md:rounded-5xl order-1 flex min-h-[400px] flex-col rounded-3xl border-4 border-white/50 bg-white p-6 md:min-h-[500px] md:p-10 lg:order-2 lg:col-span-8"
			>
				<div className="flex-1 text-left">
					<div className="mb-6 flex items-center justify-between md:mb-8">
						<div className="bg-stem-blue inline-block rounded-xl px-6 py-1.5 text-sm font-black text-white uppercase md:text-xl">
							Câu hỏi {currentQuestionIndex + 1}
						</div>
						{currentAnswers[currentQuestion.id] === currentQuestion.correct_answer ? (
							<div className="flex items-center gap-1 text-sm font-black text-emerald-500 md:gap-2 md:text-base">
								<CheckCircle2 size={20} className="md:h-6 md:w-6" /> ĐÚNG
							</div>
						) : (
							<div className="flex items-center gap-1 text-sm font-black text-red-500 md:gap-2 md:text-base">
								<XCircle size={20} className="md:h-6 md:w-6" /> SAI
							</div>
						)}
					</div>

					<div className="space-y-6 md:space-y-8">
						<h3 className="text-xl leading-tight font-black text-slate-800 md:text-3xl">
							{currentQuestion.text}
						</h3>

						<div className="grid grid-cols-1 gap-3 md:gap-4">
							{currentQuestion.options.map((option, optIdx) => {
								const isCorrect = optIdx === currentQuestion.correct_answer;
								const isSelected = currentAnswers[currentQuestion.id] === optIdx;

								return (
									<div
										key={optIdx}
										className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all md:gap-4 md:rounded-2xl md:p-6 ${
											isCorrect
												? "border-emerald-500 bg-emerald-50"
												: isSelected
													? "border-red-500 bg-red-50"
													: "border-transparent bg-slate-50 opacity-80"
										}`}
									>
										<div
											className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 md:h-6 md:w-6 ${
												isSelected ? "border-slate-800 bg-slate-800" : "border-slate-300"
											}`}
										>
											{isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
										</div>
										<span className="flex-1 text-base font-bold text-slate-700 md:text-xl">
											{String.fromCharCode(65 + optIdx)}. {option}
										</span>
										{isCorrect && (
											<CheckCircle2
												className="shrink-0 text-emerald-500 md:h-6 md:w-6"
												size={20}
											/>
										)}
										{isSelected && !isCorrect && (
											<XCircle className="shrink-0 text-red-500 md:h-6 md:w-6" size={20} />
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between pt-8 md:pt-12">
					<button
						disabled={currentQuestionIndex === 0}
						onClick={onPrev}
						className="flex cursor-pointer items-center gap-1 rounded-xl px-4 py-2 text-sm font-black text-slate-400 transition-colors hover:text-slate-600 disabled:opacity-30 md:gap-2 md:px-8 md:py-3 md:text-base"
					>
						<ChevronRight size={18} className="rotate-180 md:h-6 md:w-6" /> Câu trước
					</button>

					<div className="flex gap-2 md:gap-4">
						<button
							onClick={onRetake}
							className="flex cursor-pointer items-center gap-1 rounded-full bg-slate-700 px-4 py-3 text-sm font-black text-white transition-transform hover:scale-105 md:gap-2 md:px-8 md:py-4 md:text-base"
						>
							<ArrowRight size={18} className="md:h-5 md:w-5" /> Xem bài test khác
						</button>
						{currentQuestionIndex < questions.length - 1 && (
							<button
								onClick={onNext}
								className="flex cursor-pointer items-center gap-1 rounded-full bg-slate-800 px-6 py-3 text-sm font-black text-white transition-transform hover:scale-105 md:gap-2 md:px-12 md:py-4 md:text-base"
							>
								Tiếp <ChevronRight size={18} className="md:h-6 md:w-6" />
							</button>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};
