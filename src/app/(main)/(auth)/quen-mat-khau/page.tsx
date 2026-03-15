"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			toast.error("Vui lòng nhập email");
			return;
		}
		setIsLoading(true);
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/update-password`,
			});
			if (error) throw error;
			toast.success("Yêu cầu đã được gửi! Vui lòng kiểm tra email của bạn.");
		} catch (error: any) {
			toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl lg:p-10"
			>
				<div className="mb-10 text-center">
					<h2 className="mb-2 text-3xl font-bold text-slate-900">Quên mật khẩu?</h2>
					<p className="text-slate-500">Nhập email của bạn để nhận liên kết khôi phục mật khẩu</p>
				</div>

				<form onSubmit={handleReset} className="space-y-6">
					<div className="space-y-2">
						<label className="ml-1 text-sm font-semibold text-slate-700">Email / Gmail</label>
						<div className="relative">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="example@gmail.com"
								className="focus:ring-stem-blue/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-12 transition-all focus:ring-2 focus:outline-none"
								required
							/>
							<Mail size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
						</div>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold disabled:opacity-70"
					>
						{isLoading ? <Loader2 className="animate-spin" size={20} /> : "Gửi yêu cầu"}
						{!isLoading && <ArrowRight size={20} />}
					</Button>
				</form>

				<p className="mt-10 text-center text-sm text-slate-500">
					Quay lại{" "}
					<Link href="/dang-nhap" className="text-stem-blue font-bold hover:underline">
						Đăng nhập
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
