import { FormEvent, FormEventHandler, useState } from 'react'
import { Button } from './Button'
import { RESPONSE_STATE } from '@/constants/responseState'
import { useAssistant } from '@/hooks/useAssistant'

export default function FormAssistant({
	response,
	handleSubmit,
	inputRef,
}: {
	response: RESPONSE_STATE
	handleSubmit: FormEventHandler<HTMLFormElement>
	inputRef: React.RefObject<HTMLInputElement>
}) {
	const { splitResponse, updateSplitResponse } = useAssistant()
	const [isChecked, setIsChecked] = useState(false)

	const getColoredText = (response: [string, string]) => {
		return [
			...response[0].split('').map((char, index) => {
				return [
					<span key={index} className='text-green-800 text-lg'>
						{char}
					</span>,
				]
			}),
			...response[1]
				.split('')
				.slice(0, 1)
				.map((char, index) => {
					return (
						<span key={index} className='text-red-500 text-lg'>
							{char}
						</span>
					)
				}),
			...response[1]
				.split('')
				.slice(1)
				.map((char, index) => {
					return (
						<span key={index} className='text-lg'>
							{char}
						</span>
					)
				}),
		]
	}

	console.log(splitResponse[0], splitResponse[1])
	console.log(getColoredText(splitResponse))

	const handleAssistantForm = (e: FormEvent<HTMLFormElement>) => {
		setIsChecked(true)
		updateSplitResponse(['', ''])
		handleSubmit(e)
	}

	const handleInput = () => {
		if (!isChecked) return
		setIsChecked(false)
	}

	return (
		<form
			className='flex gap-2 relative max-h-10 h-10 items-center'
			onSubmit={handleAssistantForm}
		>
			<div className='relative h-10 w-80'>
				{/* Texto coloreado */}

				<div
					className={`absolute outline outline-[0.1px] pl-2 top-0 left-0 bg-primary text-background focus:outline focus:outline-background h-10  text-lg placeholder-placeholder placeholder-opacity-80 rounded-sm w-80 flex items-center ${
						!isChecked && 'text-transparent'
					} `}
				>
					{getColoredText(splitResponse)}
				</div>

				{/* Input real */}
				<input
					type='text'
					className={`absolute inset-0 border p-2 bg-primary   text-black caret-black outline-none w-full placeholder-placeholder placeholder-opacity-80 text-lg ${
						isChecked && 'text-transparent bg-transparent'
					}`}
					ref={inputRef}
					placeholder='Type the number in words.'
					onChange={handleInput}
					aria-invalid={response === RESPONSE_STATE.RIGHT}
				/>
			</div>
			<Button classButton='bg-primary text-buttonText-primary outline-outline-primary'>
				Check
			</Button>
		</form>
	)
}
