import { useState, FormEvent } from 'react'
import { numberToText } from './service/numberToString'

export default function App() {
	const [number, setNumber] = useState(Math.floor(Math.random() * 1000))
	const [responseState, setResponseState] = useState<boolean>()
	const [badResponse, setBadResponse] = useState(false)

	// console.log(numberToText(471))
	function checkResponse(res: string) {
		if (numberToText(number) === res.trim().toLowerCase())
			setResponseState(true)
		else setResponseState(false)
		console.log(responseState)
	}

	function getNewRandomNumber() {
		setNumber(Math.floor(Math.random() * 1000))
		setBadResponse(false)
	}

	function handleResponse(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const response = formData.get('response')

		if (
			typeof response !== 'string' ||
			response.trim() === '' ||
			/\d/.test(response)
		) {
			setBadResponse(true)
			return
		}

		// Si pasa las validaciones, continuamos
		checkResponse(response)
	}

	function playAudio (lang: string) {
		const utterance = new SpeechSynthesisUtterance(numberToText(number))
		utterance.lang = lang
		window.speechSynthesis.speak(utterance)
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-40'>
			<p className='text-[10rem]'>{number}</p>
			<form className='flex gap-2' onSubmit={e => handleResponse(e)}>
				<input type='text' className='border-red-500 border' name='response' />
				<button className='border px-2 rounded-lg'>Verificar</button>
			<button onClick={() => playAudio('en-GB')}>UK</button>
			<button onClick={() => playAudio('en-US')}>US</button>
			</form>
			{badResponse && <p>No se permite este tipo de respuesta</p>}
			<button onClick={getNewRandomNumber}>Cambiar Numero</button>
		</div>
	)
}
