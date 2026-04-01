"use client";

import { useState } from "react";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/navbar";


import { usePathname } from "next/navigation";


export default function MainLayout({ children }: { children: React.ReactNode }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const isAuthPage = pathname === "/dang-nhap" || pathname === "/dang-ky" || pathname === "/quen-mat-khau" || pathname.startsWith("/auth/");

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	if (isAuthPage) {
		return <main className="grow font-montserrat">{children}</main>;
	}

	return (
		<div className="flex min-h-screen flex-col font-montserrat">
			<Header toggleMenu={toggleMenu} />
			<Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			<main className="grow">{children}</main>
			<Footer />
			<FloatingContact />
		</div>
	);
}
