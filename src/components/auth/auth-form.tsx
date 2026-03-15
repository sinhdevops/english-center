"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, Phone, UserCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { InputValidation } from "../ui/input";

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

export function AuthForm({ mode }: AuthFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect") || "/";
	const { setUser, setProfile } = useAuthStore();

	const methods = useForm<AuthFormValues>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
			fullName: "",
			phone: "",
			confirmPassword: "",
		},
	});

	const { handleSubmit } = methods;

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
				router.push(redirect);
				router.refresh();
			}
		} catch (error: any) {
			toast.error("Có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};
	const handleGoogleLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
				},
			});
			if (error) throw error;
		} catch (error: any) {
			toast.error("Có lỗi xảy ra khi đăng nhập bằng Google.");
		}
	};

	return (
		<div className="w-full">
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{mode === "register" && (
						<InputValidation
							name="fullName"
							placeholder="Nguyễn Văn A"
							label="Họ và tên"
							icon={UserCheck}
						/>
					)}

					<InputValidation
						name="email"
						placeholder="example@gmail.com"
						label="Email / Gmail"
						icon={Mail}
						type="email"
					/>

					{mode === "register" && (
						<InputValidation
							name="phone"
							type="tel"
							label="Số điện thoại"
							placeholder="0912345678"
							icon={Phone}
						/>
					)}

					<div className="space-y-1">
						<InputValidation
							name="password"
							placeholder="••••••••"
							label="Mật khẩu"
							icon={Lock}
							type="password"
						/>
						<div className="flex items-center justify-end px-1">
							{mode === "login" && (
								<Link
									href="/quen-mat-khau"
									className="text-stem-blue text-xs font-medium hover:underline"
								>
									Quên mật khẩu?
								</Link>
							)}
						</div>
					</div>

					{mode === "register" && (
						<InputValidation
							name="confirmPassword"
							type="password"
							label="Nhập lại mật khẩu"
							placeholder="••••••••"
							icon={UserCheck}
						/>
					)}

					<Button
						type="submit"
						size="md"
						disabled={isLoading}
						className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold disabled:opacity-70"
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
			</FormProvider>

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

			<button
				onClick={handleGoogleLogin}
				disabled={isLoading}
				className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						fill="#4285F4"
					/>
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						fill="#34A853"
					/>
					<path
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
						fill="#FBBC05"
					/>
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						fill="#EA4335"
					/>
				</svg>
				Tiếp tục với Google
			</button>

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
