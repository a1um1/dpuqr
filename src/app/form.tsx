"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import genQR from "./qr";

export default function LoginForm() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const handleGen = () => {
		genQR({ username: user, password }).then((res) => {
			if (res?.error) return alert(res.error);
			router.refresh();
		});
	};
	return (
		<>
			<form onSubmit={handleGen}>
				<label>Username (ไม่ต้องใส่ @dpu.ac.th)</label>
				<Input value={user} onChange={(e) => setUser(e.currentTarget.value)} />
				<br />
				<label>Password</label>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<br />
				<Button onClick={handleGen} type="submit" className="w-full" size="lg">
					Login
				</Button>
			</form>
		</>
	);
}
