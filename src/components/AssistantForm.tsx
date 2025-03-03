import { FormEvent, FormEventHandler, useId, useState } from 'react'
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
	const { assistantResponse, updateAssistantResponse } = useAssistant()
	const [isChecked, setIsChecked] = useState(false)
	const inputNumberId = useId()

	// Aseguramos que el texto de respuesta se maneje de forma precisa
	const getColoredText = (splitResponse: (string | boolean)[][]) => {
		return splitResponse.map(([char, isCorrect], index) => {
			if (char === ' ') {
				return (
					<span key={index} className='inline-block'>
						&nbsp; {/* Usamos un espacio no rompible */}
					</span>
				)
			}

			return (
				<span
					key={index}
					className={isCorrect ? 'text-green-700' : 'text-red-600'}
				>
					{char}
				</span>
			)
		})
	}

	// Cuando el formulario se envía
	const handleAssistantForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isChecked) return
		setIsChecked(true)
		updateAssistantResponse([])
		handleSubmit(e)
	}

	// Al escribir, reseteamos el estado
	const handleInput = () => {
		if (!isChecked) return
		setIsChecked(false)
	}

	return (
		<form
			className='flex gap-2 relative max-h-10 h-10 items-center'
			onSubmit={handleAssistantForm}
		>
			<div className='relative h-10 w-80 max-sm:w-56'>
				{/* Texto coloreado */}
				<div
					role='input'
					aria-label='Show number in text with errors'
					className={`absolute outline outline-[0.1px] pl-2 top-0 left-0 bg-primary text-background focus:outline focus:outline-background h-10 text-lg placeholder-placeholder placeholder-opacity-80 rounded-sm max-w-80 w-80 flex items-center max-sm:w-56 ${
						isChecked ?? 'text-transparent' // Si no está checked, el texto se vuelve transparente
					}`}
				>
					<span className={`${!isChecked && 'hidden'} overflow-hidden`}>
						{getColoredText(assistantResponse)}{' '}
						{/* Muestra el texto coloreado */}
					</span>
				</div>

				{/* Input real */}
				<label htmlFor={inputNumberId}>Write number in text</label>
				<input
					id={inputNumberId}
					autoComplete='off'
					type='text'
					className={`absolute inset-0 p-2 bg-primary text-black caret-black outline-none w-full placeholder-placeholder placeholder-opacity-80 text-lg max-sm:w-56  ${
						isChecked ? 'text-transparent bg-transparent' : 'text-black'
					}`}
					ref={inputRef}
					placeholder={!isChecked ? 'Type the number in words.' : ''}
					onChange={handleInput} // Detecta cuando el usuario escribe
					aria-invalid={response === RESPONSE_STATE.RIGHT}
					autoFocus
				/>
			</div>
			<Button classButton='bg-primary text-buttonText-primary outline-outline-primary'>
				Check
			</Button>
		</form>
	)
}
