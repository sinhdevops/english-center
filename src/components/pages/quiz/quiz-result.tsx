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
			className="rounded-5xl relative w-full max-w-2xl space-y-8 bg-white p-8 text-center shadow-2xl md:p-12"
		>
			<div className="space-y-2">
				<h2 className="text-stem-red text-3xl leading-tight font-black uppercase md:text-4xl">Chúc mừng bạn</h2>
				<h2 className="text-stem-red text-3xl leading-tight font-black uppercase md:text-4xl">
					Đã hoàn thành bài test
				</h2>
			</div>

			<div className="relative overflow-hidden rounded-4xl border-2 border-yellow-100 bg-[#fff9e6] p-6 md:p-10">
				<div className="relative z-10 space-y-4">
					<p className="font-bold text-slate-500">Số câu đúng / Tổng số câu:</p>
					<div className="text-5xl font-black text-slate-800 md:text-6xl">
						{score}/{totalQuestions} câu
					</div>
					<div className="text-lg font-bold text-slate-600 md:text-xl">
						Điểm: <span className="text-stem-red text-2xl font-black md:text-3xl">{score * 2}</span>
					</div>
				</div>
				<div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
			</div>

			<p className="font-bold text-slate-400">Ngày làm bài: {new Date().toLocaleDateString("vi-VN")}</p>

			<div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
				<button
					onClick={onReview}
					className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#00a699] py-4 text-lg font-black text-white shadow-lg shadow-[#00a699]/20 transition-transform hover:scale-105 md:py-5"
				>
					<Eye size={24} /> Xem đáp án
				</button>
				<button
					onClick={onRetake}
					className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-lg font-black text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-105 md:py-5"
				>
					<RotateCcw size={24} /> Làm lại
				</button>
			</div>
		</motion.div>
	</div>
);
