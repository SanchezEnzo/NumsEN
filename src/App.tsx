import { useState, FormEvent } from 'react'
import { numberToText } from './service/numberToString'

export default function App() {
	const [number, setNumber] = useState(Math.floor(Math.random() * 1000))
	const [responseState, setResponseState] = useState<boolean>()

	console.log(numberToText(471))
	function checkResponse (res: FormDataEntryValue) {
		
		if (numberToText(number) === res) setResponseState(true)
		else setResponseState(false)
		console.log(responseState)
	}

	function generarNumeroRandom() {
		setNumber(Math.floor(Math.random() * 1000))
	}

	function handleResponse(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const { response } = Object.fromEntries(new FormData(e.target as HTMLFormElement))
		checkResponse(response)
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-40'>
			<p className='text-[10rem]'>{number}</p>
			<form className='flex gap-2' onSubmit={e => handleResponse(e)}>
				<input type='text' className='border-red-500 border' name='response' />
				<button className='border px-2 rounded-lg'>Verificar</button>
			</form>
			<button onClick={generarNumeroRandom}>Cambiar Numero</button>
		</div>
	)
}
