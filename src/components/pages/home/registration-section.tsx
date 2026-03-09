"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
import { home } from "../../../../public/statics/images";
import FormRegistration from "../shared/form-registration";

const RegistrationSection = () => {
	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-xl bg-[#00BA3D] p-4 lg:flex-row lg:gap-20 lg:p-16">
					{/* Left: Content & Image */}
					<div className="z-10 w-full text-white lg:w-1/2">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mb-6 text-2xl font-black tracking-tight lg:text-4xl"
						>
							QUÀ TẶNG HẤP DẪN
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="mb-12 max-w-md font-medium opacity-90 lg:text-xl"
						>
							Cơ hội nhận học bổng lên tới 40% và các phần quà hấp dẫn khác đang chờ bạn
						</motion.p>

						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, type: "spring" }}
							className="relative"
						>
							<Image
								src={home.register}
								alt="Gifts"
								className="h-auto w-full drop-shadow-2xl"
								referrerPolicy="no-referrer"
							/>
						</motion.div>
					</div>

					<FormRegistration />
				</div>
			</div>
		</section>
	);
};

export default React.memo(RegistrationSection);
