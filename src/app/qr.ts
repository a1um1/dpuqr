"use server";

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
	const formBody = [];
	for (const property in details) {
		const encodedKey = encodeURIComponent(property);
		const encodedValue = encodeURIComponent(
			details[property as keyof typeof details],
		);
		formBody.push(`${encodedKey}=${encodedValue}`);
	}
	const auth = await fetch("https://regid-slcm.dpu.ac.th/connect/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formBody.join("&"),
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
	const qrFetch = await fetch(
		"https://slcm.dpu.ac.th/api/user/getVirtualCard",
		{
			method: "POST",
			headers: {
				authorization: `Bearer ${response.access_token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				lang: "th",
			}),
		},
	);

	const res = await qrFetch.json();
	if (!res.qrEncoded)
		return {
			error: "เกิดข้อผิดพลาด",
		};
	return {
		qr: res.qrEncoded,
	};
}
