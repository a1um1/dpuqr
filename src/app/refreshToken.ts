"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const refreshToken = async () => {
	const { refresh_token } = JSON.parse(
		cookies().get("access_token")?.value || "{}",
	);
	const details = {
		refresh_token: refresh_token,
		client_id: "spa",
		grant_type: "refresh_token",
		scope:
			"openid reg.profile offline_access reg-api report-api dpu.content.api",
	};
	const auth = await fetch("https://regid-slcm.dpu.ac.th/connect/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: Object.entries(details)
			.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
			.join("&"),
	});
	if (!auth.ok) {
		cookies().set("access_token", "");
		return { error: "กรุณา Login ใหม่อีกครั้ง" };
	}
	const response = await auth.json();
	if (response.error || !response.access_token) {
		cookies().set("access_token", "");
		return {
			error: "กรุณา Login ใหม่อีกครั้ง",
		};
	}
	cookies().set(
		"access_token",
		JSON.stringify({
			access_token: response.access_token,
			refresh_token: response.refresh_token,
		}),
	);
	redirect("/");
	return { success: true };
};

export default refreshToken;
