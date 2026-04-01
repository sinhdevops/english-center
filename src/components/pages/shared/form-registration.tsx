"use client";

import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { registrationSchema } from "@/lib/validations/admin";
import { InputValidation } from "@/components/ui/input";
import { SelectValidation } from "@/components/ui/select";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface FormRegistrationProps {
	branches?: { id: string; name: string }[];
	courses?: { id: string; name: string }[];
}

const FormRegistration = ({ branches = [], courses = [] }: FormRegistrationProps) => {
	const methods = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			parentName: "",
			email: "",
			phone: "",
			childName: "",
			childClass: "",
			course: "",
			branch: "",
		},
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = methods;

	const onSubmit = async (data: RegistrationFormValues) => {
		try {
			const response = await fetch("/api/registrations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Lỗi khi gửi thông tin");
			}

			toast.success("Đăng ký giữ chỗ thành công! Chúng tôi sẽ liên hệ lại sớm.");
			reset();
		} catch (error: any) {
			console.error("Error submitting registration:", error);
			toast.error(error.message || "Lỗi khi gửi thông tin đăng ký. Vui lòng thử lại.");
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className="w-full rounded-xl bg-white p-6 pb-20 shadow-sm sm:p-8 md:pb-8 lg:w-1/2 lg:p-12"
		>
			<h3 className="mb-8 flex items-center gap-2 text-2xl font-bold uppercase lg:text-[32px]">
				ĐĂNG KÝ TƯ VẤN
			</h3>

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<InputValidation name="parentName" placeholder="Nhập họ tên của bạn" />

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<InputValidation name="email" placeholder="Nhập email" type="email" />
						<InputValidation name="phone" placeholder="Nhập số điện thoại" type="tel" />
					</div>

					<InputValidation name="childName" placeholder="Nhập họ tên của con" />

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<InputValidation name="childClass" placeholder="Nhập lớp con học" />
						<SelectValidation
							name="course"
							placeholder="Nhập khóa học"
							options={courses.map((item) => ({ label: item.name, value: item.name }))}
						/>
					</div>
					<SelectValidation
						name="branch"
						placeholder="Chọn cơ sở gần bạn"
						options={branches.map((item) => ({ label: item.name, value: item.name }))}
					/>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="mt-6 w-full h-10 md:h-auto md:py-6 rounded-xl text-xs sm:text-base font-semibold lg:h-12 tracking-wider text-white uppercase transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-70"
					>
						{isSubmitting ? "ĐANG XỬ LÝ..." : "GIỮ CHỖ NGAY"}
					</Button>

					<p className="mt-1 text-center font-medium text-slate-600">
						* Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ bạn sớm (trong vòng 24h)
					</p>
				</form>
			</FormProvider>
		</motion.div>
	);
};

export default FormRegistration;
