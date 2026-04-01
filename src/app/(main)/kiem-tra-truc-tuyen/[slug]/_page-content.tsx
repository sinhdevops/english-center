"use client";

import { useState } from"react";
import { motion } from"motion/react";
import { ChevronRight, Calendar, ArrowRight, User, Lock, CheckCircle2, Clock, ClipboardList } from"lucide-react";
import { Button } from"@/components/ui/button";
import { Modal } from"@/components/ui/modal";
import { useRouter, useSearchParams } from"next/navigation";
import { Breadcrumb } from"@/components/ui/breadcrumb";
import { useAuthStore } from"@/store/useAuthStore";
import Link from"next/link";

const AGE_GROUP_LABELS: Record<string, string> = {
	"3-4-tuoi": "3-4 tuổi",
	"4-5-tuoi": "4-5 tuổi",
	"5-6-tuoi": "5-6 tuổi",
	"tieu-hoc": "Tiểu học",
};

interface QuizSetPreview {
	id: string;
	title: string;
	age_group: string;
	duration_seconds: number;
	is_active: boolean;
}

interface Props {
	slug: string;
	initialTab?: string;
	quizSets: QuizSetPreview[];
	quizResults: Record<string, { status: string; score: number | null }>;
}

const SidebarItem: React.FC<{ icon: any; title: string; colorClass: string; active?: boolean }> = ({
	icon: Icon,
	title,
	colorClass,
	active,
}) => (
	<div
		className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition-all lg:gap-4 lg:p-3 ${
			active
				?"border-slate-200 bg-white"
				:"border-transparent bg-white hover:border-slate-100 hover:"
		}`}
	>
		<div
			className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:h-12 lg:w-12 ${colorClass} text-slate-700 transition-transform group-hover:scale-110`}
		>
			<Icon size={20} className="lg:hidden" />
			<Icon size={24} className="hidden lg:block" />
		</div>
		<span
			className={`text-xs font-bold lg:text-sm ${active ?"text-stem-blue" :"group-hover:text-stem-blue text-slate-600"}`}
		>
			{title}
		</span>
		<div className="ml-auto opacity-0 transition-opacity lg:group-hover:opacity-100">
			<ChevronRight size={14} className="text-slate-300 lg:size-4" />
		</div>
	</div>
);

export default function PageContent({ initialTab, quizSets, quizResults }: Props) {
	const { user } = useAuthStore();
	const searchParams = useSearchParams();
	const router = useRouter();

	const nhomParam = searchParams.get("nhom") ?? initialTab ?? "";
	const ageGroupLabel = AGE_GROUP_LABELS[nhomParam] ?? quizSets[0]?.age_group ?? "";

	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showDoneModal, setShowDoneModal] = useState(false);
	const [pendingTestId, setPendingTestId] = useState<string | null>(null);

	const handleTestClick = (quizId: string) => {
		if (!user) {
			setPendingTestId(quizId);
			setShowLoginModal(true);
			return;
		}

		if (quizResults[quizId]?.status ==="completed") {
			setShowDoneModal(true);
			return;
		}

		router.push(`/bai-thi/${quizId}`);
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-50 bg-white py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb
						items={[
							{ label:"Test", href:"/kiem-tra-truc-tuyen" },
							{ label: ageGroupLabel, active: true },
						]}
						variant="dark"
					/>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
				<div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
					{/* Main Content */}
					<div className="w-full lg:w-3/4">
						{quizSets.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 py-20 text-center">
								<p className="text-slate-400">Chưa có bài test nào cho nhóm này.</p>
							</div>
						) : (
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
								{quizSets.map((qs) => {
									const result = quizResults[qs.id];
									const isDone = result?.status ==="completed";

									return (
										<motion.div
											key={qs.id}
											whileHover={{ y: -5 }}
											className="group relative cursor-pointer"
											onClick={() => handleTestClick(qs.id)}
										>
											{isDone && (
												<div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
													<CheckCircle2 size={11} /> Đã làm
												</div>
											)}
											<div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 lg:mb-4 lg:aspect-16/10">
												<div className="absolute inset-0 bg-[#a8e0d9]" />
												<div className="absolute inset-2 flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white/90 p-2 text-center lg:inset-4 lg:p-4">
													<div className="text-stem-blue mb-0.5 text-[8px] font-black tracking-widest uppercase lg:mb-1 lg:text-[10px]">
														STEMKey
													</div>
													<div className="mb-0.5 text-[8px] font-bold text-slate-800 lg:mb-1 lg:text-xs">
														{qs.age_group}
													</div>
													<div className="flex items-center gap-1 text-[8px] text-slate-500 lg:gap-2 lg:text-[10px]">
														<span className="flex items-center gap-0.5">
															<Clock size={8} className="lg:size-[9px]" /> {qs.duration_seconds / 60}m
														</span>
													</div>
												</div>
											</div>
											<h3 className="group-hover:text-stem-blue line-clamp-2 text-[11px] leading-snug font-bold text-slate-700 transition-colors lg:text-sm">
												{qs.title} – {qs.age_group}
											</h3>
											{isDone && (
												<p className="mt-1 text-xs text-emerald-600 font-medium">
													Chờ trung tâm trả kết quả
												</p>
											)}
										</motion.div>
									);
								})}
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="w-full space-y-8 lg:w-1/4">
						<div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-5 lg:p-6">
							<h3 className="mb-4 px-1 text-lg font-black text-slate-900 lg:mb-6 lg:px-2 lg:text-xl">
								Nhóm test
							</h3>
							<SidebarItem
								icon={ChevronRight}
								title="Test đánh giá năng lực tư duy"
								colorClass="bg-[#a8e0d9]"
								active
							/>
						</div>

						<div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
							<div className="border-b border-slate-100 bg-slate-50/30 p-5">
								<h3 className="font-bold text-slate-900">Liên kết nhanh</h3>
							</div>
							<div className="divide-y divide-slate-50">
								<Link href="/lich-khai-giang">
									<div className="group flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-slate-50">
										<div className="flex items-center gap-3">
											<Calendar size={18} className="text-slate-400" />
											<span className="text-sm font-medium text-slate-600">Lịch khai giảng</span>
										</div>
										<span className="text-stem-blue flex items-center gap-1 text-xs font-bold">
											Xem chi tiết <ArrowRight size={12} />
										</span>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal: Yêu cầu đăng nhập */}
			<Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Yêu cầu đăng nhập">
				<div className="space-y-6 text-center">
					<div className="text-stem-red mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
						<Lock size={40} />
					</div>
					<div className="space-y-2">
						<h4 className="text-xl font-bold text-slate-900">Bạn chưa đăng nhập</h4>
						<p className="text-sm leading-relaxed text-slate-500">
							Vui lòng đăng nhập tài khoản STEMKey để có thể tham gia làm bài thi và lưu lại kết quả
							học tập của mình.
						</p>
					</div>
					<div className="flex flex-col gap-3 pt-2">
						<Button
							variant="primary"
							className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold"
							onClick={() => {
								setShowLoginModal(false);
								const redirectPath = pendingTestId
									?`/bai-thi/${pendingTestId}`
									: window.location.pathname;
								router.push(`/dang-nhap?redirect=${encodeURIComponent(redirectPath)}`);
							}}
						>
							<User size={18} /> Đăng nhập ngay
						</Button>
						<button
							onClick={() => setShowLoginModal(false)}
							className="py-2 text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
						>
							Để sau
						</button>
					</div>
				</div>
			</Modal>

			{/* Modal: Đã hoàn thành bài test */}
			<Modal isOpen={showDoneModal} onClose={() => setShowDoneModal(false)} title="Thông báo">
				<div className="space-y-6 text-center">
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
						<CheckCircle2 size={40} className="text-emerald-500" />
					</div>
					<div className="space-y-2">
						<h4 className="text-xl font-bold text-slate-900">Bạn đã làm bài này rồi</h4>
						<p className="text-sm text-slate-500">Mỗi bài test chỉ được làm một lần duy nhất.</p>
					</div>
					<button
						onClick={() => setShowDoneModal(false)}
						className="w-full rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200"
					>
						Đóng
					</button>
				</div>
			</Modal>
		</div>
	);
}
