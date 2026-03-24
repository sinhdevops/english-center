"use client";

import { motion } from "motion/react";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface Question {
	id: number;
	text: string;
	options: string[];
	correctAnswer: number;
}

interface QuizTakingProps {
	questions: Question[];
	currentQuestionIndex: number;
	currentAnswers: Record<number, number>;
	onQuestionSelect: (index: number) => void;
	onAnswerSelect: (questionId: number, answerIndex: number) => void;
	onFinish: () => void;
	onPrev: () => void;
	onNext: () => void;
}

export const QuizTaking = ({
	questions,
	currentQuestionIndex,
	currentAnswers,
	onQuestionSelect,
	onAnswerSelect,
	onFinish,
	onPrev,
	onNext,
}: QuizTakingProps) => {
	const currentQuestion = questions[currentQuestionIndex];

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-4 pb-20 md:gap-8 lg:grid lg:grid-cols-12 lg:pb-0">
			{/* Question Grid */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="md:rounded-5xl order-2 h-fit rounded-3xl border-2 border-white/50 bg-white/90 p-5 shadow-xl backdrop-blur-sm md:border-4 md:p-8 lg:order-1 lg:col-span-4"
			>
				<div className="mb-4 flex items-center justify-between md:mb-6">
					<h3 className="text-base font-black text-slate-800 md:text-xl">Danh sách câu hỏi</h3>
					<div className="text-[10px] font-bold text-slate-400 md:text-sm">
						{Object.keys(currentAnswers).length}/{questions.length}
					</div>
				</div>

				<div className="grid grid-cols-5 gap-2 sm:grid-cols-10 md:gap-3 lg:grid-cols-5">
					{questions.map((q, idx) => {
						const isAnswered = currentAnswers[q.id] !== undefined;
						const isActive = currentQuestionIndex === idx;

						return (
							<button
								key={q.id}
								onClick={() => onQuestionSelect(idx)}
								className={`flex aspect-square w-full grow cursor-pointer items-center justify-center rounded-lg border-2 text-sm font-black transition-all md:rounded-xl md:text-lg ${
									isActive ? "border-stem-blue z-10 scale-110 shadow-lg" : "border-transparent"
								} ${isAnswered ? "bg-stem-green text-white" : "bg-white text-black shadow-sm"}`}
							>
								{idx + 1}
							</button>
						);
					})}
				</div>

				<div className="mt-6 space-y-4 border-t border-slate-100 pt-6 md:mt-8">
					<div className="flex flex-row items-center justify-center gap-4 lg:flex-col lg:items-start lg:gap-3">
						<div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 md:text-sm">
							<div className="bg-stem-green h-3 w-3 rounded md:h-4 md:w-4" />
							<span>Đã làm</span>
						</div>
						<div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 md:text-sm">
							<div className="h-3 w-3 rounded border border-slate-200 bg-white md:h-4 md:w-4" />
							<span>Chưa làm</span>
						</div>
					</div>

					<button
						onClick={onFinish}
						className="bg-stem-blue shadow-stem-blue/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95 md:rounded-2xl md:py-4 md:text-base"
					>
						Nộp bài thi <CheckCircle2 size={18} />
					</button>
				</div>
			</motion.div>

			{/* Right Panel: Current Question */}
			<motion.div
				key={currentQuestionIndex}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="md:rounded-5xl order-1 flex min-h-[350px] flex-col rounded-3xl border-2 border-white/50 bg-[#fdf5e6]/95 p-5 shadow-xl backdrop-blur-sm md:min-h-[500px] md:border-4 md:p-10 lg:order-2 lg:col-span-8"
			>
				<div className="flex-1">
					<div className="bg-stem-blue mb-4 inline-block rounded-lg px-4 py-1 text-xs font-black text-white uppercase md:mb-8 md:rounded-xl md:px-6 md:py-1.5 md:text-xl">
						Câu {currentQuestionIndex + 1}
					</div>

					<div className="space-y-4 md:space-y-8">
						<h3 className="text-lg leading-snug font-black text-slate-800 md:text-3xl">
							{currentQuestion.text}
						</h3>

						<div className="grid grid-cols-1 gap-2 md:gap-4">
							{currentQuestion.options.map((option, optIdx) => (
								<label
									key={optIdx}
									className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition-all md:gap-4 md:rounded-2xl md:p-6 ${
										currentAnswers[currentQuestion.id] === optIdx
											? "border-stem-blue bg-white shadow-md"
											: "border-transparent bg-white/60 hover:bg-white/90"
									}`}
								>
									<input
										type="radio"
										name={`q-${currentQuestion.id}`}
										checked={currentAnswers[currentQuestion.id] === optIdx}
										onChange={() => onAnswerSelect(currentQuestion.id, optIdx)}
										className="accent-stem-blue h-4 w-4 md:h-6 md:w-6"
									/>
									<span className="text-sm font-bold text-slate-700 md:text-xl">
										{String.fromCharCode(65 + optIdx)}. {option}
									</span>
								</label>
							))}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between pt-6 md:pt-12">
					<button
						disabled={currentQuestionIndex === 0}
						onClick={onPrev}
						className="flex cursor-pointer items-center gap-1 rounded-xl px-2 py-2 text-xs font-black text-slate-400 transition-colors hover:text-slate-600 disabled:opacity-30 md:gap-2 md:px-8 md:py-3 md:text-base"
					>
						<ChevronRight size={16} className="rotate-180 md:h-6 md:w-6" /> Trước
					</button>

					{currentQuestionIndex === questions.length - 1 ? (
						<button
							onClick={onFinish}
							className="bg-stem-red shadow-stem-red/30 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-black text-white shadow-xl transition-all active:scale-95 md:gap-3 md:px-12 md:py-4 md:text-xl"
						>
							Nộp bài <CheckCircle2 size={18} className="md:h-6 md:w-6" />
						</button>
					) : (
						<button
							onClick={onNext}
							className="bg-stem-blue shadow-stem-blue/30 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-black text-white shadow-xl transition-all active:scale-95 md:gap-3 md:px-12 md:py-4 md:text-xl"
						>
							Tiếp <ChevronRight size={18} className="md:h-6 md:w-6" />
						</button>
					)}
				</div>
			</motion.div>
		</div>
	);
};
