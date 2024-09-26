"use server";

import { cookies } from "next/headers";

export default async function logout() {
	cookies().set("access_token", "");

	return {
		success: true,
	};
}
