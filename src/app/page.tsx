import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
			<div className="container mx-auto px-4 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-blue-900 mb-4">
						Clinical Trial Document Generator
					</h1>
					<p className="text-gray-600 text-lg max-w-2xl mx-auto">
						Transform your clinical trial documentation with AI-powered protocol
						and SAP generation
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
						<CardHeader>
							<CardTitle className="text-2xl text-blue-800">
								Protocol Generator
							</CardTitle>
							<CardDescription>
								Convert your synopsis into a comprehensive clinical trial
								protocol
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href="/protocol" className="block">
								<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
									Generate Protocol
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
						<CardHeader>
							<CardTitle className="text-2xl text-blue-800">
								SAP Generator
							</CardTitle>
							<CardDescription>
								Create a detailed Statistical Analysis Plan from your protocol
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href="/sap" className="block">
								<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
									Generate SAP
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
