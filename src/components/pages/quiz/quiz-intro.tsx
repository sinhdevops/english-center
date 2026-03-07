"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

interface QuizIntroProps {
	questionCount: number;
	timeLimit: number;
	onStart: () => void;
}

export const QuizIntro = ({ questionCount, timeLimit, onStart }: QuizIntroProps) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		className="relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] bg-white p-12 shadow-2xl"
	>
		<div className="relative z-10 space-y-8 text-center">
			<h2 className="text-stem-red text-3xl font-black tracking-tight uppercase">Thông tin bài luyện tập</h2>
			<p className="mx-auto max-w-lg text-sm text-slate-500">
				<span className="text-stem-red font-bold">Bé lưu ý:</span> Hãy đọc kỹ câu hỏi và chọn đáp án đúng nhất.
				Chúc bé làm bài tốt!
			</p>

			<div className="flex flex-col gap-6 py-8">
				<div className="flex items-center justify-center gap-4 text-xl font-bold text-slate-700">
					<Star className="fill-yellow-400 text-yellow-400" />
					<span>
						Số câu hỏi: <span className="ml-2 text-3xl font-black">{questionCount}</span>
					</span>
				</div>
				<div className="flex items-center justify-center gap-4 text-xl font-bold text-slate-700">
					<Star className="fill-yellow-400 text-yellow-400" />
					<span>
						Thời gian làm bài: <span className="ml-2 text-3xl font-black">{timeLimit} phút</span>
					</span>
				</div>
			</div>

			<button
				onClick={onStart}
				className="bg-stem-blue shadow-stem-red/30 mx-auto flex cursor-pointer items-center justify-center gap-3 rounded-full px-16 py-5 text-2xl font-black text-white shadow-xl transition-transform hover:scale-105"
			>
				<div className="h-2 w-2 rounded-full bg-white" />
				Bắt đầu làm bài
				<div className="h-2 w-2 rounded-full bg-white" />
			</button>
		</div>
	</motion.div>
);
