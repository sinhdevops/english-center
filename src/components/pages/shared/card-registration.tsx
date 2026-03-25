"use client";

import { motion } from"motion/react";
import { toast } from"sonner";
import { FormProvider, useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import * as z from"zod";
import { registrationSchema } from"@/lib/validations/admin";
import { Loader2, Send } from"lucide-react";
import { Button } from"@/components/ui/button";
import { BrandsAndPartners } from"@/lib/types";
import { InputValidation } from"@/components/ui/input";
import { SelectValidation } from"@/components/ui/select";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const CardRegistration = ({
	branches = [],
	courses = [],
}: {
	branches: BrandsAndPartners[];
	courses: BrandsAndPartners[];
}) => {
	const methods = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			parentName:"",
			childName:"",
			phone:"",
			email:"",
			childClass:"",
			course:"",
			branch:"",
		},
	});

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data: RegistrationFormValues) => {
		try {
			const response = await fetch("/api/registrations", {
				method:"POST",
				headers: {"Content-Type":"application/json" },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error ||"Lỗi khi gửi thông tin");
			}

			toast.success("Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm.");
			reset();
		} catch (error: any) {
			console.error("Error submitting registration:", error);
			toast.error(error.message ||"Lỗi khi gửi thông tin đăng ký. Vui lòng thử lại.");
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-[2.5rem] border border-slate-100 bg-white p-8 lg:p-12"
		>
			<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<h2 className="text-2xl font-black text-slate-900 lg:text-3xl">Đăng ký nhận tư vấn</h2>
			</div>

			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
				>
					<InputValidation name="parentName" placeholder="Nhập họ tên bạn" label="Họ và tên phụ huynh" />
					<InputValidation name="childName" placeholder="Nhập họ tên con" label="Họ và tên con" />
					<InputValidation name="phone" placeholder="Nhập số điện thoại" label="Số điện thoại" />
					<InputValidation name="email" placeholder="Nhập email" label="Email" />
					<InputValidation name="childClass" placeholder="Nhập lớp con học" label="Con học lớp" />
					<SelectValidation
						name="course"
						label="Khóa học"
						placeholder="Nhập khóa học"
						options={courses.map((item) => ({ label: item.name, value: item.name }))}
					/>
					<SelectValidation
						name="branch"
						label="Chi nhánh"
						placeholder="Nhập chi nhánh"
						options={branches.map((item) => ({ label: item.name, value: item.name }))}
					/>
					<div className="flex items-end">
						<Button
							size="md"
							type="submit"
							disabled={isSubmitting}
							className="flex w-full items-center gap-2 rounded-xl"
						>
							{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
							{isSubmitting ?"Đang gửi..." :"Đăng ký tư vấn"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</motion.div>
	);
};

export default CardRegistration;
