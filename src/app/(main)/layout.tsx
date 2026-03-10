import MainLayout from "@/components/layout/main-layout";

export default async function DefaultLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <MainLayout>{children}</MainLayout>;
}
