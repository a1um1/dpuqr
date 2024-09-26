import LoginForm from "@/app/form";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import QRCode from "react-qr-code";
export default async function Home() {
	const logout = async () => {
		"use server";
		cookies().set("access_token", "");
		redirect("/");
	};
	const refresh = async () => {
		"use server";
		redirect("/");
	};
	const access_token = JSON.parse(
		cookies().get("access_token")?.value || "{}",
	).access_token;
	if (!access_token) return <LoginForm />;
	const qrFetch = await fetch(
		"https://slcm.dpu.ac.th/api/user/getVirtualCard",
		{
			method: "POST",
			headers: {
				authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				lang: "th",
			}),
		},
	);

	const res = await qrFetch.json();
	if (!res.qrEncoded) return <LoginForm />;
	return (
		<>
			<div className="mb-4 text-lg flex justify-between items-center">
				{res.studentFullName}
				<form action={logout}>
					<Button className="px-4" size="lg" type="submit">
						ออกจากระบบ
					</Button>
				</form>
			</div>
			<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				value={res.qrEncoded}
				viewBox="0 0 256 256"
			/>
			<form action={refresh}>
				<Button className="w-full mt-5" size="lg" type="submit">
					รีเฟรช QR
				</Button>
			</form>
		</>
	);
}
