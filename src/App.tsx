import { useState, FormEvent, useRef } from 'react'
import { numberToText } from './service/numberToString'
import { isInputValid } from './service/isInputInvalid'
import { useLanguage } from './hooks/useLanguage'
import { Result } from './components/Result'
import { RESPONSE_STATE } from './constants/responseState'
import { LANGUAGES } from './constants/languages'

export default function App() {
	const [number, setNumber] = useState(() => Math.floor(Math.random() * 999) + 1)
	const {language, playAudio } = useLanguage({number})
	const [response, setResponse] = useState<RESPONSE_STATE>(RESPONSE_STATE.INIT)
	const inputRef = useRef<HTMLInputElement>(null)
	const isResponseChange = useRef(inputRef.current?.value)
	const formatedNumber = new Intl.NumberFormat('de-DE').format(number)
	function getNewRandomNumber() {
		setNumber(Math.floor(Math.random() * 999) + 1)
		setResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (isResponseChange.current === inputRef.current?.value) return
		const response = inputRef.current?.value || ''

		if (!isInputValid(response)) return setResponse(RESPONSE_STATE.INVALID)
		const isCorrect = numberToText(number) === response.trim().toLowerCase()
		setResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
		isResponseChange.current = inputRef.current?.value
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-[10dvh]'>
			<p className='text-[10rem]'>{formatedNumber}</p>
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
					onClick={() => playAudio(LANGUAGES.BRITISH)}
					className={`border px-2 rounded-lg ${
						language === LANGUAGES.BRITISH ? 'bg-gray-500' : ''
					}`}
				>
					UK
				</button>
				<button
					type='button'
					onClick={() => playAudio(LANGUAGES.USA)}
					className={`border px-2 rounded-lg ${
						language === LANGUAGES.USA ? 'bg-gray-500' : ''
					}`}
				>
					US
				</button>
			</form>
			<Result response={response} />
			<button onClick={getNewRandomNumber} className='border px-2 rounded-lg'>
				Cambiar Número
			</button>
		</div>
	)
}

//Todo: Agregar rango
