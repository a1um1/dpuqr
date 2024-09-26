"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
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
			<div className="contianer mx-auto max-w-lg border-2 my-12 p-6 rounded-2xl">
				<label>Username</label>
				<Input value={user} onChange={(e) => setUser(e.currentTarget.value)} />
				<br />
				<label>Password</label>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<br />
				<Button onClick={handleGen} type="button" className="w-full" size="lg">
					Login
				</Button>
			</div>
		</>
	);
}
