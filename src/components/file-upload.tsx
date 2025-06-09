"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import mammoth from "mammoth";

export default function FileUpload({
	onFileContent,
	setFile,
}: {
	onFileContent: (content: string) => void;
	setFile: Dispatch<SetStateAction<File | null>>;
}) {
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (
			selectedFile &&
			selectedFile.type ===
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		) {
			setFile(selectedFile);
			const arrayBuffer = await selectedFile.arrayBuffer();
			try {
				const result = await mammoth.convertToHtml(
					{
						arrayBuffer,
					},
					{
						styleMap: [
							"p[style-name='Heading 1'] => h1",
							"p[style-name='Heading 2'] => h2",
							"p[style-name='Heading 3'] => h3",
							"b => strong",
							"i => em",
							"u => u",
							"p => p",
							"table => table.table",
							"tr => tr",
							"td => td",
						],
					},
				);
				onFileContent(result.value);
				setError(null);
			} catch (err) {
				setError("Error reading DOCX file");
			}
		} else {
			setError("Please upload a valid DOCX file");
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<Input type="file" accept=".docx" onChange={handleFileChange} />
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
}
