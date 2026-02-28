"use client";

import React from "react";
import { motion } from "framer-motion";

export const FloatingContact: React.FC = () => {
	return (
		<div className="fixed right-6 bottom-8 z-40 flex flex-col items-center gap-4">
			{/* Messenger Button */}
			<motion.a
				href="https://m.me/stemkey"
				target="_blank"
				rel="noopener noreferrer"
				initial={{ opacity: 0, scale: 0.5, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				whileHover={{ scale: 1.1 }}
				className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0084FF] shadow-2xl transition-shadow hover:shadow-blue-500/20"
			>
				<div className="pointer-events-none absolute -left-28 rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
					Chat Messenger
				</div>
				<svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
					<path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.455 5.518 3.735 7.263v3.479l3.299-1.81c.92.255 1.899.394 2.966.394 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.078 12.518l-2.57-2.742-5.015 2.742 5.511-5.855 2.643 2.742 4.942-2.742-5.511 5.855z" />
				</svg>
				<span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
			</motion.a>

			{/* Zalo Button */}
			<motion.a
				href="https://zalo.me/0325610016"
				target="_blank"
				rel="noopener noreferrer"
				initial={{ opacity: 0, scale: 0.5, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				whileHover={{ scale: 1.1 }}
				className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#0068FF] text-white shadow-2xl transition-shadow hover:shadow-blue-600/30"
			>
				<div className="pointer-events-none absolute -left-24 rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
					Chat Zalo
				</div>
				<div className="text-sm font-black tracking-tighter">Zalo</div>
			</motion.a>
		</div>
	);
};
