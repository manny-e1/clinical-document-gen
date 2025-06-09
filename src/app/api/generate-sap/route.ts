import { NextResponse } from "next/server";
import { generateSAP } from "@/lib/openai";
import mammoth from "mammoth";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const { value: protocol } = await mammoth.extractRawText({ buffer });

	const sap = await generateSAP(protocol);
	return NextResponse.json({ sap });
}
