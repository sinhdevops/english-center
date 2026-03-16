"use client";

import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { logout as logoutAction } from "@/app/auth/login/actions";
import { supabase } from "@/lib/supabase-client";
import React from "react";

interface LogoutButtonProps {
	className?: string;
	iconSize?: number;
	children?: React.ReactNode;
	onAfterLogout?: () => void;
	showIcon?: boolean;
}

export function LogoutButton({
	className = "flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600",
	iconSize = 18,
	children,
	onAfterLogout,
	showIcon = true,
}: LogoutButtonProps) {
	const { logout } = useAuthStore();
	const [isPending, startTransition] = React.useTransition();

	const handleLogout = () => {
		if (isPending) return;

		startTransition(async () => {
			try {
				await supabase.auth.signOut();
				logout();
				const res = await logoutAction();
				if (res?.error) {
					toast.error(res.error);
				} else {
					toast.success("Đã đăng xuất thành công");
					onAfterLogout?.();
				}
			} catch (error: any) {
				if (error?.message?.includes("NEXT_REDIRECT")) return;
				toast.error("Có lỗi xảy ra khi đăng xuất");
			}
		});
	};

	return (
		<button onClick={handleLogout} disabled={isPending} className={className}>
			{showIcon && <LogOut size={iconSize} />}
			{children || (isPending ? "Đang đăng xuất..." : "Đăng xuất")}
		</button>
	);
}
