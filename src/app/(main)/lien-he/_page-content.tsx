"use client";

import { motion } from"motion/react";
import { MapPin, Phone, Mail, Clock } from"lucide-react";
import { CONTACT_INFO } from"@/constants";
import FormRegistration from"@/components/pages/shared/form-registration";

const IconMap: Record<string, any> = {
	phone: <Phone className="text-stem-blue"/>,
	email: <Mail className="text-stem-green"/>,
	time: <Clock className="text-orange-500"/>,
};
const PageContent = ({ branches, courses }: { branches: any; courses: any }) => {
	return (
		<div className="min-h-screen bg-slate-50 py-12 lg:py-20">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header Section */}
				<div className="mb-16 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-4 text-4xl font-black text-slate-900 uppercase"
					>
						LIÊN HỆ VỚI CHÚNG TÔI
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="mx-auto max-w-2xl text-slate-600"
					>
						Ba mẹ có bất kỳ thắc mắc nào về chương trình học hoặc cần tư vấn lộ trình học tập cho con, đừng
						ngần ngại để lại thông tin nhé!
					</motion.p>
				</div>

				{/* Contact Info Cards */}
				<div className="mb-16 grid grid-cols-1 justify-center gap-8 md:grid-cols-3">
					{CONTACT_INFO.map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="rounded-xl border border-slate-100 bg-white p-8 text-center "
						>
							<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
								{IconMap[item.type]}
							</div>
							<h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
							<p className="mb-1 text-xl font-black text-slate-800">{item.detail}</p>
							<p className="text-sm text-slate-400">{item.sub}</p>
						</motion.div>
					))}
				</div>

				{/* Form & Map Section */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="overflow-hidden rounded-xl border border-slate-100 bg-white"
				>
					<div className="flex flex-col lg:flex-row">
						{/* Form Side */}
						<FormRegistration courses={courses || []} branches={branches || []} />

						{/* Map Side */}
						<div className="relative min-h-[400px] w-full lg:w-1/2">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.846513689445!2d105.7112345!3d21.0007654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134539665555555%3A0x5555555555555555!2zTmFtIEFuIEtow6FuaCwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1709100000000!5m2!1svi!2s"
								className="absolute inset-0 h-full w-full border-0"
								allowFullScreen={true}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>

							{/* Overlay info */}
							<div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/20 bg-white/90 p-6 backdrop-blur-sm">
								<div className="flex items-start gap-3">
									<div className="bg-stem-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
										<MapPin size={20} />
									</div>
									<div className="text-left">
										<h4 className="font-bold text-slate-900">STEMKey Nam An Khánh</h4>
										<p className="text-sm text-slate-600">
											Khu đô thị Nam An Khánh, Hoài Đức, Hà Nội
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default PageContent;
