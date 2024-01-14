export const metadata = {
	title: "Verify your email",
}
import Link from "next/link";
import {
	ChevronLeftIcon
} from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
	return (
		<main
			className="bg-primary-950 h-screen w-screen z-50"
		>
			<div
				className="absolute top-6 left-6 bg-primary-950"
			>
				<Button
					asChild
					variant="ghost"
					className="rounded-full"
				>
					<Link
						href="/"
						className="text-primary font-semibold transition duration-200 ease-in-out flex flex-row justify-start items-center text-sm px-3 py-2 rounded-full"
					>
						<ChevronLeftIcon
							className="inline-block size-4 mr-1"
						/>
						Home
					</Link>
				</Button>
			</div>

			<div
				className="h-full w-full flex mx-auto max-w-md flex-col justify-center items-center"
			>
				<div
					className="text-left mb-8 w-full"
				>
					<h1
						className="text-primary text-xl font-semibold mb-2"
					>
						We’ve sent you an email with a link.
					</h1>
					<p
						className="text-primary-200 text-base mb-4"
					>
						Click it, and you’ll be ready to go.
					</p>
					<Link
						href="/"
						className="font-semibold transition duration-200 ease-in-out flex flex-row justify-start items-center text-sm"
					>
						Head back home
					</Link>
				</div>
			</div>
		</main>
	)
}