import { useState } from "react"

export default function App () {
	const [number, setNumber] = useState(Math.floor(Math.random() * 1000))

	function generarNumeroRandom () {
		setNumber(Math.floor(Math.random() * 1000))
	}

	function algo () {
		console.log(number)
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-40'>
			<p className='text-[10rem]'>{number}</p>
			<form className='flex gap-2'>
				<input type='text' className='border-red-500 border' />
				<button className="border px-2 rounded-lg">Verificar</button>
			</form>
			<button onClick={generarNumeroRandom}>
				Cambiar Numero
			</button>
			<button onClick={algo}>Ejemplo</button>
		</div>
	)
}
