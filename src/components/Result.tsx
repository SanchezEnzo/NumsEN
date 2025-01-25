import { RESPONSE_STATE } from "../constants/responseState"

export function Result({response}: {response: RESPONSE_STATE}) {
	if (response === RESPONSE_STATE.INVALID)
		return (
			<p className='text-red-500 absolute  inset-0 flex justify-center items-center'>
				No se permite esta respuesta
			</p>
		)
	if (response === RESPONSE_STATE.WRONG)
		return (
			<p className='text-red-500 absolute inset-0 flex justify-center items-center'>
				Respuesta Incorrecta
			</p>
		)
	if (response === RESPONSE_STATE.RIGHT)
		return (
			<p className='text-green-500 absolute inset-0 flex justify-center items-center'>
				¡Respuesta Correcta!
			</p>
		)
}
