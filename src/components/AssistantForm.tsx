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
		updateSplitResponse([]) // Limpiamos el estado de la respuesta
		handleSubmit(e) // Ejecutamos el submit
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
			<div className='relative h-10 w-80'>
				{/* Texto coloreado */}
				<div
					className={`absolute outline outline-[0.1px] pl-2 top-0 left-0 bg-primary text-background focus:outline focus:outline-background h-10 text-lg placeholder-placeholder placeholder-opacity-80 rounded-sm w-80 flex items-center ${
						isChecked ?? 'text-transparent' // Si no está checked, el texto se vuelve transparente
					}`}
				>
					{getColoredText(splitResponse)} {/* Muestra el texto coloreado */}
				</div>

				{/* Input real */}
				<input
					type='text'
					className={`absolute inset-0 border p-2 bg-primary text-black caret-black outline-none w-full placeholder-placeholder placeholder-opacity-80 text-lg ${
						isChecked ? 'text-transparent bg-transparent' : 'text-black'
					}`}
					ref={inputRef}
					placeholder={!isChecked ? 'Type the number in words.' : ''}
					onChange={handleInput} // Detecta cuando el usuario escribe
					aria-invalid={response === RESPONSE_STATE.RIGHT}
				/>
			</div>
			<Button classButton='bg-primary text-buttonText-primary outline-outline-primary'>
				Check
			</Button>
		</form>
	)
}
