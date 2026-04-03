"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InputValidation } from "@/components/ui/input";

const schema = z.object({
  parentName: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không quá 11 số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
});

type FormValues = z.infer<typeof schema>;

interface FloatingRegistrationProps {
  open: boolean
}

const FloatingRegistration = ({ open }: FloatingRegistrationProps) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { parentName: "", phone: "" },
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/quick-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Lỗi khi gửi thông tin");
      toast.success("Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.");
      reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Lỗi khi gửi thông tin";
      toast.error(message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed right-22 bottom-6 z-40 w-64 rounded-2xl bg-white p-5 shadow-xl lg:w-72">
      <h3 className="mb-4 text-[18px] font-semibold leading-snug">
        Để lại thông tin đăng ký<br />test năng lực tư duy
      </h3>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          <InputValidation size='sm' name="parentName" placeholder="Nhập họ tên của bạn" />
          <InputValidation size='sm' name="phone" placeholder="Nhập số điện thoại" type="tel" />
          <Button
            type="submit"
            size={'sm'}
            disabled={isSubmitting}
            className=" rounded-xl"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký ngay"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FloatingRegistration;
