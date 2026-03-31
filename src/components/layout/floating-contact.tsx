"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../../public/statics/images";
import { FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import FloatingRegistration from "@/components/common/FloatingRegistration";
import { usePathname } from "next/navigation";

export const FloatingContact: React.FC = () => {
	const [showForm, setShowForm] = useState(true);
	const pathname = usePathname();
	const isContactPage = pathname === "/lien-he";

	return (
		<div className="fixed right-6 bottom-8 z-40 flex flex-col items-center gap-4">
			{/* Messenger Button */}
			<motion.a
				href="https://m.me/61583934994908"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Chat với STEMKey qua Messenger"
				initial={{ opacity: 0, scale: 0.5, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				whileHover={{ scale: 1.1 }}
				className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#B24FDD] via-[#0084FF] to-[#00C6FF] text-white"
			>
				<div className="pointer-events-none absolute -left-28 rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 opacity-0 transition-opacity group-hover:opacity-100">
					Chat Messenger
				</div>
				<FaFacebookMessenger className="h-7 w-7" />
				<span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-purple-400 opacity-20" />
			</motion.a>

			{/* Zalo Button */}
			<motion.a
				href="https://zalo.me/0912551090"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Chat với STEMKey qua Zalo"
				initial={{ opacity: 0, scale: 0.5, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				whileHover={{ scale: 1.1 }}
				className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#0068FF] text-white"
			>
				<div className="pointer-events-none absolute -left-24 rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 opacity-0 transition-opacity group-hover:opacity-100">
					Chat Zalo
				</div>
				<SiZalo className="h-7 w-7" />
			</motion.a>

			{!isContactPage && (
				<>
					{/* Floating mascot — toggle form */}
					<motion.button
						onClick={() => setShowForm((v) => !v)}
						initial={{ opacity: 0, scale: 0.5, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						aria-label="Đăng ký tư vấn"
						className="relative h-14 w-14 overflow-hidden rounded-full shadow-lg"
					>
						<Image src={IMAGES.floating} alt="STEMKey mascot" fill className="object-cover" sizes="56px" />
					</motion.button>

					<FloatingRegistration open={showForm} />
				</>
			)}
		</div>
	);
};
