import { useState, FormEvent, useRef } from 'react'
import { numberToText } from './service/numberToString'
import { isInputValid } from './service/isInputInvalid'
import { useLanguage } from './hooks/useLanguage'
import { Result } from './components/Result'
import { RESPONSE_STATE } from './constants/responseState'
import { LANGUAGES_TO_SHOW } from './constants/languages'

export default function App() {
	const [number, setNumber] = useState(
		() => Math.floor(Math.random() * 999) + 1
	)
	const { changeLanguage, playAudio } = useLanguage({ number })
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
			<div className='flex gap-6'>
				<form className='flex gap-2' onSubmit={handleSubmit}>
					<label htmlFor='response' className='sr-only'>
						Write the number in text
					</label>
					<input
						id='response'
						type='text'
						className={`outline ${
							response === RESPONSE_STATE.RIGHT
								? 'outline-red-500'
								: 'outline-gray-300'
						}`}
						name='response'
						autoComplete='off'
						aria-invalid={response === RESPONSE_STATE.RIGHT}
						ref={inputRef}
					/>
					<button type='submit' className='outline px-2 rounded-lg'>
						Check
					</button>
				</form>
				<div className='flex gap-2'>
					<select onChange={(e) => changeLanguage(e)}>
						{LANGUAGES_TO_SHOW.map((lang, index) => (
							<option value={lang} key={index}>
								{lang}
							</option>
						))}
					</select>
					<button
						onClick={() => playAudio()}
						className='outline px-2 rounded-lg'
					>
						Listen
					</button>
				</div>
			</div>
			<Result response={response} />
			<button onClick={getNewRandomNumber} className='outline px-2 rounded-lg'>
				Change Number{' '}
			</button>
		</div>
	)
}

//Todo: Agregar rango
//Todo: Assistant
//Todo: Cambiar de numero en respuesta correcta
//Todo: Agregar Lista de lenuajes
