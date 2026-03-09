"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IMAGES } from "../../../../../public/statics/images";
import FormRegistration from "@/components/pages/shared/form-registration";

export default function RegistrationPage() {
	return (
		<div className="">
			<section className="relative h-[250px] overflow-hidden">
				{/* Background Gradient - Matching the image's soft pastel feel */}
				<div className="absolute inset-0 bg-[linear-gradient(280.15deg,#1999D3_15.09%,#19B24B_93.34%)]" />
				<div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
					<div className="text-center text-white lg:max-w-2xl lg:text-left">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="mb-4 text-3xl leading-tight font-semibold tracking-tight lg:text-4xl"
						>
							CÁC KHÓA HỌC TẠI STEMKey
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 }}
							className="text-base font-normal"
						>
							Cơ hội nhận học bổng lên tới 40% và các phần quà hấp dẫn khác đang chờ bạn
						</motion.p>
					</div>

					{/* Banner Image - Happy kids with floating elements */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="relative mt-[25px] hidden h-full w-[550px] lg:block"
					>
						<div className="flex h-[90%] w-full items-end">
							<Image
								src={IMAGES.courser}
								alt="Happy Students"
								className="h-full w-full object-contain object-bottom"
								referrerPolicy="no-referrer"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl">
				<div className="flex flex-col items-center px-4 py-[120px] lg:flex-row">
					<div className="w-1/2">
						<Image src={IMAGES.registration} alt="registration" />
					</div>
					<FormRegistration />
				</div>
			</section>
		</div>
	);
}
