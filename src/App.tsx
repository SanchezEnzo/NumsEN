import { useState, FormEvent, useRef } from 'react'
import { numberToText } from './service/numberToString'
import { isInputValid } from './service/isInputInvalid'
import { useLanguage } from './hooks/useLanguage'
import { Result } from './components/Result'
import { RESPONSE_STATE } from './constants/responseState'

export default function App() {
	const [number, setNumber] = useState(() => Math.floor(Math.random() * 9) + 1)
	const {language, changeLanguage, playAudio } = useLanguage({number})
	const [response, setResponse] = useState<RESPONSE_STATE>(RESPONSE_STATE.INIT)
	const inputRef = useRef<HTMLInputElement>(null)

	function getNewRandomNumber() {
		setNumber(Math.floor(Math.random() * 999) + 1)
		setResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const response = inputRef.current?.value || ''

		if (!isInputValid(response)) return setResponse(RESPONSE_STATE.INVALID)

		const isCorrect = numberToText(number) === response.trim().toLowerCase()
		setResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
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
					onClick={() => changeLanguage('en-GB')}
					className={`border px-2 rounded-lg ${
						language === 'en-GB' ? 'bg-gray-200' : ''
					}`}
				>
					UK
				</button>
				<button
					type='button'
					onClick={() => changeLanguage('en-US')}
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
			<Result response={response} />
			<button onClick={getNewRandomNumber} className='border px-2 rounded-lg'>
				Cambiar Número
			</button>
		</div>
	)
}
