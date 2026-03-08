export default async function TestLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" suppressHydrationWarning>
			<body className={`bg-white font-sans text-slate-900 antialiased`}>{children}</body>
		</html>
	);
}
