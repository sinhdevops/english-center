import Link from "next/link";

export default function LichKhaiGiangPage() {
	return (
		<div className="py-20 text-center">
			<h2 className="text-2xl font-bold text-slate-400">Trang {`"Lịch Khai Giảng"`} đang được phát triển...</h2>
			<Link href={"/"} className="text-stem-blue mt-4 hover:underline">
				Quay lại Trang chủ
			</Link>
		</div>
	);
}
