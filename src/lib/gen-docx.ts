import { Document, Packer, Paragraph, TextRun } from "docx";
import { convert } from "html-to-text";

export async function convertHtmlToDocx(html: string): Promise<Buffer> {
	const text = convert(html, { wordwrap: 130 });
	const doc = new Document({
		sections: [
			{
				properties: {},
				children: [
					new Paragraph({
						children: [new TextRun(text)],
					}),
				],
			},
		],
	});

	return await Packer.toBuffer(doc);
}
