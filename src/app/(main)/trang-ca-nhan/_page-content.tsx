"use client";

import { motion } from"motion/react";
import {
	ClipboardList,
	Calendar,
	Star,
	LogOut,
	User,
	CheckCircle2,
	TrendingUp,
	Award,
	BookOpen,
	ChevronRight,
} from"lucide-react";
import { useAuthStore } from"@/store/useAuthStore";
import { LogoutButton } from"@/components/auth/logout-button";
import type { QuizResult } from"@/lib/types";
import Link from"next/link";

interface ProfilePageContentProps {
	quizResults: QuizResult[];
}

export default function ProfilePageContent({ quizResults }: ProfilePageContentProps) {
	const { user, profile } = useAuthStore();

	const avatarLetter = profile?.full_name?.charAt(0) || user?.email?.charAt(0) ||"U";
	const displayName = profile?.full_name ||"Thành viên";
	const memberSince = user
		? new Date(user.created_at).toLocaleDateString("vi-VN", { year:"numeric", month:"long" })
		:"";

	const avgScore =
		quizResults.length > 0
			? (quizResults.reduce((sum, r) => sum + (r.score ?? 0), 0) / quizResults.length).toFixed(1)
			: null;

	const bestScore = quizResults.length > 0 ? Math.max(...quizResults.map((r) => r.score ?? 0)) : null;

	const getScoreBg = (score: number | null) => {
		if (!score) return"from-slate-400 to-slate-500";
		if (score >= 8) return"from-emerald-400 to-emerald-600";
		if (score >= 5) return"from-amber-400 to-orange-500";
		return"from-red-400 to-red-600";
	};

	const getScoreLabel = (score: number | null) => {
		if (!score) return"Chưa có";
		if (score >= 9) return"Xuất sắc";
		if (score >= 8) return"Giỏi";
		if (score >= 6.5) return"Khá";
		if (score >= 5) return"Trung bình";
		return"Cần cố gắng";
	};

	return (
		<div className="min-h-screen bg-[#f5f6fa]">
			{/* ── HERO ── */}
			<div className="relative overflow-hidden bg-[#ED1C24]">
				{/* decorative blobs */}
				<div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
				<div className="absolute -right-16 -bottom-10 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
				<div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

				{/* dot grid */}
				<div className="absolute top-6 right-8 grid grid-cols-6 gap-2 opacity-20">
					{[...Array(24)].map((_, i) => (
						<div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
					))}
				</div>

				<div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-36">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left"
					>
						{/* Avatar */}
						<div className="relative shrink-0">
							<div className="absolute inset-0 rounded-full bg-white/30 blur-xl scale-110" />
							<div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/40 bg-white text-5xl font-black text-[#ED1C24] uppercase ring-4 ring-white/20">
								{avatarLetter}
							</div>
							<div className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 ring-2 ring-white">
								<Star size={14} className="fill-white text-white" />
							</div>
						</div>

						{/* Info */}
						<div className="text-white">
							<motion.h1
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 }}
								className="text-3xl font-black tracking-tight lg:text-4xl"
							>
								{displayName}
							</motion.h1>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
								className="mt-1 text-base text-white/70"
							>
								{user?.email}
							</motion.p>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.25 }}
								className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
							>
								<span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90 backdrop-blur-sm">
									<Calendar size={12} /> Thành viên từ {memberSince}
								</span>
								<span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90 backdrop-blur-sm">
									<ClipboardList size={12} /> {quizResults.length} bài đã làm
								</span>
							</motion.div>
						</div>
					</motion.div>
				</div>

				{/* Wave bottom */}
				<div className="absolute right-0 bottom-0 left-0">
					<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
						<path
							d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
							fill="#f5f6fa"
						/>
					</svg>
				</div>
			</div>

			<div className="mx-auto -mt-24 max-w-7xl space-y-6 px-4 pb-20">
				{/* ── STATS CARDS ── */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="grid grid-cols-3 gap-3 sm:gap-5"
				>
					{[
						{
							label:"Bài đã làm",
							value: quizResults.length,
							icon: ClipboardList,
							gradient:"from-[#ED1C24] to-[#ff6b6b]",
							bg:"bg-red-50",
							text:"text-[#ED1C24]",
						},
						{
							label:"Điểm TB",
							value: avgScore ?`${avgScore}` :"—",
							sub: avgScore ?"/10" :"",
							icon: TrendingUp,
							gradient:"from-amber-400 to-orange-500",
							bg:"bg-amber-50",
							text:"text-amber-600",
						},
						{
							label:"Điểm cao nhất",
							value: bestScore ??"—",
							sub: bestScore ?"/10" :"",
							icon: Award,
							gradient:"from-emerald-400 to-teal-500",
							bg:"bg-emerald-50",
							text:"text-emerald-600",
						},
					].map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.25 + i * 0.07 }}
							className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-6"
						>
							<div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${stat.gradient} p-2.5`}>
								<stat.icon size={18} className="text-white" />
							</div>
							<div className="flex items-baseline gap-0.5">
								<span className="text-2xl font-black text-slate-800 sm:text-3xl">{stat.value}</span>
								{stat.sub && <span className="text-sm font-bold text-slate-400">{stat.sub}</span>}
							</div>
							<p className="mt-0.5 text-xs font-semibold text-slate-500">{stat.label}</p>
							{/* decorative circle */}
							<div
								className={`absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10`}
							/>
						</motion.div>
					))}
				</motion.div>

				{/* ── QUIZ HISTORY ── */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35 }}
					className="overflow-hidden rounded-2xl bg-white"
				>
					<div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
						<div className="flex items-center gap-2.5">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ED1C24]/10">
								<BookOpen size={16} className="text-[#ED1C24]" />
							</div>
							<h2 className="text-base font-black text-slate-800">Lịch sử làm bài</h2>
						</div>
						{quizResults.length > 0 && (
							<span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
								{quizResults.length} bài
							</span>
						)}
					</div>

					{quizResults.length === 0 ? (
						<div className="flex flex-col items-center gap-4 py-16">
							<div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
								<ClipboardList size={36} className="text-slate-300" />
							</div>
							<div className="text-center">
								<p className="font-black text-slate-700">Chưa có bài test nào</p>
								<p className="mt-1 text-sm text-slate-400">Hãy thử sức với các bài kiểm tra ngay!</p>
							</div>
							<Link
								href="/kiem-tra-truc-tuyen"
								className="flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-2.5 text-sm font-black text-white transition-all hover: active:scale-95"
							>
								Làm bài ngay <ChevronRight size={14} />
							</Link>
						</div>
					) : (
						<div className="divide-y divide-slate-50">
							{quizResults.map((result, i) => (
								<motion.div
									key={result.id}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 + i * 0.05 }}
									className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/70"
								>
									{/* Score badge */}
									<div
										className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${getScoreBg(result.score)}`}
									>
										<span className="text-lg font-black leading-none text-white">
											{result.score ??"—"}
										</span>
										<span className="text-[9px] font-bold text-white/80">/10</span>
									</div>

									{/* Info */}
									<div className="min-w-0 flex-1">
										<p className="truncate font-bold text-slate-800">Bài test #{result.quiz_slug}</p>
										<div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
											<span className="flex items-center gap-1">
												<CheckCircle2 size={11} className="text-emerald-400" />
												{result.completed_count}/{result.total_questions} câu
											</span>
											{result.completed_at && (
												<span className="flex items-center gap-1">
													<Calendar size={11} />
													{new Date(result.completed_at).toLocaleDateString("vi-VN")}
												</span>
											)}
										</div>
										{/* Progress bar */}
										<div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
											<div
												className={`h-full rounded-full bg-gradient-to-r ${getScoreBg(result.score)} transition-all`}
												style={{ width:`${((result.score ?? 0) / 10) * 100}%` }}
											/>
										</div>
									</div>

									{/* Label */}
									<span
										className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-black sm:block ${
											(result.score ?? 0) >= 8
												?"bg-emerald-50 text-emerald-600"
												: (result.score ?? 0) >= 5
													?"bg-amber-50 text-amber-600"
													:"bg-red-50 text-red-500"
										}`}
									>
										{getScoreLabel(result.score)}
									</span>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>

			
			</div>
		</div>
	);
}
