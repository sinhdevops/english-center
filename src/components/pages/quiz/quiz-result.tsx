"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";

interface QuizResultProps {
	score: number;
	totalQuestions: number;
	onReview: () => void;
	onRetake: () => void;
}

export const QuizResult = ({ totalQuestions, onRetake }: QuizResultProps) => (
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
			className="md:rounded-5xl relative w-full max-w-2xl space-y-6 rounded-3xl bg-white p-6 text-center md:space-y-8 md:p-12"
		>
			<div className="space-y-1 md:space-y-2">
				<h2 className="text-2xl leading-tight font-black uppercase text-slate-800 md:text-4xl">Chúc mừng bạn</h2>
				<h2 className="text-2xl leading-tight font-black uppercase text-slate-800 md:text-4xl">
					Hoàn thành bài test
				</h2>
			</div>

			<div className="relative overflow-hidden rounded-3xl border-2 border-green-100 bg-green-50 p-6 md:rounded-4xl md:p-10">
				<div className="relative z-10 flex flex-col items-center gap-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 md:h-20 md:w-20">
						<Clock className="h-8 w-8 text-green-600 md:h-10 md:w-10" />
					</div>
					<p className="text-sm font-bold text-slate-600 md:text-base">
						Bài làm của bạn đã được ghi nhận
					</p>
					<p className="text-xs text-slate-400 md:text-sm">
						{totalQuestions} câu hỏi &nbsp;·&nbsp; Ngày làm: {new Date().toLocaleDateString("vi-VN")}
					</p>
				</div>
			</div>

			<div className="space-y-2 rounded-2xl  p-4 md:p-6">
				<p className="text-sm font-bold text-slate-700 md:text-base">
					Trung tâm sẽ chấm điểm và phản hồi kết quả sớm nhất!
				</p>
				<p className="text-xs text-slate-400 md:text-sm">
					Bạn có thể xem kết quả trong mục <span className="font-bold text-slate-600">Trang cá nhân</span> sau khi được chấm.
				</p>
			</div>

			<button
				onClick={onRetake}
				className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-700 py-3.5 text-base font-black text-white transition-all active:scale-95 md:rounded-2xl md:py-5 md:text-lg"
			>
				<ArrowRight size={20} className="md:h-6 md:w-6" /> Xem bài test khác
			</button>
		</motion.div>
	</div>
);
