import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "DPU QR",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="contianer mx-auto max-w-lg border-2 mt-12 p-6 rounded-2xl">
					{children}
				</div>
				<p className="mb-12 mt-4 text-center text-sm">
					Not affiliate with DPU
					<br />
					Made with{" "}
					<a href="https://a1um1.github.io" rel="noreferrer" target="_blank">
						🦊 a1um1
					</a>
				</p>
			</body>
		</html>
	);
}
