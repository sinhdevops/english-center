import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface AdminModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	maxWidth?: "max-w-md" | "max-w-lg" | "max-w-xl" | "max-w-2xl" | "max-w-3xl" | "max-w-4xl";
}

export const AdminModal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }: AdminModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className={`relative w-full ${maxWidth} overflow-hidden rounded-2xl bg-white shadow-2xl`}
					>
						<div className="flex items-center justify-between border-b border-slate-100 p-6">
							<h3 className="text-lg font-bold text-slate-900">{title}</h3>
							<button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100">
								<X size={20} />
							</button>
						</div>
						<div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};
