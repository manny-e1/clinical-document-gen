import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export function DisplayMarkdown({
	content,
	clsName,
}: { content?: string; clsName?: string }) {
	return (
		<ReactMarkdown
			// className={clsName}
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					return match ? (
						//@ts-ignore
						<SyntaxHighlighter
							//@ts-ignore
							style={darcula}
							language={match[1]}
							PreTag="div"
							{...props}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
				h1: ({ node, ...props }) => (
					<h1
						className="text-3xl font-bold text-gray-900 dark:text-gray-100"
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200"
						{...props}
					/>
				),
				h3: ({ node, ...props }) => (
					<h3
						className="text-xl font-medium text-gray-700 dark:text-gray-300"
						{...props}
					/>
				),
				p: ({ node, ...props }) => (
					<p className="text-gray-600 dark:text-gray-400" {...props} />
				),
				ul: ({ node, ...props }) => (
					<ul
						className="list-disc list-inside text-gray-600 dark:text-gray-400"
						{...props}
					/>
				),
				ol: ({ node, ...props }) => (
					<ol
						className="list-decimal list-inside text-gray-600 dark:text-gray-400"
						{...props}
					/>
				),
				li: ({ node, ...props }) => <li className="" {...props} />,
				a: ({ node, ...props }) => (
					<a
						className="text-blue-600 hover:underline dark:text-blue-400"
						{...props}
					/>
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400"
						{...props}
					/>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
