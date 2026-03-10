"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, Chrome, Phone, UserCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const authSchema = z
	.object({
		email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
		password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
		fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").optional(),
		phone: z.string().min(10, "Số điện thoại không hợp lệ").max(11, "Số điện thoại không hợp lệ").optional(),
		confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu").optional(),
	})
	.refine(
		(data) => {
			if (data.confirmPassword && data.password !== data.confirmPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Mật khẩu xác nhận không khớp",
			path: ["confirmPassword"],
		},
	);

type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
	mode: "login" | "register";
}

const AuthInput = ({ register, name, type, placeholder, icon: Icon, error, label }: any) => (
	<div className="space-y-2">
		<label className="ml-1 text-sm font-semibold text-slate-700">{label}</label>
		<div className="relative">
			<input
				{...register(name)}
				type={type}
				placeholder={placeholder}
				className={`w-full grow border bg-slate-50 py-3 pr-4 pl-12 ${error ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
			/>
			<Icon
				size={18}
				className={`absolute top-1/2 left-4 -translate-y-1/2 ${error ? "text-red-400" : "text-slate-400"}`}
			/>
		</div>
		{error && <p className="ml-1 text-xs text-red-500">{error.message}</p>}
	</div>
);

export function AuthForm({ mode }: AuthFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { setUser, setProfile } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormValues>({
		resolver: zodResolver(authSchema),
	});

	const onSubmit = async (data: AuthFormValues) => {
		setIsLoading(true);
		try {
			if (mode === "register") {
				const { error } = await supabase.auth.signUp({
					email: data.email,
					password: data.password,
					options: {
						data: {
							full_name: data.fullName,
							phone: data.phone,
						},
						emailRedirectTo: `${window.location.origin}/auth/callback`,
					},
				});
				if (error) throw error;
				toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
			} else {
				const { error, data: dataResponse } = await supabase.auth.signInWithPassword({
					email: data.email,
					password: data.password,
				});

				if (error) throw error;

				setUser(dataResponse.user);
				const { data: profileData } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", dataResponse.user.id)
					.single();
				setProfile(profileData);

				toast.success("Đăng nhập thành công!");
				router.push("/");
				router.refresh();
			}
		} catch (error: any) {
			toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			});
			if (error) throw error;
		} catch (error: any) {
			toast.error(error.message || "Có lỗi xảy ra khi đăng nhập bằng Google.");
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{mode === "register" && (
					<AuthInput
						register={register}
						name="fullName"
						type="text"
						label="Họ và tên"
						placeholder="Nguyễn Văn A"
						icon={UserCheck}
						error={errors.fullName}
					/>
				)}

				<AuthInput
					register={register}
					name="email"
					type="email"
					label="Email / Gmail"
					placeholder="example@gmail.com"
					icon={Mail}
					error={errors.email}
				/>

				{mode === "register" && (
					<AuthInput
						register={register}
						name="phone"
						type="tel"
						label="Số điện thoại"
						placeholder="0912345678"
						icon={Phone}
						error={errors.phone}
					/>
				)}

				<div className="space-y-2">
					<div className="flex items-center justify-between px-1">
						<label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
						{mode === "login" && (
							<Link href="/quen-mat-khau" className="text-stem-blue text-xs font-medium hover:underline">
								Quên mật khẩu?
							</Link>
						)}
					</div>
					<div className="relative">
						<input
							{...register("password")}
							type="password"
							placeholder="••••••••"
							className={`w-full grow border bg-slate-50 py-3 pr-4 pl-12 ${errors.password ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
						/>
						<Lock
							size={18}
							className={`absolute top-1/2 left-4 -translate-y-1/2 ${errors.password ? "text-red-400" : "text-slate-400"}`}
						/>
					</div>
					{errors.password && <p className="ml-1 text-xs text-red-500">{errors.password.message}</p>}
				</div>

				{mode === "register" && (
					<AuthInput
						register={register}
						name="confirmPassword"
						type="password"
						label="Nhập lại mật khẩu"
						placeholder="••••••••"
						icon={UserCheck}
						error={errors.confirmPassword}
					/>
				)}

				<Button
					type="submit"
					disabled={isLoading}
					className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold disabled:opacity-70"
				>
					{isLoading ? (
						<Loader2 className="animate-spin" size={20} />
					) : mode === "login" ? (
						"Đăng nhập"
					) : (
						"Đăng ký tài khoản"
					)}
					{!isLoading && <ArrowRight size={20} />}
				</Button>
			</form>

			<div className="relative my-10">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-slate-100"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-4 text-slate-400">
						Hoặc {mode === "login" ? "đăng nhập" : "đăng ký"} bằng
					</span>
				</div>
			</div>

			{/* <button
				onClick={handleGoogleLogin}
				disabled={isLoading}
				className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
			>
				<Chrome size={20} className="text-red-500" />
				Tiếp tục với Google
			</button> */}

			<p className="mt-10 text-center text-sm text-slate-500">
				{mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
				<Link
					href={mode === "login" ? "/dang-ky" : "/dang-nhap"}
					className="text-stem-blue font-bold hover:underline"
				>
					{mode === "login" ? "Đăng ký ngay" : "Đăng nhập ngay"}
				</Link>
			</p>
		</div>
	);
}
