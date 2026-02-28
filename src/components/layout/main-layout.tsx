"use client";

import { useState } from "react";
import { FloatingContact } from "./floating-contact";
import { Footer } from "./footer";
import { Header } from "./header";
import { Navbar } from "./navbar";

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
