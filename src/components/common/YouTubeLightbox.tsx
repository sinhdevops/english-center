"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface YouTubeLightboxProps {
	youtubeId: string;
	title: string;
	onClose: () => void;
}

export function YouTubeLightbox({ youtubeId, title, onClose }: YouTubeLightboxProps) {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-4xl"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
					aria-label="Đóng"
				>
					<X size={18} />
				</button>

				{title && (
					<p className="mb-3 line-clamp-1 text-sm font-semibold text-white/80">{title}</p>
				)}

				<div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
					<iframe
						src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
						title={title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="h-full w-full"
					/>
				</div>
			</div>
		</div>
	);
}
