"use client";

import classNames from '@/lib/utils/classNames';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// AI Support
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import {
	Button
} from '@/components/ui/button';
import {
	Input
} from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

const exampleQuestions = [
	{
		question: "How do I get started?",
	},
	{
		question: "What is Make Next App?",
	},
	{
		question: "Is it free?",
	}
];

export default function Chat({

}) {
	const { data: session, status } = useSession();
	const [userInitials, setUserInitials] = useState(null);
	const [userImage, setUserImage] = useState(null);

	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "/api/support",
	});

	const wordVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	};

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (session && session.user) {
			const { name, image } = session.user;
			const initials = name.split(' ').map((n) => n[0]).join('');
			setUserInitials(initials);
			setUserImage(image);
		}
	}, [session]);

	return (
		<Card>
			<CardContent>
				<div className="p-4 h-96 overflow-y-auto max-h-96 flex flex-col w-full relative">
					<sub
						className='text-primary-200 text-xs font-medium text-center'
					>
						Support Bot
						{/*new Date().toLocaleTimeString()*/}
						<br />
						{messages.length} messages
					</sub>
					{messages.length === 0 && (
						<div>
							<div className='text-center my-6'>
								<h4
									className='text-primary text-md font-medium'
								>
									Hey, I’m Nexty! 👋
								</h4>
								<p
									className='text-primary-200 text-sm mt-0.5 max-w-xs mx-auto'
								>
									My job is to help you get the answers you need.
								</p>
							</div>
							<div
								className='flex flex-col space-y-1.5'
							>
								{exampleQuestions.map((q) => {
									return (
										<Button
											key={q.question}
											className='w-fit mx-auto text-xs'
											size="sm"
											variant="outline"
											onClick={() => handleInputChange({ target: { value: q.question } })}
										>
											{q.question}
										</Button>
									)
								})}
							</div>
						</div>
					)}
					{messages.length > 1 && messages.map((m) => (
						<div
							key={m.id}
							className='flex flex-row space-x-2'
						>
							{m.role !== 'user' && (
								<div className="h-full flex items-end">
									<Image
										src={"/icon"}
										alt="AI"
										width={32}
										height={32}
										className="rounded-full size-8 invert"
										unoptimized
									/>
								</div>
							)}
							<div
								className={classNames(
									'rounded-t-3xl py-2 px-3.5 bg-primary-900 w-fit text-sm max-w-xs',
									m.role === 'user' ? 'rounded-bl-3xl ml-auto' : 'rounded-br-3xl'
								)}
							>
								{m.role !== 'user' && m.content.split(' ').map((word, index) => (
									<motion.span
										key={index}
										variants={wordVariants}
										initial="hidden"
										animate="visible"
										transition={{ delay: index * 0.0005 }}
									>
										{word + ' '}
									</motion.span>
								))}
								{m.role === 'user' && m.content}
							</div>
							{m.role === 'user' && (
								<div className="h-full flex items-end">
									{userImage ? (
										<Image
											src={userImage}
											alt="User"
											width={32}
											height={32}
											className="rounded-full size-8"
										/>
									) : (
										<div
											className="size-8 rounded-full bg-primary-900 text-primary-100 flex items-center justify-center text-xs"
										>
											{userInitials}
										</div>
									)}
								</div>
							)}
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
				<form
					id="chat-form"
					className="flex gap-x-1.5"
					onSubmit={handleSubmit}
				>
					<Input
						id="chat-input"
						type="text"
						placeholder="Type your question here..."
						value={input}
						onChange={handleInputChange}
						className="placeholder-primary flex-1 p-4 text-sm"
					/>
					<Button
						id="chat-submit"
						type='submit'
						className="text-sm"
					>
						Ask
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}