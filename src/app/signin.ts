"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function genQR({
	username,
	password,
}: {
	username: string;
	password: string;
}) {
	if (!username || !password)
		return { error: "กรุณากรอก Username และ Password" };
	const details = {
		username: `${username}@dpu.ac.th`,
		password: password,
		client_id: "spa",
		grant_type: "password",
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
	const response = await auth.json();
	if (response.error) {
		switch (response.error_description) {
			case "Message.SU00004":
				return { error: "กรุณากรอก Username และ Password" };
			default:
				return { error: "เกิดข้อผิดพลาด" };
		}
	}
	if (!response.access_token)
		return {
			error: "เกิดข้อผิดพลาด",
		};
	cookies().set(
		"access_token",
		JSON.stringify({
			access_token: response.access_token,
			refresh_token: response.refresh_token,
		}),
		{
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
			httpOnly: true,
		},
	);
	redirect("/");
}
