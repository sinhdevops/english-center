"use client";

import React from "react";
import Image from "next/image";
import { IMAGES } from "../../../public/statics/images";

interface HeaderPageProps {
	title: string;
}

export const HeaderPage: React.FC<HeaderPageProps> = ({ title }) => {
	return (
		<section className="relative aspect-[1440/260] w-full overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image src={IMAGES.headerPage} alt={title} fill className="object-cover" priority />
			</div>

			{/* Content Overlay */}
			<div className="relative z-10 flex h-full items-center">
				<div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-20">
					<div className="max-w-[80%] md:max-w-2xl">
						<h1 className="text-2xl font-bold tracking-tight text-white uppercase drop-shadow-sm lg:text-[46px]">
							{title}
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeaderPage;
