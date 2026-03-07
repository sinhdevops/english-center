"use client";

import { motion } from "motion/react";
import { Eye, RotateCcw } from "lucide-react";

interface QuizResultProps {
	score: number;
	totalQuestions: number;
	onReview: () => void;
	onRetake: () => void;
}

export const QuizResult = ({ score, totalQuestions, onReview, onRetake }: QuizResultProps) => (
	<div className="fixed inset-0 z-100 flex items-center justify-center p-4">
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute inset-0 bg-black/60 backdrop-blur-md"
		/>
		<motion.div
			initial={{ opacity: 0, scale: 0.8, y: 40 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.8, y: 40 }}
			className="md:rounded-5xl relative w-full max-w-2xl space-y-6 rounded-3xl bg-white p-6 text-center shadow-2xl md:space-y-8 md:p-12"
		>
			<div className="space-y-1 md:space-y-2">
				<h2 className="text-stem-red text-2xl leading-tight font-black uppercase md:text-4xl">Chúc mừng bạn</h2>
				<h2 className="text-stem-red text-2xl leading-tight font-black uppercase md:text-4xl">
					Hoàn thành bài test
				</h2>
			</div>

			<div className="relative overflow-hidden rounded-3xl border-2 border-yellow-100 bg-[#fff9e6] p-6 md:rounded-4xl md:p-10">
				<div className="relative z-10 space-y-3 md:space-y-4">
					<p className="text-xs font-bold text-slate-500 md:text-sm">Kết quả của bạn:</p>
					<div className="text-4xl font-black text-slate-800 md:text-6xl">
						{score}/{totalQuestions} <span className="text-xl md:text-2xl">câu</span>
					</div>
					<div className="text-base font-bold text-slate-600 md:text-xl">
						Điểm: <span className="text-stem-red text-xl font-black md:text-3xl">{score * 2}</span>
					</div>
				</div>
				<div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl md:h-40 md:w-40 md:blur-3xl" />
			</div>

			<p className="text-xs font-bold text-slate-400 md:text-sm">
				Ngày làm bài: {new Date().toLocaleDateString("vi-VN")}
			</p>

			<div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row md:gap-4 md:pt-4">
				<button
					onClick={onReview}
					className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#00a699] py-3.5 text-base font-black text-white shadow-lg shadow-[#00a699]/20 transition-all active:scale-95 md:rounded-2xl md:py-5 md:text-lg"
				>
					<Eye size={20} className="md:h-6 md:w-6" /> Xem đáp án
				</button>
				<button
					onClick={onRetake}
					className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/20 transition-all active:scale-95 md:rounded-2xl md:py-5 md:text-lg"
				>
					<RotateCcw size={20} className="md:h-6 md:w-6" /> Làm lại
				</button>
			</div>
		</motion.div>
	</div>
);
