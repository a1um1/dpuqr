import LoginForm from "@/app/form";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import QRCode from "react-qr-code";
const fetchToken = async (token: string) => {
	const qrFetch = await fetch(
		"https://slcm.dpu.ac.th/api/user/getVirtualCard",
		{
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				lang: "th",
			}),
		},
	);
	if (!qrFetch.ok) return undefined;
	return qrFetch.json();
};

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
	const { access_token, refresh_token } = JSON.parse(
		cookies().get("access_token")?.value || "{}",
	);
	if (!access_token) return <LoginForm />;
	const qrFetch = await fetchToken(access_token);
	if (!qrFetch) return <LoginForm needTokenRefresh />;
	return (
		<>
			<div className="mb-4 text-lg flex justify-between items-center">
				{qrFetch.studentFullName}
				<form action={logout}>
					<Button className="px-4" size="lg" type="submit">
						ออกจากระบบ
					</Button>
				</form>
			</div>
			<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				value={qrFetch.qrEncoded}
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
