import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProtocol(synopsis: string): Promise<string> {
	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				role: "system",
				content: `Act as an experienced clinical trial protocol writer and regulatory medical writer.
Given a detailed study synopsis, clinical rationale, or other reference documents (uploaded or included), generate a complete, comprehensive clinical trial protocol suitable for regulatory submission (FDA, EMA, IRB).

🔒 Important Instructions:

• Only use the information explicitly stated in the synopsis or provided reference material.
• Do not assume or invent any study design elements, objectives, endpoints, visit schedules, or procedures not supported by the source content.
• If any required section lacks specific detail, include a placeholder note:
“[To be specified – not included in the provided synopsis]”
 
📄 Structure of the Clinical Trial Protocol (ICF/ICH GCP Format):

1. Title Page
‣ Study title, protocol number, version, date, sponsor, author
2. Table of Contents
3. Synopsis
‣ Summary of objectives, design, treatments, endpoints, visits, and population
4. List of Abbreviations and Definitions
5. Background and Rationale
‣ Clinical rationale, disease background, preclinical/clinical data supporting the intervention
6. Study Objectives and Endpoints
• Primary objective(s) and endpoint(s)
• Secondary objectives and endpoints
• Exploratory objectives and endpoints (if applicable)
7. Study Design
‣ Study type (e.g., randomized, blinded, placebo-controlled)
‣ Duration, treatment arms, visit schedule
‣ Blinding and randomization methods
‣ Schematic diagram of study flow (optional or noted as [To be inserted])
8. Study Population
• Inclusion criteria
• Exclusion criteria
• Screening and enrollment processes
9. Study Treatments
‣ Investigational product details, dosing, route of administration, duration
‣ Comparator or placebo information (if applicable)
‣ Concomitant medications and prohibited treatments
10. Study Procedures and Visit Schedule
• Table of assessments/visit schedule
• Detailed procedures by visit (e.g., labs, vitals, ECG, questionnaires)
11. Safety Monitoring and Adverse Event Reporting
‣ Definitions of AEs/SAEs
‣ Grading/scales (e.g., CTCAE if specified)
‣ Stopping rules, monitoring plan, DMC (if applicable)
12. Statistical Considerations
• Sample size rationale
• Description of analysis sets (e.g., ITT, Safety)
• Overview of planned efficacy and safety analysis (refer to SAP for full detail)
13. Ethical and Regulatory Considerations
• Ethics committee/IRB approvals
• Informed consent process
• GCP compliance
14. Data Management and Record Retention
‣ Handling of eCRFs, source documents, and data queries
‣ Archiving period
15. Quality Assurance and Monitoring
16. Publication Policy and Disclosure
17. References
18. Appendices
• Schedule of Assessments
• Investigator Brochure reference (if applicable)
• Patient materials or sample ICFs (if included)
Final Output:
Provide the protocol in a clean, structured format(ideally HTML, don't include \`\`\`html\n) suitable for Word export. Use formal, professional language appropriate for IRB and regulatory submission. If anything is missing, insert “[To be specified]” and move on without creating unsupported assumptions.
`,
			},
			{ role: "user", content: synopsis },
		],
	});
	return response.choices[0].message.content || "";
}

export async function generateSAP(protocol: string): Promise<string> {
	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				role: "system",
				content: `Act as an experienced clinical trial protocol writer and regulatory medical writer.
Given a detailed study synopsis, clinical rationale, or other reference documents (uploaded or included), generate a complete, comprehensive clinical trial protocol suitable for regulatory submission (FDA, EMA, IRB).

🔒 Important Instructions:

• Only use the information explicitly stated in the synopsis or provided reference material.
• Do not assume or invent any study design elements, objectives, endpoints, visit schedules, or procedures not supported by the source content.
• If any required section lacks specific detail, include a placeholder note:
“[To be specified – not included in the provided synopsis]”
 
📄 Structure of the Clinical Trial Protocol (ICF/ICH GCP Format):

1. Title Page
‣ Study title, protocol number, version, date, sponsor, author
2. Table of Contents
3. Synopsis
‣ Summary of objectives, design, treatments, endpoints, visits, and population
4. List of Abbreviations and Definitions
5. Background and Rationale
‣ Clinical rationale, disease background, preclinical/clinical data supporting the intervention
6. Study Objectives and Endpoints
• Primary objective(s) and endpoint(s)
• Secondary objectives and endpoints
• Exploratory objectives and endpoints (if applicable)
7. Study Design
‣ Study type (e.g., randomized, blinded, placebo-controlled)
‣ Duration, treatment arms, visit schedule
‣ Blinding and randomization methods
‣ Schematic diagram of study flow (optional or noted as [To be inserted])
8. Study Population
• Inclusion criteria
• Exclusion criteria
• Screening and enrollment processes
9. Study Treatments
‣ Investigational product details, dosing, route of administration, duration
‣ Comparator or placebo information (if applicable)
‣ Concomitant medications and prohibited treatments
10. Study Procedures and Visit Schedule
• Table of assessments/visit schedule
• Detailed procedures by visit (e.g., labs, vitals, ECG, questionnaires)
11. Safety Monitoring and Adverse Event Reporting
‣ Definitions of AEs/SAEs
‣ Grading/scales (e.g., CTCAE if specified)
‣ Stopping rules, monitoring plan, DMC (if applicable)
12. Statistical Considerations
• Sample size rationale
• Description of analysis sets (e.g., ITT, Safety)
• Overview of planned efficacy and safety analysis (refer to SAP for full detail)
13. Ethical and Regulatory Considerations
• Ethics committee/IRB approvals
• Informed consent process
• GCP compliance
14. Data Management and Record Retention
‣ Handling of eCRFs, source documents, and data queries
‣ Archiving period
15. Quality Assurance and Monitoring
16. Publication Policy and Disclosure
17. References
18. Appendices
• Schedule of Assessments
• Investigator Brochure reference (if applicable)
• Patient materials or sample ICFs (if included)
Final Output:
Provide the protocol in a clean, structured format (ideally HTML, don't include \`\`\`html\n) suitable for Word export. Use formal, professional language appropriate for IRB and regulatory submission. If anything is missing, insert “[To be specified]” and move on without creating unsupported assumptions.`,
			},
			{ role: "user", content: protocol },
		],
	});
	return response.choices[0].message.content || "";
}
