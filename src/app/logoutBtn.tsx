"use client";
import { Button } from "@/components/ui/button";
import logout from "./logout";
export default async function LogoutBtn() {
	return (
		<Button className="px-4" size="lg" onClick={() => logout()}>
			ออกจากระบบ
		</Button>
	);
}
