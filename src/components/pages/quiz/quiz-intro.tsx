"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Star, Phone } from "lucide-react";

interface QuizIntroProps {
	questionCount: number;
	timeLimit: number;
	onStart: (parentPhone: string) => void;
}

const PHONE_REGEX = /^(0[3|5|7|8|9])[0-9]{8}$/;

export const QuizIntro = ({ questionCount, timeLimit, onStart }: QuizIntroProps) => {
	const [phone, setPhone] = useState("");
	const [touched, setTouched] = useState(false);

	const isValid = PHONE_REGEX.test(phone);
	const showError = touched && !isValid;

	return (
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

				{/* Parent phone input */}
				<div className="mx-auto max-w-sm space-y-2 text-left">
					<label className="block text-sm font-black text-slate-700 md:text-base">
						Số điện thoại phụ huynh <span className="text-stem-red">*</span>
					</label>
					<div className="relative">
						<Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 md:left-4 md:h-5 md:w-5" />
						<input
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value.trim())}
							onBlur={() => setTouched(true)}
							placeholder="VD: 0912345678"
							className={`w-full rounded-xl border-2 py-3 pr-4 pl-9 text-sm font-bold text-slate-800 outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 md:rounded-2xl md:py-4 md:pl-11 md:text-base ${
								showError
									? "border-red-400 bg-red-50"
									: isValid
										? "border-green-400 bg-green-50"
										: "border-slate-200 bg-slate-50 focus:border-slate-400"
							}`}
						/>
					</div>
					{showError && (
						<p className="text-xs font-bold text-red-500">
							Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 03/05/07/08/09)
						</p>
					)}
				</div>

				<button
					onClick={() => {
						setTouched(true);
						if (isValid) onStart(phone);
					}}
					disabled={!isValid}
					className="bg-stem-blue shadow-stem-blue/20 mx-auto flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-black text-white shadow-xl transition-all hover:shadow-2xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:px-16 md:py-5 md:text-2xl"
				>
					<div className="h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
					Bắt đầu làm bài
					<div className="h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
				</button>
			</div>
		</motion.div>
	);
};
