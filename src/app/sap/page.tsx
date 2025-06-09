"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import SAPDisplay from "@/components/sap-display";

export default function SAPPage() {
	const [protocol, setProtocol] = useState("");
	const [sap, setSAP] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleGenerate = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		try {
			setIsLoading(true);
			const response = await fetch("/api/generate-sap", {
				method: "POST",
				body: formData,
			});
			const { protocol } = await response.json();
			setProtocol(protocol);
		} catch (error) {
			console.error("Error generating protocol:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFileContent = (content: string) => {
		setSAP(content);
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-blue-900">
						Statistical Analysis Plan Generator
					</h1>
					<p className="text-gray-600 mt-2">
						Upload your protocol to generate a comprehensive SAP
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
					<FileUpload onFileContent={handleFileContent} setFile={setFile} />

					{protocol && (
						<div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
							<h2 className="text-xl font-semibold text-blue-800 mb-3">
								Protocol Preview
							</h2>
							<div className="bg-white p-4 rounded-md shadow-inner">
								<div
									className="text-gray-700"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
									dangerouslySetInnerHTML={{ __html: protocol }}
								/>
							</div>
						</div>
					)}

					<Button
						onClick={handleGenerate}
						disabled={!file}
						className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
					>
						Generate SAP
					</Button>

					{sap && <SAPDisplay content={sap} />}
				</div>
			</div>
		</main>
	);
}
