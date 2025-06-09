"use client";

import { Button } from "@/components/ui/button";
import { convertHtmlToDocx } from "@/lib/gen-docx";

export default function SAPDisplay({ content }: { content: string }) {
	const handleDownload = async () => {
		const buffer = await convertHtmlToDocx(content);
		const blob = new Blob([buffer], {
			type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "sap.docx";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="p-4">
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: content }} />
			<Button onClick={handleDownload}>Download as DOCX</Button>
		</div>
	);
}
