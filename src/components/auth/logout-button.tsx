"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { logout as logoutAction } from "@/app/auth/login/actions";

export function LogoutButton() {
	const { logout } = useAuthStore();

	const handleLogout = async () => {
		try {
			await logoutAction();
			logout();
			toast.success("Đã đăng xuất thành công");
		} catch {
			toast.error("Có lỗi xảy ra khi đăng xuất");
		}
	};

	return (
		<Button
			variant="ghost"
			onClick={handleLogout}
			className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
		>
			<LogOut size={18} />
			Đăng xuất
		</Button>
	);
}
