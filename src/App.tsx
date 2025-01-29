import { useState, FormEvent, useRef } from 'react'
import { numberToText } from './service/numberToString'
import { isInputValid } from './service/isInputInvalid'
import { useLanguage } from './hooks/useLanguage'
import { Result } from './components/Result'
import { RESPONSE_STATE } from './constants/responseState'
import { LANGUAGES_TO_SHOW } from './constants/languages'
import { Button } from './components/Button'
// import { NumberTicker } from './components/ui/number-ticker'
import NumberFlow, { continuous } from '@number-flow/react'

export default function App() {
	const [number, setNumber] = useState(
		() => Math.floor(Math.random() * 9) + 1
	)
	const { changeLanguage, playAudio } = useLanguage({ number })
	const [response, setResponse] = useState<RESPONSE_STATE>(RESPONSE_STATE.INIT)
	const inputRef = useRef<HTMLInputElement>(null)
	const isResponseChange = useRef(inputRef.current?.value)
	

	function getNewRandomNumber() {
		setNumber(Math.floor(Math.random() * 9999) + 1)
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

		if (isCorrect) {
			setTimeout(() => {
				getNewRandomNumber()
			}, 2500)
		}
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-[10dvh] bg-background text-foreground'>
			<NumberFlow
				value={number}
				locales='ar-OM-u-nu-latn'
				className='text-[10rem]'
				spinTiming={{ duration: 500, easing: 'ease-in-out' }}
				opacityTiming={{ duration: 350, easing: 'ease-out' }}
				plugins={[continuous]}
				willChange
			></NumberFlow>
			<div className='flex gap-6'>
				<form className='flex gap-2 relative' onSubmit={handleSubmit}>
					<label htmlFor='response' className='sr-only'>
						Write the number in text
					</label>
					<input
						id='response'
						type='text'
						className='outline outline-[0.1px] pl-1 bg-input text-foreground focus:outline focus:outline-ring'
						name='response'
						autoComplete='off'
						aria-invalid={response === RESPONSE_STATE.RIGHT}
						ref={inputRef}
					/>
					<Button>Check</Button>
				</form>
				<div className='flex gap-2'>
					<select
						className='outline outline-[0.1px] bg-card text-card-foreground focus:outline focus:outline-ring'
						onChange={e => changeLanguage(e)}
					>
						{LANGUAGES_TO_SHOW.map((lang, index) => (
							<option value={lang} key={index}>
								{lang}
							</option>
						))}
					</select>

					<Button handleClick={playAudio}>Listen</Button>
				</div>
			</div>
			<div className='w-full flex justify-center'>
				<div className='w-56 flex relative'>
					<Result response={response} />
				</div>
			</div>
			<Button handleClick={getNewRandomNumber}>Change Number</Button>
		</div>
	)
}

//Todo: Agregar rango de numeros a elegir
//Todo: Assistant
//Todo: Cambiar de numero en respuesta correcta
//Todo: Agregar Lista de lenuajes
//Todo: Botton sacar animaciones
//Todo: Elegir formato de número
