import type { Metadata } from "next";
import PageContent from "./_page-content";

export const metadata: Metadata = {
	title: "Cập nhật mật khẩu | STEMKey",
	description: "Cập nhật mật khẩu mới cho tài khoản STEMKey của bạn.",
};

export default function UpdatePasswordPage() {
	return <PageContent />;
}
