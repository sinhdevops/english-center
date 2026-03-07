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
		className="relative mx-auto max-w-4xl overflow-hidden rounded-4xl bg-white p-6 shadow-2xl md:rounded-[3rem] md:p-12"
	>
		<div className="relative z-10 space-y-6 text-center md:space-y-8">
			<h2 className="text-stem-red text-2xl font-black tracking-tight uppercase md:text-3xl">
				Thông tin bài luyện tập
			</h2>
			<p className="mx-auto max-w-lg text-xs text-slate-500 md:text-sm">
				<span className="text-stem-red font-bold">Bé lưu ý:</span> Hãy đọc kỹ câu hỏi và chọn đáp án đúng nhất.
				Chúc bé làm bài tốt!
			</p>

			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-8">
				<div className="flex items-center justify-center gap-3 text-lg font-bold text-slate-700 md:gap-4 md:text-xl">
					<Star className="h-5 w-5 fill-yellow-400 text-yellow-400 md:h-6 md:w-6" />
					<span>
						Số câu hỏi:{" "}
						<span className="ml-1 text-2xl font-black md:ml-2 md:text-3xl">{questionCount}</span>
					</span>
				</div>
				<div className="flex items-center justify-center gap-3 text-lg font-bold text-slate-700 md:gap-4 md:text-xl">
					<Star className="h-5 w-5 fill-yellow-400 text-yellow-400 md:h-6 md:w-6" />
					<span>
						Thời gian:{" "}
						<span className="ml-1 text-2xl font-black md:ml-2 md:text-3xl">{timeLimit} phút</span>
					</span>
				</div>
			</div>

			<button
				onClick={onStart}
				className="bg-stem-blue shadow-stem-blue/20 mx-auto flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-black text-white shadow-xl transition-all hover:shadow-2xl active:scale-95 md:px-16 md:py-5 md:text-2xl"
			>
				<div className="h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
				Bắt đầu làm bài
				<div className="h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
			</button>
		</div>
	</motion.div>
);
