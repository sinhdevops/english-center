"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPageContent() {
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState("");
	const router = useRouter();
	const supabase = createClient();

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password.length < 6) {
			toast.error("Mật khẩu phải có ít nhất 6 ký tự");
			return;
		}
		setIsLoading(true);
		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			toast.success("Mật khẩu đã được cập nhật thành công!");
			router.push("/dang-nhap");
		} catch (error: any) {
			toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-[80vh] items-center justify-center  px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md rounded-3xl bg-white p-8 lg:p-10"
			>
				<div className="mb-10 text-center">
					<h2 className="mb-2 text-3xl font-bold text-slate-900">Cập nhật mật khẩu</h2>
					<p className="text-slate-500">Nhập mật khẩu mới cho tài khoản của bạn</p>
				</div>

				<form onSubmit={handleUpdate} className="space-y-6">
					<div className="space-y-2">
						<label className="ml-1 text-sm font-semibold text-slate-700">Mật khẩu mới</label>
						<div className="relative">
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-200  py-3 pr-4 pl-12 transition-all focus:ring-2 focus:outline-none"
								required
							/>
							<Lock size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
						</div>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold disabled:opacity-70"
					>
						{isLoading ? <Loader2 className="animate-spin" size={20} /> : "Cập nhật mật khẩu"}
						{!isLoading && <ArrowRight size={20} />}
					</Button>
				</form>
			</motion.div>
		</div>
	);
}
