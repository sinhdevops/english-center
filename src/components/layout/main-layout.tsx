"use client";

import { useState } from "react";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Navbar } from "@/components/layout/navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<div className="flex min-h-screen flex-col">
			<Header toggleMenu={toggleMenu} />
			<Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			<main className="grow">{children}</main>
			<Footer />
			<FloatingContact />
		</div>
	);
}
