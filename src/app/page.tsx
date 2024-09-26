"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import QRCode from "react-qr-code";
import genQR from "./qr";

export default function Home() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [qr, setQr] = useState("");
	const handleGen = () => {
		genQR({ username: user, password }).then((res) => {
			if (res.error) {
				alert(res.error);
			} else {
				setQr(res.qr);
			}
		});
	};
	return (
		<>
			<div className="contianer mx-auto max-w-lg border-2 my-12 p-6 rounded-2xl">
				{qr ? (
					<div
						style={{
							height: "auto",
							margin: "0 auto",
							width: "100%",
						}}
					>
						<QRCode
							size={256}
							style={{ height: "auto", maxWidth: "100%", width: "100%" }}
							value={qr}
							viewBox="0 0 256 256"
						/>
						<hr className="my-5 border" />
					</div>
				) : null}
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
					Gen QR
				</Button>
			</div>
		</>
	);
}
