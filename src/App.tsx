import { useState, FormEvent, useRef } from 'react'
import { numberToText } from './service/numberToString'

// Constantes para los estados
enum RESPONSE_STATE {
	INIT,
	INVALID,
	RIGHT,
	WRONG,
}

export default function App() {
	const [number, setNumber] = useState(() => Math.floor(Math.random() * 9) + 1) 
	const [response, setResponse] = useState<RESPONSE_STATE>(RESPONSE_STATE.INIT)
	const [language, setLanguage] = useState('en-GB')
	const inputRef = useRef<HTMLInputElement>(null)


	function handleCheckResponse(res: string) {
		const isCorrect = numberToText(number) === res.trim().toLowerCase()
		setResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
	}

	function getNewRandomNumber() {
		setNumber(Math.floor(Math.random() * 999) + 1) 
		setResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
	}

	const isInputValid = (response: string): boolean => {
		return /^[a-zA-Z\s-]+$/.test(response.trim())
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const response = inputRef.current?.value || ''

		if (!isInputValid(response)) {
			setResponse(RESPONSE_STATE.INVALID)
			return
		}

		handleCheckResponse(response)
	}

	function playAudio() {
		window.speechSynthesis.cancel()
		const utterance = new SpeechSynthesisUtterance(numberToText(number))
		utterance.lang = language
		window.speechSynthesis.speak(utterance)
	}

	function Result() {
		if (response === RESPONSE_STATE.INVALID)
			return <p className='text-red-500'>No se permite esta respuesta</p>
		if (response === RESPONSE_STATE.WRONG)
			return <p className='text-red-500'>Respuesta Incorrecta</p>
		return <p className='text-green-500'>¡Respuesta Correcta!</p>
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-[10dvh]'>
			<p className='text-[10rem]'>{number}</p>
			<form className='flex gap-2' onSubmit={handleSubmit}>
				<label htmlFor='response' className='sr-only'>
					Escribe el número en texto
				</label>
				<input
					id='response'
					type='text'
					className={`border ${
						response === RESPONSE_STATE.RIGHT
							? 'border-red-500'
							: 'border-gray-300'
					}`}
					name='response'
					autoComplete='off'
					aria-invalid={response === RESPONSE_STATE.RIGHT}
					ref={inputRef}
				/>
				<button type='submit' className='border px-2 rounded-lg'>
					Verificar
				</button>
				<button
					type='button'
					onClick={() => setLanguage('en-GB')}
					className={`border px-2 rounded-lg ${
						language === 'en-GB' ? 'bg-gray-200' : ''
					}`}
				>
					UK
				</button>
				<button
					type='button'
					onClick={() => setLanguage('en-US')}
					className={`border px-2 rounded-lg ${
						language === 'en-US' ? 'bg-gray-200' : ''
					}`}
				>
					US
				</button>
				<button
					type='button'
					onClick={playAudio}
					className='border px-2 rounded-lg'
				>
					Escuchar
				</button>
			</form>
			<Result />
			<button onClick={getNewRandomNumber} className='border px-2 rounded-lg'>
				Cambiar Número
			</button>
		</div>
	)
}
