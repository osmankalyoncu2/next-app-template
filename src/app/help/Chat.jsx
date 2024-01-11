"use client";

import classNames from '@/lib/utils/classNames';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// AI Support
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';

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
			console.log(session.user);
		}
	}, [session]);

	return (
		<div
			className="border-2 border-primary-700 ring-2 ring-primary-900 ring-offset-2 ring-offset-primary-800 rounded-xl relative overflow-hidden"
		>
			<div className="p-4 h-96 overflow-y-auto max-h-96 flex flex-col w-full relative gap-y-2">
				<sub
					className='text-primary-200 text-xs font-medium text-center pb-4'
				>
					Support Bot
					{/*new Date().toLocaleTimeString()*/}
					<br />
					{messages.length} messages
				</sub>
				{messages.length === 0 && (
					<div>
						<div className='text-center'>
							<h4
								className='text-primary-50 text-md font-medium'
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
							className='flex flex-col space-y-4 mt-6'
						>
							{exampleQuestions.map((q) => {
								return (
									<button
										key={q.question}
										className='w-fit mx-auto bg-primary-800 text-primary-100 px-4 py-2 rounded-lg hover:bg-primary-900 transition duration-200 ease-in-out hover:ring-2 hover:ring-primary-800 text-xs'
										onClick={() => handleInputChange({ target: { value: q.question } })}
									>
										{q.question}
									</button>
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
								<img src={"/icon"} alt="AI" className="rounded-full size-8 invert" />
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
									<img src={userImage} alt="User" className="rounded-full size-8" />
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
				className="flex group"
				onSubmit={handleSubmit}
			>
				<input
					id="chat-input"
					type="text"
					placeholder="Type your question here..."
					value={input}
					onChange={handleInputChange}
					className="placeholder-primary-200 flex-1 p-4 border-0 border-t-2 border-primary-700 rounded-b-lg bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-primary-700 focus-visible:border-primary-700 text-sm"
				/>
				<button
					id="chat-submit"
					type='submit'
					className="bg-primary-700 text-primary-100 px-4 py-2 rounded-br-lg hover:bg-primary-800 transition duration-200 ease-in-out border-l-2 border-t-2 border-primary-700 text-sm"
				>
					Ask
				</button>
			</form>
		</div>
	)
}