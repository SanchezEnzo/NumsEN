import { RESPONSE_STATE } from "../constants/responseState"

export function Result({response}: {response: RESPONSE_STATE}) {
	if (response === RESPONSE_STATE.INVALID)
		return <p className='text-red-500'>No se permite esta respuesta</p>
	if (response === RESPONSE_STATE.WRONG)
		return <p className='text-red-500'>Respuesta Incorrecta</p>
	if (response === RESPONSE_STATE.RIGHT)
		return <p className='text-green-500'>¡Respuesta Correcta!</p>
}
