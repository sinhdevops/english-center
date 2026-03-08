"use client";

import { motion } from "framer-motion";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl lg:p-10"
			>
				<div className="mb-10 text-center">
					<h2 className="mb-2 text-3xl font-bold text-slate-900">Chào mừng trở lại!</h2>
					<p className="text-slate-500">Đăng nhập để tiếp tục hành trình cùng STEMKey</p>
				</div>

				<AuthForm mode="login" />
			</motion.div>
		</div>
	);
}
