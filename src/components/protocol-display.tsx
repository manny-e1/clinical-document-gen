"use client";

import { Button } from "@/components/ui/button";
import { convertHtmlToDocx } from "@/lib/gen-docx";

export default function ProtocolDisplay({ content }: { content: string }) {
	const handleDownload = async () => {
		const buffer = await convertHtmlToDocx(content);
		const blob = new Blob([buffer], {
			type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "protocol.docx";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="p-4">
			<div
				className="prose prose-blue max-w-none dark:prose-invert"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			<Button onClick={handleDownload} className="mt-4">
				Download as DOCX
			</Button>
		</div>
	);
}
