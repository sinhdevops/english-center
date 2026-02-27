"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation"; // Từ navigation.ts của bạn
import { ChangeEvent, useTransition } from "react";

export default function LocaleSwitcher() {
	const t = useTranslations("LocaleSwitcher"); // Namespace tùy chọn
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value;

		startTransition(() => {
			router.replace(pathname as any, { locale: nextLocale });
		});
	}

	return (
		<label>
			<p className="sr-only">{t("label") || "Chọn ngôn ngữ"}</p>
			<select
				defaultValue={locale}
				onChange={onSelectChange}
				disabled={isPending}
				className="rounded border bg-transparent px-2 py-1"
			>
				<option value="vi">Tiếng Việt</option>
				<option value="en">English</option>
			</select>
		</label>
	);
}
